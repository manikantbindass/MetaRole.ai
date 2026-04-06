'use client';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'OVERVIEW', icon: '■' },
  { href: '/upload', label: 'UPLOAD', icon: '↑' },
  { href: '/analyze', label: 'ANALYZE', icon: '◉' },
  { href: '/output', label: 'OUTPUTS', icon: '▣' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`dashboard-layout ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar" aria-label="Dashboard navigation">
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo" aria-label="MetaRole Home">
            {collapsed ? (
              <span className="logo-short">M</span>
            ) : (
              <><span className="logo-bracket">[</span>
              <span className="logo-text">META</span>
              <span className="logo-accent">ROLE</span>
              <span className="logo-bracket">]</span></>
            )}
          </Link>
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(v => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!collapsed && <span className="sidebar-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="system-status">
            <span className="status-dot" />
            {!collapsed && <span className="status-label">ONLINE</span>}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="dashboard-main">
        <div className="crt-overlay" aria-hidden="true" />
        {children}
      </main>
    </div>
  );
}
