"use client";

import { UserButton } from "@clerk/nextjs";
import Script from "next/script";
import { useEffect } from "react";

export default function Page() {
  // Ensure Lucide icons initialize if loaded dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, []);

  return (
    <>
      {/* Clerk Gate 1 Indicator & Logout */}
      {/* Positioned beautifully in the top right, respecting your UI aesthetic */}
      <div className="absolute top-4 right-4 z-50 bg-white/40 p-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/50 flex items-center gap-3 pr-4 animate-fade-in">
        <UserButton afterSignOutUrl="/" />
        <span className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1">
          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          Identity Verified
        </span>
      </div>

      {/* Your Existing DOM Targets */}
      {/* Toast Notification Container */}
      <div id="toast-container" className="flex flex-col gap-3 fixed bottom-6 right-6 z-50"></div>

      {/* Loading Spinner */}
      <div id="loading-overlay" className="glass-overlay flex flex-col items-center justify-center" style={{ display: 'none' }}>
          <i data-lucide="loader" className="animate-spin w-12 h-12 text-blue-600 mb-3 drop-shadow-lg"></i>
          <p className="text-blue-900 font-bold tracking-wide">Processing Securely...</p>
      </div>

      {/* Main Application Container for Gate 2 (script.js injects logic here) */}
      <div id="app" className="overflow-x-hidden w-full relative z-10 pt-16"></div>

      {/* Load your existing custom database logic (Gate 2) */}
      {/* Next.js Script component ensures this executes smoothly after the page mounts */}
      <Script src="/script.js" strategy="lazyOnload" />
    </>
  );
}
