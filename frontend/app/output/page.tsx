'use client';

import { useState } from 'react';
import Link from 'next/link';

const RESUME_SECTIONS = [
  {
    title: 'PROFESSIONAL_SUMMARY',
    content: `Results-driven Full-Stack Engineer and Blockchain Developer with expertise in React/Next.js, Node.js, and Solidity smart contracts. Proven track record in building production-grade dApps and scalable web applications. Passionate about Web3, AI integration, and developer tooling.`,
  },
  {
    title: 'TECHNICAL_SKILLS',
    content: `Languages: JavaScript, TypeScript, Python, Solidity\nFrontend: React, Next.js 14, Tailwind CSS, Framer Motion\nBackend: Node.js, Express.js, FastAPI, REST/GraphQL\nBlockchain: Ethereum, Hardhat, ethers.js, OpenZeppelin\nDatabases: PostgreSQL, MongoDB, Redis, Pinecone\nDevOps: Docker, GitHub Actions, Vercel, Railway`,
  },
  {
    title: 'KEY_PROJECTS',
    content: `SecureRxChain — Blockchain drug supply chain (Solidity + React)\nMetaRole AI — AI career co-pilot platform (Next.js + GPT-4)\nPortfolio OS — Terminal-style developer portfolio`,
  },
];

export default function OutputPage() {
  const [activeOutput, setActiveOutput] = useState<'resume' | 'portfolio'>('resume');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2500));
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono">
      <div className="pointer-events-none fixed inset-0 z-50" style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)' }} />

      <nav className="border-b border-[#33ff00]/20 px-6 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="text-sm tracking-widest hover:text-[#ffb000] transition-colors">← DASHBOARD</Link>
        <span className="text-[#33ff00]/40 text-xs tracking-widest">OUTPUT_MODULE</span>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-2">// AI.GENERATOR</div>
          <h1 className="text-2xl font-bold tracking-widest">AI_OUTPUT_GENERATOR</h1>
          <div className="w-16 h-px bg-[#33ff00]/40 mt-2" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#33ff00]/20 mb-8">
          {(['resume', 'portfolio'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveOutput(tab)}
              className={`px-6 py-3 text-xs tracking-widest uppercase transition-all border-b-2 ${
                activeOutput === tab
                  ? 'border-[#33ff00] text-[#33ff00]'
                  : 'border-transparent text-[#33ff00]/40 hover:text-[#33ff00]/70'
              }`}
            >
              [{tab.toUpperCase()}_GENERATOR]
            </button>
          ))}
        </div>

        {activeOutput === 'resume' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Config panel */}
              <div className="space-y-4">
                <div className="text-xs text-[#33ff00]/40 tracking-widest">// CONFIG.PARAMETERS</div>
                <div className="border border-[#33ff00]/20 p-4 space-y-4">
                  <div>
                    <label className="text-xs text-[#33ff00]/60 block mb-2 tracking-widest">TARGET_ROLE:</label>
                    <div className="flex items-center border border-[#33ff00]/30 bg-[#0d0d0d]">
                      <span className="px-3 text-[#33ff00]/40 text-sm">{'>'}</span>
                      <input defaultValue="Senior Full-Stack Engineer" className="flex-1 bg-transparent py-2 pr-3 text-sm text-[#33ff00] outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#33ff00]/60 block mb-2 tracking-widest">TONE:</label>
                    <select className="w-full bg-[#0d0d0d] border border-[#33ff00]/30 py-2 px-3 text-sm text-[#33ff00] outline-none">
                      <option>Technical + Professional</option>
                      <option>Startup-Focused</option>
                      <option>Executive-Level</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#33ff00]/60 block mb-2 tracking-widest">INCLUDE:</label>
                    {['GitHub projects', 'Blockchain expertise', 'AI/ML skills', 'Open source contributions'].map((opt, i) => (
                      <label key={i} className="flex items-center gap-3 py-1 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-[#33ff00]" />
                        <span className="text-xs text-[#33ff00]/60">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full border border-[#33ff00] bg-[#33ff00]/10 py-3 text-sm tracking-widest hover:bg-[#33ff00]/20 transition-all disabled:opacity-50"
                >
                  {generating ? '[ GENERATING_WITH_GPT4... ]' : '[ GENERATE_RESUME ]'}
                </button>

                {generating && (
                  <div className="border border-[#33ff00]/20 p-3 text-xs space-y-1">
                    <div className="text-[#33ff00]/60">{'>'} Analyzing job requirements...</div>
                    <div className="text-[#33ff00]/60">{'>'} Tailoring experience bullets...</div>
                    <div className="text-[#33ff00]/60">{'>'} Optimizing ATS keywords...</div>
                    <div className="text-[#33ff00] flex items-center gap-1">{'>'} Generating final document<span className="animate-pulse">...</span></div>
                  </div>
                )}
              </div>

              {/* Preview */}
              <div>
                <div className="text-xs text-[#33ff00]/40 mb-3 tracking-widest">// RESUME.PREVIEW</div>
                {generated ? (
                  <div className="border border-[#33ff00]/20 bg-[#0d0d0d] p-6 text-xs space-y-4">
                    {RESUME_SECTIONS.map((section, i) => (
                      <div key={i}>
                        <div className="text-[#ffb000] font-bold tracking-widest mb-2">&gt; {section.title}</div>
                        <pre className="text-[#33ff00]/70 whitespace-pre-wrap leading-relaxed">{section.content}</pre>
                        {i < RESUME_SECTIONS.length - 1 && <div className="border-b border-[#33ff00]/10 mt-4" />}
                      </div>
                    ))}
                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 border border-[#33ff00]/30 py-2 text-xs tracking-widest hover:border-[#33ff00] transition-all">[ DOWNLOAD_PDF ]</button>
                      <button className="flex-1 border border-[#33ff00]/30 py-2 text-xs tracking-widest hover:border-[#33ff00] transition-all">[ COPY_TEXT ]</button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-[#33ff00]/10 bg-[#0d0d0d] p-6 text-center">
                    <div className="text-[#33ff00]/20 text-4xl mb-3">◫</div>
                    <p className="text-[#33ff00]/30 text-xs">Configure and generate to see your AI-tailored resume</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeOutput === 'portfolio' && (
          <div className="border border-[#33ff00]/20 p-8 text-center">
            <div className="text-[#ffb000] text-4xl mb-4">◬</div>
            <h2 className="text-lg font-bold tracking-widest mb-3">PORTFOLIO_GENERATOR</h2>
            <p className="text-[#33ff00]/50 text-sm mb-6 max-w-md mx-auto">
              AI will generate a stunning terminal-style portfolio website based on your skills and projects.
            </p>
            <button
              onClick={handleGenerate}
              className="border border-[#33ff00] bg-[#33ff00]/10 px-8 py-3 text-sm tracking-widest hover:bg-[#33ff00]/20 transition-all"
            >
              {generating ? '[ GENERATING... ]' : '[ GENERATE_PORTFOLIO ]'}
            </button>
            {generated && (
              <div className="mt-6 border border-[#33ff00]/20 p-4 text-xs">
                <p className="text-[#33ff00] mb-2">✓ Portfolio generated successfully!</p>
                <p className="text-[#33ff00]/40">Deployed to: <span className="text-[#ffb000]">metarole-portfolio.vercel.app</span></p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
