/**
 * MetaRole AI - API Client
 * Handles all communication with the FastAPI backend
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── Resume APIs ───────────────────────────────────────────────────────────────

export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/upload-resume`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

export async function analyzeSkills(resumeId: string) {
  return apiRequest<SkillAnalysisResponse>('/analyze-skills', {
    method: 'POST',
    body: JSON.stringify({ resume_id: resumeId }),
  });
}

// ─── Career APIs ───────────────────────────────────────────────────────────────

export async function predictCareer(skills: string[]) {
  return apiRequest<CareerPredictionResponse>('/predict-career', {
    method: 'POST',
    body: JSON.stringify({ skills }),
  });
}

// ─── Generation APIs ───────────────────────────────────────────────────────────

export async function generateResume(resumeData: ResumeData, jobDescription: string) {
  return apiRequest<GeneratedResumeResponse>('/generate-resume', {
    method: 'POST',
    body: JSON.stringify({ resume_data: resumeData, job_description: jobDescription }),
  });
}

export async function generatePortfolio(resumeData: ResumeData) {
  return apiRequest<GeneratedPortfolioResponse>('/generate-portfolio', {
    method: 'POST',
    body: JSON.stringify({ resume_data: resumeData }),
  });
}

// ─── Job Matching APIs ─────────────────────────────────────────────────────────

export async function matchJobs(skills: string[], experience: number) {
  return apiRequest<JobMatchResponse[]>('/job-match', {
    method: 'POST',
    body: JSON.stringify({ skills, experience_years: experience }),
  });
}

export async function healthCheck() {
  return apiRequest<{ status: string }>('/health');
}

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface SkillAnalysisResponse {
  skills: Array<{ name: string; level: number; category: string }>;
  gaps: Array<{ skill: string; importance: string; timeToLearn: string }>;
  experience_years: number;
  summary: string;
}

export interface CareerPredictionResponse {
  predictions: Array<{
    role: string;
    probability: number;
    timeframe: string;
    required_skills: string[];
  }>;
}

export interface ResumeData {
  name: string;
  email: string;
  skills: string[];
  experience: Array<{ company: string; role: string; duration: string; bullets: string[] }>;
  projects: Array<{ name: string; description: string; tech: string[] }>;
  education: Array<{ school: string; degree: string; year: string }>;
}

export interface GeneratedResumeResponse {
  resume_text: string;
  ats_score: number;
  improvements: string[];
}

export interface GeneratedPortfolioResponse {
  html: string;
  deployed_url?: string;
}

export interface JobMatchResponse {
  title: string;
  company: string;
  match_score: number;
  salary_range: string;
  url: string;
  required_skills: string[];
}
