import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MetaRole AI — Your AI Career Co-Pilot',
  description:
    'AI-powered platform that analyzes your skills, predicts career paths, identifies skill gaps, and generates tailored resumes & portfolios.',
  keywords: ['AI', 'career', 'resume', 'skill gap', 'job matching', 'portfolio'],
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
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono bg-terminal-bg text-terminal-green antialiased">
        {/* CRT scanline overlay */}
        <div className="scanline-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
