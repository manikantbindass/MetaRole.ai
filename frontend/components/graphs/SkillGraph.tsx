'use client';

import { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillGraphProps {
  skills: Skill[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: '#33ff00',
  Backend: '#ffb000',
  Database: '#00ffff',
  DevOps: '#ff00ff',
  Other: '#ffffff',
};

export function SkillGraph({ skills }: SkillGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = 280;

    // Create nodes
    const centerX = W / 2, centerY = H / 2;
    const nodes = skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 90 + (skill.level / 100) * 40;
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        skill,
        color: CATEGORY_COLORS[skill.category] || '#ffffff',
        size: 4 + (skill.level / 100) * 10,
      };
    });

    // Center node
    const centerNode = {
      x: centerX, y: centerY,
      vx: 0, vy: 0,
      skill: { name: 'YOU', level: 100, category: 'Core' },
      color: '#33ff00',
      size: 12,
    };

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, W, H);

      tick++;

      // Slowly float nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        // Bounce
        if (node.x < 20 || node.x > W - 20) node.vx *= -1;
        if (node.y < 20 || node.y > H - 20) node.vy *= -1;
        // Attraction to orbit
        const dx = centerX - node.x;
        const dy = centerY - node.y;
        node.vx += dx * 0.0002;
        node.vy += dy * 0.0002;
        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;
      });

      // Draw edges
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.moveTo(centerNode.x, centerNode.y);
        ctx.lineTo(node.x, node.y);
        const alpha = 0.1 + (node.skill.level / 100) * 0.3;
        ctx.strokeStyle = `${node.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw skill nodes
      nodes.forEach(node => {
        // Glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 3);
        gradient.addColorStop(0, `${node.color}40`);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Label
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillStyle = node.color;
        ctx.textAlign = 'center';
        ctx.fillText(node.skill.name, node.x, node.y - node.size - 4);
        ctx.fillText(`${node.skill.level}%`, node.x, node.y + node.size + 12);
      });

      // Center node
      const pulse = Math.sin(tick * 0.05) * 2;
      const cGradient = ctx.createRadialGradient(centerNode.x, centerNode.y, 0, centerNode.x, centerNode.y, 30 + pulse);
      cGradient.addColorStop(0, '#33ff0060');
      cGradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 30 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = cGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, centerNode.size, 0, Math.PI * 2);
      ctx.fillStyle = '#33ff00';
      ctx.fill();

      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.fillStyle = '#33ff00';
      ctx.textAlign = 'center';
      ctx.fillText('YOU', centerNode.x, centerNode.y + 4);

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [skills]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: '280px' }}
    />
  );
}
