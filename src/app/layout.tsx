import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
// Import Next.js Script component
import Script from 'next/script'; 
// Import your existing premium business CSS
import './globals.css'; 

// Importing the Gatekeeper pop-up component
import AccessModal from './AccessModal';

export const metadata: Metadata = {
  title: 'Pratheek Enterprises | Secure Subagent Portal',
  description: 'Your one-stop hub for Premium Telecom & Digital Solutions.',
  openGraph: {
    title: 'Pratheek Enterprises | Secure Subagent Portal',
    description: 'Your one-stop hub for Premium Telecom & Digital Solutions.',
    url: 'https://pratheek.app/',
    siteName: 'Pratheek Enterprises',
    images: [
      {
        url: 'https://images.pexels.com/photos/35457079/pexels-photo-35457079.jpeg', // Replace with your logo/banner
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratheek Enterprises | Secure Subagent Portal',
    description: 'Your one-stop hub for Premium Telecom & Digital Solutions.',
    images: ['https://images.pexels.com/photos/35457079/pexels-photo-35457079.jpeg'], // Replace with your logo/banner
  },
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
        {/* Light theme base colors */}
        <body className="bg-slate-50 text-gray-900 font-sans min-h-screen overflow-x-hidden">
          
          {/* Gatekeeper pop-up */}
          <AccessModal />
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
