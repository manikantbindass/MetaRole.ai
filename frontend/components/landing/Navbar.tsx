'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        {/* Logo */}
        <Link href="/" className="nav-logo" aria-label="MetaRole AI Home">
          <span className="logo-bracket">[</span>
          <span className="logo-text">META</span>
          <span className="logo-accent">ROLE</span>
          <span className="logo-sub">.AI</span>
          <span className="logo-bracket">]</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-links" role="list">
          {[
            { href: '#features', label: 'FEATURES' },
            { href: '#how-it-works', label: 'HOW IT WORKS' },
            { href: '#demo', label: 'DEMO' },
            { href: '/dashboard', label: 'DASHBOARD' },
          ].map(item => (
            <li key={item.href}>
              <a href={item.href} className="nav-link">{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link href="/upload" className="nav-cta">
            [ UPLOAD RESUME ]
          </Link>
          <button
            className="mobile-menu-btn"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {[
            { href: '#features', label: 'FEATURES' },
            { href: '#how-it-works', label: 'HOW IT WORKS' },
            { href: '#demo', label: 'DEMO' },
            { href: '/dashboard', label: 'DASHBOARD' },
            { href: '/upload', label: 'UPLOAD RESUME' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              <span className="prompt">$</span> {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
