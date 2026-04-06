import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'MetaRole AI — Your AI Career Co-Pilot',
  description:
    'Analyze your skills, predict career paths, identify skill gaps, and generate your portfolio + resume with AI.',
  keywords: ['AI career', 'resume builder', 'skill gap analysis', 'job matching', 'career prediction'],
  authors: [{ name: 'MetaRole AI' }],
  openGraph: {
    title: 'MetaRole AI — Your AI Career Co-Pilot',
    description: 'AI-powered career platform that analyzes skills and builds your future.',
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
        <div className="crt-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
