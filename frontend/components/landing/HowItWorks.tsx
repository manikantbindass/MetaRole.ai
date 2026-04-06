const STEPS = [
  { step: '01', cmd: 'upload_resume', label: 'Upload Resume / GitHub URL', desc: 'Paste your GitHub URL or drop your resume. AI parses everything in seconds.' },
  { step: '02', cmd: 'analyze_skills', label: 'AI Skill Analysis', desc: 'NLP extracts all skills, maps them into a knowledge graph with strength scores.' },
  { step: '03', cmd: 'identify_gaps', label: 'Gap Identification', desc: 'Compares your profile against target roles. Lists missing skills with priority levels.' },
  { step: '04', cmd: 'predict_path', label: 'Career Path Prediction', desc: 'ML model predicts top 5 career paths with salary ranges and time-to-achieve estimates.' },
  { step: '05', cmd: 'generate_assets', label: 'Generate Portfolio + Resume', desc: 'One-click generation of tailored resume and live portfolio website.' },
  { step: '06', cmd: 'apply_jobs', label: 'Smart Job Matching', desc: 'Vector search finds best-fit jobs. Auto-apply with customized cover letters.' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-4 border-t border-terminal-green-dim grid-bg">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="text-terminal-amber text-xs tracking-[0.4em] uppercase mb-3">// EXECUTION_FLOW</div>
          <h2 className="text-terminal-green text-2xl md:text-3xl font-bold tracking-widest">
            HOW_IT_WORKS.sh
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-terminal-green-dim" aria-hidden="true" />

          <div className="space-y-0">
            {STEPS.map((s, i) => (
              <div key={s.step} className="relative flex gap-6 group">
                {/* Step number */}
                <div className="flex-shrink-0 w-11 h-11 border border-terminal-green flex items-center justify-center bg-terminal-bg z-10 group-hover:bg-terminal-green transition-colors">
                  <span className="text-terminal-green text-xs font-bold group-hover:text-terminal-bg transition-colors">
                    {s.step}
                  </span>
                </div>

                {/* Content */}
                <div className="pb-10 flex-1">
                  <div className="text-terminal-amber text-xs tracking-widest mb-1 uppercase">
                    $ {s.cmd}
                  </div>
                  <div className="text-terminal-green text-sm font-bold mb-1">{s.label}</div>
                  <div className="text-terminal-muted text-xs leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
