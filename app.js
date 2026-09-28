/**
 * Digital Safety & Literacy Simulator
 * College Societal Project: Education, Digital Literacy and Skill Development
 * 
 * Main Application Controller (Zero-Dependency Vanilla JavaScript)
 */

// Application State
const AppState = {
  currentView: 'home',
  activeCategory: 'sms',
  activeScenarios: [],
  currentScenarioIndex: 0,
  selectedOptionId: null,
  hasAnsweredCurrent: false,
  soundEnabled: true,
  theme: 'dark',
  userName: 'Digital Citizen',

  // Session results for the current quiz run
  session: {
    scenarios: [],
    score: 0,
    maxPossibleScore: 0,
    correctCount: 0,
    partialCount: 0,
    unsafeCount: 0,
    categoryScores: {}
  },

  // Persistent stats saved in localStorage
  persistent: {
    totalPoints: 0,
    scenariosCompleted: 0,
    safeDecisionsCount: 0,
    categoryStats: {},
    unlockedBadges: [],
    userName: 'Digital Citizen'
  }
};

// ===================================================================
// AUDIO SYNTHESIZER (Web Audio API - No External Audio Files Required)
// ===================================================================
const AudioController = {
  audioCtx: null,

  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported in this browser.");
    }
  },

  playSuccess() {
    if (!AppState.soundEnabled) return;
    if (!this.audioCtx) this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(659.25, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.28); // G5

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc1.start(now);
    osc1.stop(now + 0.15);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.4);
  },

  playWarning() {
    if (!AppState.soundEnabled) return;
    if (!this.audioCtx) this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.setValueAtTime(175, now + 0.15); // F3

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  },

  playClick() {
    if (!AppState.soundEnabled) return;
    if (!this.audioCtx) this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }
};

// ===================================================================
// STORAGE & PERSISTENCE
// ===================================================================
const StorageController = {
  STORAGE_KEY: 'digital_safety_simulator_v1',

  load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        AppState.persistent = Object.assign(AppState.persistent, parsed);
        AppState.userName = AppState.persistent.userName || 'Digital Citizen';
      }
      const soundPref = localStorage.getItem('dss_sound');
      if (soundPref !== null) {
        AppState.soundEnabled = soundPref === 'true';
      }
      const themePref = localStorage.getItem('dss_theme');
      if (themePref) {
        AppState.theme = themePref;
        document.documentElement.setAttribute('data-theme', themePref);
      }
    } catch (e) {
      console.warn("LocalStorage access error:", e);
    }
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(AppState.persistent));
      localStorage.setItem('dss_sound', AppState.soundEnabled);
      localStorage.setItem('dss_theme', AppState.theme);
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }
  },

  resetAll() {
    AppState.persistent = {
      totalPoints: 0,
      scenariosCompleted: 0,
      safeDecisionsCount: 0,
      categoryStats: {},
      unlockedBadges: [],
      userName: 'Digital Citizen'
    };
    AppState.userName = 'Digital Citizen';
    this.save();
    ViewController.updateNavScore();
    ViewController.renderDashboard();
    alert("Simulator progress data has been reset to starting state.");
  }
};

// ===================================================================
// VIEW & UI CONTROLLER
// ===================================================================
const ViewController = {
  init() {
    // Nav links click delegation
    document.querySelectorAll('[data-view-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = el.getAttribute('data-view-target');
        const categoryParam = el.getAttribute('data-category-target');
        if (categoryParam) {
          SimulatorEngine.startCategory(categoryParam);
        } else {
          this.switchView(targetView);
        }
      });
    });

    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', AppState.theme);
        themeBtn.textContent = AppState.theme === 'dark' ? '🌙' : '☀️';
        StorageController.save();
        AudioController.playClick();
      });
      themeBtn.textContent = AppState.theme === 'dark' ? '🌙' : '☀️';
    }

    // Sound toggle button
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        AppState.soundEnabled = !AppState.soundEnabled;
        soundBtn.classList.toggle('active', AppState.soundEnabled);
        soundBtn.textContent = AppState.soundEnabled ? '🔔' : '🔕';
        soundBtn.title = AppState.soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted';
        StorageController.save();
        if (AppState.soundEnabled) AudioController.playClick();
      });
      soundBtn.classList.toggle('active', AppState.soundEnabled);
      soundBtn.textContent = AppState.soundEnabled ? '🔔' : '🔕';
    }

    // Mobile nav hamburger toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('site-nav-menu');
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }

    // Reset progress button
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset all your scores and completed scenarios?")) {
          StorageController.resetAll();
        }
      });
    }

    // Initial renders
    this.renderCategoryCards();
    this.renderLessons();
    this.updateNavScore();
  },

  switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    const targetSection = document.getElementById(`${viewId}-view`);
    if (targetSection) {
      targetSection.classList.add('active');
      AppState.currentView = viewId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const activeLink = document.querySelector(`.nav-link[data-view-target="${viewId}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Update URL hash without jumping
    if (window.location.hash !== `#${viewId}`) {
      history.replaceState(null, '', `#${viewId}`);
    }

    // View specific hooks
    if (viewId === 'dashboard') {
      this.renderDashboard();
    } else if (viewId === 'categories') {
      this.renderCategoryCards();
    } else if (viewId === 'simulator' && AppState.activeScenarios.length === 0) {
      SimulatorEngine.startCategory('sms');
    }

    // Close mobile nav if open
    const navMenu = document.getElementById('site-nav-menu');
    if (navMenu) navMenu.classList.remove('open');
  },

  updateNavScore() {
    const scoreValEl = document.getElementById('nav-score-value');
    if (scoreValEl) {
      scoreValEl.textContent = AppState.persistent.totalPoints;
    }
  },

  renderCategoryCards() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;

    grid.innerHTML = CATEGORIES.map(cat => {
      const stats = AppState.persistent.categoryStats[cat.id] || { completed: 0, points: 0 };
      const percent = Math.min(100, Math.round((stats.points / (cat.scenariosCount * 10)) * 100));

      return `
        <div class="category-card" onclick="SimulatorEngine.startCategory('${cat.id}')">
          <div>
            <div class="category-header">
              <div class="category-icon" style="color: ${cat.color};">${cat.icon}</div>
              <span class="category-count-badge">${cat.scenariosCount} Scenarios</span>
            </div>
            <h3 class="category-title">${cat.name}</h3>
            <p class="category-desc">${cat.description}</p>
          </div>
          <div class="category-footer">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
              Score: <strong style="color: #38bdf8;">${stats.points} pts</strong> (${percent}%)
            </span>
            <span class="category-action-link">
              Start Simulation →
            </span>
          </div>
        </div>
      `;
    }).join('');
  },

  renderLessons() {
    const accordion = document.getElementById('lessons-accordion-container');
    if (!accordion) return;

    accordion.innerHTML = LESSONS.map((lesson, idx) => `
      <div class="lesson-item" id="lesson-${lesson.id}">
        <div class="lesson-header" onclick="ViewController.toggleLesson('${lesson.id}')">
          <div class="lesson-title-group">
            <div class="lesson-icon-circle">${lesson.icon}</div>
            <div>
              <span class="badge-role" style="font-size: 0.72rem; color: var(--primary-light); font-weight: 700; text-transform: uppercase;">
                ${lesson.badge}
              </span>
              <h3>${lesson.title}</h3>
              <p class="lesson-summary-peek">${lesson.summary}</p>
            </div>
          </div>
          <span class="lesson-toggle-icon">▼</span>
        </div>
        <div class="lesson-body">
          ${lesson.content}

          <div style="margin-top: 1.5rem;">
            <h4 style="font-size: 0.95rem; text-transform: uppercase; color: #38bdf8; margin-bottom: 0.6rem;">
              📋 Quick Safety Checklist
            </h4>
            <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.9rem; color: var(--text-muted);">
              ${lesson.checklist.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <div class="mini-quiz-card">
            <div class="mini-quiz-header">💡 Mini Knowledge Check</div>
            <div class="mini-quiz-q">${lesson.quickCheck.question}</div>
            <div class="mini-quiz-options" id="quiz-opts-${lesson.id}">
              ${lesson.quickCheck.options.map((opt, oIdx) => `
                <button class="mini-opt-btn" onclick="ViewController.checkLessonQuiz('${lesson.id}', ${oIdx})">
                  ${opt}
                </button>
              `).join('')}
            </div>
            <div class="mini-feedback-text" id="quiz-fb-${lesson.id}" style="display: none;"></div>
          </div>
        </div>
      </div>
    `).join('');
  },

  toggleLesson(lessonId) {
    const el = document.getElementById(`lesson-${lessonId}`);
    if (el) {
      el.classList.toggle('open');
      AudioController.playClick();
    }
  },

  checkLessonQuiz(lessonId, chosenIdx) {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) return;

    const optsContainer = document.getElementById(`quiz-opts-${lessonId}`);
    const fbEl = document.getElementById(`quiz-fb-${lessonId}`);
    if (!optsContainer || !fbEl) return;

    const buttons = optsContainer.querySelectorAll('.mini-opt-btn');
    const isCorrect = chosenIdx === lesson.quickCheck.correctIndex;

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === lesson.quickCheck.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === chosenIdx) {
        btn.classList.add('wrong');
      }
    });

    fbEl.style.display = 'block';
    if (isCorrect) {
      AudioController.playSuccess();
      fbEl.style.background = 'rgba(16, 185, 129, 0.15)';
      fbEl.style.color = '#34d399';
      fbEl.innerHTML = `<strong>✅ Correct!</strong> ${lesson.quickCheck.explanation}`;
    } else {
      AudioController.playWarning();
      fbEl.style.background = 'rgba(239, 68, 68, 0.15)';
      fbEl.style.color = '#f87171';
      fbEl.innerHTML = `<strong>❌ Not quite.</strong> ${lesson.quickCheck.explanation}`;
    }
  },

  filterLessons(category) {
    document.querySelectorAll('.lesson-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === category);
    });

    const items = document.querySelectorAll('.lesson-item');
    items.forEach(item => {
      const id = item.id.replace('lesson-', '');
      const lesson = LESSONS.find(l => l.id === id);
      if (category === 'all' || (lesson && lesson.category === category)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  },

  searchLessons(query) {
    const term = query.toLowerCase().trim();
    document.querySelectorAll('.lesson-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(term) ? 'block' : 'none';
    });
  },

  renderDashboard() {
    const p = AppState.persistent;
    const nameEl = document.getElementById('dash-user-name');
    if (nameEl) nameEl.textContent = AppState.userName;

    const scoreEl = document.getElementById('dash-total-score');
    if (scoreEl) scoreEl.textContent = p.totalPoints;

    const completedEl = document.getElementById('dash-scenarios-completed');
    if (completedEl) completedEl.textContent = p.scenariosCompleted;

    const safeDecisionsEl = document.getElementById('dash-safe-decisions');
    if (safeDecisionsEl) safeDecisionsEl.textContent = p.safeDecisionsCount;

    // Accuracy Calculation
    const accuracy = p.scenariosCompleted > 0
      ? Math.round((p.safeDecisionsCount / p.scenariosCompleted) * 100)
      : 0;

    const accEl = document.getElementById('dash-accuracy-rate');
    if (accEl) accEl.textContent = `${accuracy}%`;

    // Tier badge
    const tierBadgeEl = document.getElementById('dash-tier-badge');
    if (tierBadgeEl) {
      if (p.totalPoints >= 150 && accuracy >= 80) {
        tierBadgeEl.textContent = "Cyber Guardian 🛡️";
        tierBadgeEl.className = "report-badge-tier tier-guardian";
      } else if (p.totalPoints >= 80) {
        tierBadgeEl.textContent = "Digitally Vigilant ⚡";
        tierBadgeEl.className = "report-badge-tier tier-vigilant";
      } else if (p.totalPoints > 0) {
        tierBadgeEl.textContent = "Apprentice Defender 🔍";
        tierBadgeEl.className = "report-badge-tier tier-learner";
      } else {
        tierBadgeEl.textContent = "Novice Explorer 🐣";
        tierBadgeEl.className = "report-badge-tier tier-vulnerable";
      }
    }

    // Render Badges
    const badgeGrid = document.getElementById('dash-badges-grid');
    if (badgeGrid) {
      const allBadges = [
        { id: 'first_step', name: 'First Step', icon: '🚀', desc: 'Completed 1st scenario', earned: p.scenariosCompleted >= 1 },
        { id: 'sms_scout', name: 'SMS Scout', icon: '💬', desc: 'SMS Awareness tested', earned: (p.categoryStats['sms']?.points || 0) >= 20 },
        { id: 'phish_buster', name: 'Phish Buster', icon: '🎣', desc: 'Email Safety tested', earned: (p.categoryStats['email']?.points || 0) >= 20 },
        { id: 'upi_shield', name: 'UPI Shield', icon: '💳', desc: 'Safe Payments master', earned: (p.categoryStats['payments']?.points || 0) >= 20 },
        { id: 'pass_pro', name: 'Passkey Pro', icon: '🔐', desc: 'Account Defense', earned: (p.categoryStats['password']?.points || 0) >= 20 },
        { id: 'guardian', name: 'Master Guardian', icon: '🛡️', desc: 'Over 100 points earned', earned: p.totalPoints >= 100 }
      ];

      badgeGrid.innerHTML = allBadges.map(b => `
        <div class="badge-item ${b.earned ? 'unlocked' : 'locked'}" title="${b.desc}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-name">${b.name}</div>
          <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.2rem;">
            ${b.earned ? 'Unlocked ✨' : 'Locked 🔒'}
          </div>
        </div>
      `).join('');
    }
  }
};

// ===================================================================
// SIMULATOR ENGINE (INTERACTIVE SCENARIO FLOW)
// ===================================================================
const SimulatorEngine = {
  startCategory(categoryId) {
    AppState.activeCategory = categoryId;
    if (categoryId === 'all') {
      // Shuffle 10 scenarios across categories
      AppState.activeScenarios = [...SCENARIOS].sort(() => 0.5 - Math.random()).slice(0, 10);
    } else {
      AppState.activeScenarios = SCENARIOS.filter(s => s.category === categoryId);
    }

    if (AppState.activeScenarios.length === 0) {
      AppState.activeScenarios = [...SCENARIOS];
    }

    // Reset session metrics
    AppState.session = {
      scenarios: [],
      score: 0,
      maxPossibleScore: AppState.activeScenarios.length * 10,
      correctCount: 0,
      partialCount: 0,
      unsafeCount: 0,
      categoryScores: {}
    };

    AppState.currentScenarioIndex = 0;
    ViewController.switchView('simulator');
    this.renderCurrentScenario();
  },

  renderCurrentScenario() {
    const scenario = AppState.activeScenarios[AppState.currentScenarioIndex];
    if (!scenario) {
      ReportEngine.generateReport();
      return;
    }

    AppState.selectedOptionId = null;
    AppState.hasAnsweredCurrent = false;

    // Progress Bar update
    const total = AppState.activeScenarios.length;
    const current = AppState.currentScenarioIndex + 1;
    const percent = Math.round((current / total) * 100);

    const stepTextEl = document.getElementById('sim-step-text');
    if (stepTextEl) stepTextEl.textContent = `Scenario ${current} of ${total}`;

    const fillBarEl = document.getElementById('sim-progress-bar-fill');
    if (fillBarEl) fillBarEl.style.width = `${percent}%`;

    const breadcrumbEl = document.getElementById('sim-breadcrumb-cat');
    if (breadcrumbEl) breadcrumbEl.textContent = scenario.categoryName;

    // Metadata tags
    const threatBadgeEl = document.getElementById('scenario-threat-badge');
    if (threatBadgeEl) threatBadgeEl.innerHTML = `⚠️ Threat: ${scenario.threatType}`;

    const titleEl = document.getElementById('scenario-title');
    if (titleEl) titleEl.textContent = scenario.title;

    const questionEl = document.getElementById('question-prompt');
    if (questionEl) questionEl.textContent = scenario.question;

    // Render Simulated Device Mockup
    this.renderDeviceMockup(scenario);

    // Render Options
    const optionsContainer = document.getElementById('options-list-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = scenario.options.map((opt, idx) => {
        const letters = ['A', 'B', 'C', 'D'];
        return `
          <div class="option-item" id="opt-item-${opt.id}" onclick="SimulatorEngine.selectOption('${opt.id}')">
            <div class="option-radio"></div>
            <div class="option-text">
              <span class="option-label">${letters[idx]}.</span> ${opt.text}
            </div>
          </div>
        `;
      }).join('');
    }

    // Reset button & feedback
    const submitBtn = document.getElementById('btn-submit-answer');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submit Answer";
      submitBtn.onclick = () => SimulatorEngine.submitAnswer();
      submitBtn.style.display = 'block';
    }

    const nextBtn = document.getElementById('btn-next-scenario');
    if (nextBtn) nextBtn.style.display = 'none';

    const fbContainer = document.getElementById('feedback-card-container');
    if (fbContainer) fbContainer.style.display = 'none';
  },

  renderDeviceMockup(scenario) {
    const stage = document.getElementById('device-stage-container');
    if (!stage) return;

    let mockupHtml = '';

    switch (scenario.simulatedType) {
      case 'sms':
        mockupHtml = `
          <div class="phone-frame">
            <div class="phone-notch-bar">
              <span>9:41 AM</span>
              <div class="phone-speaker-slit"></div>
              <span>📶 5G 🔋 88%</span>
            </div>
            <div class="mockup-educational-ribbon">
              ⚠️ SIMULATED SMS • NO REAL DATA ACCESSED
            </div>
            <div class="sms-screen">
              <div class="sms-header">
                <div class="sms-avatar">💬</div>
                <div class="sms-sender-name">${scenario.sender}</div>
                <div class="sms-subtext">SIM 1 • Standard SMS</div>
              </div>
              <div class="sms-timestamp-tag">${scenario.timestamp}</div>
              <div class="sms-bubble">
                ${scenario.messageContent}
              </div>
              <div style="margin-top: auto; padding-top: 1rem; text-align: center;">
                <span style="font-size: 0.72rem; color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); padding: 0.25rem 0.6rem; border-radius: 4px;">
                  🚫 Report as Spam & Block
                </span>
              </div>
            </div>
          </div>
        `;
        break;

      case 'email':
        mockupHtml = `
          <div class="mockup-wrapper email-window">
            <div class="mockup-educational-ribbon">
              ⚠️ SIMULATED EMAIL INBOX • FICTIONAL SCENARIO
            </div>
            <div class="email-toolbar">
              <div class="email-window-controls">
                <span class="control-dot dot-red"></span>
                <span class="control-dot dot-yellow"></span>
                <span class="control-dot dot-green"></span>
              </div>
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Secure Webmail (Simulated)</span>
            </div>
            <div class="email-subject-bar">
              <div class="email-subject">${scenario.title}</div>
              <div class="email-meta-row">
                <span>From: <strong class="email-from-chip">${scenario.sender}</strong></span>
                <span>${scenario.timestamp}</span>
              </div>
            </div>
            <div class="email-security-banner">
              ⚠️ External Sender: This email originated outside your institutional network.
            </div>
            <div class="email-body">
              ${scenario.messageContent}
            </div>
          </div>
        `;
        break;

      case 'payment':
        mockupHtml = `
          <div class="phone-frame">
            <div class="phone-notch-bar">
              <span>2:15 PM</span>
              <div class="phone-speaker-slit"></div>
              <span>📶 5G 🔋 74%</span>
            </div>
            <div class="mockup-educational-ribbon">
              ⚠️ SIMULATED PAYMENT APP • NO REAL TRANSACTIONS
            </div>
            <div class="payment-screen">
              <div class="payment-collect-card">
                <span class="payment-type-badge">🔔 COLLECT REQUEST</span>
                <div style="font-size: 0.85rem; color: #94a3b8;">Requested by:</div>
                <div style="font-weight: 700; color: #f1f5f9; margin-bottom: 0.5rem;">${scenario.sender}</div>
                <div class="payment-amount">₹1,500</div>
                <div class="payment-recipient-id">Remark: Immediate transfer clearance</div>
                <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.8rem; color: #fca5a5;">
                  ⚠️ "Enter UPI PIN to approve payment of ₹1,500"
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 'browser':
        mockupHtml = `
          <div class="mockup-wrapper browser-window">
            <div class="mockup-educational-ribbon">
              ⚠️ SIMULATED BROWSER • NO LIVE NETWORK ACCESS
            </div>
            <div class="browser-header">
              <div class="email-window-controls">
                <span class="control-dot dot-red"></span>
                <span class="control-dot dot-yellow"></span>
                <span class="control-dot dot-green"></span>
              </div>
              <div class="browser-url-bar">
                <span class="url-padlock ${scenario.id === 'web-02' ? 'insecure' : 'secure'}">
                  ${scenario.id === 'web-02' ? '⚠️ Not Secure | http://' : '🔒 https://'}
                </span>
                <span style="color: #f8fafc; font-weight: 600;">
                  ${scenario.id === 'web-01' ? 'www.amaz0n-diwali-mega-deals.shop' : (scenario.id === 'web-02' ? 'netbanking-portal-login.cc/auth' : 'shortened-link-service.xyz')}
                </span>
              </div>
            </div>
            <div class="browser-content">
              <pre style="white-space: pre-wrap; font-family: inherit; line-height: 1.55;">${scenario.messageContent}</pre>
            </div>
          </div>
        `;
        break;

      case 'app-perm':
        mockupHtml = `
          <div class="phone-frame">
            <div class="phone-notch-bar">
              <span>01:20 PM</span>
              <div class="phone-speaker-slit"></div>
              <span>📶 5G 🔋 65%</span>
            </div>
            <div class="mockup-educational-ribbon">
              ⚠️ SIMULATED OS PROMPT • EDUCATIONAL ONLY
            </div>
            <div style="padding: 1.5rem; background: #0f172a; min-height: 380px; display: flex; flex-direction: column; justify-content: center;">
              <div class="permission-dialog-box">
                <div style="font-size: 1.1rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.5rem;">
                  ⚙️ System Permission Request
                </div>
                <div style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">
                  An installed utility application is requesting access to your device components:
                </div>
                <div class="perm-item">
                  <span>📇</span> <span>Read Contacts & Full Call History</span>
                </div>
                <div class="perm-item">
                  <span>💬</span> <span>Read, Receive & Send SMS Messages</span>
                </div>
                <div class="perm-item">
                  <span>📍</span> <span>Precise Location (Always in background)</span>
                </div>
                <div class="perm-item">
                  <span>🎙️</span> <span>Microphone & Audio Recording</span>
                </div>
                <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
                  <span style="flex: 1; text-align: center; padding: 0.5rem; background: #334155; border-radius: 6px; font-size: 0.85rem; font-weight: 700; color: #cbd5e1;">
                    DENY
                  </span>
                  <span style="flex: 1; text-align: center; padding: 0.5rem; background: #4f46e5; border-radius: 6px; font-size: 0.85rem; font-weight: 700; color: #fff;">
                    ALLOW
                  </span>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 'social':
      default:
        mockupHtml = `
          <div class="mockup-wrapper" style="background: #111827; padding: 1.5rem;">
            <div class="mockup-educational-ribbon" style="margin: -1.5rem -1.5rem 1.25rem;">
              ⚠️ SIMULATED SOCIAL PLATFORM • NO PERSONAL ACCOUNTS
            </div>
            <div class="social-post-card">
              <div class="social-author-row">
                <div class="social-avatar">👤</div>
                <div class="social-author-info">
                  <div class="social-name">${scenario.sender}</div>
                  <div class="social-handle">Direct Message Notification • Unverified</div>
                </div>
              </div>
              <pre style="white-space: pre-wrap; font-family: inherit; font-size: 0.92rem; line-height: 1.55; color: #e2e8f0;">${scenario.messageContent}</pre>
            </div>
          </div>
        `;
        break;
    }

    stage.innerHTML = mockupHtml;
  },

  selectOption(optId) {
    if (AppState.hasAnsweredCurrent) return;
    AppState.selectedOptionId = optId;

    document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
    const chosenEl = document.getElementById(`opt-item-${optId}`);
    if (chosenEl) chosenEl.classList.add('selected');

    const submitBtn = document.getElementById('btn-submit-answer');
    if (submitBtn) submitBtn.disabled = false;

    AudioController.playClick();
  },

  submitAnswer() {
    if (AppState.hasAnsweredCurrent || !AppState.selectedOptionId) return;

    const scenario = AppState.activeScenarios[AppState.currentScenarioIndex];
    const chosenOpt = scenario.options.find(o => o.id === AppState.selectedOptionId);
    if (!chosenOpt) return;

    AppState.hasAnsweredCurrent = true;

    // Reveal options visually
    scenario.options.forEach(opt => {
      const itemEl = document.getElementById(`opt-item-${opt.id}`);
      if (!itemEl) return;
      if (opt.type === 'safe') {
        itemEl.classList.add('correct-revealed');
      } else if (opt.id === chosenOpt.id && opt.type === 'unsafe') {
        itemEl.classList.add('unsafe-revealed');
      } else if (opt.id === chosenOpt.id && opt.type === 'partial') {
        itemEl.classList.add('partial-revealed');
      }
    });

    // Score tallying
    const pts = chosenOpt.score;
    AppState.session.score += pts;
    if (chosenOpt.type === 'safe') {
      AppState.session.correctCount++;
      AudioController.playSuccess();
    } else if (chosenOpt.type === 'partial') {
      AppState.session.partialCount++;
      AudioController.playClick();
    } else {
      AppState.session.unsafeCount++;
      AudioController.playWarning();
    }

    // Category breakdown
    if (!AppState.session.categoryScores[scenario.category]) {
      AppState.session.categoryScores[scenario.category] = { earned: 0, possible: 0 };
    }
    AppState.session.categoryScores[scenario.category].earned += pts;
    AppState.session.categoryScores[scenario.category].possible += 10;

    // Record session answer item
    AppState.session.scenarios.push({
      scenario,
      chosenOption: chosenOpt,
      points: pts
    });

    // Update Persistent Totals
    AppState.persistent.totalPoints += pts;
    AppState.persistent.scenariosCompleted += 1;
    if (chosenOpt.type === 'safe') {
      AppState.persistent.safeDecisionsCount += 1;
    }

    if (!AppState.persistent.categoryStats[scenario.category]) {
      AppState.persistent.categoryStats[scenario.category] = { points: 0, completed: 0 };
    }
    AppState.persistent.categoryStats[scenario.category].points += pts;
    AppState.persistent.categoryStats[scenario.category].completed += 1;

    StorageController.save();
    ViewController.updateNavScore();

    // Render Answer Feedback UI
    const fbContainer = document.getElementById('feedback-card-container');
    if (fbContainer) {
      fbContainer.className = `feedback-container ${chosenOpt.type}`;
      fbContainer.style.display = 'block';

      const statusTitle = chosenOpt.type === 'safe'
        ? '✅ Safe Decision!'
        : (chosenOpt.type === 'partial' ? '⚠️ Partially Safe' : '❌ Dangerous / Unsafe Action');

      const pointsLabel = pts > 0 ? `+${pts} Points` : `0 Points`;

      fbContainer.innerHTML = `
        <div class="feedback-header">
          <div class="feedback-status ${chosenOpt.type}">
            ${statusTitle}
          </div>
          <span class="points-chip ${chosenOpt.type}">
            ${pointsLabel}
          </span>
        </div>

        <div class="feedback-explanation">
          <strong>Why:</strong> ${chosenOpt.feedback}
        </div>

        <div class="warning-signs-box">
          <h4>🚩 Warning Signs Detected in this Scenario:</h4>
          <ul class="warning-signs-list">
            ${scenario.redFlags.map(rf => `<li>${rf}</li>`).join('')}
          </ul>
        </div>

        <div class="safe-action-box">
          <strong>🛡️ Recommended Safe Action:</strong>
          <p>${scenario.safeAction}</p>
        </div>

        <div style="font-size: 0.88rem; color: #a5b4fc; background: rgba(99, 102, 241, 0.1); padding: 0.6rem 0.9rem; border-radius: 6px; margin-bottom: 1.25rem;">
          <strong>💡 Digital Literacy Principle:</strong> ${scenario.keyTakeaway}
        </div>

        <button class="btn btn-primary btn-next-scenario" onclick="SimulatorEngine.nextScenario()">
          ${AppState.currentScenarioIndex + 1 < AppState.activeScenarios.length ? 'Next Scenario →' : 'View Digital Safety Report 📊'}
        </button>
      `;

      // Hide old submit button
      const submitBtn = document.getElementById('btn-submit-answer');
      if (submitBtn) submitBtn.style.display = 'none';

      // Scroll smoothly to feedback
      fbContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  nextScenario() {
    AppState.currentScenarioIndex++;
    if (AppState.currentScenarioIndex < AppState.activeScenarios.length) {
      this.renderCurrentScenario();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      ReportEngine.generateReport();
    }
  }
};

// ===================================================================
// REPORT ENGINE ("YOUR DIGITAL SAFETY REPORT")
// ===================================================================
const ReportEngine = {
  generateReport() {
    const s = AppState.session;
    const totalAttempted = s.scenarios.length;
    const accuracy = totalAttempted > 0 ? Math.round((s.correctCount / totalAttempted) * 100) : 0;
    const scorePercent = s.maxPossibleScore > 0 ? Math.round((s.score / s.maxPossibleScore) * 100) : 0;

    ViewController.switchView('report');

    // Tier calculation
    const tierBadge = document.getElementById('report-tier-badge');
    let tierClass = 'tier-guardian';
    let tierText = 'Cyber Guardian 🛡️';
    let tierDesc = 'Exceptional cyber situational awareness! You recognize phishing, safeguard credentials, and verify threats with calm precision.';

    if (scorePercent >= 85) {
      tierClass = 'tier-guardian';
      tierText = 'Cyber Guardian 🛡️';
      tierDesc = 'Outstanding digital literacy! You avoided all major scam traps, safeguarded sensitive OTPs, and verified sources independently.';
    } else if (scorePercent >= 65) {
      tierClass = 'tier-vigilant';
      tierText = 'Digitally Vigilant ⚡';
      tierDesc = 'Good safety habits, but a few sophisticated social engineering tricks caught you off guard. Review the recommended lessons below.';
    } else if (scorePercent >= 40) {
      tierClass = 'tier-learner';
      tierText = 'Apprentice Defender 🔍';
      tierDesc = 'You identified some basic threats, but remain vulnerable to urgency tactics and fake links. Practice with the lessons below.';
    } else {
      tierClass = 'tier-vulnerable';
      tierText = 'Vulnerable to Threats ⚠️';
      tierDesc = 'Caution required! Several critical risks were accepted that could lead to financial theft or identity compromise in real life.';
    }

    if (tierBadge) {
      tierBadge.className = `report-badge-tier ${tierClass}`;
      tierBadge.textContent = tierText;
    }

    const tierDescEl = document.getElementById('report-tier-desc');
    if (tierDescEl) tierDescEl.textContent = tierDesc;

    // Metrics
    const scoreValEl = document.getElementById('report-final-score');
    if (scoreValEl) scoreValEl.textContent = `${s.score} / ${s.maxPossibleScore}`;

    const accValEl = document.getElementById('report-accuracy');
    if (accValEl) accValEl.textContent = `${accuracy}%`;

    const correctValEl = document.getElementById('report-correct-count');
    if (correctValEl) correctValEl.textContent = s.correctCount;

    const attemptedValEl = document.getElementById('report-attempted-count');
    if (attemptedValEl) attemptedValEl.textContent = totalAttempted;

    // Category-wise Breakdown
    const catPerfContainer = document.getElementById('report-category-breakdown-list');
    if (catPerfContainer) {
      const catHtml = Object.keys(s.categoryScores).map(catId => {
        const catInfo = CATEGORIES.find(c => c.id === catId) || { name: catId, color: '#4f46e5' };
        const scoreObj = s.categoryScores[catId];
        const pct = scoreObj.possible > 0 ? Math.round((scoreObj.earned / scoreObj.possible) * 100) : 0;
        return `
          <div class="cat-perf-row">
            <div class="cat-perf-info">
              <span>${catInfo.name}</span>
              <span style="color: #38bdf8;">${scoreObj.earned} / ${scoreObj.possible} pts (${pct}%)</span>
            </div>
            <div class="cat-perf-bar-bg">
              <div class="cat-perf-bar-fill" style="width: ${pct}%; background: ${catInfo.color};"></div>
            </div>
          </div>
        `;
      }).join('');

      catPerfContainer.innerHTML = catHtml || '<p style="color: var(--text-muted);">No category data recorded.</p>';
    }

    // Areas to Improve (Mistake Analysis)
    const improvementsContainer = document.getElementById('report-areas-to-improve');
    if (improvementsContainer) {
      const mistakes = s.scenarios.filter(item => item.chosenOption.type !== 'safe');

      if (mistakes.length === 0) {
        improvementsContainer.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--success); border-radius: 12px; padding: 1.5rem; text-align: center;">
            <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🎉</div>
            <h4 style="color: #34d399; margin-bottom: 0.3rem;">Flawless Safety Record!</h4>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0;">
              You did not make any unsafe or risky decisions during this simulation session. Continue practicing and helping friends remain vigilant!
            </p>
          </div>
        `;
      } else {
        improvementsContainer.innerHTML = mistakes.map(m => `
          <div class="improvement-item">
            <h4>⚠️ ${m.scenario.title} (${m.scenario.categoryName})</h4>
            <p><strong>Your Decision:</strong> <em>"${m.chosenOption.text}"</em></p>
            <p style="color: #fca5a5; margin-top: 0.3rem;">
              <strong>Vulnerability:</strong> ${m.chosenOption.feedback}
            </p>
            <p style="color: #6ee7b7; margin-top: 0.3rem;">
              <strong>Correct Habit:</strong> ${m.scenario.safeAction}
            </p>
          </div>
        `).join('');
      }
    }
  },

  openCertificate() {
    const s = AppState.session;
    const p = AppState.persistent;
    const name = AppState.userName || 'Digital Citizen';
    const score = s.score || p.totalPoints || 0;
    const maxScore = s.maxPossibleScore || 30;
    const accuracy = s.scenarios.length > 0
      ? Math.round((s.correctCount / s.scenarios.length) * 100)
      : (p.scenariosCompleted > 0 ? Math.round((p.safeDecisionsCount / p.scenariosCompleted) * 100) : 100);

    let tierTitle = "Cyber Guardian 🛡️";
    if (accuracy < 60) tierTitle = "Apprentice Defender 🔍";
    else if (accuracy < 85) tierTitle = "Digitally Vigilant ⚡";

    const modal = document.getElementById('certificate-modal');
    const content = document.getElementById('certificate-content');
    if (modal && content) {
      content.innerHTML = `
        <div class="certificate-frame">
          <div class="cert-ribbon">🏆 OFFICIAL DIGITAL LITERACY CITATION</div>
          <h2 class="cert-title">CERTIFICATE OF RECOGNITION</h2>
          <p class="cert-subtitle">College Societal Project: Education, Digital Literacy and Skill Development</p>
          
          <div class="cert-body">
            This is to formally certify that
            <div class="cert-recipient">${name}</div>
            has successfully completed the interactive digital threat assessment on the
            <strong>Digital Safety & Literacy Simulator</strong>, demonstrating practical competence in identifying
            phishing, social engineering, fraudulent payment requests, and online security risks.
          </div>

          <div class="cert-metrics-row">
            <div>
              <span class="cert-lbl">Threat Score</span>
              <span class="cert-val">${score} / ${maxScore} pts</span>
            </div>
            <div>
              <span class="cert-lbl">Safety Accuracy</span>
              <span class="cert-val">${accuracy}%</span>
            </div>
            <div>
              <span class="cert-lbl">Earned Rank</span>
              <span class="cert-val" style="color: #10b981;">${tierTitle}</span>
            </div>
          </div>

          <div class="cert-footer-row">
            <div>
              <div style="font-weight: 700;">National Safety Alignment</div>
              <div style="font-size: 0.75rem; color: #94a3b8;">Ref: 1930 / cybercrime.gov.in</div>
            </div>
            <div>
              <div style="font-weight: 700;">Societal Project Evaluation</div>
              <div style="font-size: 0.75rem; color: #94a3b8;">Certified Software Simulation</div>
            </div>
          </div>
        </div>
      `;
      modal.style.display = 'flex';
      AudioController.playSuccess();
    }
  },

  closeCertificate() {
    const modal = document.getElementById('certificate-modal');
    if (modal) modal.style.display = 'none';
  }
};

// ===================================================================
// APPLICATION INITIALIZATION & ROUTING
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  StorageController.load();
  ViewController.init();

  // Handle URL hash routing
  const handleHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'categories', 'simulator', 'report', 'learn', 'dashboard', 'about'].includes(hash)) {
      ViewController.switchView(hash);
    } else {
      ViewController.switchView('home');
    }
  };

  handleHash();
  window.addEventListener('hashchange', handleHash);
});

