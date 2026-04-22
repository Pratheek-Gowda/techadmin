"use client";

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function PasswordResetPage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, []);

  const showToast = (message: string, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    const bg = type === 'error' ? 'bg-red-600/90' : type === 'success' ? 'bg-green-600/90' : 'bg-blue-600/90';
    
    toast.className = `toast ${bg} text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-semibold transform translate-x-full opacity-0`;
    toast.innerHTML = `<i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle'}" class="w-5 h-5"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    if ((window as any).lucide) (window as any).lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('translate-x-0', 'opacity-100');
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const masterKey = (document.getElementById('master-key') as HTMLInputElement).value;
    const targetUsername = (document.getElementById('target-user') as HTMLInputElement).value;
    const newPassword = (document.getElementById('new-password') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masterKey, targetUsername, newPassword })
      });
      
      const data = await res.json();
      
      if (data.success) {
        showToast(`Password successfully updated for ${targetUsername}`, 'success');
        (e.target as HTMLFormElement).reset();
      } else {
        showToast(data.error || 'Failed to update password', 'error');
      }
    } catch (err) {
      showToast('Network error occurred', 'error');
    } finally {
      setIsLoading(false);
      if ((window as any).lucide) (window as any).lucide.createIcons();
    }
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen relative z-10">
      
      <div className="absolute top-4 right-4 z-50 bg-slate-800/40 p-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/10 flex items-center gap-3 pr-4 animate-fade-in text-white">
        <UserButton afterSignOutUrl="/" />
        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          Identity Verified
        </span>
      </div>

      <div id="toast-container" className="flex flex-col gap-3 fixed bottom-6 right-6 z-50"></div>

      <div className="glass-card-dark p-10 rounded-3xl w-full max-w-md relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i data-lucide="key-round" className="text-blue-400 w-8 h-8"></i>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Master Override</h1>
          <p className="text-gray-400 font-medium mt-2 text-sm">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-white">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Master Key</label>
            <input type="password" id="master-key" className="block w-full px-4 py-3 border border-white/10 rounded-xl outline-none bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-blue-500 transition-all" required placeholder="Enter the main key" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Target Username</label>
            <input type="text" id="target-user" className="block w-full px-4 py-3 border border-white/10 rounded-xl outline-none bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-blue-500 transition-all" required placeholder="User or Admin name" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">New Password</label>
            <input type="password" id="new-password" className="block w-full px-4 py-3 border border-white/10 rounded-xl outline-none bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-blue-500 transition-all" required placeholder="Enter new password" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-4 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/50 transition-all mt-6 flex items-center justify-center gap-2 disabled:opacity-70">
            {isLoading ? <i data-lucide="loader" className="w-5 h-5 animate-spin"></i> : <i data-lucide="shield-check" className="w-5 h-5"></i>}
            {isLoading ? 'Processing...' : 'Execute Override'}
          </button>
          <div className="text-center mt-4">
            <a href="/" className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors">Return to Dashboard</a>
          </div>
        </form>
      </div>
    </div>
  );
}
