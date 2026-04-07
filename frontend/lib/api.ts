// frontend/lib/api.ts
// All paths are relative — works on Vercel (same-origin) and locally via Next.js dev server

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API_ERROR ${res.status} ${res.statusText}: ${text || 'No body'}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  uploadResume: (body: { content: string }) =>
    request<{ analysisId: string }>('/api/upload-resume', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  analyzeSkills: (analysisId: string) =>
    request<{ skills: string[]; graph: { nodes: any[]; edges: any[] } }>(
      `/api/analyze-skills?analysisId=${encodeURIComponent(analysisId)}`
    ),

  predictCareer: (analysisId: string) =>
    request<{ predictions: { role: string; probability: number }[] }>(
      `/api/predict-career?analysisId=${encodeURIComponent(analysisId)}`
    ),

  generateResume: (analysisId: string, jobTitle?: string) =>
    request<{ resume: string }>('/api/generate-resume', {
      method: 'POST',
      body: JSON.stringify({ analysisId, jobTitle }),
    }),

  generatePortfolio: (analysisId: string) =>
    request<{ html: string }>('/api/generate-portfolio', {
      method: 'POST',
      body: JSON.stringify({ analysisId }),
    }),

  jobMatch: (analysisId: string) =>
    request<{
      jobs: { id: string; title: string; company: string; score: number; location: string; link?: string }[];
    }>(`/api/job-match?analysisId=${encodeURIComponent(analysisId)}`),

  health: () => request<{ status: string; service: string }>('/api/health'),
};
