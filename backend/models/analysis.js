/**
 * Analysis Model
 * Stores career analysis results per user session
 */

const ANALYSIS_SCHEMA = {
  id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  userId: 'UUID REFERENCES users(id) ON DELETE CASCADE',
  type: "VARCHAR(50) NOT NULL -- 'skill_gap' | 'career_prediction' | 'job_match'",
  inputData: 'JSONB NOT NULL',
  outputData: 'JSONB NOT NULL',
  targetRole: 'VARCHAR(255)',
  matchScore: 'DECIMAL(5,2)',
  createdAt: 'TIMESTAMP DEFAULT NOW()'
};

module.exports = { ANALYSIS_SCHEMA };
