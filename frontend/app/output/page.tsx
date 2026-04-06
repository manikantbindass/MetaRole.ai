// frontend/app/output/page.tsx
import { Suspense } from 'react';
import OutputDashboard from './OutputDashboard';

export default function OutputPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-4">// BOOT.SEQUENCE</div>
          <div className="text-lg tracking-widest animate-pulse">LOADING_PIPELINE...</div>
        </div>
      </main>
    }>
      <OutputDashboard />
    </Suspense>
  );
}
