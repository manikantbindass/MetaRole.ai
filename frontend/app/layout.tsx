import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MetaRole AI — Your AI Career Co-Pilot',
  description:
    'AI-powered career platform that analyzes your skills, predicts career paths, fills skill gaps, and generates your portfolio and resume automatically.',
  keywords: ['AI', 'career', 'resume', 'skill analysis', 'job matching', 'portfolio generator'],
  openGraph: {
    title: 'MetaRole AI',
    description: 'Your AI Career Co-Pilot',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
