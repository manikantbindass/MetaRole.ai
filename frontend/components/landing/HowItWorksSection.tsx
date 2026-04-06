'use client';
import { motion } from 'framer-motion';

const STEPS = [
  {
    step: '01',
    title: 'UPLOAD RESUME',
    cmd: '> upload --file=resume.pdf',
    detail: 'Drag and drop your PDF or DOCX resume. Our parser extracts structured data in < 3 seconds using GPT-4 vision + regex pipelines.',
    output: 'OUTPUT: skills[], experience[], projects[], education[]',
  },
  {
    step: '02',
    title: 'AI ANALYSIS',
    cmd: '> analyze --skill-graph --gap-report',
    detail: 'The skill graph engine maps relationships between your abilities. Gap analysis cross-references 50K+ job listings from LinkedIn, Indeed, and Glassdoor.',
    output: 'OUTPUT: skill_graph.json, gaps[], recommendations[]',
  },
  {
    step: '03',
    title: 'CAREER PREDICTION',
    cmd: '> predict --career-paths --confidence',
    detail: 'Our ML model (fine-tuned GPT-4) predicts your most likely career trajectories with probability scores. Shows 5-year roadmap.',
    output: 'OUTPUT: paths[{role, probability, timeline}]',
  },
  {
    step: '04',
    title: 'GENERATE + APPLY',
    cmd: '> generate --resume --portfolio && match-jobs',
    detail: 'Auto-generates ATS-optimized resumes per job, builds your portfolio site, and matches you with relevant openings for intelligent application.',
    output: 'OUTPUT: resume.pdf, portfolio.vercel.app, jobs[matched]',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-section">
      <div className="section-header">
        <div className="section-label">
          <span className="prompt">//</span> PROTOCOL
        </div>
        <h2 className="section-title">
          EXECUTION PIPELINE
          <span className="title-line" />
        </h2>
      </div>

      <div className="pipeline-grid">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            className="pipeline-step"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <div className="step-number">{s.step}</div>
            <div className="step-content">
              <h3 className="step-title">{s.title}</h3>
              <div className="step-cmd">
                <span className="prompt neon-green">{s.cmd}</span>
              </div>
              <p className="step-detail">{s.detail}</p>
              <div className="step-output">
                <span className="output-label">// {s.output}</span>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="step-connector" aria-hidden="true">
                <span>│</span>
                <span>▼</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
