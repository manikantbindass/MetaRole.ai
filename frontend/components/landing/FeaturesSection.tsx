'use client';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    id: '01',
    icon: '◈',
    title: 'RESUME PARSER',
    cmd: 'parse-resume --format=ai',
    desc: 'Drop your PDF/DOCX. AI extracts skills, experience, projects, and education into a structured skill graph within seconds.',
  },
  {
    id: '02',
    icon: '◉',
    title: 'SKILL GAP ANALYSIS',
    cmd: 'analyze --target=job-market',
    desc: 'Compare your current skill set against 50,000+ job listings. Get a ranked list of missing skills with learning resources.',
  },
  {
    id: '03',
    icon: '◇',
    title: 'CAREER PREDICTOR',
    cmd: 'predict --model=gpt4 --depth=5',
    desc: 'AI models your career trajectory using your skills + market data. Outputs role predictions with confidence percentages.',
  },
  {
    id: '04',
    icon: '▣',
    title: 'AI RESUME GENERATOR',
    cmd: 'generate-resume --tailored=true',
    desc: 'Auto-generate ATS-optimized resumes tailored to specific job descriptions. Exports to PDF/DOCX instantly.',
  },
  {
    id: '05',
    icon: '◆',
    title: 'PORTFOLIO BUILDER',
    cmd: 'build-portfolio --theme=terminal',
    desc: 'Generates a full portfolio website from your GitHub + resume data. Deploy to Vercel with one command.',
  },
  {
    id: '06',
    icon: '◎',
    title: 'JOB MATCHER',
    cmd: 'match-jobs --ai=smart --limit=50',
    desc: 'Semantic job matching beyond keywords. AI understands your experience and finds roles where you have highest success probability.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="features-section">
      <div className="section-header">
        <div className="section-label">
          <span className="prompt">//</span> CAPABILITIES
        </div>
        <h2 className="section-title">
          CORE SYSTEMS
          <span className="title-line" />
        </h2>
        <p className="section-sub">
          Six AI modules working in unison to map your career path.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.id}
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ borderColor: '#33ff00', boxShadow: '0 0 20px rgba(51,255,0,0.12)' }}
          >
            <div className="card-id">{f.id}</div>
            <div className="card-icon">{f.icon}</div>
            <h3 className="card-title">{f.title}</h3>
            <div className="card-cmd">
              <span className="prompt">$</span> {f.cmd}
            </div>
            <p className="card-desc">{f.desc}</p>
            <div className="card-footer">
              <span className="status-dot" />
              <span className="status-text">MODULE ACTIVE</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
