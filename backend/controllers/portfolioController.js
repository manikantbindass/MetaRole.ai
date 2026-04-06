/**
 * Portfolio Generator Controller
 * Generates a complete portfolio website (HTML/CSS/JS) from user profile
 */
const { callOpenAI } = require('../services/openaiService');

/**
 * POST /generate-portfolio
 * Body: { profile: Object, theme?: string }
 */
async function generatePortfolio(req, res) {
  try {
    const { profile, theme = 'terminal' } = req.body;

    if (!profile) {
      return res.status(400).json({ error: 'profile is required' });
    }

    const prompt = `
Generate a complete, production-ready single-page portfolio website for this developer.
Use a "${theme}" aesthetic (terminal/hacker style with neon green #33ff00 on #0a0a0a background, monospace fonts).

DEVELOPER PROFILE:
Name: ${profile.name || 'Developer'}
Email: ${profile.email || ''}
Skills: ${(profile.skills || []).join(', ')}
Experience: ${JSON.stringify(profile.experience || [])}
Projects: ${JSON.stringify(profile.projects || [])}
Education: ${JSON.stringify(profile.education || [])}
Summary: ${profile.summary || ''}

Generate COMPLETE HTML with embedded CSS and JavaScript.
Must include: hero section, skills grid, experience timeline, projects gallery, contact form.
Use typing animation effect. Make it visually stunning.
Return ONLY the complete HTML document, no explanation.
`;

    const html = await callOpenAI(prompt, { max_tokens: 4000 });

    return res.status(200).json({
      success: true,
      data: { html, theme }
    });
  } catch (err) {
    console.error('[portfolioController] Error:', err.message);
    return res.status(500).json({ error: 'Portfolio generation failed', details: err.message });
  }
}

module.exports = { generatePortfolio };
