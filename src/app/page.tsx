"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  CreditCard, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2,
  Bell
} from "lucide-react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial dashboard loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ========================================= */}
      {/* VIEW 1: PUBLIC LANDING PAGE (NOT LOGGED IN) */}
      {/* ========================================= */}
      <SignedOut>
        <div className="min-h-screen bg-[#0f0f13] text-white font-sans selection:bg-[#f09f33] selection:text-white flex flex-col">
          {/* Background Image with Overlay */}
          <div 
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/35457079/pexels-photo-35457079.jpeg')" }}
          ></div>
          <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0f0f13]/80 via-[#0f0f13]/90 to-[#0f0f13]"></div>

          {/* Navigation Bar */}
          <nav className="relative z-10 border-b border-white/10 bg-[#0f0f13]/60 backdrop-blur-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09f33] to-[#880088] flex items-center justify-center font-bold text-lg shadow-lg">
                  P
                </div>
                <span className="font-bold text-xl tracking-tight hidden sm:block">Pratheek.app</span>
              </div>
              <div className="flex gap-4">
                <SignInButton mode="modal">
                  <button className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-5 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all cursor-pointer">
                    Register
                  </button>
                </SignUpButton>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-24 text-center flex flex-col items-center justify-center flex-grow">
            <div className="inline-block mb-8 px-4 py-1.5 rounded-full border border-[#f09f33]/30 bg-[#f09f33]/10 text-[#f09f33] text-sm font-semibold tracking-wide animate-fade-in">
              Secure Subagent Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-tight">
              Empowering Your <br className="hidden md:block" /> Digital Business.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Welcome to the centralized hub for Pratheek Enterprises. Manage your subagent operations, track metrics, and access premium telecom resources securely.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <SignInButton mode="modal">
                <button className="px-8 py-4 text-base font-bold bg-gradient-to-r from-[#880088] to-[#f09f33] hover:opacity-90 rounded-full transition-all shadow-[0_0_30px_rgba(240,159,51,0.3)] hover:shadow-[0_0_40px_rgba(240,159,51,0.5)] transform hover:-translate-y-1 cursor-pointer flex items-center justify-center">
                  Access Secure Portal <ArrowUpRight className="ml-2 w-5 h-5" />
                </button>
              </SignInButton>
              <Link href="https://pratheek.shop" target="_blank" className="px-8 py-4 text-base font-bold bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all flex items-center justify-center cursor-pointer">
                Visit Main Website
              </Link>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#f09f33]/20 flex items-center justify-center mb-4 text-[#f09f33]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure Access</h3>
                <p className="text-sm text-gray-400">Enterprise-grade authentication keeping your business data completely safe.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#880088]/20 flex items-center justify-center mb-4 text-[#880088]">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Real-time Sync</h3>
                <p className="text-sm text-gray-400">Instant updates across all your devices for seamless operational management.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Analytics Dashboard</h3>
                <p className="text-sm text-gray-400">Comprehensive metrics and insights right at your fingertips.</p>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="relative z-10 border-t border-white/10 mt-auto py-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Pratheek Enterprises. Built for Subagents.</p>
          </footer>
        </div>
      </SignedOut>

      {/* ========================================= */}
      {/* VIEW 2: SECURE DASHBOARD (LOGGED IN)      */}
      {/* ========================================= */}
      <SignedIn>
        <div className="min-h-screen bg-[#0a0a0c] text-white flex">
          
          {/* Sidebar Navigation */}
          <aside className="w-64 border-r border-white/10 bg-[#0f0f13] hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09f33] to-[#880088] flex items-center justify-center font-bold text-sm shadow-lg">
                  P
                </div>
                <span className="font-bold text-lg tracking-tight">Pratheek.app</span>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <nav className="space-y-1">
                {[
                  { name: 'Dashboard', icon: LayoutDashboard, active: true },
                  { name: 'Subagents', icon: Users, active: false },
                  { name: 'Transactions', icon: CreditCard, active: false },
                  { name: 'Activity Log', icon: Activity, active: false },
                ].map((item) => (
                  <button 
                    key={item.name}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      item.active 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-white/10">
               <div className="bg-gradient-to-r from-[#880088]/20 to-[#f09f33]/20 p-4 rounded-xl border border-white/5">
                 <p className="text-xs font-semibold text-white/80 mb-1">Current Plan</p>
                 <p className="text-sm font-bold text-white mb-3">Enterprise Subagent</p>
                 <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-[#880088] to-[#f09f33] h-1.5 rounded-full" style={{ width: '70%' }}></div>
                 </div>
               </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden">
            {/* Topbar */}
            <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0f0f13]/80 backdrop-blur-md">
              <h2 className="text-xl font-bold tracking-tight">Overview</h2>
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f09f33] rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Loader2 className="w-10 h-10 animate-spin text-[#f09f33] mb-4" />
                  <p className="font-medium tracking-wide">Initializing Secure Environment...</p>
                </div>
              ) : (
                <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Revenue", value: "₹24,500", trend: "+12.5%", isPositive: true, icon: CreditCard, color: "text-[#f09f33]" },
                      { label: "Active Subagents", value: "142", trend: "+4.2%", isPositive: true, icon: Users, color: "text-blue-400" },
                      { label: "Pending Approvals", value: "8", trend: "-2.1%", isPositive: false, icon: Activity, color: "text-red-400" },
                      { label: "System Uptime", value: "99.9%", trend: "Stable", isPositive: true, icon: ShieldCheck, color: "text-green-400" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-[#0f0f13] border border-white/10 rounded-2xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                          </div>
                          <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${stat.isPositive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                            {stat.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                            {stat.trend}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 font-medium mb-1">{stat.label}</p>
                          <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity Table Placeholder */}
                  <div className="bg-[#0f0f13] border border-white/10 rounded-2xl p-6 shadow-sm mt-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                      <button className="text-sm text-[#f09f33] hover:text-[#f09f33]/80 font-medium transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="text-gray-400 text-sm border-b border-white/10">
                            <th className="pb-3 font-medium">Transaction ID</th>
                            <th className="pb-3 font-medium">Agent</th>
                            <th className="pb-3 font-medium">Date</th>
                            <th className="pb-3 font-medium">Amount</th>
                            <th className="pb-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {[
                            { id: "TRX-8923", agent: "John Doe", date: "Today, 10:23 AM", amount: "₹1,250", status: "Completed" },
                            { id: "TRX-8922", agent: "Sarah Smith", date: "Today, 09:15 AM", amount: "₹840", status: "Completed" },
                            { id: "TRX-8921", agent: "Raj Kumar", date: "Yesterday, 16:45", amount: "₹3,400", status: "Pending" },
                            { id: "TRX-8920", agent: "Amit Patel", date: "Yesterday, 14:20", amount: "₹500", status: "Failed" },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-4 text-white font-medium">{row.id}</td>
                              <td className="py-4 text-gray-300">{row.agent}</td>
                              <td className="py-4 text-gray-400">{row.date}</td>
                              <td className="py-4 text-white font-medium">{row.amount}</td>
                              <td className="py-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  row.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                  row.status === 'Pending' ? 'bg-[#f09f33]/10 text-[#f09f33] border border-[#f09f33]/20' : 
                                  'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </main>
        </div>
      </SignedIn>
    </>
  );
}
