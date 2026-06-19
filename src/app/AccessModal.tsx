
"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";

export default function AccessModal() {
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<"question" | "rejected">("question");

  // Only show the pop-up if the user is actually signed into your website
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const isConfirmed = localStorage.getItem("pratheek_agent_confirmed");
      
      // If they haven't answered "Yes" before, show the pop-up
      if (!isConfirmed) {
        setShowModal(true);
      }
    }
  }, [isLoaded, isSignedIn]);

  // If the user is not signed in, or already clicked yes, do not show the popup
  if (!showModal) return null;

  const handleYes = () => {
    // Save their answer in the browser so it doesn't pop up again
    localStorage.setItem("pratheek_agent_confirmed", "true");
    setShowModal(false);
  };

  const handleNo = () => {
    // Show the links to your shop and email
    setView("rejected");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-8 text-center relative overflow-hidden">
        
        {}
        {/* VIEW 1: Asking if they are an agent */}
        {view === "question" && (
          <div>
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 border border-blue-100">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Restricted Access</h2>
            <p className="text-slate-500 mb-8 font-medium">Are you an authorized subagent or an official part of Pratheek Enterprises?</p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleYes} 
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
              >
                Yes, I am a registered agent
              </button>
              <button 
                onClick={handleNo} 
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-[0.98]"
              >
                No, I am not
              </button>
            </div>

            {}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <a 
                href="https://pratheek.shop" 
                className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors underline decoration-slate-200 hover:decoration-blue-300 underline-offset-4"
              >
                Go to public shop (Pratheek.shop)
              </a>
            </div>
          </div>
        )}

        {}
        {/* VIEW 2: They said No (Show choices & Contact links) */}
        {view === "rejected" && (
          <div>
             <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-600 border border-slate-100">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Welcome to Pratheek</h2>
            <p className="text-slate-500 mb-6 font-medium text-sm">
              This portal is strictly for registered internal agents. If you wish to join our network or browse our catalog, please choose an option below:
            </p>

            <div className="space-y-3 mb-8 text-left">
              {/* Option 1: Shop Link */}
              <a 
                href="https://pratheek.shop/contact.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group bg-white shadow-sm"
              >
                 <div>
                   <p className="font-bold text-slate-800 group-hover:text-blue-700">Visit Pratheek.Shop</p>
                   <p className="text-xs text-slate-500">Browse products or join us</p>
                 </div>
                 <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                 </svg>
              </a>
              
              {/* Option 2: Email Link */}
              <a 
                href="mailto:pratheek@myyahoo.com" 
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group bg-white shadow-sm"
              >
                 <div>
                   <p className="font-bold text-slate-800 group-hover:text-blue-700">Email Pratheek</p>
                   <p className="text-xs text-slate-500">pratheek@myyahoo.com</p>
                 </div>
                 <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                 </svg>
              </a>
            </div>

            {}
            {/* Logout Button */}
            <button 
              onClick={() => signOut()} 
              className="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors underline decoration-slate-200 underline-offset-4"
            >
              Sign out and go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
