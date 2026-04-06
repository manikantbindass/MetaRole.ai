import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('metarole_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Resume API ────────────────────────────────────────────
export const resumeAPI = {
  /** Upload a resume file (PDF/DOCX) */
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /** Analyze skills from uploaded resume */
  analyzeSkills: async (resumeId: string) =>
    apiClient.post('/analyze-skills', { resume_id: resumeId }),
};

// ─── Career API ────────────────────────────────────────────
export const careerAPI = {
  /** Predict career paths based on skills */
  predictCareer: async (skills: string[], targetRole?: string) =>
    apiClient.post('/predict-career', { skills, target_role: targetRole }),
};

// ─── Generate API ──────────────────────────────────────────
export const generateAPI = {
  /** Generate a tailored resume */
  generateResume: async (resumeId: string, jobDescription: string) =>
    apiClient.post('/generate-resume', { resume_id: resumeId, job_description: jobDescription }),

  /** Generate a portfolio website */
  generatePortfolio: async (userId: string) =>
    apiClient.post('/generate-portfolio', { user_id: userId }),
};

// ─── Jobs API ──────────────────────────────────────────────
export const jobsAPI = {
  /** Get job matches for a user */
  matchJobs: async (skills: string[], location?: string) =>
    apiClient.post('/job-match', { skills, location }),
};

// ─── Health check ──────────────────────────────────────────
export const healthCheck = () => apiClient.get('/health');
