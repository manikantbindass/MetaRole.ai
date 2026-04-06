export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-bracket">[</span>
          <span className="logo-text">META</span>
          <span className="logo-accent">ROLE</span>
          <span className="logo-sub">.AI</span>
          <span className="logo-bracket">]</span>
          <p className="footer-tagline">Your AI Career Co-Pilot</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <span className="footer-col-title">// SYSTEM</span>
            <a href="/upload">Upload Resume</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/analyze">Skill Analysis</a>
            <a href="/output">AI Outputs</a>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">// DOCS</span>
            <a href="/docs/api" target="_blank" rel="noopener noreferrer">API Reference</a>
            <a href="/docs/setup" target="_blank" rel="noopener noreferrer">Setup Guide</a>
            <a href="https://github.com/manikantbindass/MetaRole.ai" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          © 2025 MetaRole.AI — Built with <span className="neon-green">♥</span> using Next.js + GPT-4
        </span>
        <span className="footer-status">
          <span className="status-dot" /> SYSTEMS OPERATIONAL
        </span>
      </div>
    </footer>
  );
}
