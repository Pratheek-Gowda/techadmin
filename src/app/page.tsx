"use client";

import React, { useEffect } from "react";

// ============================================================================
// 🚀 DEPLOYMENT NOTE FOR VERCEL & GITHUB:
// To deploy this live with Clerk Auth, UNCOMMENT the 3 import lines below 
// and DELETE the entire "MOCK COMPONENTS" section right beneath it.
// ============================================================================
// import Link from 'next/link';
// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
// import Script from "next/script";

// --- MOCK COMPONENTS (Only for this visual preview sandbox) ---
const Link = ({ href, children, className, target }: any) => <a href={href} className={className} target={target}>{children}</a>;
const Script = ({ src, strategy }: any) => null;
const SignedIn = ({ children }: any) => null; // Hidden in preview to show the Landing Page
const SignedOut = ({ children }: any) => <>{children}</>;
const SignInButton = ({ children }: any) => <span className="cursor-pointer">{children}</span>;
const SignUpButton = ({ children }: any) => <span className="cursor-pointer">{children}</span>;
const UserButton = (props: any) => <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full shadow-sm"></div>;
// --------------------------------------------------------------

export default function Page() {
  // Ensure Lucide icons initialize if loaded dynamically (Used in your Dashboard)
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, []);

  return (
    <main className="font-sans">
      
      {/* ========================================================== */}
      {/* GATE 1: UNVERIFIED USERS - SHOW THE PUBLIC LANDING PAGE    */}
      {/* ========================================================== */}
      <SignedOut>
        <div className="min-h-screen bg-[#0f0f13] text-white selection:bg-[#f09f33] selection:text-white relative">
          
          {/* Background Glow Effects */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#880088] blur-[120px] opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#f09f33] blur-[120px] opacity-10"></div>
          </div>

          {/* Navigation Bar */}
          <nav className="relative z-10 border-b border-white/10 bg-[#141419]/80 backdrop-blur-md sticky top-0">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#880088] to-[#f09f33] flex items-center justify-center font-bold text-lg shadow-lg">
                  P
                </div>
                <span className="font-bold text-xl tracking-wide">Pratheek<span className="text-gray-400">.app</span></span>
              </div>

              <div className="flex items-center gap-4">
                <SignInButton mode="modal">
                  <button className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-gradient-to-r from-[#880088] to-[#f09f33] text-white px-5 py-2.5 rounded-full font-semibold shadow-[0_4px_15px_rgba(240,159,51,0.3)] hover:scale-105 transition-transform">
                    Create Account
                  </button>
                </SignUpButton>
              </div>
            </div>
          </nav>

          { }
          <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#f09f33]/30 bg-[#f09f33]/10 text-[#f09f33] text-sm font-semibold mb-8 backdrop-blur-sm">
              🚀 Welcome to the Secure Subagent Portal
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
              Manage Your Digital Business <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#ffe4b2] to-[#f09f33]">
                With Ultimate Security.
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12">
              Your one-stop hub for Premium Telecom & Digital Solutions. Access tools, manage clients, and track your business growth all in one secure place.
            </p>

            {/* Call to Action Block */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <SignInButton mode="modal">
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#880088] to-[#f09f33] text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_8px_25px_rgba(240,159,51,0.4)] hover:-translate-y-1 transition-all">
                  Access Secure Portal
                  {/* Right Arrow SVG */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </SignInButton>

              <Link href="https://pratheek.shop" target="_blank" className="flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
                Visit Main Website
              </Link>
            </div>

            { }
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full text-left">
              <div className="bg-[#1a1a20]/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:border-[#f09f33]/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#880088]/20 flex items-center justify-center text-[#f09f33] mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
                <p className="text-gray-400">Powered by Clerk authentication ensuring your data and your clients' data remains strictly confidential.</p>
              </div>
              <div className="bg-[#1a1a20]/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:border-[#f09f33]/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#880088]/20 flex items-center justify-center text-[#f09f33] mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Access</h3>
                <p className="text-gray-400">No waiting. Activate subagent tools, web design dashboards, and tracking links the moment you log in.</p>
              </div>
              <div className="bg-[#1a1a20]/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:border-[#f09f33]/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#880088]/20 flex items-center justify-center text-[#f09f33] mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Mobile Optimized</h3>
                <p className="text-gray-400">Manage your business on the go. Our portal is fully responsive for smartphones and tablets.</p>
              </div>
            </div>
          </div>
          
          <footer className="border-t border-white/10 bg-[#141419] py-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Pratheek Enterprises. All rights reserved.</p>
          </footer>
        </div>
      </SignedOut>

      {/* ========================================================== */}
      {/* GATE 2: VERIFIED USERS - SHOW YOUR SECURE DASHBOARD/APP    */}
      {/* ========================================================== */}
      <SignedIn>
        <div className="min-h-screen relative bg-gray-50"> 
          
          {/* Clerk Gate 1 Indicator & Logout */}
          <div className="absolute top-4 right-4 z-[9999] bg-white/70 p-1.5 rounded-full backdrop-blur-md shadow-lg border border-gray-200 flex items-center gap-3 pr-4 animate-fade-in hover:bg-white/90 transition-colors">
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 shadow-sm" } }} />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              Identity Verified
            </span>
          </div>

          {/* Toast Notification Container */}
          <div id="toast-container" className="flex flex-col gap-3 fixed bottom-6 right-6 z-50"></div>

          {/* Loading Spinner */}
          <div id="loading-overlay" className="glass-overlay flex flex-col items-center justify-center fixed inset-0 z-40 bg-white/50 backdrop-blur-sm" style={{ display: 'none' }}>
              <i data-lucide="loader" className="animate-spin w-12 h-12 text-blue-600 mb-3 drop-shadow-lg"></i>
              <p className="text-blue-900 font-bold tracking-wide">Processing Securely...</p>
          </div>

          {/* Main Application Container for Gate 2 (script.js injects logic here) */}
          <div id="app" className="overflow-x-hidden w-full relative z-10 pt-16 min-h-screen"></div>

          {/* Load your existing custom database logic (Gate 2) */}
          <Script src="/script.js" strategy="lazyOnload" />
        </div>
      </SignedIn>
      
    </main>
  );
}
