-- MetaRole AI — PostgreSQL Schema
-- Run this against your DATABASE_URL to initialize tables

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector; -- pgvector for skill embeddings

-- Users table (synced from Clerk)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  github VARCHAR(255),
  linkedin VARCHAR(255),
  target_role VARCHAR(255),
  career_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Parsed resumes
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  raw_text TEXT,
  parsed_data JSONB,
  file_name VARCHAR(255),
  ats_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User skills
CREATE TABLE IF NOT EXISTS user_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill_name VARCHAR(255) NOT NULL,
  proficiency INTEGER DEFAULT 50, -- 0-100
  category VARCHAR(100),           -- frontend, backend, AI, etc.
  embedding vector(1536),          -- OpenAI text-embedding-3-small
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_name)
);

-- Career predictions
CREATE TABLE IF NOT EXISTS career_predictions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  prediction_data JSONB,
  primary_path VARCHAR(255),
  confidence INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skill progress tracking (time-series)
CREATE TABLE IF NOT EXISTS skill_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  skill_count INTEGER DEFAULT 0,
  career_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved jobs
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_id VARCHAR(255) NOT NULL,
  job_title VARCHAR(255),
  company VARCHAR(255),
  apply_url TEXT,
  status VARCHAR(50) DEFAULT 'saved', -- saved, applied, interview, rejected
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated resumes
CREATE TABLE IF NOT EXISTS generated_resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_role VARCHAR(255),
  resume_markdown TEXT,
  ats_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON saved_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_progress_user_week ON skill_progress(user_id, week_start);
