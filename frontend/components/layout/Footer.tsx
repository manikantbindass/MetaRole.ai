export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-terminal-green-dim bg-terminal-bg">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-terminal-green text-sm font-bold tracking-widest mb-3">[METAROLE_AI]</div>
            <p className="text-terminal-muted text-xs leading-relaxed">
              &gt;_ Your AI Career Co-Pilot.<br />
              Analyze. Predict. Dominate.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-terminal-amber text-xs tracking-widest mb-3 uppercase">// NAVIGATION</div>
            <ul className="space-y-2">
              {['HOME', 'FEATURES', 'DASHBOARD', 'UPLOAD', 'OUTPUT'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-terminal-muted text-xs hover:text-terminal-green transition-colors">
                    &gt;_ {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* System Info */}
          <div>
            <div className="text-terminal-amber text-xs tracking-widest mb-3 uppercase">// SYSTEM_INFO</div>
            <div className="text-terminal-muted text-xs space-y-1 font-mono">
              <div>VERSION: v1.0.0-alpha</div>
              <div>STATUS: <span className="text-terminal-green">[ONLINE]</span></div>
              <div>BUILD: production</div>
              <div>AI_ENGINE: GPT-4o</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-terminal-green-dim flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-terminal-muted text-xs">
            &copy; {year} MetaRole AI. All systems operational.
          </span>
          <span className="text-terminal-muted text-xs">
            Built with <span className="text-terminal-green">&lt;/&gt;</span> by humans + AI
          </span>
        </div>
      </div>
    </footer>
  )
}
