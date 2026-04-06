import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import TerminalDemo from '@/components/landing/TerminalDemo';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <TerminalDemo />
      <Footer />
    </main>
  );
}
