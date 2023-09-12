import ThemeProvider from '@/components/providers/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToonMania A Webtoon Viewer',
  description: 'Toonmania is a webtoon substitute in that it provides free access to webtoon content in good resolution and best performance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // forcedTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
