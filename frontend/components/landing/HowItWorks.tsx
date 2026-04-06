const steps = [
  { step: '01', title: 'UPLOAD', desc: 'Drop your resume (PDF/DOCX) or connect GitHub', icon: '▲' },
  { step: '02', title: 'ANALYZE', desc: 'AI parses, graphs your skills, finds gaps', icon: '◈' },
  { step: '03', title: 'PREDICT', desc: 'ML engine maps optimal career trajectories', icon: '◉' },
  { step: '04', title: 'GENERATE', desc: 'Auto-build resume + portfolio website', icon: '◆' },
  { step: '05', title: 'MATCH', desc: 'Find + rank best-fit jobs by profile score', icon: '★' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 border-t border-terminal-border bg-terminal-surface" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-terminal-green font-mono text-xs mb-2">&gt; EXECUTING WORKFLOW_DIAGRAM.exe</p>
          <h2 className="text-terminal-green font-mono text-2xl">HOW IT WORKS</h2>
          <div className="h-px bg-terminal-green/30 mt-4" />
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-0 right-0 h-px bg-terminal-border hidden md:block" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                <div className="w-10 h-10 border border-terminal-green flex items-center justify-center text-terminal-green font-mono text-sm bg-terminal-bg z-10 mb-4">
                  {s.icon}
                </div>
                <span className="text-terminal-dim font-mono text-xs mb-1">[{s.step}]</span>
                <span className="text-terminal-green font-mono text-xs font-bold mb-2">{s.title}</span>
                <span className="text-terminal-dim text-xs leading-relaxed">{s.desc}</span>
                {i < steps.length - 1 && (
                  <span className="text-terminal-green/50 text-xs mt-2 md:hidden">↓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
