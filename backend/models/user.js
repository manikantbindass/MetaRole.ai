/**
 * User Model (PostgreSQL via Prisma schema reference)
 * In production use Prisma ORM with PostgreSQL
 */

// Prisma schema definition (see database/schema.prisma)
// This file documents the user data structure

const USER_SCHEMA = {
  id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  clerkId: 'VARCHAR(255) UNIQUE NOT NULL',
  email: 'VARCHAR(255) UNIQUE NOT NULL',
  name: 'VARCHAR(255)',
  resumeText: 'TEXT',
  parsedProfile: 'JSONB',
  skillGraph: 'JSONB',
  careerPredictions: 'JSONB',
  jobMatches: 'JSONB',
  createdAt: 'TIMESTAMP DEFAULT NOW()',
  updatedAt: 'TIMESTAMP DEFAULT NOW()'
};

module.exports = { USER_SCHEMA };
