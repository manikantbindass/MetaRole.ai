import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TerminalDemo from '@/components/landing/TerminalDemo';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TerminalDemo />
      <Footer />
    </main>
  );
}
