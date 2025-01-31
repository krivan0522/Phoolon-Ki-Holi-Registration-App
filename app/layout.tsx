import './globals.css'
import Navbar from './components/Navbar'
import { AuthProvider } from '@/providers/AuthContext'
import { RegistrationProvider } from '@/providers/RegistrationContext'
import DonateBtn from './components/DonateBtn'
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
      <body>
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

