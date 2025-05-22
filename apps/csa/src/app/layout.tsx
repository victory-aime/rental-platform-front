import { ThemeProvider } from '_components/ui/provider'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import 'react-day-picker/dist/style.css'

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Rental Platform',
  description: 'Simple dashboard for your app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${lato.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
