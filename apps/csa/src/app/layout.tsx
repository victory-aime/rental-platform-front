import { ThemeProvider } from '_components/ui/provider'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { I18nProvider } from '_context/provider/i18n-provider'
import 'react-day-picker/dist/style.css'
import '_components/custom/agenda/index.css'
import { ThemeColorProvider } from '_context/themeColor-context'

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
        {/*<ThemeColorProvider>*/}
        {/*</ThemeColorProvider>*/}
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
