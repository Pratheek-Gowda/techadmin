'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// --- AUTHENTICATION ---

export async function loginUser(username, password) {
  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials")
  }

  return { id: user.id, username: user.username, role: user.role }
}

// --- USER ACTIONS ---

export async function requestFunds(userId, amount) {
  await prisma.fundRequest.create({
    data: {
      userId,
      amount: parseFloat(amount),
      status: 'pending'
    }
  })
  revalidatePath('/user')
}

export async function getUserData(userId) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      requests: { orderBy: { createdAt: 'desc' } }
    }
  })
}

export async function getUserTransactions(userId) {
  return await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}

// --- ADMIN ACTIONS: USER MANAGEMENT ---

export async function addNewUser(username, password) {
  await prisma.user.create({
    data: { username, password, role: 'user', balance: 0 }
  })
  revalidatePath('/admin')
}

export async function removeUser(userId) {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error("User not found")

    // If user has balance, transfer it back to admin master wallet
    if (user.balance > 0) {
      await tx.globalSettings.update({
        where: { id: 1 },
        data: { adminWallet: { increment: user.balance } }
      })
      
      await tx.transaction.create({
        data: {
          type: 'admin_add',
          amount: user.balance,
          description: `Recovered balance from deleted user: ${user.username}`,
          entity: 'admin'
        }
      })
    }

    await tx.user.delete({ where: { id: userId } })
  })
  revalidatePath('/admin')
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    where: { role: 'user' },
    orderBy: { username: 'asc' }
  })
}

// --- ADMIN ACTIONS: WALLET & TRANSACTIONS ---

export async function updateWallet(userId, amount, type, description) {
  const numericAmount = parseFloat(amount)
  
  return await prisma.$transaction(async (tx) => {
    // 1. Check Admin Wallet if crediting user
    if (type === 'credit') {
      const settings = await tx.globalSettings.findFirst()
      if (!settings || settings.adminWallet < numericAmount) {
        throw new Error("Insufficient Admin Master Wallet balance")
      }
      // Deduct from Admin
      await tx.globalSettings.update({
        where: { id: 1 },
        data: { adminWallet: { decrement: numericAmount } }
      })
      // Log admin side
      await tx.transaction.create({
        data: { type: 'admin_remove', amount: numericAmount, description: `Transfer to user: ${userId}`, entity: 'admin' }
      })
    }

    // 2. Update User Balance
    await tx.user.update({
      where: { id: userId },
      data: {
        balance: {
          [type === 'credit' ? 'increment' : 'decrement']: numericAmount
        }
      }
    })

    // 3. Log user side
    await tx.transaction.create({
      data: { type, amount: numericAmount, description, entity: 'user', userId }
    })
  })
  revalidatePath('/admin')
  revalidatePath('/user')
}

export async function updateAdminWallet(amount, type) {
  const numericAmount = parseFloat(amount)
  await prisma.$transaction(async (tx) => {
    await tx.globalSettings.update({
      where: { id: 1 },
      data: {
        adminWallet: {
          [type === 'add' ? 'increment' : 'decrement']: numericAmount
        }
      }
    })
    await tx.transaction.create({
      data: {
        type: type === 'add' ? 'admin_add' : 'admin_remove',
        amount: numericAmount,
        description: `${type === 'add' ? 'Added' : 'Removed'} funds manually`,
        entity: 'admin'
      }
    })
  })
  revalidatePath('/admin')
}

export async function deleteTransaction(txId) {
  await prisma.transaction.delete({ where: { id: txId } })
  revalidatePath('/admin')
}

export async function getAdminTransactions() {
  return await prisma.transaction.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

// --- ADMIN ACTIONS: SETTINGS & NOTIFICATIONS ---

export async function updateSettings(notification, phone, email) {
  await prisma.globalSettings.upsert({
    where: { id: 1 },
    update: { notification, contactPhone: phone, contactEmail: email },
    create: { id: 1, notification, contactPhone: phone, contactEmail: email, adminWallet: 0 }
  })
  revalidatePath('/user')
  revalidatePath('/admin')
}

export async function getSettings() {
  return await prisma.globalSettings.findFirst({
    where: { id: 1 }
  })
}

export async function handleFundRequest(requestId, status) {
  return await prisma.$transaction(async (tx) => {
    const request = await tx.fundRequest.findUnique({ where: { id: requestId } })
    if (!request || request.status !== 'pending') throw new Error("Invalid request")

    if (status === 'approved') {
      const settings = await tx.globalSettings.findFirst()
      if (!settings || settings.adminWallet < request.amount) throw new Error("Insufficient Admin Wallet")

      await tx.globalSettings.update({
        where: { id: 1 },
        data: { adminWallet: { decrement: request.amount } }
      })

      await tx.user.update({
        where: { id: request.userId },
        data: { balance: { increment: request.amount } }
      })

      await tx.transaction.create({
        data: { type: 'credit', amount: request.amount, description: "Approved Fund Request", entity: 'user', userId: request.userId }
      })
    }

    await tx.fundRequest.update({
      where: { id: requestId },
      data: { status }
    })
  })
  revalidatePath('/admin')
}
