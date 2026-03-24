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
    'Factions & Powers':                'pages/factions.html',
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
    'Range & Movement':                 'pages/range-bands.html',
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
    'Factions & Powers',
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
    'Range & Movement',
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
    'Factions & Powers':                'Overview',
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
    'Range & Movement':                 'Combat',
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
    weapons:             'data/weapons.json',
    items:               'data/items.json',
    disciplines:         'data/disciplines.json',
    perks:               'data/perks.json',
    capstones:           'data/capstones.json',
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
  let weapons = {};
  let items = {};
  let disciplines = {};
  let perks = {};
  let capstones = {};
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
  const disciplineModalOverlay = document.getElementById('disciplineModalOverlay');
  const disciplineModalContent = document.getElementById('disciplineModalContent');

  // ── Initialize ─────────────────────────────────────────────────
  async function init() {
    setupNavigation();
    setupSearch();
    setupDate();
    setupBackToTop();
    setupSidebarCollapse();
    setupWipModal();
    setupDisciplineModal();

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

  // ── Discipline Modal ───────────────────────────────────────────
  function closeDisciplineModal() {
    disciplineModalOverlay.classList.add('hidden');
  }

  function setupDisciplineModal() {
    disciplineModalOverlay.addEventListener('click', (e) => {
      if (e.target === disciplineModalOverlay) closeDisciplineModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !disciplineModalOverlay.classList.contains('hidden')) closeDisciplineModal();
    });
  }

  function openDisciplineModal(page) {
    const disciplineName = page.replace('discipline-', '').replace(/-/g, ' ');
    const disciplineKey = Object.keys(disciplines).find(
      key => key.toLowerCase() === disciplineName.toLowerCase()
    );

    if (!disciplineKey) return;

    const disc = disciplines[disciplineKey];
    const perk = perks[disc.perk] || {};
    const capstone = capstones[disc.capstone] || {};

    const techniquesByRank = { 1: [], 2: [], 3: [] };
    disc.techniques.forEach(techName => {
      const tech = techniques[techName] || {};
      const rank = tech.rank || 1;
      if (techniquesByRank[rank]) techniquesByRank[rank].push({ name: techName, tech });
    });

    let techniquesHtml = '';
    [1, 2, 3].forEach(rank => {
      if (techniquesByRank[rank].length > 0) {
        techniquesHtml += `<tr class="discipline-table__rank-header"><th colspan="2">Rank ${rank}</th></tr>`;
        techniquesByRank[rank].forEach(({ name: techName, tech }) => {
          techniquesHtml += `
            <tr>
              <td class="discipline-table__name">
                <a href="#techniques-all" class="discipline-tech-link" data-tech="${escapeHtml(techName)}">${escapeHtml(techName)}</a>
              </td>
              <td class="discipline-table__type">${escapeHtml(tech.type || 'General')}</td>
            </tr>
          `;
        });
      }
    });

    disciplineModalContent.innerHTML = `
      <div class="discipline-card">
        <div class="discipline-card__corner discipline-card__corner--tl"></div>
        <div class="discipline-card__corner discipline-card__corner--tr"></div>
        <div class="discipline-card__corner discipline-card__corner--bl"></div>
        <div class="discipline-card__corner discipline-card__corner--br"></div>
        <button class="discipline-modal__close" id="disciplineModalClose" aria-label="Close">[✕]</button>

        <div class="discipline-card__header">
          <h1>${escapeHtml(disciplineKey)}</h1>
        </div>

        <div class="discipline-card__content">
          <div class="discipline-card__left">
            <div class="discipline-card__flavor">${disc.flavor || ''}</div>
            <div class="discipline-card__skills">
              <h3>Associated Skills</h3>
              <div class="discipline-skills-list">
                ${disc.skills.map(skill => `<span class="discipline-skill-tag">${escapeHtml(skill)}</span>`).join('')}
              </div>
            </div>
            <div class="discipline-card__perk">
              <h3>Perk: ${escapeHtml(disc.perk)}</h3>
              ${perk.flavor ? `<p class="discipline-perk-flavor">${escapeHtml(perk.flavor)}</p>` : ''}
              ${perk.description || '<p>No description available.</p>'}
            </div>
          </div>
          <div class="discipline-card__right">
            <h3>Techniques</h3>
            <table class="discipline-table">
              <thead><tr><th>Name</th><th>Type</th></tr></thead>
              <tbody>${techniquesHtml}</tbody>
            </table>
          </div>
        </div>

        <div class="discipline-card__capstone">
          <h3>Capstone: ${escapeHtml(disc.capstone)}</h3>
          ${capstone.flavor ? `<p class="discipline-capstone-flavor">${escapeHtml(capstone.flavor)}</p>` : ''}
          ${capstone.description || '<p>No description available.</p>'}
        </div>
      </div>
    `;

    disciplineModalOverlay.classList.remove('hidden');
    document.getElementById('disciplineModalClose').addEventListener('click', closeDisciplineModal);
    disciplineModalContent.querySelectorAll('.discipline-tech-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        closeDisciplineModal();
        window.location.hash = 'techniques-all';
        setTimeout(() => {
          const techName = link.dataset.tech;
          const cards = contentInner.querySelectorAll('.technique-card__name');
          for (const card of cards) {
            if (card.textContent === techName) {
              card.closest('.technique-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
              card.closest('.technique-card').classList.add('highlight');
              setTimeout(() => card.closest('.technique-card').classList.remove('highlight'), 2000);
              break;
            }
          }
        }, 300);
      });
    });
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
    // Separate page key from in-page anchor (e.g. "Setting & T-Dolls::t-doll-generations")
    const sepIdx = hash.indexOf('::');
    if (sepIdx !== -1) {
      navigateTo(hash.slice(0, sepIdx), hash.slice(sepIdx + 2));
    } else {
      navigateTo(hash);
    }
  }

  async function navigateTo(page, anchor) {
    currentPage = page;
    setActiveNav(page);
    contentInner.style.animation = 'none';
    contentInner.offsetHeight; // force reflow
    contentInner.style.animation = '';

    if (!anchor) window.scrollTo({ top: 0 });

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
    } else if (page.startsWith('weapons-')) {
      renderWeaponsPage(page);
    } else if (page.startsWith('items-')) {
      renderItemsPage(page);
    } else if (page === 'Disciplines') {
      await renderDisciplinesPage();
    } else if (HTML_PAGES[page]) {
      await renderHTMLPage(page, anchor);
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
      const [typesData, techData, advData, disData, pasData, anxData, pecTypesData, modTypesData, modData, weaponsData, itemsData, disciplinesData, perksData, capstonesData] = await Promise.all([
        fetch(DATA_FILES.techniqueTypes).then(r => r.json()),
        fetch(DATA_FILES.techniques).then(r => r.json()),
        fetch(DATA_FILES.advantages).then(r => r.json()),
        fetch(DATA_FILES.disadvantages).then(r => r.json()),
        fetch(DATA_FILES.passions).then(r => r.json()),
        fetch(DATA_FILES.anxieties).then(r => r.json()),
        fetch(DATA_FILES.peculiarityTypes).then(r => r.json()),
        fetch(DATA_FILES.moduleTypes).then(r => r.json()),
        fetch(DATA_FILES.modules).then(r => r.json()),
        fetch(DATA_FILES.weapons).then(r => r.json()),
        fetch(DATA_FILES.items).then(r => r.json()),
        fetch(DATA_FILES.disciplines).then(r => r.json()),
        fetch(DATA_FILES.perks).then(r => r.json()),
        fetch(DATA_FILES.capstones).then(r => r.json()),
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
      weapons = weaponsData || {};
      items = itemsData || {};
      disciplines = disciplinesData || {};
      perks = perksData || {};
      capstones = capstonesData || {};
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

    // Add weapons
    Object.entries(weapons).forEach(([name, wpn]) => {
      allSearchableContent.push({
        title: name,
        section: `Weapon: ${wpn.category || 'General'}`,
        page: `weapons-${(wpn.category || 'all').toLowerCase()}`,
        type: 'weapon',
        data: wpn,
      });
    });

    // Add items
    Object.entries(items).forEach(([name, item]) => {
      allSearchableContent.push({
        title: name,
        section: `Item: ${item.type || 'General'}`,
        page: `items-all`,
        type: 'item',
        data: item,
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
        ${homeCard('[SET]', 'Setting & T-Dolls', 'The world of 2072, T-Doll technology, and the pair dynamic.', 'Setting & T-Dolls')}
        ${homeCard('[FAC]', 'Factions & Powers', 'Governments, corporations, bandits, and cults shaping the world of 2072.', 'Factions & Powers')}
        ${homeCard('[APP]', 'Approaches & Attributes', 'The six approaches and derived attributes like Vigor, Focus, and Composure.', 'Approaches & Derived Attributes')}
        ${homeCard('[SKL]', 'Skills', 'The 13 skills covering combat, technical, and social competencies.', 'Skills')}
        ${homeCard('[CHK]', 'Making a Check', 'Roll-and-keep mechanics, opportunities, complications, and outcomes.', 'Making a Check')}
        ${homeCard('[INT]', 'A Boy and His Doll', 'Introduction to the Commander and T-Doll pair dynamic.', 'A Boy and His Doll')}
        ${homeCard('[CMD]', 'Building a Commander', 'Create your human Commander through guided questions.', 'Building a Commander')}
        ${homeCard('[TDL]', 'Building Your T-Doll', 'Create your Tactical Doll through guided questions.', 'Building Your T-Doll')}
        ${homeCard('[HUM]', 'Humanity & Fame', 'Humanity, reputation, and the social standing of your pair.', 'Humanity & Fame')}
        ${homeCard('[DIS]', 'Disciplines', 'Class progressions, rank structure, and technique trees.', 'Disciplines')}
        ${homeCard('[EXP]', 'Experience', 'Spending experience points and character advancement.', 'Experience')}
        ${homeCard('[SCN]', 'Scenes', 'Scene structure, timing, and the rhythm of play.', 'Scenes')}
        ${homeCard('[STF]', 'Strife', 'Stress mechanics, emotional pressure, and outbursts.', 'Strife')}
        ${homeCard('[RNG]', 'Range & Movement', 'Tactical space, range bands, and movement mechanics.', 'Range & Movement')}
        ${homeCard('[WPN]', 'Weapons & Armor', 'Weapon profiles, categories, armor, and equipment.', 'Weapons & Armor')}
        ${homeCard('[HRM]', 'Harm & Healing', 'Wounds, critical hits, recovery, and medical treatment.', 'Harm & Healing')}
        ${homeCard('[CND]', 'Conditions', 'Status effects, injuries, and temporary impairments.', 'Conditions')}
        ${homeCard('[EWR]', 'Electronic Warfare', 'Hacking, networks, nodes, sentries, and digital operations.', 'Electronic Warfare')}
        ${homeCard('[VEH]', 'Driving & Vehicles', 'Chase mechanics, vehicle combat, and positions.', 'Driving & Vehicles')}
        ${homeCard('[RAD]', 'Collapse Radiation', 'Exposure, ELID, contamination zones, and protective measures.', 'Collapse Radiation')}
        ${homeCard('[POI]', 'Poisons & Drugs', 'Toxins, pharmaceuticals, and their effects on the body.', 'Poisons & Drugs')}
        ${homeCard('[CRM]', 'Crime', 'Evidence, investigation checks, and accusation mechanics.', 'Crime')}
        ${homeCard('[TCH]', 'Techniques', Object.keys(techniques).length + ' combat, electronic warfare, street, and command techniques.', 'techniques-all')}
        ${homeCard('[ADV]', 'Advantages', Object.keys(advantages).length + ' traits that let you reroll dice when conditions are met.', 'advantages-all')}
        ${homeCard('[DIS]', 'Disadvantages', Object.keys(disadvantages).length + ' traits that force rerolls of favorable dice.', 'disadvantages-all')}
        ${homeCard('[PAS]', 'Passions', Object.keys(passions).length + ' emotional anchors that remove Strife when engaged.', 'passions-all')}
        ${homeCard('[ANX]', 'Anxieties', Object.keys(anxieties).length + ' emotional triggers that add Strife when provoked.', 'anxieties-all')}
        ${homeCard('[MOD]', 'T-Doll Modules', Object.keys(modules).length + ' augmentations, flash training packages, and upgrades.', 'modules-all')}
        ${homeCard('[WPN]', 'Weapons', Object.keys(weapons).length + ' firearms, blades, and combat equipment.', 'weapons-all')}
        ${homeCard('[ITM]', 'Items', Object.keys(items).length + ' equipment, gear, and accessories.', 'items-all')}
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
  async function renderHTMLPage(page, anchor) {
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

      // Scroll to anchor if provided
      if (anchor) {
        const target = document.getElementById(anchor);
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
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
    // Separate anchor fragment from path
    let anchor = '';
    let path = decodeURIComponent(href);
    const hashIdx = path.indexOf('#');
    if (hashIdx !== -1) {
      anchor = '::' + path.slice(hashIdx + 1); // '::anchorId' for SPA routing
      path = path.slice(0, hashIdx);
    }

    // Try to match common link patterns to known pages
    let clean = path.replace(/\.html$/, '').replace(/\.md$/, '');
    // Strip relative path prefixes
    clean = clean.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');

    // Direct match against HTML_PAGES keys
    if (HTML_PAGES[clean]) return clean + anchor;

    // Try matching the last parts of the path (by key)
    for (const key of Object.keys(HTML_PAGES)) {
      if (key.endsWith(clean)) return key + anchor;
    }

    // Try matching against HTML_PAGES values (file paths)
    const cleanWithExt = clean + '.html';
    for (const [key, val] of Object.entries(HTML_PAGES)) {
      if (val === 'pages/' + cleanWithExt || val.endsWith('/' + cleanWithExt)) return key + anchor;
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
      'command': 'Command',
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
      'Command': '◆',
    };

    const title = activeType || 'All Techniques';
    const icon = typeIcons[activeType] || '◆';

    // Dropdown options
    const typeOptions = ['All', 'Combat', 'Electronic Warfare', 'Street', 'Conditioning', 'Science', 'Social', 'Vehicle', 'Remolding', 'Command'];
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

        ${tech.flavor ? `<div class="technique-card__flavor">${tech.flavor}</div>` : ''}

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
          ${adv.flavor ? `<div class="technique-card__flavor">${adv.flavor}</div>` : ''}
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
          ${pas.flavor ? `<div class="technique-card__flavor">${pas.flavor}</div>` : ''}
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
          ${dis.flavor ? `<div class="technique-card__flavor">${dis.flavor}</div>` : ''}
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
          ${anx.flavor ? `<div class="technique-card__flavor">${anx.flavor}</div>` : ''}
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
      'frameaugmentation': 'Frame Augmentation',
      'frame': 'Frame Augmentation',
      'flashtraining': 'Flash Training',
      'training': 'Flash Training',
      'ewaugmentation': 'EW Augmentation',
      'ew': 'EW Augmentation',
      'remolding': 'Remolding',
    };

    const activeType = typeMap[filterType] || null;

    // Filter
    const filtered = Object.entries(modules).filter(([name, mod]) => {
      if (!activeType) return true;
      return mod.type === activeType;
    });

    // Sort: augmentations first, then flash training (alphabetical), then remolding
    const typeOrder = { 'Approach Augmentation': 0, 'Frame Augmentation': 1, 'Flash Training': 2, 'EW Augmentation': 3, 'Remolding': 4 };
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
      'Frame Augmentation': '◎',
      'Flash Training': '⬡',
      'EW Augmentation': '⬡',
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
        ${filterBtn('APPROACH', 'modules-augmentation', activeType === 'Approach Augmentation')}
        ${filterBtn('FRAME', 'modules-frame', activeType === 'Frame Augmentation')}
        ${filterBtn('FLASH TRAINING', 'modules-training', activeType === 'Flash Training')}
        ${filterBtn('EW', 'modules-ew', activeType === 'EW Augmentation')}
        ${filterBtn('REMOLDING', 'modules-remolding', activeType === 'Remolding')}
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--white-dimmer); letter-spacing: 1px; margin-bottom: 20px;">
        ${filtered.length} MODULE${filtered.length !== 1 ? 'S' : ''} FOUND
      </div>
    `;

    // Render by type group
    const typeLabels = ['Approach Augmentation', 'Frame Augmentation', 'Flash Training', 'EW Augmentation', 'Remolding'];
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
          ${mod.flavor ? `<div class="technique-card__flavor">${mod.flavor}</div>` : ''}
          ${mod.description || '<p>No description available.</p>'}
        </div>
      </div>
    `;
  }

  // ── Weapons Page ──────────────────────────────────────────────
  function renderWeaponsPage(page) {
    const filterType = page.replace('weapons-', '');
    
    // Category map for slug resolution
    const categoryMap = {
      'all': null,
      'knf': 'KNF',
      'bld': 'BLD',
      'hg': 'HG',
      'smg': 'SMG',
      'sg': 'SG',
      'ar': 'AR',
      'br': 'BR',
      'rf': 'RF',
      'mg': 'MG',
    };

    const activeCategory = categoryMap[filterType.toLowerCase()] || null;

    // Filter
    const filtered = Object.entries(weapons).filter(([name, wpn]) => {
      if (!activeCategory) return true;
      return wpn.category === activeCategory;
    });

    // Sort by category order, then by name
    const categoryOrder = { 'KNF': 0, 'BLD': 1, 'HG': 2, 'SMG': 3, 'SG': 4, 'AR': 5, 'BR': 6, 'RF': 7, 'MG': 8 };
    filtered.sort((a, b) => {
      const orderDiff = (categoryOrder[a[1].category] || 9) - (categoryOrder[b[1].category] || 9);
      if (orderDiff !== 0) return orderDiff;
      return a[0].localeCompare(b[0]);
    });

    // Category display names
    const categoryNames = {
      'KNF': 'Knives',
      'BLD': 'Blades',
      'HG': 'Handguns',
      'SMG': 'Submachine Guns',
      'SG': 'Shotguns',
      'AR': 'Assault Rifles',
      'BR': 'Battle Rifles',
      'RF': 'Rifles',
      'MG': 'Machine Guns',
    };

    const title = activeCategory ? `${categoryNames[activeCategory] || activeCategory}` : 'All Weapons';

    // Category descriptions
    const categoryDescriptions = {
      'KNF': 'Bladed weapons under 30 cm. Silent, concealable, and devastating in close quarters.',
      'BLD': 'Bladed weapons over 30 cm. Larger cutting tools and swords for melee combat.',
      'HG': 'Compact one-handed firearms. Low rate of fire, moderate stopping power.',
      'SMG': 'Automatic pistol-caliber weapons. High rate of fire, lower deadliness.',
      'SG': 'Close-quarters spread weapons. High damage, area effect, short range.',
      'AR': 'Intermediate cartridge automatics. Moderate rate of fire, moderate stopping power.',
      'BR': 'Full-power cartridge automatics. Lower rate of fire, higher stopping power.',
      'RF': 'Precision long guns. Low rate of fire, very high stopping power.',
      'MG': 'Sustained fire weapons. Very high rate of fire, moderate deadliness.',
    };

    const typeDesc = activeCategory
      ? categoryDescriptions[activeCategory]
      : 'All available weapons organized by category. Each weapon has unique stats for damage, deadliness, range, and special qualities.';

    const typeIcons = {
      'KNF': '🗡',
      'BLD': '⚔',
      'HG': '🔫',
      'SMG': '🔫',
      'SG': '🔫',
      'AR': '🔫',
      'BR': '🔫',
      'RF': '🎯',
      'MG': '🔫',
    };
    const icon = typeIcons[activeCategory] || '◆';

    // Group by category
    const byCategory = {};
    filtered.forEach(([name, wpn]) => {
      const cat = wpn.category || 'Other';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push([name, wpn]);
    });

    let html = `
      <div class="breadcrumb">
        <a href="#home">HOME</a>
        <span class="sep">›</span>
        <a href="#weapons-all">ITEMS</a>
        <span class="sep">›</span>
        <a href="#weapons-all">WEAPONS</a>
        ${activeCategory ? `<span class="sep">›</span>${(categoryNames[activeCategory] || activeCategory).toUpperCase()}` : ''}
      </div>

      <div class="type-header">
        <div class="type-header__icon">${icon}</div>
        <div class="type-header__info">
          <h1>${title.toUpperCase()}</h1>
          <div class="type-header__desc">${typeDesc}</div>
        </div>
      </div>

      <div class="technique-filters">
        ${filterBtn('ALL', 'weapons-all', !activeCategory)}
        ${filterBtn('KNIVES', 'weapons-knf', activeCategory === 'KNF')}
        ${filterBtn('BLADES', 'weapons-bld', activeCategory === 'BLD')}
        ${filterBtn('HANDGUNS', 'weapons-hg', activeCategory === 'HG')}
        ${filterBtn('SMG', 'weapons-smg', activeCategory === 'SMG')}
        ${filterBtn('SHOTGUNS', 'weapons-sg', activeCategory === 'SG')}
        ${filterBtn('ASSAULT', 'weapons-ar', activeCategory === 'AR')}
        ${filterBtn('BATTLE', 'weapons-br', activeCategory === 'BR')}
        ${filterBtn('RIFLES', 'weapons-rf', activeCategory === 'RF')}
        ${filterBtn('MG', 'weapons-mg', activeCategory === 'MG')}
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--white-dimmer); letter-spacing: 1px; margin-bottom: 20px;">
        ${filtered.length} WEAPON${filtered.length !== 1 ? 'S' : ''} FOUND
      </div>
    `;

    // Render by category group
    const categoryOrderList = ['KNF', 'BLD', 'HG', 'SMG', 'SG', 'AR', 'BR', 'RF', 'MG'];
    categoryOrderList.forEach(cat => {
      const group = byCategory[cat];
      if (!group || group.length === 0) return;

      if (!activeCategory) {
        html += `
          <div class="rank-divider">
            <div class="rank-divider__line"></div>
            <div class="rank-divider__label">${(categoryNames[cat] || cat).toUpperCase()}</div>
            <div class="rank-divider__line"></div>
          </div>
        `;
      }

      html += '<div class="technique-grid">';
      group.forEach(([name, wpn]) => {
        html += renderWeaponCard(name, wpn);
      });
      html += '</div>';
    });

    contentInner.innerHTML = html;
    attachFilterHandlers();
    attachCardToggleHandlers();
  }

  function renderWeaponCard(name, wpn) {
    const qualities = wpn.qualities && wpn.qualities.length > 0 
      ? wpn.qualities.map(q => escapeHtml(q)).join(', ') 
      : null;
    const priceStr = wpn.price ? `${wpn.price.toLocaleString()} ¤` : 'TBD';

    return `
      <div class="technique-card">
        <div class="technique-card__corner technique-card__corner--tl"></div>
        <div class="technique-card__corner technique-card__corner--tr"></div>
        <div class="technique-card__corner technique-card__corner--bl"></div>
        <div class="technique-card__corner technique-card__corner--br"></div>

        <div class="technique-card__header">
          <div class="technique-card__name">${escapeHtml(name)}</div>
          <div class="technique-card__meta">
            <span class="technique-card__tag tag-type">${escapeHtml(wpn.category || 'WEAPON')}</span>
            <span class="technique-card__tag tag-rank">${priceStr}</span>
            <span class="technique-card__tag tag-approach">DMG ${wpn.damage || 0}</span>
            <span class="technique-card__tag tag-skill">DEAD ${wpn.deadliness || 0}</span>
          </div>
        </div>

        <div class="technique-card__toggle"></div>

        <div class="technique-card__body">
          ${wpn.flavor ? `<div class="technique-card__flavor">${wpn.flavor}</div>` : ''}
          <div class="weapon-stats">
            <div class="weapon-stat"><strong>Skill:</strong> ${escapeHtml(wpn.skill || '—')}</div>
            <div class="weapon-stat"><strong>Range:</strong> ${wpn.range !== undefined ? wpn.range : '—'}</div>
            <div class="weapon-stat"><strong>Grip:</strong> ${escapeHtml(wpn.grip || '—')}</div>
            <div class="weapon-stat"><strong>Threat:</strong> ${wpn.threat !== undefined ? wpn.threat : '—'}</div>
            <div class="weapon-stat"><strong>Signature:</strong> ${wpn.signature !== undefined ? wpn.signature : '—'}</div>
            ${qualities ? `<div class="weapon-stat"><strong>Qualities:</strong> ${qualities}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // ── Items Page ────────────────────────────────────────────────
  function renderItemsPage(page) {
    // Filter (for now, just show all items)
    const filtered = Object.entries(items);

    // Sort alphabetically
    filtered.sort((a, b) => a[0].localeCompare(b[0]));

    const title = 'All Items';

    const typeDesc = 'Equipment, gear, and accessories available for purchase or acquisition in the field.';

    let html = `
      <div class="breadcrumb">
        <a href="#home">HOME</a>
        <span class="sep">›</span>
        <a href="#items-all">ITEMS</a>
      </div>

      <div class="type-header">
        <div class="type-header__icon">⬡</div>
        <div class="type-header__info">
          <h1>${title.toUpperCase()}</h1>
          <div class="type-header__desc">${typeDesc}</div>
        </div>
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--white-dimmer); letter-spacing: 1px; margin-bottom: 20px;">
        ${filtered.length} ITEM${filtered.length !== 1 ? 'S' : ''} FOUND
      </div>

      <div class="technique-grid">
    `;

    filtered.forEach(([name, item]) => {
      html += renderItemCard(name, item);
    });

    html += '</div>';

    contentInner.innerHTML = html;
    attachCardToggleHandlers();
  }

  function renderItemCard(name, item) {
    const costStr = item.cost ? `${item.cost.toLocaleString()} ¤` : 'TBD';

    return `
      <div class="technique-card">
        <div class="technique-card__corner technique-card__corner--tl"></div>
        <div class="technique-card__corner technique-card__corner--tr"></div>
        <div class="technique-card__corner technique-card__corner--bl"></div>
        <div class="technique-card__corner technique-card__corner--br"></div>

        <div class="technique-card__header">
          <div class="technique-card__name">${escapeHtml(name)}</div>
          <div class="technique-card__meta">
            <span class="technique-card__tag tag-type">${escapeHtml(item.type || 'ITEM')}</span>
            <span class="technique-card__tag tag-rank">${costStr}</span>
          </div>
        </div>

        <div class="technique-card__toggle"></div>

        <div class="technique-card__body">
          ${item.flavor ? `<div class="technique-card__flavor">${item.flavor}</div>` : ''}
          ${item.description || '<p>No description available.</p>'}
        </div>
      </div>
    `;
  }

  // ── Disciplines Page (with dynamic list) ───────────────────────
  async function renderDisciplinesPage() {
    const url = HTML_PAGES['Disciplines'];
    if (!url) { render404('Disciplines'); return; }

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

      const section = PAGE_SECTIONS['Disciplines'] || 'Rules';

      // Determine prev/next pages in reading order
      const pageIdx = PAGE_ORDER.indexOf('Disciplines');
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
          <a href="#Disciplines">${section.toUpperCase()}</a>
          <span class="sep">›</span>
          DISCIPLINES
        </div>
        ${html}
        ${pageNavHtml}
      `;

      // Populate the discipline list dynamically
      populateDisciplineList();
    } catch (e) {
      console.error('Failed to load Disciplines page:', e);
      render404('Disciplines');
    }
  }

  function populateDisciplineList() {
    const container = document.getElementById('discipline-list-container');
    if (!container) return;

    const WEAPON_DISCIPLINES = new Set([
      'Knives', 'Swords', 'Pistols', 'Submachine Guns', 'Shotguns',
      'Assault Rifles', 'Battle Rifles', 'Snipers', 'Machine Guns'
    ]);

    const allNames = Object.keys(disciplines).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    const weaponNames = allNames.filter(n => WEAPON_DISCIPLINES.has(n));
    const generalNames = allNames.filter(n => !WEAPON_DISCIPLINES.has(n));

    function renderItems(names) {
      return names.map(name => {
        const disc = disciplines[name];
        const skills = disc.skills ? disc.skills.join(', ') : '';
        return `
          <button class="discipline-list-item" data-discipline="${escapeHtml(name)}">
            <span class="discipline-list-name">${escapeHtml(name)}</span>
            <span class="discipline-list-skills">${escapeHtml(skills)}</span>
          </button>
        `;
      }).join('');
    }

    container.innerHTML = `
      <div class="discipline-list-columns">
        <div class="discipline-list-column">
          <div class="discipline-list-column-header">WEAPON DISCIPLINES</div>
          ${renderItems(weaponNames)}
        </div>
        <div class="discipline-list-column">
          <div class="discipline-list-column-header">GENERAL DISCIPLINES</div>
          ${renderItems(generalNames)}
        </div>
      </div>
    `;

    container.querySelectorAll('.discipline-list-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.discipline;
        const key = `discipline-${name.toLowerCase().replace(/\s+/g, '-')}`;
        openDisciplineModal(key);
      });
    });
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
