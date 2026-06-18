import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Decorative Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
            <div className="bg-white/60 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-white">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pratheek Enterprises</h1>
            <p className="text-gray-500 font-medium mt-2">Secure Subagent Portal</p>
        </div>

        <SignIn
          appearance={{
            elements: {
              // Target the main card and inject your glassmorphism CSS classes
              card: "glass-card bg-white/60 backdrop-blur-2xl border border-white/80 shadow-2xl rounded-3xl p-8 w-full",
              
              // Hide Clerk's default header since we built a custom one above
              header: "hidden", 
              
              // Style the Social Providers (Google, Microsoft, GitHub)
              socialButtonsBlockButton: "bg-white/80 border border-gray-200 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all rounded-xl text-gray-700 font-semibold py-3",
              socialButtonsBlockButtonText: "font-bold text-sm",
              
              // Style the Divider
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-400 font-medium text-xs uppercase tracking-wider",
              
              // Form Inputs
              formFieldLabel: "text-sm font-bold text-gray-700 mb-1.5",
              formFieldInput: "w-full bg-white/90 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-900",
              
              // Primary Button
              formButtonPrimary: "w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all mt-2",
              
              // Footer links (Sign up, forgot password)
              footerActionText: "text-gray-500 font-medium",
              footerActionLink: "text-blue-600 hover:text-blue-700 font-bold",
              
              // Verification elements
              identityPreview: "bg-white/80 border border-gray-200 rounded-xl mb-4",
              identityPreviewText: "text-gray-800 font-bold",
              identityPreviewEditButtonIcon: "text-blue-600 hover:text-blue-700",
              formResendCodeLink: "text-blue-600 hover:text-blue-700 font-bold",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "blockButton",
            }
          }}
        />
      </div>
    </div>
  );
}
