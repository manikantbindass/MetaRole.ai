export default function Footer() {
  return (
    <footer className="border-t border-terminal-border py-8 px-6 bg-terminal-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-terminal-dim text-xs">
            <span className="text-terminal-green">&gt;</span> SESSION_END.
            <span className="text-terminal-green">&gt;</span> CAREER_PATH_OPTIMIZED.
          </div>
          <div className="font-mono text-terminal-dim text-xs">
            BUILT WITH ⚡ BY{' '}
            <a
              href="https://github.com/manikantbindass"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:text-terminal-amber transition-colors"
            >
              MANIKANTBINDASS
            </a>
          </div>
          <div className="font-mono text-terminal-dim text-[0.6rem]">
            AGPL-3.0 © 2026 METAROLE AI
          </div>
        </div>
      </div>
    </footer>
  );
}
