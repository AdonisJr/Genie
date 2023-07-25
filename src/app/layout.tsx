import './globals.css'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from './providers/sessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Genie',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  )
}
