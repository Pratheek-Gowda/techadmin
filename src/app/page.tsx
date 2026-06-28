"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Script from "next/script";

export default function Page() {
  // Ensure Lucide icons initialize if loaded dynamically (Used in your Dashboard)
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, []);

  return (
    <>
      {/* ========================================= */}
      {/* VIEW 1: PUBLIC LANDING PAGE (NOT LOGGED IN) */}
      {/* ========================================= */}
      <SignedOut>
        <div className="min-h-screen bg-[#0f0f13] text-white font-sans selection:bg-[#f09f33] selection:text-white">
          {/* Background Image with Overlay */}
          <div 
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/35457079/pexels-photo-35457079.jpeg')" }}
          ></div>
          <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0f0f13]/80 via-[#0f0f13]/90 to-[#0f0f13]"></div>

          {/* Navigation Bar */}
          <nav className="relative z-10 border-b border-white/10 bg-[#0f0f13]/60 backdrop-blur-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09f33] to-[#880088] flex items-center justify-center font-bold text-lg">
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
          <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center justify-center min-h-[80vh]">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#f09f33]/30 bg-[#f09f33]/10 text-[#f09f33] text-sm font-semibold tracking-wide">
              Secure Subagent Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              Empowering Your <br className="hidden md:block" /> Digital Business.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Welcome to the centralized hub for Pratheek Enterprises. Manage your subagent operations, track metrics, and access premium telecom resources securely.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <SignInButton mode="modal">
                <button className="px-8 py-4 text-base font-bold bg-gradient-to-r from-[#880088] to-[#f09f33] hover:opacity-90 rounded-full transition-all shadow-[0_0_30px_rgba(240,159,51,0.3)] hover:shadow-[0_0_40px_rgba(240,159,51,0.5)] transform hover:-translate-y-1 cursor-pointer">
                  Access Secure Portal <span className="ml-2">→</span>
                </button>
              </SignInButton>
              <Link href="https://pratheek.shop" target="_blank" className="px-8 py-4 text-base font-bold bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all flex items-center justify-center cursor-pointer">
                Visit Main Website
              </Link>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-[#f09f33]/20 flex items-center justify-center mb-4 text-[#f09f33]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure Access</h3>
                <p className="text-sm text-gray-400">Enterprise-grade authentication keeping your business data completely safe.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-[#880088]/20 flex items-center justify-center mb-4 text-[#880088]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Real-time Sync</h3>
                <p className="text-sm text-gray-400">Instant updates across all your devices for seamless operational management.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Analytics Dashboard</h3>
                <p className="text-sm text-gray-400">Comprehensive metrics and insights right at your fingertips.</p>
              </div>
            </div>
          </main>

          {/* Simple Footer */}
          <footer className="relative z-10 border-t border-white/10 mt-auto py-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Pratheek Enterprises. Built with AI.</p>
          </footer>
        </div>
      </SignedOut>

      {/* ========================================= */}
      {/* VIEW 2: SECURE DASHBOARD (LOGGED IN) */}
      {/* ========================================= */}
      <SignedIn>
        {/* Clerk Gate Indicator & Logout */}
        {/* Positioned beautifully in the top right, respecting your UI aesthetic */}
        <div className="absolute top-4 right-4 z-[9999] bg-white/80 dark:bg-black/60 p-1.5 rounded-full backdrop-blur-md shadow-lg border border-gray-200 dark:border-white/10 flex items-center gap-3 pr-4 animate-fade-in">
          <UserButton afterSignOutUrl="/" />
          <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            Verified
          </span>
        </div>

        {/* Your Existing DOM Targets for script.js */}
        {/* Toast Notification Container */}
        <div id="toast-container" className="flex flex-col gap-3 fixed bottom-6 right-6 z-50 pointer-events-none"></div>

        {/* Loading Spinner */}
        <div id="loading-overlay" className="glass-overlay flex flex-col items-center justify-center fixed inset-0 z-[9000] bg-black/50 backdrop-blur-sm transition-opacity" style={{ display: 'none' }}>
            <i data-lucide="loader" className="animate-spin w-12 h-12 text-blue-500 mb-3 drop-shadow-lg"></i>
            <p className="text-white font-bold tracking-wide">Processing Securely...</p>
        </div>

        {/* Main Application Container for Gate 2 (script.js injects logic here) */}
        <div id="app" className="overflow-x-hidden w-full relative z-10 min-h-screen bg-gray-50 dark:bg-[#0f0f13] text-black dark:text-white pt-16">
           {/* If script.js takes a moment to load, show a placeholder skeleton or message here if desired */}
           <div className="flex items-center justify-center h-full min-h-[50vh] text-gray-400">
              Initializing Dashboard...
           </div>
        </div>

        {/* Load your existing custom database logic (Gate 2) */}
        {/* Next.js Script component ensures this executes smoothly after the page mounts */}
        <Script src="/script.js" strategy="lazyOnload" />
      </SignedIn>
    </>
  );
}
