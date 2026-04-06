import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MetaRole AI — Your AI Career Co-Pilot',
  description:
    'AI-powered career platform that analyzes skills, predicts paths, generates resumes & portfolios, and matches jobs intelligently.',
  keywords: ['AI', 'career', 'resume', 'skill gap', 'portfolio', 'job matching'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono bg-terminal-bg text-terminal-green antialiased">
        {children}
      </body>
    </html>
  );
}
