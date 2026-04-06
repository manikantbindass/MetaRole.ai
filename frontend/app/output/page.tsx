'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TerminalWindow from '@/components/terminal/TerminalWindow';

type OutputTab = 'resume' | 'portfolio' | 'report';

const SAMPLE_RESUME = `JOHN DOE
john.doe@email.com | github.com/johndoe | linkedin.com/in/johndoe

SKILLS
──────────────────────────────────────────────────────────────────────────────
JavaScript, TypeScript, React, Next.js, Node.js, Python, Solidity
PostgreSQL, MongoDB, Docker, Git, REST APIs, GraphQL

EXPERIENCE
──────────────────────────────────────────────────────────────────────────────
Full-Stack Developer @ TechCorp                     Jan 2023 - Present
  - Architected microservices backend handling 50K req/day
  - Reduced page load by 40% with Next.js SSR optimization
  - Built blockchain supply chain system with Solidity + Hardhat

Junior Developer @ StartupXYZ                       Jun 2022 - Dec 2022
  - Developed REST APIs with Node.js + Express serving 10K users
  - Integrated Stripe payments and reduced checkout abandonment 22%

PROJECTS
──────────────────────────────────────────────────────────────────────────────
SecureRxChain | Solidity, Hardhat, React, Node.js
  - Blockchain-based pharmaceutical supply chain tracking system
  - Smart contracts for immutable drug verification on Ethereum

MetaRole AI | Next.js, Python, OpenAI, PostgreSQL
  - AI-powered career co-pilot with skill graph + job matching
  - Deployed on Vercel + Railway with CI/CD pipeline`;

export default function OutputPage() {
  const [activeTab, setActiveTab] = useState<OutputTab>('resume');
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(SAMPLE_RESUME);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="output-page">
        <div className="page-header">
          <span className="prompt">&gt;</span> AI OUTPUTS
        </div>

        <div className="output-tabs" role="tablist">
          {(['resume', 'portfolio', 'report'] as OutputTab[]).map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`dash-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div role="tabpanel">
          {activeTab === 'resume' && (
            <TerminalWindow title="generated-resume.txt">
              <div className="output-toolbar">
                <span className="terminal-line">
                  <span className="prompt">$</span> cat resume_tailored_swe.txt
                </span>
                <div className="output-actions">
                  <button className="output-btn" onClick={copyText}>
                    {copied ? '[ COPIED ✓ ]' : '[ COPY ]'}
                  </button>
                  <button className="output-btn">[ DOWNLOAD PDF ]</button>
                </div>
              </div>
              <pre className="output-content">{SAMPLE_RESUME}</pre>
            </TerminalWindow>
          )}

          {activeTab === 'portfolio' && (
            <TerminalWindow title="portfolio-builder">
              <div className="terminal-line">
                <span className="prompt">$</span> metarole build-portfolio --deploy=vercel
              </div>
              <div className="portfolio-preview">
                <div className="portfolio-info">
                  <div className="terminal-line success">✓ Portfolio generated from GitHub + resume data</div>
                  <div className="terminal-line success">✓ Tech stack: Next.js + Tailwind CSS</div>
                  <div className="terminal-line success">✓ Deployed to: johndoe.vercel.app</div>
                  <div className="terminal-line muted">Theme: Terminal Hacker (matching your brand)</div>
                </div>
                <div className="portfolio-actions">
                  <button className="btn-initiate">[ PREVIEW PORTFOLIO ]</button>
                  <button className="btn-secondary-cta">[ REDEPLOY ]</button>
                </div>
              </div>
            </TerminalWindow>
          )}

          {activeTab === 'report' && (
            <TerminalWindow title="career-report.json">
              <div className="terminal-line">
                <span className="prompt">$</span> metarole report --full --format=json
              </div>
              <pre className="output-content json-output">{JSON.stringify({
                user: 'john_doe',
                analyzed_at: new Date().toISOString(),
                skills_found: 23,
                skill_gaps: 7,
                top_career_path: {
                  role: 'Senior Full-Stack Engineer',
                  probability: 0.924,
                  timeline: '12-18 months'
                },
                job_matches: 47,
                resume_score: 87.4,
                recommendations: [
                  'Learn TypeScript (highest ROI)',
                  'Study System Design patterns',
                  'Get AWS Cloud Practitioner cert'
                ]
              }, null, 2)}</pre>
            </TerminalWindow>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
