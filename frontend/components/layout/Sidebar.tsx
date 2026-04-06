import BlinkingCursor from '@/components/terminal/BlinkingCursor';

type Pane = 'skills' | 'career' | 'jobs' | 'progress';

const navItems: { id: Pane; label: string; icon: string; cmd: string }[] = [
  { id: 'skills', label: 'SKILL GRAPH', icon: '🕸', cmd: 'graph' },
  { id: 'career', label: 'CAREER PRED', icon: '🎯', cmd: 'predict' },
  { id: 'jobs', label: 'JOB MATCHES', icon: '💼', cmd: 'match' },
  { id: 'progress', label: 'PROGRESS', icon: '📊', cmd: 'track' },
];

interface SidebarProps {
  activePane: Pane;
  setActivePane: (pane: Pane) => void;
}

export default function Sidebar({ activePane, setActivePane }: SidebarProps) {
  return (
    <aside className="w-52 border-r border-terminal-border bg-terminal-surface flex flex-col" aria-label="Dashboard navigation">
      <div className="px-4 py-3 border-b border-terminal-border">
        <span className="text-terminal-green font-mono text-xs">▶ METAROLE_OS</span>
        <BlinkingCursor className="ml-1" />
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePane(item.id)}
            className={`w-full text-left px-4 py-3 font-mono text-xs transition-colors flex items-center gap-3 ${
              activePane === item.id
                ? 'text-terminal-green bg-terminal-green/5 border-l-2 border-terminal-green'
                : 'text-terminal-dim hover:text-terminal-green hover:bg-terminal-green/5'
            }`}
            aria-current={activePane === item.id ? 'page' : undefined}
          >
            <span>{item.icon}</span>
            <div>
              <div>{item.label}</div>
              <div className="text-[0.6rem] text-terminal-dim">{item.cmd}</div>
            </div>
          </button>
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-terminal-border">
        <span className="text-terminal-dim text-[0.6rem] font-mono">SYS: ONLINE</span>
      </div>
    </aside>
  );
}
