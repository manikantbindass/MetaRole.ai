// frontend/components/CareerCard.tsx
interface CareerCardProps {
  role: string;
  probability: number;
}

export function CareerCard({ role, probability }: CareerCardProps) {
  const pct = Math.round(probability * 100);

  return (
    <div className="border border-[#33ff00]/20 p-4 text-xs">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#ffb000] tracking-widest">{role}</span>
        <span className="text-[#33ff00]">{pct}%</span>
      </div>
      <div className="w-full h-1 bg-[#33ff00]/10">
        <div
          className="h-1 bg-[#33ff00]"
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
      <div className="mt-2 text-[#33ff00]/50">
        {'>'} Prediction confidence score for this trajectory.
      </div>
    </div>
  );
}
