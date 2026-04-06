// frontend/components/JobCard.tsx
import Link from 'next/link';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    score: number;
    location: string;
    link?: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  const pct = Math.round(job.score * 100);

  return (
    <div className="border border-[#33ff00]/20 p-4 text-xs flex flex-col gap-2">
      <div className="flex justify-between">
        <div>
          <div className="text-[#ffb000] tracking-widest">{job.title}</div>
          <div className="text-[#33ff00]/60">{job.company}</div>
        </div>
        <div className="text-right">
          <div className="text-[#33ff00]">{pct}%</div>
          <div className="text-[#33ff00]/40">match</div>
        </div>
      </div>
      <div className="text-[#33ff00]/50">{job.location}</div>
      {job.link && (
        <Link
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-[#33ff00]/80 underline underline-offset-4"
        >
          [ OPEN_POSTING ]
        </Link>
      )}
    </div>
  );
}
