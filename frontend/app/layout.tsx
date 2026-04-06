import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MetaRole AI — Your AI Career Co-Pilot',
  description: 'AI-powered career co-pilot that analyzes your skills, predicts career paths, identifies gaps, and generates tailored resumes & portfolios.',
  keywords: ['AI career', 'resume parser', 'skill gap analysis', 'career prediction', 'portfolio generator'],
  authors: [{ name: 'MetaRole AI' }],
  openGraph: {
    title: 'MetaRole AI — Your AI Career Co-Pilot',
    description: 'The system knows your potential before you do.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="font-mono bg-terminal-bg text-terminal-text antialiased">
        <div className="grid-overlay min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
