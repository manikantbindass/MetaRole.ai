'use client';

import { useEffect, useRef } from 'react';

interface SkillNode {
  id: string;
  label: string;
  level: number;
  category: string;
}

interface SkillLink {
  source: string;
  target: string;
}

interface SkillGraphProps {
  nodes?: SkillNode[];
  links?: SkillLink[];
  width?: number;
  height?: number;
}

const DEFAULT_NODES: SkillNode[] = [
  { id: 'js', label: 'JavaScript', level: 88, category: 'frontend' },
  { id: 'ts', label: 'TypeScript', level: 82, category: 'frontend' },
  { id: 'react', label: 'React', level: 85, category: 'frontend' },
  { id: 'node', label: 'Node.js', level: 78, category: 'backend' },
  { id: 'python', label: 'Python', level: 72, category: 'backend' },
  { id: 'pg', label: 'PostgreSQL', level: 65, category: 'database' },
  { id: 'docker', label: 'Docker', level: 58, category: 'devops' },
  { id: 'git', label: 'Git', level: 90, category: 'tools' },
  { id: 'css', label: 'CSS', level: 80, category: 'frontend' },
  { id: 'api', label: 'REST APIs', level: 80, category: 'backend' },
];

const DEFAULT_LINKS: SkillLink[] = [
  { source: 'js', target: 'ts' },
  { source: 'js', target: 'react' },
  { source: 'js', target: 'node' },
  { source: 'node', target: 'api' },
  { source: 'node', target: 'pg' },
  { source: 'python', target: 'pg' },
  { source: 'docker', target: 'node' },
  { source: 'git', target: 'docker' },
  { source: 'react', target: 'css' },
  { source: 'ts', target: 'react' },
];

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#33ff00',
  backend: '#ffb000',
  database: '#00aaff',
  devops: '#ff3333',
  tools: '#aa88ff',
};

export function SkillGraph({ nodes = DEFAULT_NODES, links = DEFAULT_LINKS, width = 500, height = 400 }: SkillGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Simple canvas-based force graph without D3 dependency issues in SSR
    const svg = svgRef.current;
    if (!svg) return;

    // Place nodes in a force-directed layout approximation
    const positions: Record<string, { x: number; y: number }> = {};
    const cx = width / 2;
    const cy = height / 2;

    nodes.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / nodes.length;
      const r = Math.min(width, height) * 0.35;
      positions[node.id] = {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
      };
    });

    // Draw using SVG elements
    svg.innerHTML = '';

    // Defs for glow
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'glow');
    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '3');
    blur.setAttribute('result', 'coloredBlur');
    const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const m1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    m1.setAttribute('in', 'coloredBlur');
    const m2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    m2.setAttribute('in', 'SourceGraphic');
    merge.append(m1, m2);
    filter.append(blur, merge);
    defs.append(filter);
    svg.append(defs);

    // Draw links
    links.forEach((link) => {
      const s = positions[link.source];
      const t = positions[link.target];
      if (!s || !t) return;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(s.x));
      line.setAttribute('y1', String(s.y));
      line.setAttribute('x2', String(t.x));
      line.setAttribute('y2', String(t.y));
      line.setAttribute('stroke', '#1f1f1f');
      line.setAttribute('stroke-width', '1');
      svg.append(line);
    });

    // Draw nodes
    nodes.forEach((node) => {
      const pos = positions[node.id];
      if (!pos) return;
      const color = CATEGORY_COLORS[node.category] || '#33ff00';
      const r = 4 + (node.level / 100) * 8;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(pos.x));
      circle.setAttribute('cy', String(pos.y));
      circle.setAttribute('r', String(r));
      circle.setAttribute('fill', color);
      circle.setAttribute('filter', 'url(#glow)');
      circle.setAttribute('opacity', '0.9');

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', String(pos.x));
      text.setAttribute('y', String(pos.y + r + 12));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.setAttribute('font-size', '9');
      text.setAttribute('fill', color);
      text.setAttribute('opacity', '0.8');
      text.textContent = node.label;

      svg.append(circle, text);
    });
  }, [nodes, links, width, height]);

  return (
    <div className="terminal-window">
      <div className="terminal-titlebar">
        <span>skill_graph.svg — force-layout</span>
      </div>
      <div className="p-2 bg-terminal-bg">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full"
          style={{ maxHeight: height }}
        />
        <div className="flex flex-wrap gap-2 p-2 border-t border-terminal-border">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1 text-xs text-terminal-muted">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
