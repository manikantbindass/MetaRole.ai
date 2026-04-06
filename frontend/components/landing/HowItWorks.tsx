const STEPS = [
  {
    step: '01',
    cmd: 'UPLOAD',
    title: 'Upload Resume / GitHub',
    desc: 'Drop your PDF resume or connect your GitHub. AI parses everything in seconds.',
  },
  {
    step: '02',
    cmd: 'ANALYZE',
    title: 'AI Analysis',
    desc: 'Skill graph generation, gap analysis, and career trajectory mapping run automatically.',
  },
  {
    step: '03',
    cmd: 'PREDICT',
    title: 'Career Prediction',
    desc: 'Get ranked career paths with probability scores, timelines, and required milestones.',
  },
  {
    step: '04',
    cmd: 'GENERATE',
    title: 'Auto-Build Portfolio',
    desc: 'AI generates your portfolio site and tailored resumes for each job application.',
  },
  {
    step: '05',
    cmd: 'MATCH',
    title: 'Job Matching',
    desc: 'Semantic vector search finds the best-fit jobs. Apply intelligently with one click.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono mb-12">
          <div className="text-terminal-green/40 text-xs mb-2">// EXECUTION PIPELINE</div>
          <h2 className="text-terminal-green text-2xl sm:text-3xl font-bold tracking-wider">
            HOW_IT_WORKS<span className="text-terminal-amber">()</span>
          </h2>
          <div className="h-px bg-gradient-to-r from-terminal-green/50 to-transparent mt-4 max-w-xs" />
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[28px] top-10 bottom-10 w-px bg-terminal-green/20 hidden md:block" />

          <div className="space-y-0">
            {STEPS.map((s, i) => (
              <div
                key={s.step}
                className="flex gap-6 items-start group relative pl-0 md:pl-16"
              >
                {/* Step number bubble */}
                <div className="hidden md:flex absolute left-0 w-14 h-14 border border-terminal-green/40 items-center justify-center font-mono text-xs bg-terminal-bg group-hover:border-terminal-green group-hover:bg-terminal-green/10 transition-all">
                  <span className="text-terminal-amber">{s.step}</span>
                </div>

                {/* Content */}
                <div className="flex-1 border border-terminal-green/10 p-5 mb-[-1px] group-hover:border-terminal-green/40 transition-colors font-mono">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-terminal-green/40 text-xs md:hidden">[{s.step}]</span>
                    <span className="text-terminal-amber text-xs tracking-widest">CMD::{s.cmd}</span>
                  </div>
                  <h3 className="text-terminal-green text-sm font-bold mb-1 tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-terminal-green/50 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
