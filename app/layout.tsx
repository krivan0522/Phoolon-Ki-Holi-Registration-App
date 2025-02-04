import './globals.css'
import Navbar from './components/Navbar'
import { AuthProvider } from '@/providers/AuthContext'
import { RegistrationProvider } from '@/providers/RegistrationContext'
import DonateBtn from './components/DonateBtn'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'
// import { GoogleTagManager } from '@next/third-parties/google'

export const metadata = {
  title: 'Phoolon ki Holi',
  description: 'Annual Phoolon ki Holi event in our locality',
  icons: {
    icon: '/public/favicon.ico',
    appleIcon: '/public/apple-touch-icon.png',
    shortcut: '/public/favicon-16x16.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (  
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-35W0R3EJ4Z"></Script>
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-35W0R3EJ4Z');
          `}
        </Script>
      </head>
      <body>
        <Toaster position="bottom-right" reverseOrder={false}/>
        <AuthProvider>
          <RegistrationProvider>
          <Navbar />
          <main className="container mx-auto">
              {children}
              <DonateBtn />
          </main>
          </RegistrationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

