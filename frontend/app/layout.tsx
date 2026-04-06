import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MetaRole AI — Your AI Career Co-Pilot',
  description: 'Analyze your skills, predict career paths, identify skill gaps, and generate your portfolio — automatically.',
  keywords: ['AI', 'career', 'resume', 'skill gap', 'job matching', 'portfolio'],
  openGraph: {
    title: 'MetaRole AI — Your AI Career Co-Pilot',
    description: 'AI-powered career intelligence platform',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono bg-terminal-bg text-terminal-green antialiased">
        {/* CRT scanline overlay */}
        <div className="crt-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
