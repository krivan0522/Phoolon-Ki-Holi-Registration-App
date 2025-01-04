import './globals.css'
import Navbar from './components/Navbar'
import { AuthProvider } from '@/providers/AuthContext'
import { RegistrationProvider } from '@/providers/RegistrationContext'


export const metadata = {
  title: 'Phoolon ki Holi',
  description: 'Annual Phoolon ki Holi event in our locality',
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
          </main>
          </RegistrationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

