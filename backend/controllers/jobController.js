/**
 * Job Matching Controller
 * Matches available jobs against user skill profile using vector similarity
 */
const { callOpenAI } = require('../services/openaiService');
const { vectorSearch } = require('../services/vectorService');

// Sample job dataset - in production this would come from job APIs (LinkedIn, Indeed, etc.)
const JOB_DATASET = [
  { id: '1', title: 'Senior Full Stack Engineer', company: 'TechCorp', location: 'Remote', salary: '$120k-$160k', skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'], type: 'full-time' },
  { id: '2', title: 'AI/ML Engineer', company: 'DeepAI Labs', location: 'San Francisco, CA', salary: '$150k-$200k', skills: ['Python', 'TensorFlow', 'LangChain', 'OpenAI'], type: 'full-time' },
  { id: '3', title: 'Blockchain Developer', company: 'Web3 Ventures', location: 'Remote', salary: '$130k-$180k', skills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts'], type: 'contract' },
  { id: '4', title: 'DevOps Engineer', company: 'CloudScale', location: 'NYC', salary: '$110k-$150k', skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'], type: 'full-time' },
  { id: '5', title: 'Backend Engineer (Node.js)', company: 'StartupX', location: 'Remote', salary: '$100k-$140k', skills: ['Node.js', 'Express', 'MongoDB', 'Redis'], type: 'full-time' }
];

/**
 * POST /job-match
 * Body: { skillGraph: Object, preferences?: { location, jobType, salaryMin } }
 */
async function jobMatch(req, res) {
  try {
    const { skillGraph, preferences = {} } = req.body;

    if (!skillGraph) {
      return res.status(400).json({ error: 'skillGraph is required' });
    }

    const userSkills = [
      ...(skillGraph.technical || []).map(s => s.name),
      ...(skillGraph.domains || [])
    ];

    const prompt = `
Match this candidate's skills to the job openings and return match scores.

CANDIDATE SKILLS: ${userSkills.join(', ')}
PREFERENCES: ${JSON.stringify(preferences)}

JOB OPENINGS:
${JSON.stringify(JOB_DATASET, null, 2)}

Return JSON array:
[
  {
    "jobId": string,
    "matchScore": number (0-100),
    "matchedSkills": [string],
    "missingSkills": [string],
    "applicationAdvice": string,
    "coverLetterHint": string
  }
]

Sort by matchScore descending. Only valid JSON array.
`;

    const rawResponse = await callOpenAI(prompt, { max_tokens: 1500 });
    let matches;
    try {
      const jsonMatch = rawResponse.match(/\[[\s\S]*\]/);
      matches = JSON.parse(jsonMatch ? jsonMatch[0] : '[]');
    } catch {
      matches = [];
    }

    // Enrich matches with job data
    const enriched = matches.map(m => ({
      ...m,
      job: JOB_DATASET.find(j => j.id === m.jobId) || null
    })).filter(m => m.job);

    return res.status(200).json({ success: true, data: enriched });
  } catch (err) {
    console.error('[jobController] Error:', err.message);
    return res.status(500).json({ error: 'Job matching failed', details: err.message });
  }
}

module.exports = { jobMatch };
