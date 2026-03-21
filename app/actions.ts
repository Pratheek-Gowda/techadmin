'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// 1. USER LOGIN ACTION
export async function loginUser(username, password) {
  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials")
  }

  return { id: user.id, username: user.username, role: user.role }
}

// 2. REQUEST FUNDS (USER SIDE)
export async function requestFunds(userId, amount) {
  await prisma.fundRequest.create({
    data: {
      userId,
      amount: parseFloat(amount),
      status: 'pending'
    }
  })
  revalidatePath('/user') // Refreshes the user dashboard
}

// 3. CREDIT/DEBIT WALLET (ADMIN SIDE)
export async function updateWallet(userId, amount, type, description) {
  const numericAmount = parseFloat(amount)
  
  // Start a Transaction (Atomic)
  return await prisma.$transaction(async (tx) => {
    // Update User Balance
    const user = await tx.user.update({
      where: { id: userId },
      data: {
        balance: {
          [type === 'credit' ? 'increment' : 'decrement']: numericAmount
        }
      }
    })

    // Create History Record
    await tx.transaction.create({
      data: {
        type,
        amount: numericAmount,
        description,
        entity: 'user',
        userId
      }
    })

    return user
  })
}

// 4. GET GLOBAL SETTINGS (MARQUEE & CONTACT)
export async function getSettings() {
  return await prisma.globalSettings.findFirst({
    where: { id: 1 }
  })
}
