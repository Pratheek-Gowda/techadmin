import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';
import './globals.css';
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
        url: 'https://images.pexels.com/photos/35457079/pexels-photo-35457079.jpeg',
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
    images: ['https://images.pexels.com/photos/35457079/pexels-photo-35457079.jpeg'],
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
          colorPrimary: '#3b82f6',
          colorBackground: '#ffffff',
          colorText: '#0f172a',
          colorTextSecondary: '#475569',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          borderRadius: '0.875rem',
        },
        elements: {
          card: 'shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-slate-200/80 rounded-2xl',
          headerTitle: 'text-slate-900 font-extrabold tracking-tight',
          headerSubtitle: 'text-slate-500',
          socialButtonsBlockButton:
            'bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all rounded-xl text-slate-700 font-semibold py-2.5 shadow-sm active:scale-[0.98]',
          socialButtonsBlockButtonText: 'font-semibold text-sm',
          dividerLine: 'bg-slate-200',
          dividerText: 'text-slate-400 font-semibold text-xs tracking-widest',
          formFieldLabel: 'text-sm font-semibold text-slate-700 mb-1.5',
          formFieldInput:
            'w-full bg-slate-50 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400',
          otpCodeFieldInput:
            'bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-xl text-center text-lg font-bold shadow-sm transition-all text-slate-900',
          formButtonPrimary:
            'w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all mt-4 active:scale-[0.98]',
          footerActionText: 'text-slate-500 font-medium',
          footerActionLink: 'text-blue-600 hover:text-blue-800 font-bold transition-colors',
          identityPreview: 'bg-slate-50 border border-slate-200 rounded-xl mb-4',
          identityPreviewText: 'text-slate-800 font-bold',
          identityPreviewEditButtonIcon: 'text-blue-600 hover:text-blue-700',
          formResendCodeLink: 'text-blue-600 hover:text-blue-800 font-bold',
        },
      }}
    >
      <html lang="en" className="scroll-smooth">
        <head>
          <meta name="google-adsense-account" content="ca-pub-3137365646817161" />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3137365464811711"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://unpkg.com/lucide@latest"></script>
          <script
            dangerouslySetInnerHTML={{
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
              `,
            }}
          />
        </head>
        <body className="bg-slate-950 text-slate-100 font-sans min-h-screen overflow-x-hidden antialiased selection:bg-blue-500 selection:text-white">
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.10),transparent_30%)]" />
          <AccessModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
