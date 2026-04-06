'use client';
import { useEffect, useRef } from 'react';

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

interface SkillGraphProps {
  skills: Skill[];
}

export default function SkillGraph({ skills }: SkillGraphProps) {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="skill-graph">
      {categories.map(cat => (
        <div key={cat} className="skill-category">
          <div className="skill-cat-label">
            <span className="prompt">##</span> {cat.toUpperCase()}
          </div>
          {skills.filter(s => s.category === cat).map(skill => (
            <div key={skill.name} className="skill-row">
              <span className="skill-name">{skill.name.padEnd(20, '.')}</span>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{ width: `${skill.level}%` }}
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency ${skill.level}%`}
                />
              </div>
              <span className="skill-pct">{skill.level}%</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
