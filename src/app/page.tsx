"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Script from "next/script";

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, []);

  return (
    <>
      <SignedOut>
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/35457079/pexels-photo-35457079.jpeg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.10),transparent_25%)]" />

          <nav className="relative z-10 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl px-6 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 font-extrabold text-white shadow-lg shadow-blue-500/20">
                  P
                </div>
                <span className="hidden text-xl font-extrabold tracking-tight text-white sm:block">Pratheek.app</span>
              </div>
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-200 transition-all hover:bg-white/10 hover:text-white">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500">
                    Register
                  </button>
                </SignUpButton>
              </div>
            </div>
          </nav>

          <main className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] max-w-7xl flex-col justify-center px-6 py-16 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-200 shadow-inner shadow-blue-500/5">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Secure Subagent Portal
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              Empowering Your <span className="block bg-gradient-to-r from-blue-300 via-cyan-200 to-white bg-clip-text text-transparent">Digital Business</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Welcome to the centralized hub for Pratheek Enterprises. Manage your subagent operations, track metrics, and access premium telecom resources securely.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <SignInButton mode="modal">
                <button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-[0_20px_45px_rgba(59,130,246,0.25)] transition-all hover:scale-[1.02] hover:from-blue-500 hover:to-cyan-400">
                  Access Secure Portal <span className="ml-2">→</span>
                </button>
              </SignInButton>
              <Link
                href="https://pratheek.shop"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-slate-100 transition-all hover:bg-white/10 hover:text-white"
              >
                Visit Main Website
              </Link>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white">Secure Access</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">Enterprise-grade authentication keeping your business data safe.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white">Real-time Sync</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">Instant updates across all your devices for seamless management.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m6 0h6m-6 0a2 2 0 002 2m0-2a2 2 0 002 2m0 0a2 2 0 002-2m0 0V9a2 2 0 012-2h1a2 2 0 012 2v10" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white">Analytics Dashboard</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">Comprehensive metrics and insights right at your fingertips.</p>
              </div>
            </div>
          </main>

          <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Pratheek Enterprises. Built with AI.</p>
          </footer>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="absolute right-4 top-4 z-[9999] flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 p-1.5 pr-4 text-slate-900 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-slate-950/70 dark:text-white">
          <UserButton afterSignOutUrl="/" />
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
            <svg className="h-3 w-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            Verified
          </span>
        </div>

        <div id="toast-container" className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-3"></div>

        <div id="loading-overlay" className="glass-overlay fixed inset-0 z-[9000] flex items-center justify-center bg-slate-950/70 opacity-0 backdrop-blur-sm transition-opacity" style={{ display: 'none' }}>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-6 shadow-2xl backdrop-blur-xl">
            <i data-lucide="loader" className="mb-3 h-12 w-12 animate-spin text-blue-400 drop-shadow-lg"></i>
            <p className="font-bold tracking-wide text-white">Processing Securely...</p>
          </div>
        </div>

        <div id="app" className="relative z-10 min-h-screen w-full overflow-x-hidden bg-slate-50 pt-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
          <div className="flex min-h-[50vh] items-center justify-center text-slate-500 dark:text-slate-400">
            Initializing Dashboard...
          </div>
        </div>

        <Script src="/script.js" strategy="lazyOnload" />
      </SignedIn>
    </>
  );
}
