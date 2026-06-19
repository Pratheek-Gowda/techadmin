import { ClerkProvider } from '@clerk/nextjs';
// Import Next.js Script component
import Script from 'next/script'; 
// Import your existing premium business CSS
import './globals.css'; 

// Importing the Gatekeeper pop-up component
import AccessModal from './AccessModal';

export const metadata = {
  title: 'Pratheek Enterprises - Subagent Portal',
  description: 'Secure Subagent Portal for Pratheek Enterprises',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#2563eb',
          colorBackground: '#ffffff',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          borderRadius: '0.75rem'
        }
      }}
    >
      <html lang="en">
        <head>
          {/* Ownership Verification Meta Tag */}
          <meta name="google-adsense-account" content="ca-pub-3137365646817161" />

          {/* AdSense Script for Auto Ads */}
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3137365464811711"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />

          {/* Existing fonts and dependencies */}
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://unpkg.com/lucide@latest"></script>
          
          <script dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                    }
                  }
                }
              }
            `
          }} />
        </head>
        <body className="text-gray-800 font-sans min-h-screen animated-bg overflow-x-hidden">
          
          {/* Gatekeeper pop-up */}
          <AccessModal />
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
