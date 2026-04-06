// frontend/components/SkillGraph.tsx
'use client';

interface SkillGraphProps {
  skills: string[];
}

export function SkillGraph({ skills }: SkillGraphProps) {
  if (!skills.length) {
    return (
      <div className="border border-[#33ff00]/20 p-4 text-xs text-[#33ff00]/50">
        {'>'} No skills loaded. Upload a resume and run analysis first.
      </div>
    );
  }

  return (
    <div className="border border-[#33ff00]/30 p-4 text-xs">
      <div className="mb-3 text-[#33ff00]/60 tracking-[0.25em] text-[10px]">
        // SKILL_GRAPH
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {skills.map((s) => (
          <div
            key={s}
            className="border border-[#33ff00]/20 px-2 py-1 text-[10px] tracking-widest uppercase"
          >
            ▣ {s}
          </div>
        ))}
      </div>
    </div>
  );
}
