'use client';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import DemoTerminal from '@/components/landing/DemoTerminal';
import CTASection from '@/components/landing/CTASection';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoTerminal />
      <CTASection />
      <Footer />
    </main>
  );
}
