import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import HowItWorks from '@/components/landing/HowItWorks'
import TerminalDemo from '@/components/landing/TerminalDemo'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-terminal-bg overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TerminalDemo />
      <Footer />
    </main>
  )
}
