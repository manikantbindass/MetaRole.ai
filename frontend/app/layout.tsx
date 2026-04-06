import type { Metadata } from 'next';
import './globals.css';
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'MetaRole AI — Your AI Career Co-Pilot',
  description: 'AI-powered career platform that analyzes skills, predicts career paths, identifies skill gaps, and generates portfolios + resumes.',
  keywords: ['AI career', 'resume builder', 'skill analysis', 'job matching', 'career prediction'],
  openGraph: {
    title: 'MetaRole AI',
    description: 'Your AI Career Co-Pilot',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-terminal-bg text-terminal-green font-mono antialiased">
        {/* CRT scanline overlay */}
        <div className="crt-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
