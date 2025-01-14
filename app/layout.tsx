import ThemeProvider from "@/components/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "ToonMania A Webtoon Viewer",
  description:
    "Toonmania is a webtoon substitute in that it provides free access to webtoon content in good resolution and best performance.",
  openGraph: {
    images: ["/favicon.ico"],
    title: "Toonmania",
  },
  twitter: {
    title: "Toonmania",
    description:
      "Toonmania is a webtoon substitute in that it provides free access to webtoon content in good resolution and best performance.",
    images: ["/favicon.ico"],
    site: "toonmania.vercel.app",
    creator: "@asinmaniac",
  },
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f5f5f5] dark:bg-[#212122]">
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
  );
}
