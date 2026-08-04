/* CyberNexus AI Agent Chat Simulation Engine */
document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const promptPills = document.querySelectorAll('.prompt-pill');
  const clearChatBtn = document.getElementById('clear-chat-btn');

  if (!chatMessages || !chatInput || !chatSendBtn) return;

  // Knowledge base responses for Andris Jancevskis profile
  const knowledgeBase = [
    {
      keywords: ['education', 'study', 'qualification', 'degree', 'certificate', 'msc', 'diploma'],
      response: `<strong>Andris Jancevskis's Qualifications & Education:</strong><br><br>
      • <strong>AI/ML Developer</strong> — AI Institute (Current Studies: Python ML, supervised/unsupervised learning, feature engineering).<br>
      • <strong>Vibe Coder</strong> — univerus.ai (Current Studies: Prompt-driven software dev, rapid prototyping, AI-assisted code generation).<br>
      • <strong>AI Agents Developer</strong> — AI Institute (Completed 2026: Multi-step workflows, tool use, agent architecture, guardrails).<br>
      • <strong>Google AI Professional Certificate</strong> — Coursera (Completed 2026: AI collaboration, workplace automation, vibe coding).<br>
      • <strong>Postgraduate Diploma in Computer Science with Big Data Analytics</strong> — Wrexham Glyndwr University (2023).<br>
      • <strong>Level 5 Diploma in Web Application Development</strong> — Code Institute (2026: Django, Python, SQL, REST APIs).<br>
      • <strong>BSc (Hons) Computing and IT (Software)</strong> — The Open University (2019).`
    },
    {
      keywords: ['agent', 'ai agent', 'workflow', 'tool', 'automation'],
      response: `<strong>AI Agent Development Capabilities:</strong><br><br>
      Andris specializes in agentic AI architecture designed to execute goal-driven, multi-step workflows:<br>
      - Task decomposition & prompt engineering.<br>
      - Tool execution & API integration.<br>
      - Retrieval-augmented knowledge bases & memory concepts.<br>
      - Human-in-the-loop approval guardrails & error fallbacks.<br><br>
      <em>Application examples: Intelligent WMS exception agents, automated sales assistants, and research bots.</em>`
    },
    {
      keywords: ['skills', 'stack', 'tech', 'python', 'django', 'programming', 'languages'],
      response: `<strong>Technical Skills & Tech Stack:</strong><br><br>
      • <strong>Languages:</strong> Python, PHP, SQL, HTML5, CSS3, JavaScript.<br>
      • <strong>Frameworks:</strong> Django, FastAPI, REST Framework, w3.css.<br>
      • <strong>Data & ML:</strong> Pandas, NumPy, Scikit-Learn, SQL/PostgreSQL, Big Data Analytics.<br>
      • <strong>Methodologies:</strong> Systems Analysis, Prompt Engineering, Vibe Coding, Agile Prototyping.`
    },
    {
      keywords: ['contact', 'email', 'phone', 'location', 'hire', 'reach', 'address'],
      response: `<strong>Contact Information for Andris Jancevskis:</strong><br><br>
      📍 <strong>Location:</strong> Burton-on-Trent, United Kingdom<br>
      📧 <strong>Email:</strong> <a href="mailto:andris.jancevskis@gmail.com" class="text-neon-cyan">andris.jancevskis@gmail.com</a><br>
      📞 <strong>Phone:</strong> <a href="tel:+447752194449" class="text-neon-cyan">+44 7752 194449</a><br><br>
      You can also use the <strong>Sales Funnel</strong> page to request a detailed project consultation!`
    },
    {
      keywords: ['experience', 'systems analysis', 'warehouse', 'wms', 'background'],
      response: `<strong>Professional Domain & Systems Experience:</strong><br><br>
      Andris brings extensive transferable technical capability from prior roles as Programmer, Systems Analyst, and Business Analyst:<br>
      - <strong>Operational Domain Knowledge:</strong> Deep warehouse (WMS), inventory, and fulfilment workflow expertise.<br>
      - <strong>Data & Process Analysis:</strong> Commercial data and workflow analytics.<br>
      - <strong>Systems Integration:</strong> Translating business needs into robust technical requirements.`
    },
    {
      keywords: ['service', 'offer', 'portfolio', 'project', 'funnel', 'price', 'package'],
      response: `<strong>Services & Solutions Offered:</strong><br><br>
      1. <strong>AI Agent & Workflow Prototypes:</strong> Custom goal-driven agents with external tool integration.<br>
      2. <strong>Django AI Web Applications:</strong> Full-stack Python web portals exposing machine learning models.<br>
      3. <strong>Predictive Analytics & ML Pipelines:</strong> Data cleaning, regression, classification, and reporting.<br>
      4. <strong>Rapid Vibe Coding:</strong> Prompt-driven prototyping for rapid MVP validation.<br><br>
      Check out the <strong>Portfolio</strong> and <strong>Sales Funnel</strong> pages for interactive previews!`
    }
  ];

  // Default response if no keyword matched
  const defaultResponse = `I am CyberNexus AI Assistant representing <strong>Andris Jancevskis</strong> (AI & ML Specialist).<br><br>
  I can answer questions regarding Andris's:<br>
  • <strong>Education & Credentials</strong> (AI Institute, Google AI Cert, PgDip Big Data)<br>
  • <strong>AI Agent & ML Skills</strong> (Python, Django, Workflows)<br>
  • <strong>Systems Analysis & Warehouse Experience</strong><br>
  • <strong>Contact Details & Consultations</strong><br><br>
  <em>Try clicking one of the suggested prompts below or type your question!</em>`;

  // Funnel Prompt Match Evaluation Response
  const funnelMatchResponse = `<strong>🤖 AI REQUIREMENT MATCH EVALUATION:</strong><br><br>
  🎯 <strong>Match Assessment:</strong> High Skill & Background Alignment (95%+ Match)<br><br>
  • <strong>Relevant Credentials & Qualifications:</strong><br>
    - <em>AI Agent Architecture & Tool Use:</em> Completed <strong>AI Agents Developer</strong> (AI Institute 2026).<br>
    - <em>Python & Full-Stack Web:</em> <strong>Level 5 Diploma in Web Application Development</strong> (Code Institute 2026).<br>
    - <em>Data Modelling & SQL:</em> <strong>Postgraduate Diploma in Computer Science with Big Data Analytics</strong> (Wrexham Glyndwr 2023).<br>
    - <em>Systems Analysis:</em> <strong>BSc (Hons) Computing & IT</strong> (Open University 2019) plus Systems Analyst experience.<br>
    - <em>Vibe Coding & Rapid Prototyping:</em> <strong>Google AI Professional Certificate</strong> (Coursera 2026).<br><br>
  🚀 <strong>Proposed Implementation Action Plan:</strong><br>
  1. <strong>Phase 1 (Requirements & Data Flow):</strong> Systems analysis to specify tool schemas, inputs, and constraints.<br>
  2. <strong>Phase 2 (Agent/ML Development):</strong> Build Python backend, agent goal decomposition, or model pipeline.<br>
  3. <strong>Phase 3 (Django Interface):</strong> Connect model/agent to Django web portal with responsive user dashboard.<br>
  4. <strong>Phase 4 (Validation & Guardrails):</strong> Implement human oversight points and exception handling.<br><br>
  📧 <strong>Next Steps:</strong> Contact Andris Jancevskis directly at <a href="mailto:andris.jancevskis@gmail.com" class="text-neon-cyan">andris.jancevskis@gmail.com</a> or phone <a href="tel:+447752194449" class="text-neon-cyan">+44 7752 194449</a> to initiate consultation!`;

  // Send message event
  function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    chatInput.value = '';

    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const reply = generateBotReply(text);
      appendMessage(reply, 'bot');
    }, 900);
  }

  chatSendBtn.addEventListener('click', handleSendMessage);

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });

  promptPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const promptText = pill.getAttribute('data-prompt');
      chatInput.value = promptText;
      handleSendMessage();
    });
  });

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      chatMessages.innerHTML = '';
      appendMessage(`System reset complete. Greetings! I am CyberNexus AI Assistant. How can I assist you with Andris Jancevskis's AI & ML studies profile today?`, 'bot');
    });
  }

  function appendMessage(content, sender) {
    const bubble = document.createElement('div');
    bubble.className = `message-bubble message-${sender}`;
    bubble.innerHTML = content;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'message-bubble message-bot typing-dots';
    indicator.innerHTML = 'CyberNexus thinking <span></span><span></span><span></span>';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  function generateBotReply(query) {
    const lower = query.toLowerCase();

    if (lower.includes('evaluate project requirements') || lower.includes('project type:') || lower.includes('required skills:')) {
      return funnelMatchResponse;
    }

    for (let item of knowledgeBase) {
      if (item.keywords.some(k => lower.includes(k))) {
        return item.response;
      }
    }
    return defaultResponse;
  }

  // Check URL query parameters for incoming prompt from Funnel page
  const urlParams = new URLSearchParams(window.location.search);
  const incomingPrompt = urlParams.get('prompt');
  if (incomingPrompt) {
    chatInput.value = incomingPrompt;
    setTimeout(() => {
      handleSendMessage();
    }, 500);
  }
});
