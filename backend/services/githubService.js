/**
 * GitHub Service — fetch user repositories and infer tech skills
 */
const axios = require('axios');
const { logger } = require('../utils/logger');

// Language to skill mapping
const LANGUAGE_SKILLS = {
  JavaScript: ['JavaScript', 'ES6+', 'Node.js'],
  TypeScript: ['TypeScript', 'JavaScript', 'Type Safety'],
  Python: ['Python', 'Data Structures', 'Scripting'],
  Solidity: ['Solidity', 'Smart Contracts', 'Blockchain', 'Ethereum'],
  Java: ['Java', 'OOP', 'Spring'],
  Go: ['Go', 'Concurrency', 'Systems Programming'],
  Rust: ['Rust', 'Systems Programming', 'Memory Safety'],
  'C++': ['C++', 'Systems Programming', 'Algorithms'],
};

/**
 * Fetch GitHub repos and infer skills from language distribution
 * @param {string} username — GitHub username
 * @returns {string[]} array of detected skills
 */
async function fetchGitHubSkills(username) {
  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const { data: repos } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=50&sort=updated`,
      { headers, timeout: 10000 }
    );

    // Collect unique languages
    const languageSet = new Set();
    repos.forEach((repo) => {
      if (repo.language) languageSet.add(repo.language);
    });

    // Map languages to skills
    const skills = new Set();
    languageSet.forEach((lang) => {
      const mapped = LANGUAGE_SKILLS[lang];
      if (mapped) mapped.forEach((s) => skills.add(s));
      else skills.add(lang); // Add unknown language as-is
    });

    // Detect frameworks from repo topics
    repos.forEach((repo) => {
      (repo.topics || []).forEach((topic) => skills.add(topic));
    });

    logger.info(`GitHub skills for ${username}: ${[...skills].join(', ')}`);
    return [...skills];
  } catch (err) {
    logger.warn(`GitHub API error for ${username}: ${err.message}`);
    return [];
  }
}

module.exports = { fetchGitHubSkills };
