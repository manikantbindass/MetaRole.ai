import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MetaRole AI — Your AI Career Co-Pilot',
  description:
    'MetaRole AI analyzes your skills, predicts career paths, identifies skill gaps, and generates resumes + portfolios. The terminal-style AI career co-pilot.',
  keywords: ['AI career', 'resume parser', 'skill gap analysis', 'career prediction', 'portfolio generator'],
  openGraph: {
    title: 'MetaRole AI — Your AI Career Co-Pilot',
    description: 'AI-powered career platform with terminal aesthetics.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="bg-terminal-bg text-terminal-green font-mono antialiased">
        {/* CRT scanline overlay */}
        <div className="crt-overlay pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
