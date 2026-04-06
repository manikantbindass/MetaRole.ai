import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MetaRole AI — Your AI Career Co-Pilot',
  description: 'AI-powered platform that analyzes skills, predicts career paths, identifies skill gaps, generates portfolio + resume, and matches jobs.',
  keywords: ['AI', 'career', 'resume', 'skill gap', 'job matching', 'portfolio generator'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0a0a0a] text-[#33ff00] font-mono antialiased">{children}</body>
    </html>
  );
}
