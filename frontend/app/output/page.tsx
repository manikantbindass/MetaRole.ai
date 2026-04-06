'use client'
import AIOutput from '@/components/output/AIOutput'
import Navbar from '@/components/layout/Navbar'

export default function OutputPage() {
  return (
    <main className="min-h-screen bg-terminal-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <AIOutput />
      </div>
    </main>
  )
}
