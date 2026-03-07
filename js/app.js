/**
 * GFL5R Field Manual: Main Application
 * Single-page app that loads pre-built HTML pages and JSON data.
 */

(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────────

  // Static HTML content pages (served from pages/)
  const HTML_PAGES = {
    'Setting & T-Dolls':                'pages/setting-and-t-dolls.html',
    'Approaches & Derived Attributes':  'pages/approaches-and-derived-attributes.html',
    'Skills':                           'pages/skills.html',
    'Making a Check':                   'pages/making-a-check.html',
    'A Boy and His Doll':               'pages/a-boy-and-his-doll.html',
    'Building a Commander':             'pages/building-a-commander.html',
    'Building Your T-Doll':             'pages/building-your-t-doll.html',
    'Humanity & Fame':                  'pages/humanity-and-fame.html',
    'Disciplines':                      'pages/disciplines.html',
    'Experience':                       'pages/experience.html',
    'Scenes':                           'pages/scenes.html',
    'Strife':                           'pages/strife.html',
    'Weapons & Armor':                  'pages/weapons-and-armor.html',
    'Harm & Healing':                   'pages/harm-and-healing.html',
    'Conditions':                       'pages/conditions.html',
    'Electronic Warfare':               'pages/electronic-warfare.html',
    'Driving & Vehicles':               'pages/driving-and-vehicles.html',
    'Collapse Radiation':               'pages/collapse-radiation.html',
    'Poisons & Drugs':                  'pages/poisons-and-drugs.html',
    'Crime':                            'pages/crime.html',
  };

  // Defines the reading order for rulebook-style navigation
  const PAGE_ORDER = [
    'Setting & T-Dolls',
    'Approaches & Derived Attributes',
    'Skills',
    'Making a Check',
    'A Boy and His Doll',
    'Building a Commander',
    'Building Your T-Doll',
    'Humanity & Fame',
    'Disciplines',
    'Experience',
    'Scenes',
    'Strife',
    'Weapons & Armor',
    'Harm & Healing',
    'Conditions',
    'Electronic Warfare',
    'Driving & Vehicles',
    'Collapse Radiation',
    'Poisons & Drugs',
    'Crime',
  ];

  // Maps each page to its sidebar section for breadcrumbs
  const PAGE_SECTIONS = {
    'Setting & T-Dolls':                'Overview',
    'Approaches & Derived Attributes':  'Fundamentals',
    'Skills':                           'Fundamentals',
    'Making a Check':                   'Fundamentals',
    'A Boy and His Doll':               'Character Creation',
    'Building a Commander':             'Character Creation',
    'Building Your T-Doll':             'Character Creation',
    'Humanity & Fame':                  'Identity & Growth',
    'Disciplines':                      'Identity & Growth',
    'Experience':                       'Identity & Growth',
    'Scenes':                           'Gameplay',
    'Strife':                           'Gameplay',
    'Weapons & Armor':                  'Combat',
    'Harm & Healing':                   'Combat',
    'Conditions':                       'Combat',
    'Electronic Warfare':               'Subsystems',
    'Driving & Vehicles':               'Subsystems',
    'Collapse Radiation':               'Subsystems',
    'Poisons & Drugs':                  'Subsystems',
    'Crime':                            'Subsystems',
  };

  // JSON data files (built from djson by build.py)
  const DATA_FILES = {
    techniqueTypes:      'data/technique_types.json',
    techniques:          'data/techniques.json',
    advantages:          'data/advantages.json',
    disadvantages:       'data/disadvantages.json',
    passions:            'data/passions.json',
    anxieties:           'data/anxieties.json',
    peculiarityTypes:    'data/peculiarities_types.json',
    moduleTypes:         'data/module_types.json',
    modules:             'data/modules.json',
  };

  // Section display names for breadcrumbs (used by data pages)
  const SECTION_NAMES = {
    'Peculiarities': 'Peculiarities',
    'Items': 'Items',
  };

  // ── State ──────────────────────────────────────────────────────
  let techniqueTypes = {};
  let techniques = {};
  let advantages = {};
  let disadvantages = {};
  let passions = {};
  let anxieties = {};
  let peculiarityTypes = {};
  let moduleTypes = {};
  let modules = {};
  let currentPage = 'home';
  let allSearchableContent = [];
  let techniqueFilters = {
    type: null,
    rank: null,
    approach: null,
    skill: null,
    sortBy: 'rank'
  };

  // ── DOM References ─────────────────────────────────────────────
  const contentInner = document.getElementById('contentInner');
  const sidebar = document.getElementById('sidebar');
  const navToggle = document.getElementById('navToggle');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const wipModalOverlay = document.getElementById('wipModalOverlay');

  // ── Initialize ─────────────────────────────────────────────────
  async function init() {
    setupNavigation();
    setupSearch();
    setupDate();
    setupBackToTop();
    setupSidebarCollapse();
    setupWipModal();

    // Load all JSON data
    await loadAllData();

    // Build search index
    buildSearchIndex();

    // Route from hash or show home
    handleRoute();
    window.addEventListener('hashchange', handleRoute);

    // Hide loading overlay
    setTimeout(() => loadingOverlay.classList.add('hidden'), 300);
  }

  // ── WIP Modal ──────────────────────────────────────────────────
  function setupWipModal() {
    const dismissBtn = document.getElementById('wipModalDismiss');
    function dismiss() {
      wipModalOverlay.classList.add('hidden');
    }
    dismissBtn.addEventListener('click', dismiss);
    wipModalOverlay.addEventListener('click', (e) => {
      if (e.target === wipModalOverlay) dismiss();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') dismiss();
    }, { once: true });
  }

  // ── Navigation ─────────────────────────────────────────────────
  function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        window.location.hash = page;
        // Close sidebar on mobile
        sidebar.classList.remove('open');
      });
    });

    navToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 900 &&
          sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          !navToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  function setupSidebarCollapse() {
    document.querySelectorAll('.sidebar__heading').forEach(heading => {
      heading.addEventListener('click', () => {
        heading.parentElement.classList.toggle('collapsed');
      });
    });
  }

  function setActiveNav(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });
  }

  function handleRoute() {
    const hash = decodeURIComponent(window.location.hash.slice(1)) || 'home';
    navigateTo(hash);
  }

  async function navigateTo(page) {
    currentPage = page;
    setActiveNav(page);
    contentInner.style.animation = 'none';
    contentInner.offsetHeight; // force reflow
    contentInner.style.animation = '';

    window.scrollTo({ top: 0 });

    if (page === 'home') {
      renderHomePage();
    } else if (page.startsWith('techniques-')) {
      // Reset filters for new page
      techniqueFilters = {
        type: null,
        rank: null,
        approach: null,
        skill: null,
        sortBy: 'rank'
      };
      renderTechniquesPage(page);
    } else if (page.startsWith('advantages-')) {
      renderAdvantagesPage(page);
    } else if (page.startsWith('disadvantages-')) {
      renderDisadvantagesPage(page);
    } else if (page.startsWith('passions-')) {
      renderPassionsPage(page);
    } else if (page.startsWith('anxieties-')) {
      renderAnxietiesPage(page);
    } else if (page.startsWith('modules-')) {
      renderModulesPage(page);
    } else if (HTML_PAGES[page]) {
      await renderHTMLPage(page);
    } else {
      render404(page);
    }
  }

  // ── Date Display ───────────────────────────────────────────────
  function setupDate() {
    const d = new Date();
    const dateStr = d.toISOString().split('T')[0].replace(/-/g, '.');
    document.getElementById('currentDate').textContent = dateStr;
  }

  // ── Back to Top ────────────────────────────────────────────────
  function setupBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
  }

  // ── Load All JSON Data ──────────────────────────────────────────
  async function loadAllData() {
    try {
      const [typesData, techData, advData, disData, pasData, anxData, pecTypesData, modTypesData, modData] = await Promise.all([
        fetch(DATA_FILES.techniqueTypes).then(r => r.json()),
        fetch(DATA_FILES.techniques).then(r => r.json()),
        fetch(DATA_FILES.advantages).then(r => r.json()),
        fetch(DATA_FILES.disadvantages).then(r => r.json()),
        fetch(DATA_FILES.passions).then(r => r.json()),
        fetch(DATA_FILES.anxieties).then(r => r.json()),
        fetch(DATA_FILES.peculiarityTypes).then(r => r.json()),
        fetch(DATA_FILES.moduleTypes).then(r => r.json()),
        fetch(DATA_FILES.modules).then(r => r.json()),
      ]);
      techniqueTypes = typesData || {};
      techniques = techData || {};
      advantages = advData || {};
      disadvantages = disData || {};
      passions = pasData || {};
      anxieties = anxData || {};
      peculiarityTypes = pecTypesData || {};
      moduleTypes = modTypesData || {};
      modules = modData || {};
    } catch (e) {
      console.error('Failed to load data:', e);
    }
  }

  // ── Search ─────────────────────────────────────────────────────
  function buildSearchIndex() {
    allSearchableContent = [];

    // Add HTML pages
    Object.keys(HTML_PAGES).forEach(page => {
      allSearchableContent.push({
        title: page,
        section: PAGE_SECTIONS[page] || 'Rules',
        page: page,
        type: 'page',
      });
    });

    // Add techniques
    Object.entries(techniques).forEach(([name, tech]) => {
      allSearchableContent.push({
        title: name,
        section: `Technique: ${tech.type || 'General'}`,
        page: `techniques-${(typeof tech.type === 'string' ? tech.type : 'all').toLowerCase().replace(/\s+/g, '')}`,
        type: 'technique',
        data: tech,
      });
    });

    // Add advantages
    Object.entries(advantages).forEach(([name, adv]) => {
      allSearchableContent.push({
        title: name,
        section: `Advantage: ${adv.type || 'General'}`,
        page: `advantages-${(typeof adv.type === 'string' ? adv.type : 'all').toLowerCase().replace(/\s+/g, '')}`,
        type: 'advantage',
        data: adv,
      });
    });

    // Add disadvantages
    Object.entries(disadvantages).forEach(([name, dis]) => {
      allSearchableContent.push({
        title: name,
        section: `Disadvantage: ${dis.type || 'General'}`,
        page: `disadvantages-${(typeof dis.type === 'string' ? dis.type : 'all').toLowerCase().replace(/\s+/g, '')}`,
        type: 'disadvantage',
        data: dis,
      });
    });

    // Add passions
    Object.entries(passions).forEach(([name, pas]) => {
      const typeLabel = Array.isArray(pas.type) ? pas.type.join(', ') : (pas.type || 'General');
      allSearchableContent.push({
        title: name,
        section: `Passion: ${typeLabel}`,
        page: 'passions-all',
        type: 'passion',
        data: pas,
      });
    });

    // Add anxieties
    Object.entries(anxieties).forEach(([name, anx]) => {
      const typeLabel = Array.isArray(anx.type) ? anx.type.join(', ') : (anx.type || 'General');
      allSearchableContent.push({
        title: name,
        section: `Anxiety: ${typeLabel}`,
        page: 'anxieties-all',
        type: 'anxiety',
        data: anx,
      });
    });

    // Add modules
    Object.entries(modules).forEach(([name, mod]) => {
      allSearchableContent.push({
        title: name,
        section: `Module: ${mod.type || 'General'}`,
        page: `modules-${(mod.type || 'all').toLowerCase().replace(/\s+/g, '')}`,
        type: 'module',
        data: mod,
      });
    });
  }

  function setupSearch() {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => performSearch(searchInput.value), 200);
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.length >= 2) performSearch(searchInput.value);
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  }

  function performSearch(query) {
    if (query.length < 2) {
      searchResults.classList.remove('active');
      return;
    }

    const lower = query.toLowerCase();
    const results = allSearchableContent.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      item.section.toLowerCase().includes(lower)
    ).slice(0, 10);

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">NO RESULTS FOUND</div>';
    } else {
      searchResults.innerHTML = results.map(r => `
        <div class="search-result-item" data-page="${r.page}" data-anchor="${r.type === 'technique' ? r.title : ''}">
          <div class="result-section">${escapeHtml(r.section)}</div>
          <div>${escapeHtml(r.title)}</div>
        </div>
      `).join('');
    }

    searchResults.classList.add('active');

    searchResults.querySelectorAll('.search-result-item[data-page]').forEach(item => {
      item.addEventListener('click', () => {
        window.location.hash = item.dataset.page;
        searchResults.classList.remove('active');
        searchInput.value = '';
      });
    });
  }

  // ── Home Page ──────────────────────────────────────────────────
  function renderHomePage() {
    contentInner.innerHTML = `
      <div class="home-hero">
        <div class="home-hero__title">
          <span class="hero-gfl">GFL</span><span class="hero-5r">5R</span>
        </div>
        <div class="home-hero__subtitle">TACTICAL FIELD MANUAL</div>
        <div class="home-hero__line"></div>
        <p style="color: var(--white-dim); max-width: 600px; margin: 0 auto; line-height: 1.7; font-weight: 300;">
          A tabletop roleplaying game set in the near-future cyberpunk world of <em>Girls' Frontline</em>:
          autonomous T-Dolls, collapse radiation, and asymmetric warfare. Built on <em>Legend of the Five Rings</em>'
          roll-and-keep dice engine, with its framework of basic actions, techniques, advantages, and passions
          ported wholesale into a sci-fi setting.
        </p>
        <p style="color: var(--white-dimmer); max-width: 600px; margin: 0.8em auto 0; line-height: 1.7; font-weight: 300; font-size: 0.9em;">
          <strong style="color: var(--white-dim);">Why GFL5R?</strong>
          It's a portmanteau of two acronyms: <em>GFL</em> from <em>Girls' Frontline</em> and <em>L5R</em> from
          <em>Legend of the Five Rings</em>.
        </p>
      </div>

      <div class="home-grid">
        ${homeCard('[SET]', 'Setting & T-Dolls', 'The world of 2070, T-Doll technology, and the pair dynamic.', 'Setting & T-Dolls')}
        ${homeCard('[COR]', 'Core Rules', 'Checks, approaches, skills, and the fundamental mechanics.', 'Making a Check')}
        ${homeCard('[CHR]', 'Character Creation', 'Build your Commander and T-Doll pair through guided questions.', 'Introduction')}
        ${homeCard('[DSC]', 'Disciplines', 'Class progressions, rank structure, and technique trees.', 'Disciplines')}
        ${homeCard('[STR]', 'Strife & Conditions', 'Stress mechanics, emotional pressure, and status effects.', 'Strife')}
        ${homeCard('[WPN]', 'Weapons & Armor', 'Weapon profiles, categories, armor, and equipment.', 'Weapons & Armor')}
        ${homeCard('[EWR]', 'Electronic Warfare', 'Hacking, networks, nodes, sentries, and digital operations.', 'Electronic Warfare')}
        ${homeCard('[VEH]', 'Driving & Vehicles', 'Chase mechanics, vehicle combat, and positions.', 'Driving & Vehicles')}
        ${homeCard('[RAD]', 'Collapse Radiation', 'Exposure, ELID, contamination zones, and protective measures.', 'Collapse Radiation')}
        ${homeCard('[CRM]', 'Crime & Investigation', 'Evidence, investigation checks, and accusation mechanics.', 'Crime')}
        ${homeCard('[TCH]', 'Techniques', Object.keys(techniques).length + ' combat, electronic warfare, and street techniques.', 'techniques-all')}
        ${homeCard('[PEC]', 'Peculiarities', Object.keys(advantages).length + ' Advantages, ' + Object.keys(disadvantages).length + ' Disadvantages, ' + Object.keys(passions).length + ' Passions, and ' + Object.keys(anxieties).length + ' Anxieties.', 'advantages-all')}
        ${homeCard('[MOD]', 'T-Doll Modules', Object.keys(modules).length + ' augmentations, flash training packages, and upgrades.', 'modules-all')}
      </div>
    `;

    // Attach click handlers to cards
    contentInner.querySelectorAll('.home-card').forEach(card => {
      card.addEventListener('click', () => {
        window.location.hash = card.dataset.page;
      });
    });
  }

  function homeCard(icon, title, desc, page) {
    return `
      <div class="home-card" data-page="${page}">
        <div class="home-card__icon">${icon}</div>
        <div class="home-card__title">${title}</div>
        <div class="home-card__desc">${desc}</div>
        <div class="home-card__corner home-card__corner--tl"></div>
        <div class="home-card__corner home-card__corner--tr"></div>
        <div class="home-card__corner home-card__corner--bl"></div>
        <div class="home-card__corner home-card__corner--br"></div>
      </div>
    `;
  }

  // ── HTML Page ───────────────────────────────────────────────────
  async function renderHTMLPage(page) {
    const url = HTML_PAGES[page];
    if (!url) { render404(page); return; }

    contentInner.innerHTML = `
      <div class="loading-spinner" style="padding: 60px 0;">
        <div class="spinner-ring"></div>
        <div class="spinner-text">LOADING...</div>
      </div>
    `;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();

      const section = PAGE_SECTIONS[page] || 'Rules';

      // Determine prev/next pages in reading order
      const pageIdx = PAGE_ORDER.indexOf(page);
      const prevPage = pageIdx > 0 ? PAGE_ORDER[pageIdx - 1] : null;
      const nextPage = pageIdx >= 0 && pageIdx < PAGE_ORDER.length - 1 ? PAGE_ORDER[pageIdx + 1] : null;

      const pageNavHtml = (prevPage || nextPage) ? `
        <div class="page-nav">
          ${prevPage ? `<a href="#${prevPage}" class="page-nav__link page-nav__prev">
            <span class="page-nav__arrow">←</span>
            <span class="page-nav__label">
              <span class="page-nav__dir">PREVIOUS</span>
              <span class="page-nav__title">${prevPage}</span>
            </span>
          </a>` : '<span></span>'}
          ${nextPage ? `<a href="#${nextPage}" class="page-nav__link page-nav__next">
            <span class="page-nav__label">
              <span class="page-nav__dir">NEXT</span>
              <span class="page-nav__title">${nextPage}</span>
            </span>
            <span class="page-nav__arrow">→</span>
          </a>` : '<span></span>'}
        </div>
      ` : '';

      contentInner.innerHTML = `
        <div class="breadcrumb">
          <a href="#home">HOME</a>
          <span class="sep">›</span>
          <a href="#${page}">${section.toUpperCase()}</a>
          <span class="sep">›</span>
          ${page.toUpperCase()}
        </div>
        ${html}
        ${pageNavHtml}
      `;

      // Process content links to use hash navigation
      contentInner.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http')) {
          const resolved = resolvePageLink(href);
          if (resolved) {
            link.setAttribute('href', '#' + resolved);
            link.addEventListener('click', (e) => {
              e.preventDefault();
              window.location.hash = resolved;
            });
          }
        }
      });

      initTabComponents(contentInner);
    } catch (e) {
      console.error('Failed to load page:', e);
      contentInner.innerHTML = `
        <div class="breadcrumb">
          <a href="#home">HOME</a>
          <span class="sep">›</span>
          ERROR
        </div>
        <h1>TRANSMISSION ERROR</h1>
        <p>Failed to load <strong>${escapeHtml(page)}</strong>. Ensure the data files are accessible.</p>
        <p style="color: var(--white-dimmer); font-family: var(--font-mono); font-size: 0.8rem;">
          ${escapeHtml(e.message)}
        </p>
      `;
    }
  }

  // ── Tab Components ─────────────────────────────────────────────
  function initTabComponents(container) {
    container.querySelectorAll('.tab-card').forEach(card => {
      const btns = card.querySelectorAll('.tab-btn');
      const panels = card.querySelectorAll('.tab-panel');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('active'));
          panels.forEach(p => p.classList.remove('active'));
          btn.classList.add('active');
          const target = btn.dataset.target;
          const panel = card.querySelector('#' + target);
          if (panel) panel.classList.add('active');
        });
      });
    });
  }

  function resolvePageLink(href) {
    // Try to match common link patterns to known pages
    let clean = decodeURIComponent(href).replace(/\.html$/, '').replace(/\.md$/, '');
    // Strip relative path prefixes
    clean = clean.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');

    // Direct match against HTML_PAGES keys
    if (HTML_PAGES[clean]) return clean;

    // Try matching the last parts of the path
    for (const key of Object.keys(HTML_PAGES)) {
      if (key.endsWith(clean)) return key;
    }

    return null;
  }

  // ── Techniques Page ────────────────────────────────────────────
  function renderTechniquesPage(page) {
    const filterType = page.replace('techniques-', '');
    const typeMap = {
      'all': null,
      'combat': 'Combat',
      'ew': 'Electronic Warfare',
      'electronicwarfare': 'Electronic Warfare',
      'street': 'Street',
      'conditioning': 'Conditioning',
      'science': 'Science',
      'social': 'Social',
      'vehicle': 'Vehicle',
      'remolding': 'Remolding',
    };

    // Set initial type from hash if not set
    if (techniqueFilters.type === null) {
      techniqueFilters.type = typeMap[filterType] || null;
    }

    // Filter techniques
    let filtered = Object.entries(techniques).filter(([name, tech]) => {
      if (techniqueFilters.type && tech.type !== techniqueFilters.type) return false;
      if (techniqueFilters.rank && tech.rank !== techniqueFilters.rank) return false;
      if (techniqueFilters.approach) {
        const approaches = Array.isArray(tech.approach) ? tech.approach : [tech.approach];
        if (!approaches.includes(techniqueFilters.approach)) return false;
      }
      if (techniqueFilters.skill) {
        const skills = Array.isArray(tech.skill) ? tech.skill : [tech.skill];
        if (!skills.includes(techniqueFilters.skill)) return false;
      }
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      const techA = a[1], techB = b[1];
      if (techniqueFilters.sortBy === 'rank') {
        const rankDiff = (techA.rank || 0) - (techB.rank || 0);
        if (rankDiff !== 0) return rankDiff;
        return a[0].localeCompare(b[0]);
      } else if (techniqueFilters.sortBy === 'name') {
        return a[0].localeCompare(b[0]);
      } else if (techniqueFilters.sortBy === 'type') {
        const typeDiff = (techA.type || '').localeCompare(techB.type || '');
        if (typeDiff !== 0) return typeDiff;
        return a[0].localeCompare(b[0]);
      } else if (techniqueFilters.sortBy === 'approach') {
        const appA = Array.isArray(techA.approach) ? techA.approach.join(', ') : (techA.approach || '');
        const appB = Array.isArray(techB.approach) ? techB.approach.join(', ') : (techB.approach || '');
        const appDiff = appA.localeCompare(appB);
        if (appDiff !== 0) return appDiff;
        return a[0].localeCompare(b[0]);
      } else if (techniqueFilters.sortBy === 'skill') {
        const skillA = Array.isArray(techA.skill) ? techA.skill.join(', ') : (techA.skill || '');
        const skillB = Array.isArray(techB.skill) ? techB.skill.join(', ') : (techB.skill || '');
        const skillDiff = skillA.localeCompare(skillB);
        if (skillDiff !== 0) return skillDiff;
        return a[0].localeCompare(b[0]);
      }
      return a[0].localeCompare(b[0]);
    });

    // Group by rank if sorting by rank, else no grouping
    let byRank = {};
    if (techniqueFilters.sortBy === 'rank') {
      filtered.forEach(([name, tech]) => {
        const rank = tech.rank || 0;
        if (!byRank[rank]) byRank[rank] = [];
        byRank[rank].push([name, tech]);
      });
    } else {
      byRank = { 'all': filtered };
    }

    // Type description
    const activeType = techniqueFilters.type;
    const typeDesc = activeType && techniqueTypes[activeType]
      ? techniqueTypes[activeType].description.trim()
      : 'All available techniques across every discipline and specialization.';

    // Type icons
    const typeIcons = {
      'Combat': '<img src="assets/Technique-Combat.svg" alt="Combat" class="technique-icon">',
      'Electronic Warfare': '<img src="assets/Technique-EW.svg" alt="Electronic Warfare" class="technique-icon">',
      'Street': '<img src="assets/Technique-Street.svg" alt="Street" class="technique-icon">',
      'Conditioning': '<img src="assets/Technique-Conditioning.svg" alt="Conditioning" class="technique-icon">',
      'Science': '<img src="assets/Technique-Science.svg" alt="Science" class="technique-icon">',
      'Social': '<img src="assets/Technique-Social.svg" alt="Social" class="technique-icon">',
      'Vehicle': '<img src="assets/Technique-Vehicle.svg" alt="Vehicle" class="technique-icon">',
      'Remolding': '<img src="assets/Technique-Remolding.svg" alt="Remolding" class="technique-icon">',
    };

    const title = activeType || 'All Techniques';
    const icon = typeIcons[activeType] || '◆';

    // Dropdown options
    const typeOptions = ['All', 'Combat', 'Electronic Warfare', 'Street', 'Conditioning', 'Science', 'Social', 'Vehicle', 'Remolding'];
    const rankOptions = ['All', 1, 2, 3];
    const approachOptions = ['All', 'Fortune', 'Power', 'Precision', 'Resilience', 'Swiftness'];
    const skillOptions = ['All', 'Blades', 'Computers', 'Conditioning', 'Deception', 'Explosives', 'Firearms', 'Hand-to-Hand', 'Resolve', 'Science', 'Stealth', 'Subterfuge', 'Survival', 'Tactics'];
    const sortOptions = ['rank', 'name', 'type', 'approach', 'skill'];

    let html = `
      <div class="breadcrumb">
        <a href="#home">HOME</a>
        <span class="sep">›</span>
        <a href="#techniques-all">TECHNIQUES</a>
        ${activeType ? `<span class="sep">›</span>${activeType.toUpperCase()}` : ''}
      </div>

      <div class="type-header">
        <div class="type-header__icon">${icon}</div>
        <div class="type-header__info">
          <h1>${title.toUpperCase()}</h1>
          <div class="type-header__desc">${escapeHtml(typeDesc)}</div>
        </div>
      </div>

      <div class="technique-filters">
        <select id="filter-type" class="filter-dropdown">
          ${typeOptions.map(opt => `<option value="${opt === 'All' ? '' : opt}" ${techniqueFilters.type === (opt === 'All' ? null : opt) ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>
        <select id="filter-rank" class="filter-dropdown">
          ${rankOptions.map(opt => `<option value="${opt === 'All' ? '' : opt}" ${techniqueFilters.rank === (opt === 'All' ? null : opt) ? 'selected' : ''}>Rank ${opt}</option>`).join('')}
        </select>
        <select id="filter-approach" class="filter-dropdown">
          ${approachOptions.map(opt => `<option value="${opt === 'All' ? '' : opt}" ${techniqueFilters.approach === (opt === 'All' ? null : opt) ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>
        <select id="filter-skill" class="filter-dropdown">
          ${skillOptions.map(opt => `<option value="${opt === 'All' ? '' : opt}" ${techniqueFilters.skill === (opt === 'All' ? null : opt) ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>
        <select id="sort-by" class="filter-dropdown">
          ${sortOptions.map(opt => `<option value="${opt}" ${techniqueFilters.sortBy === opt ? 'selected' : ''}>Sort by ${opt.charAt(0).toUpperCase() + opt.slice(1)}</option>`).join('')}
        </select>
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--white-dimmer); letter-spacing: 1px; margin-bottom: 20px;">
        ${filtered.length} TECHNIQUE${filtered.length !== 1 ? 'S' : ''} FOUND
      </div>
    `;

    // Render
    if (techniqueFilters.sortBy === 'rank') {
      Object.keys(byRank).sort((a, b) => a - b).forEach(rank => {
        html += `
          <div class="rank-divider">
            <div class="rank-divider__line"></div>
            <div class="rank-divider__label">RANK ${rank}</div>
            <div class="rank-divider__line"></div>
          </div>
          <div class="technique-grid">
        `;

        byRank[rank].forEach(([name, tech]) => {
          html += renderTechniqueCard(name, tech);
        });

        html += '</div>';
      });
    } else {
      html += '<div class="technique-grid">';
      filtered.forEach(([name, tech]) => {
        html += renderTechniqueCard(name, tech);
      });
      html += '</div>';
    }

    contentInner.innerHTML = html;
    attachTechniqueFilterHandlers();
    attachCardToggleHandlers();
  }

  function renderTechniqueCard(name, tech) {
    const approach = tech.approach
      ? (Array.isArray(tech.approach) ? tech.approach.join(', ') : tech.approach)
      : null;
    const skill = tech.skill
      ? (Array.isArray(tech.skill) ? tech.skill.join(', ') : tech.skill)
      : null;

    return `
      <div class="technique-card">
        <div class="technique-card__corner technique-card__corner--tl"></div>
        <div class="technique-card__corner technique-card__corner--tr"></div>
        <div class="technique-card__corner technique-card__corner--bl"></div>
        <div class="technique-card__corner technique-card__corner--br"></div>

        <div class="technique-card__header">
          <div class="technique-card__name">${escapeHtml(name)}</div>
          <div class="technique-card__meta">
            <span class="technique-card__tag tag-rank">RANK ${tech.rank || '?'}</span>
            <span class="technique-card__tag tag-type">${escapeHtml(tech.type || 'GENERAL')}</span>
            ${approach ? `<span class="technique-card__tag tag-approach">${escapeHtml(approach)}</span>` : ''}
            ${skill ? `<span class="technique-card__tag tag-skill">${escapeHtml(skill)}</span>` : ''}
          </div>
        </div>

        ${tech.flavor ? `<div class="technique-card__flavor">${escapeHtml(tech.flavor)}</div>` : ''}

        <div class="technique-card__toggle"></div>

        <div class="technique-card__body">
          ${tech.description || '<p>No description available.</p>'}
        </div>
      </div>
    `;
  }

  // ── Advantages Page ─────────────────────────────────────────────
  function renderAdvantagesPage(page) {
    const filterSlug = page.replace('advantages-', '');

    // Build unique types from data
    const allTypes = [...new Set(
      Object.values(advantages).flatMap(a => Array.isArray(a.type) ? a.type : [a.type]).filter(Boolean)
    )].sort();

    // Resolve active type from slug
    const activeType = allTypes.find(
      t => t.toLowerCase().replace(/\s+/g, '') === filterSlug
    ) || null;

    // Filter
    const filtered = Object.entries(advantages).filter(([name, adv]) => {
      if (!activeType) return true;
      return adv.type === activeType;
    });

    // Sort alphabetically
    filtered.sort((a, b) => a[0].localeCompare(b[0]));

    const title = activeType ? `${activeType} Advantages` : 'All Advantages';

    const typeDesc = activeType
      ? (peculiarityTypes[activeType]?.description?.trim() || '')
      : 'All available advantages across every type. Each advantage allows you to reroll up to two dice when its conditions are met.';

    const typeIcons = { 'Interpersonal': '◇', 'Physical': '◎', 'Fame': '★', 'Technical': '⬡' };
    const icon = typeIcons[activeType] || '◆';

    let html = `
      <div class="breadcrumb">
        <a href="#home">HOME</a>
        <span class="sep">›</span>
        <a href="#advantages-all">PECULIARITIES</a>
        <span class="sep">›</span>
        <a href="#advantages-all">ADVANTAGES</a>
        ${activeType ? `<span class="sep">›</span>${activeType.toUpperCase()}` : ''}
      </div>

      <div class="type-header">
        <div class="type-header__icon">${icon}</div>
        <div class="type-header__info">
          <h1>${title.toUpperCase()}</h1>
          <div class="type-header__desc">${typeDesc || escapeHtml(typeDesc)}</div>
        </div>
      </div>

      <div class="technique-filters">
        ${filterBtn('ALL', 'advantages-all', !activeType)}
        ${allTypes.map(t => filterBtn(t.toUpperCase(), `advantages-${t.toLowerCase().replace(/\s+/g, '')}`, activeType === t)).join('')}
      </div>

      <div class="technique-filters" style="margin-top: -10px; margin-bottom: 15px;">
        ${filterBtn('⇄ DISADVANTAGES', 'disadvantages-all', false)}
        ${filterBtn('⇄ PASSIONS', 'passions-all', false)}
        ${filterBtn('⇄ ANXIETIES', 'anxieties-all', false)}
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--white-dimmer); letter-spacing: 1px; margin-bottom: 20px;">
        ${filtered.length} ADVANTAGE${filtered.length !== 1 ? 'S' : ''} FOUND
      </div>

      <div class="technique-grid">
    `;

    filtered.forEach(([name, adv]) => {
      html += renderAdvantageCard(name, adv);
    });

    html += '</div>';

    contentInner.innerHTML = html;
    attachFilterHandlers();
    attachCardToggleHandlers();
  }

  function renderAdvantageCard(name, adv) {
    return `
      <div class="technique-card">
        <div class="technique-card__corner technique-card__corner--tl"></div>
        <div class="technique-card__corner technique-card__corner--tr"></div>
        <div class="technique-card__corner technique-card__corner--bl"></div>
        <div class="technique-card__corner technique-card__corner--br"></div>

        <div class="technique-card__header">
          <div class="technique-card__name">${escapeHtml(name)}</div>
          <div class="technique-card__meta">
            <span class="technique-card__tag tag-type">${escapeHtml(adv.type || 'GENERAL')}</span>
            <span class="technique-card__tag tag-approach">REROLL 2 DICE</span>
          </div>
        </div>

        <div class="technique-card__toggle"></div>

        <div class="technique-card__body">
          ${adv.flavor ? `<div class="technique-card__flavor">${escapeHtml(adv.flavor)}</div>` : ''}
          ${adv.description || '<p>No description available.</p>'}
        </div>
      </div>
    `;
  }

  // ── Passions Page ─────────────────────────────────────────────
  function renderPassionsPage(page) {
    const filterSlug = page.replace('passions-', '');

    // Build unique types from data (passions have array types)
    const allTypes = [...new Set(
      Object.values(passions).flatMap(p => Array.isArray(p.type) ? p.type : [p.type]).filter(Boolean)
    )].sort();

    // Resolve active type from slug
    const activeType = allTypes.find(
      t => t.toLowerCase().replace(/\s+/g, '') === filterSlug
    ) || null;

    // Filter
    const filtered = Object.entries(passions).filter(([name, pas]) => {
      if (!activeType) return true;
      const types = Array.isArray(pas.type) ? pas.type : [pas.type];
      return types.includes(activeType);
    });

    // Sort alphabetically
    filtered.sort((a, b) => a[0].localeCompare(b[0]));

    const title = activeType ? `${activeType} Passions` : 'All Passions';

    const typeDesc = activeType
      ? (peculiarityTypes[activeType]?.description?.trim() || '')
      : 'All available passions. Each passion allows you to remove 3 Strife after a check that engages its theme.';

    const typeIcons = { 'Mental': '⬡', 'Physical': '◎', 'Interpersonal': '◇', 'Spiritual': '✧' };
    const icon = typeIcons[activeType] || '◆';

    let html = `
      <div class="breadcrumb">
        <a href="#home">HOME</a>
        <span class="sep">›</span>
        <a href="#passions-all">PECULIARITIES</a>
        <span class="sep">›</span>
        <a href="#passions-all">PASSIONS</a>
        ${activeType ? `<span class="sep">›</span>${activeType.toUpperCase()}` : ''}
      </div>

      <div class="type-header">
        <div class="type-header__icon">${icon}</div>
        <div class="type-header__info">
          <h1>${title.toUpperCase()}</h1>
          <div class="type-header__desc">${typeDesc || escapeHtml(typeDesc)}</div>
        </div>
      </div>

      <div class="technique-filters">
        ${filterBtn('ALL', 'passions-all', !activeType)}
        ${allTypes.map(t => filterBtn(t.toUpperCase(), `passions-${t.toLowerCase().replace(/\s+/g, '')}`, activeType === t)).join('')}
      </div>

      <div class="technique-filters" style="margin-top: -10px; margin-bottom: 15px;">
        ${filterBtn('⇄ ADVANTAGES', 'advantages-all', false)}
        ${filterBtn('⇄ DISADVANTAGES', 'disadvantages-all', false)}
        ${filterBtn('⇄ ANXIETIES', 'anxieties-all', false)}
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--white-dimmer); letter-spacing: 1px; margin-bottom: 20px;">
        ${filtered.length} PASSION${filtered.length !== 1 ? 'S' : ''} FOUND
      </div>

      <div class="technique-grid">
    `;

    filtered.forEach(([name, pas]) => {
      html += renderPassionCard(name, pas);
    });

    html += '</div>';

    contentInner.innerHTML = html;
    attachFilterHandlers();
    attachCardToggleHandlers();
  }

  function renderPassionCard(name, pas) {
    const typeLabel = Array.isArray(pas.type) ? pas.type.join(', ') : (pas.type || 'General');

    return `
      <div class="technique-card">
        <div class="technique-card__corner technique-card__corner--tl"></div>
        <div class="technique-card__corner technique-card__corner--tr"></div>
        <div class="technique-card__corner technique-card__corner--bl"></div>
        <div class="technique-card__corner technique-card__corner--br"></div>

        <div class="technique-card__header">
          <div class="technique-card__name">${escapeHtml(name)}</div>
          <div class="technique-card__meta">
            <span class="technique-card__tag tag-type">${escapeHtml(typeLabel)}</span>
            <span class="technique-card__tag tag-skill">−3 STRIFE</span>
          </div>
        </div>

        <div class="technique-card__toggle"></div>

        <div class="technique-card__body">
          ${pas.flavor ? `<div class="technique-card__flavor">${escapeHtml(pas.flavor)}</div>` : ''}
          ${pas.description || '<p>No description available.</p>'}
        </div>
      </div>
    `;
  }

  // ── Disadvantages Page ─────────────────────────────────────────
  function renderDisadvantagesPage(page) {
    const filterSlug = page.replace('disadvantages-', '');

    // Build unique types from data
    const allTypes = [...new Set(
      Object.values(disadvantages).flatMap(d => Array.isArray(d.type) ? d.type : [d.type]).filter(Boolean)
    )].sort();

    // Resolve active type from slug
    const activeType = allTypes.find(
      t => t.toLowerCase().replace(/\s+/g, '') === filterSlug
    ) || null;

    // Filter
    const filtered = Object.entries(disadvantages).filter(([name, dis]) => {
      if (!activeType) return true;
      return dis.type === activeType;
    });

    // Sort alphabetically
    filtered.sort((a, b) => a[0].localeCompare(b[0]));

    const title = activeType ? `${activeType} Disadvantages` : 'All Disadvantages';

    const typeDesc = activeType
      ? (peculiarityTypes[activeType]?.description?.trim() || '')
      : 'All available disadvantages across every type. Each disadvantage forces rerolls of favorable dice when its conditions are met.';

    const typeIcons = { 'Interpersonal': '◇', 'Physical': '◎', 'Fame': '★', 'Technical': '⬡' };
    const icon = typeIcons[activeType] || '◆';

    let html = `
      <div class="breadcrumb">
        <a href="#home">HOME</a>
        <span class="sep">›</span>
        <a href="#disadvantages-all">PECULIARITIES</a>
        <span class="sep">›</span>
        <a href="#disadvantages-all">DISADVANTAGES</a>
        ${activeType ? `<span class="sep">›</span>${activeType.toUpperCase()}` : ''}
      </div>

      <div class="type-header">
        <div class="type-header__icon">${icon}</div>
        <div class="type-header__info">
          <h1>${title.toUpperCase()}</h1>
          <div class="type-header__desc">${typeDesc || escapeHtml(typeDesc)}</div>
        </div>
      </div>

      <div class="technique-filters">
        ${filterBtn('ALL', 'disadvantages-all', !activeType)}
        ${allTypes.map(t => filterBtn(t.toUpperCase(), `disadvantages-${t.toLowerCase().replace(/\s+/g, '')}`, activeType === t)).join('')}
      </div>

      <div class="technique-filters" style="margin-top: -10px; margin-bottom: 15px;">
        ${filterBtn('⇄ ADVANTAGES', 'advantages-all', false)}
        ${filterBtn('⇄ PASSIONS', 'passions-all', false)}
        ${filterBtn('⇄ ANXIETIES', 'anxieties-all', false)}
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--white-dimmer); letter-spacing: 1px; margin-bottom: 20px;">
        ${filtered.length} DISADVANTAGE${filtered.length !== 1 ? 'S' : ''} FOUND
      </div>

      <div class="technique-grid">
    `;

    filtered.forEach(([name, dis]) => {
      html += renderDisadvantageCard(name, dis);
    });

    html += '</div>';

    contentInner.innerHTML = html;
    attachFilterHandlers();
    attachCardToggleHandlers();
  }

  function renderDisadvantageCard(name, dis) {
    return `
      <div class="technique-card">
        <div class="technique-card__corner technique-card__corner--tl"></div>
        <div class="technique-card__corner technique-card__corner--tr"></div>
        <div class="technique-card__corner technique-card__corner--bl"></div>
        <div class="technique-card__corner technique-card__corner--br"></div>

        <div class="technique-card__header">
          <div class="technique-card__name">${escapeHtml(name)}</div>
          <div class="technique-card__meta">
            <span class="technique-card__tag tag-type">${escapeHtml(dis.type || 'GENERAL')}</span>
            <span class="technique-card__tag tag-rank">REROLL 2 DICE</span>
          </div>
        </div>

        <div class="technique-card__toggle"></div>

        <div class="technique-card__body">
          ${dis.flavor ? `<div class="technique-card__flavor">${escapeHtml(dis.flavor)}</div>` : ''}
          ${dis.description || '<p>No description available.</p>'}
        </div>
      </div>
    `;
  }

  // ── Anxieties Page ─────────────────────────────────────────────
  function renderAnxietiesPage(page) {
    const filterSlug = page.replace('anxieties-', '');

    // Build unique types from data (anxieties have array types)
    const allTypes = [...new Set(
      Object.values(anxieties).flatMap(a => Array.isArray(a.type) ? a.type : [a.type]).filter(Boolean)
    )].sort();

    // Resolve active type from slug
    const activeType = allTypes.find(
      t => t.toLowerCase().replace(/\s+/g, '') === filterSlug
    ) || null;

    // Filter
    const filtered = Object.entries(anxieties).filter(([name, anx]) => {
      if (!activeType) return true;
      const types = Array.isArray(anx.type) ? anx.type : [anx.type];
      return types.includes(activeType);
    });

    // Sort alphabetically
    filtered.sort((a, b) => a[0].localeCompare(b[0]));

    const title = activeType ? `${activeType} Anxieties` : 'All Anxieties';

    const typeDesc = activeType
      ? (peculiarityTypes[activeType]?.description?.trim() || '')
      : 'All available anxieties. Each anxiety causes you to gain 3 Strife when a check engages its theme.';

    const typeIcons = { 'Mental': '⬡', 'Physical': '◎', 'Interpersonal': '◇', 'Spiritual': '✧' };
    const icon = typeIcons[activeType] || '◆';

    let html = `
      <div class="breadcrumb">
        <a href="#home">HOME</a>
        <span class="sep">›</span>
        <a href="#anxieties-all">PECULIARITIES</a>
        <span class="sep">›</span>
        <a href="#anxieties-all">ANXIETIES</a>
        ${activeType ? `<span class="sep">›</span>${activeType.toUpperCase()}` : ''}
      </div>

      <div class="type-header">
        <div class="type-header__icon">${icon}</div>
        <div class="type-header__info">
          <h1>${title.toUpperCase()}</h1>
          <div class="type-header__desc">${typeDesc || escapeHtml(typeDesc)}</div>
        </div>
      </div>

      <div class="technique-filters">
        ${filterBtn('ALL', 'anxieties-all', !activeType)}
        ${allTypes.map(t => filterBtn(t.toUpperCase(), `anxieties-${t.toLowerCase().replace(/\s+/g, '')}`, activeType === t)).join('')}
      </div>

      <div class="technique-filters" style="margin-top: -10px; margin-bottom: 15px;">
        ${filterBtn('⇄ ADVANTAGES', 'advantages-all', false)}
        ${filterBtn('⇄ DISADVANTAGES', 'disadvantages-all', false)}
        ${filterBtn('⇄ PASSIONS', 'passions-all', false)}
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--white-dimmer); letter-spacing: 1px; margin-bottom: 20px;">
        ${filtered.length} ANXIET${filtered.length !== 1 ? 'IES' : 'Y'} FOUND
      </div>

      <div class="technique-grid">
    `;

    filtered.forEach(([name, anx]) => {
      html += renderAnxietyCard(name, anx);
    });

    html += '</div>';

    contentInner.innerHTML = html;
    attachFilterHandlers();
    attachCardToggleHandlers();
  }

  function renderAnxietyCard(name, anx) {
    const typeLabel = Array.isArray(anx.type) ? anx.type.join(', ') : (anx.type || 'General');

    return `
      <div class="technique-card">
        <div class="technique-card__corner technique-card__corner--tl"></div>
        <div class="technique-card__corner technique-card__corner--tr"></div>
        <div class="technique-card__corner technique-card__corner--bl"></div>
        <div class="technique-card__corner technique-card__corner--br"></div>

        <div class="technique-card__header">
          <div class="technique-card__name">${escapeHtml(name)}</div>
          <div class="technique-card__meta">
            <span class="technique-card__tag tag-type">${escapeHtml(typeLabel)}</span>
            <span class="technique-card__tag tag-rank">+3 STRIFE</span>
          </div>
        </div>

        <div class="technique-card__toggle"></div>

        <div class="technique-card__body">
          ${anx.flavor ? `<div class="technique-card__flavor">${escapeHtml(anx.flavor)}</div>` : ''}
          ${anx.description || '<p>No description available.</p>'}
        </div>
      </div>
    `;
  }

  // ── Modules Page ──────────────────────────────────────────────
  function renderModulesPage(page) {
    const filterType = page.replace('modules-', '');
    const typeMap = {
      'all': null,
      'approachaugmentation': 'Approach Augmentation',
      'augmentation': 'Approach Augmentation',
      'flashtraining': 'Flash Training',
      'training': 'Flash Training',
      'remolding': 'Remolding',
    };

    const activeType = typeMap[filterType] || null;

    // Filter
    const filtered = Object.entries(modules).filter(([name, mod]) => {
      if (!activeType) return true;
      return mod.type === activeType;
    });

    // Sort: augmentations first, then flash training (alphabetical), then remolding
    const typeOrder = { 'Approach Augmentation': 0, 'Flash Training': 1, 'Remolding': 2 };
    filtered.sort((a, b) => {
      const orderDiff = (typeOrder[a[1].type] || 9) - (typeOrder[b[1].type] || 9);
      if (orderDiff !== 0) return orderDiff;
      return a[0].localeCompare(b[0]);
    });

    const title = activeType || 'All T-Doll Modules';

    // Type description from moduleTypes data
    const typeDesc = activeType && moduleTypes[activeType]
      ? moduleTypes[activeType].description.trim()
      : 'T-Doll Modules represent advanced enhancements integrated into a Tactical Doll\'s Neural Cloud and combat systems. Through specialized uplinks, frame modification, and accelerated training routines, these modules improve baseline performance.';

    const typeIcons = {
      'Approach Augmentation': '◎',
      'Flash Training': '⬡',
      'Remolding': '✧',
    };
    const icon = typeIcons[activeType] || '◆';

    // Group by type
    const byType = {};
    filtered.forEach(([name, mod]) => {
      const t = mod.type || 'Other';
      if (!byType[t]) byType[t] = [];
      byType[t].push([name, mod]);
    });

    let html = `
      <div class="breadcrumb">
        <a href="#home">HOME</a>
        <span class="sep">›</span>
        <a href="#modules-all">ITEMS</a>
        <span class="sep">›</span>
        <a href="#modules-all">T-DOLL MODULES</a>
        ${activeType ? `<span class="sep">›</span>${activeType.toUpperCase()}` : ''}
      </div>

      <div class="type-header">
        <div class="type-header__icon">${icon}</div>
        <div class="type-header__info">
          <h1>${title.toUpperCase()}</h1>
          <div class="type-header__desc">${typeDesc}</div>
        </div>
      </div>

      <div class="technique-filters">
        ${filterBtn('ALL', 'modules-all', !activeType)}
        ${filterBtn('AUGMENTATION', 'modules-augmentation', activeType === 'Approach Augmentation')}
        ${filterBtn('FLASH TRAINING', 'modules-training', activeType === 'Flash Training')}
        ${filterBtn('REMOLDING', 'modules-remolding', activeType === 'Remolding')}
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--white-dimmer); letter-spacing: 1px; margin-bottom: 20px;">
        ${filtered.length} MODULE${filtered.length !== 1 ? 'S' : ''} FOUND
      </div>
    `;

    // Render by type group
    const typeLabels = ['Approach Augmentation', 'Flash Training', 'Remolding'];
    typeLabels.forEach(typeName => {
      const group = byType[typeName];
      if (!group || group.length === 0) return;

      if (!activeType) {
        html += `
          <div class="rank-divider">
            <div class="rank-divider__line"></div>
            <div class="rank-divider__label">${typeName.toUpperCase()}</div>
            <div class="rank-divider__line"></div>
          </div>
        `;
      }

      html += '<div class="technique-grid">';
      group.forEach(([name, mod]) => {
        html += renderModuleCard(name, mod);
      });
      html += '</div>';
    });

    contentInner.innerHTML = html;
    attachFilterHandlers();
    attachCardToggleHandlers();
  }

  function renderModuleCard(name, mod) {
    const approach = mod.approach ? escapeHtml(mod.approach) : null;
    const skill = mod.skill ? escapeHtml(mod.skill) : null;
    const costStr = mod.cost ? `${mod.cost.toLocaleString()} ¤` : 'TBD';

    return `
      <div class="technique-card">
        <div class="technique-card__corner technique-card__corner--tl"></div>
        <div class="technique-card__corner technique-card__corner--tr"></div>
        <div class="technique-card__corner technique-card__corner--bl"></div>
        <div class="technique-card__corner technique-card__corner--br"></div>

        <div class="technique-card__header">
          <div class="technique-card__name">${escapeHtml(name)}</div>
          <div class="technique-card__meta">
            <span class="technique-card__tag tag-type">${escapeHtml(mod.type || 'MODULE')}</span>
            <span class="technique-card__tag tag-rank">${costStr}</span>
            ${approach ? `<span class="technique-card__tag tag-approach">${approach}</span>` : ''}
            ${skill ? `<span class="technique-card__tag tag-skill">${skill}</span>` : ''}
          </div>
        </div>

        <div class="technique-card__toggle"></div>

        <div class="technique-card__body">
          ${mod.description || '<p>No description available.</p>'}
        </div>
      </div>
    `;
  }

  // ── Shared UI Handlers ────────────────────────────────────────
  function filterBtn(label, page, active) {
    return `<button class="filter-btn ${active ? 'active' : ''}" data-page="${page}">${label}</button>`;
  }

  function attachTechniqueFilterHandlers() {
    document.getElementById('filter-type').addEventListener('change', (e) => {
      techniqueFilters.type = e.target.value || null;
      renderTechniquesPage(currentPage);
    });
    document.getElementById('filter-rank').addEventListener('change', (e) => {
      techniqueFilters.rank = e.target.value ? parseInt(e.target.value) : null;
      renderTechniquesPage(currentPage);
    });
    document.getElementById('filter-approach').addEventListener('change', (e) => {
      techniqueFilters.approach = e.target.value || null;
      renderTechniquesPage(currentPage);
    });
    document.getElementById('filter-skill').addEventListener('change', (e) => {
      techniqueFilters.skill = e.target.value || null;
      renderTechniquesPage(currentPage);
    });
    document.getElementById('sort-by').addEventListener('change', (e) => {
      techniqueFilters.sortBy = e.target.value;
      renderTechniquesPage(currentPage);
    });
  }

  function attachCardToggleHandlers() {
    contentInner.querySelectorAll('.technique-card__toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.closest('.technique-card').classList.toggle('collapsed');
      });
    });
  }

  function attachFilterHandlers() {
    contentInner.querySelectorAll('.filter-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.hash = btn.dataset.page;
      });
    });
  }

  // ── 404 ────────────────────────────────────────────────────────
  function render404(page) {
    contentInner.innerHTML = `
      <div class="breadcrumb">
        <a href="#home">HOME</a>
        <span class="sep">›</span>
        ERROR
      </div>
      <h1>SIGNAL LOST</h1>
      <p>The requested data channel <strong>${escapeHtml(page)}</strong> could not be located in the field database.</p>
      <p><a href="#home">← Return to Command Center</a></p>
    `;
  }

  // ── Utility ────────────────────────────────────────────────────
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Boot ──────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);
})();
