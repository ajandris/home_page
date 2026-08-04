/* Sales Funnel - AI Skill Match & Prompt Generation Engine */
document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  const totalSteps = 4;

  const prevBtn = document.getElementById('funnel-prev-btn');
  const nextBtn = document.getElementById('funnel-next-btn');
  const generateBtn = document.getElementById('funnel-generate-btn');
  const copyBtn = document.getElementById('copy-prompt-btn');
  const launchChatBtn = document.getElementById('launch-chat-btn');

  if (!nextBtn) return;

  // Objective Card Selection logic
  const objectiveCards = document.querySelectorAll('.objective-card');
  objectiveCards.forEach(card => {
    card.addEventListener('click', () => {
      objectiveCards.forEach(c => c.classList.remove('cyber-card-magenta', 'active-selection'));
      card.classList.add('cyber-card-magenta', 'active-selection');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  function updateFunnelStep(step) {
    document.querySelectorAll('.funnel-step').forEach(s => s.classList.remove('active'));
    const targetStep = document.getElementById(`funnel-step-${step}`);
    if (targetStep) targetStep.classList.add('active');

    // Update progress steps
    document.querySelectorAll('.funnel-progress-step').forEach((p, idx) => {
      const stepNum = idx + 1;
      p.classList.remove('active', 'completed');
      if (stepNum === step) {
        p.classList.add('active');
      } else if (stepNum < step) {
        p.classList.add('completed');
      }
    });

    // Button state updates
    if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'inline-block';
    
    if (step === 3) {
      if (nextBtn) nextBtn.style.display = 'none';
      if (generateBtn) generateBtn.style.display = 'inline-block';
    } else if (step === totalSteps) {
      if (nextBtn) nextBtn.style.display = 'none';
      if (generateBtn) generateBtn.style.display = 'none';
      generateAiSkillMatch();
    } else {
      if (nextBtn) nextBtn.style.display = 'inline-block';
      if (generateBtn) generateBtn.style.display = 'none';
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateFunnelStep(currentStep);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateFunnelStep(currentStep);
      }
    });
  }

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      currentStep = 4;
      updateFunnelStep(4);
    });
  }

  // AI Skill Match & Prompt Builder
  function generateAiSkillMatch() {
    const selectedProjectTypeEl = document.querySelector('input[name="project_type"]:checked');
    const projectType = selectedProjectTypeEl ? selectedProjectTypeEl.value : 'AI & Web Development';

    const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(el => el.value);
    const description = document.getElementById('project-description') ? document.getElementById('project-description').value.trim() : '';
    const timeline = document.getElementById('funnel-timeline') ? document.getElementById('funnel-timeline').value : 'Standard (2-4 Weeks)';
    const scope = document.getElementById('funnel-scope') ? document.getElementById('funnel-scope').value : 'Production Web App';

    // Skill Alignment Profile Matrix
    const profileCapabilities = [
      { name: 'Python Programming', match: selectedSkills.includes('Python Development'), cert: 'Level 5 Web Dev & AI/ML Studies' },
      { name: 'Django Web Framework', match: selectedSkills.includes('Django Web Framework'), cert: 'Level 5 Diploma Web App Dev (Code Institute)' },
      { name: 'AI Agent Architecture', match: selectedSkills.includes('AI Agent Architecture & Tool Use'), cert: 'AI Agents Developer (AI Institute 2026)' },
      { name: 'Machine Learning', match: selectedSkills.includes('Machine Learning (Scikit-Learn)'), cert: 'AI/ML Developer Studies' },
      { name: 'Prompt Engineering', match: selectedSkills.includes('Prompt Engineering & Vibe Coding'), cert: 'Google AI Professional & Vibe Coder' },
      { name: 'SQL Databases', match: selectedSkills.includes('SQL Databases & Data Modelling'), cert: 'Postgraduate Diploma Big Data & SQL' },
      { name: 'Systems Analysis', match: selectedSkills.includes('Systems Analysis & Requirements'), cert: 'BSc (Hons) Computing & IT + Analyst Roles' },
      { name: 'Warehouse/WMS Domain', match: selectedSkills.includes('Warehouse WMS & Operations Domain'), cert: 'Operational Warehouse Experience' },
      { name: 'Big Data Analytics', match: selectedSkills.includes('Big Data Analytics'), cert: 'PgDip Computer Science with Big Data Analytics' }
    ];

    // Compute Match Percentage
    let matchedCount = profileCapabilities.filter(c => c.match).length;
    let totalRequested = selectedSkills.length || 1;
    let matchScore = Math.min(100, Math.round(88 + (matchedCount / totalRequested) * 10));
    if (selectedSkills.length === 0) matchScore = 92;

    const matchScoreEl = document.getElementById('ai-match-score');
    if (matchScoreEl) {
      matchScoreEl.innerHTML = `<i class="fa-solid fa-bolt w3-margin-right"></i>${matchScore}% SKILL MATCH`;
    }

    // Render Match Breakdown Cards
    const breakdownEl = document.getElementById('ai-match-breakdown');
    if (breakdownEl) {
      breakdownEl.innerHTML = profileCapabilities.slice(0, 6).map(c => `
        <div class="w3-col l4 m6 w3-margin-bottom">
          <div style="background: rgba(5,10,25,0.7); padding: 12px 16px; border-radius: 8px; border: 1px solid ${c.match ? 'var(--neon-green)' : 'rgba(255,255,255,0.1)'};">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; font-size: 0.85rem; color: ${c.match ? 'var(--neon-green)' : 'var(--text-muted)'};">
                ${c.name}
              </span>
              <span style="font-size: 0.75rem; color: ${c.match ? 'var(--neon-green)' : 'var(--text-muted)'};">
                ${c.match ? '✓ Matched' : 'Supported'}
              </span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Credential: ${c.cert}</div>
          </div>
        </div>
      `).join('');
    }

    // Construct Formatted AI Requirement Prompt
    const skillsListStr = selectedSkills.length > 0 ? selectedSkills.join(', ') : 'Python, Django, AI Agents, Machine Learning, Systems Analysis';
    const projectDescStr = description || 'Develop an AI-assisted automation system or web application to streamline business workflows.';

    const promptText = `Evaluate project requirements against candidate Andris Jancevskis:
- PROJECT TYPE: ${projectType}
- REQUIRED SKILLS: ${skillsListStr}
- PROJECT SCOPE: ${scope}
- DESIRED TIMELINE: ${timeline}
- PROJECT DESCRIPTION: "${projectDescStr}"

TASK FOR AI: Provide a technical skill match evaluation, highlighting how Andris Jancevskis's qualifications (AI Agents Developer 2026, Google AI Professional Cert, PgDip Big Data Analytics, Level 5 Web Dev, Systems Analysis & Warehouse background) align with this project. Outline an implementation action plan.`;

    const promptTextarea = document.getElementById('generated-ai-prompt');
    if (promptTextarea) {
      promptTextarea.value = promptText;
    }
  }

  // Copy Prompt Button
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const promptTextarea = document.getElementById('generated-ai-prompt');
      if (promptTextarea) {
        navigator.clipboard.writeText(promptTextarea.value).then(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-check w3-margin-right"></i>Copied!';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-solid fa-copy w3-margin-right"></i>Copy Prompt';
          }, 2000);
        });
      }
    });
  }

  // Launch AI Agent Chat with Prompt
  if (launchChatBtn) {
    launchChatBtn.addEventListener('click', () => {
      const promptTextarea = document.getElementById('generated-ai-prompt');
      if (promptTextarea) {
        const encodedPrompt = encodeURIComponent(promptTextarea.value);
        window.location.href = `/en/chat/?prompt=${encodedPrompt}`;
      }
    });
  }
});
