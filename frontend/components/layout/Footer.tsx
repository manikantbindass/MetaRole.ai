export default function Footer() {
  return (
    <footer className="border-t border-terminal-green/20 font-mono text-xs text-terminal-green/40 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-terminal-green/20">╔══╗</span>
          <span>
            <span className="text-terminal-green">MetaRole</span>
            <span className="text-terminal-amber">.AI</span>
            <span className="ml-2">— v1.0.0-beta</span>
          </span>
          <span className="text-terminal-green/20">╚══╝</span>
        </div>
        <div className="flex gap-6">
          {['GitHub', 'Docs', 'Privacy', 'Terms'].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-terminal-green transition-colors uppercase tracking-wider"
            >
              {link}
            </a>
          ))}
        </div>
        <div>
          <span className="text-terminal-green/20">© 2025 MetaRole.AI</span>
          <span className="text-terminal-amber animate-pulse ml-1">█</span>
        </div>
      </div>
    </footer>
  )
}
