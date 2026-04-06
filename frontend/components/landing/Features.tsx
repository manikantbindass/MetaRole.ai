const features = [
  {
    id: '01',
    icon: '📄',
    title: 'RESUME PARSER',
    desc: 'GPT-4 powered extraction of skills, experience, and projects from PDF/DOCX.',
    cmd: 'parse --input resume.pdf --model gpt-4',
  },
  {
    id: '02',
    icon: '🕸️',
    title: 'SKILL GRAPH',
    desc: 'D3.js force-directed network visualization of your complete skill topology.',
    cmd: 'graph --type force --depth 3',
  },
  {
    id: '03',
    icon: '🔍',
    title: 'GAP ANALYZER',
    desc: 'Semantic comparison between your stack and target role requirements.',
    cmd: 'analyze --target senior-engineer --output gaps.json',
  },
  {
    id: '04',
    icon: '🎯',
    title: 'CAREER PREDICTOR',
    desc: 'ML-powered role suggestions with probability scores and growth timelines.',
    cmd: 'predict --horizon 2yr --confidence high',
  },
  {
    id: '05',
    icon: '✍️',
    title: 'RESUME GENERATOR',
    desc: 'ATS-optimized, tailored resumes generated per job description in seconds.',
    cmd: 'generate resume --job-id JD-4521 --ats true',
  },
  {
    id: '06',
    icon: '🌐',
    title: 'PORTFOLIO GEN',
    desc: 'Auto-generate a stunning portfolio website from your parsed profile data.',
    cmd: 'generate portfolio --theme hacker --deploy vercel',
  },
  {
    id: '07',
    icon: '💼',
    title: 'JOB MATCHER',
    desc: 'Semantic job search and intelligent match scoring across 10,000+ listings.',
    cmd: 'match jobs --min-score 70 --remote true',
  },
  {
    id: '08',
    icon: '📊',
    title: 'CAREER DASHBOARD',
    desc: 'Real-time analytics, progress tracking, and goal setting in one terminal.',
    cmd: 'dashboard --view analytics --refresh 30s',
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 border-t border-terminal-border" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-terminal-green font-mono text-xs mb-2">&gt; LOADING FEATURE_MODULES...</p>
          <h2 className="text-terminal-green font-mono text-2xl">
            CORE SYSTEM CAPABILITIES
          </h2>
          <div className="h-px bg-terminal-green/30 mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.id}
              className="border border-terminal-border p-4 hover:border-terminal-green transition-colors duration-200 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-terminal-dim text-xs font-mono">[{f.id}]</span>
                <span className="text-lg" role="img" aria-label={f.title}>{f.icon}</span>
              </div>
              <h3 className="text-terminal-green font-mono text-xs font-bold mb-2 group-hover:text-terminal-amber transition-colors">
                {f.title}
              </h3>
              <p className="text-terminal-dim text-xs leading-relaxed mb-3">{f.desc}</p>
              <code className="text-terminal-green/50 text-[0.6rem] font-mono block truncate">
                $ {f.cmd}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
