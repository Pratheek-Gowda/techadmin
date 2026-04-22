import { ClerkProvider } from '@clerk/nextjs';
// Import your existing premium business CSS
import './globals.css'; // Rename your public/style.css to app/globals.css

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
    // Wrap the entire app in ClerkProvider
    // We pass custom appearance variables to seamlessly match your existing branding
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#2563eb', // Tailwind blue-600
          colorBackground: '#ffffff',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          borderRadius: '0.75rem' // Matches your rounded-xl aesthetic
        }
      }}
    >
      <html lang="en">
        <head>
          {/* Injecting your existing fonts and CDN dependencies */}
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
        {/* Your existing body classes for the animated background */}
        <body className="text-gray-800 font-sans min-h-screen animated-bg overflow-x-hidden">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
