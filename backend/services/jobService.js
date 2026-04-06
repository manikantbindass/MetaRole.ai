/**
 * MetaRole AI — Job Service
 * Job matching using skill vectors and keyword scoring
 * In production: integrate with Pinecone vector search or job APIs (Adzuna, JSearch)
 */

// Sample job dataset — replace with real DB/API in production
const JOB_DATASET = [
  {
    id: 'j001',
    title: 'Full Stack Engineer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$90k–$130k',
    skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    demandLevel: 'HIGH',
    postedDate: '2024-04-01',
    applyUrl: 'https://example.com/apply/j001',
  },
  {
    id: 'j002',
    title: 'Blockchain Developer',
    company: 'Web3 Labs',
    location: 'Bangalore, IN',
    salary: '$80k–$120k',
    skills: ['Solidity', 'Ethereum', 'JavaScript', 'React', 'Hardhat'],
    demandLevel: 'MEDIUM',
    postedDate: '2024-04-02',
    applyUrl: 'https://example.com/apply/j002',
  },
  {
    id: 'j003',
    title: 'AI/ML Engineer',
    company: 'DataVision AI',
    location: 'Remote',
    salary: '$110k–$160k',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenAI'],
    demandLevel: 'HIGH',
    postedDate: '2024-04-03',
    applyUrl: 'https://example.com/apply/j003',
  },
  {
    id: 'j004',
    title: 'DevOps Engineer',
    company: 'CloudNine',
    location: 'Mumbai, IN',
    salary: '$70k–$100k',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
    demandLevel: 'HIGH',
    postedDate: '2024-04-04',
    applyUrl: 'https://example.com/apply/j004',
  },
];

/**
 * matchJobs — Score and rank jobs based on skill overlap
 */
exports.matchJobs = async ({ skills, targetRoles, location, remote }) => {
  const normalizedSkills = skills.map((s) => s.toLowerCase());

  const scored = JOB_DATASET.map((job) => {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    const overlap = normalizedSkills.filter((s) => jobSkillsLower.includes(s));
    const matchScore = Math.round((overlap.length / job.skills.length) * 100);

    // Boost score if targetRole matches
    const roleBoost = targetRoles.some((r) =>
      job.title.toLowerCase().includes(r.toLowerCase())
    ) ? 15 : 0;

    // Location filter
    if (remote && !job.location.toLowerCase().includes('remote')) return null;

    return {
      ...job,
      matchScore: Math.min(matchScore + roleBoost, 100),
      matchedSkills: overlap,
      missingSkills: jobSkillsLower.filter((s) => !normalizedSkills.includes(s)),
    };
  })
    .filter(Boolean)
    .sort((a, b) => b.matchScore - a.matchScore);

  return scored;
};

/**
 * getTrending — Return trending role demand data
 */
exports.getTrending = async () => {
  return [
    { role: 'AI/ML Engineer', demand: 94, growth: '+42%', avgSalary: '$135k' },
    { role: 'Full Stack Engineer', demand: 88, growth: '+28%', avgSalary: '$115k' },
    { role: 'DevOps/Cloud Engineer', demand: 85, growth: '+35%', avgSalary: '$120k' },
    { role: 'Blockchain Developer', demand: 72, growth: '+61%', avgSalary: '$110k' },
    { role: 'Data Scientist', demand: 80, growth: '+22%', avgSalary: '$125k' },
  ];
};
