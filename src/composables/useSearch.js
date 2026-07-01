import { computed } from 'vue'
import passions from '@/data/passions.json'
import advantages from '@/data/advantages.json'
import disadvantages from '@/data/disadvantages.json'
import anxieties from '@/data/anxieties.json'
import npcs from '@/data/npcs.json'
import techniques from '@/data/techniques.json'
import rawWeapons from '@/data/weapons.json'
import rawArmor from '@/data/armor.json'
import rawItems from '@/data/items.json'
import rawModules from '@/data/modules.json'
import rawPerks from '@/data/perks.json'
import rawCapstones from '@/data/capstones.json'
import disciplines from '@/data/disciplines'

// ---------------------------------------------------------------------------
// Rule page index  (static headings & keywords per route)
// ---------------------------------------------------------------------------
const rulePages = [
  {
    route: '/making-a-check',
    title: 'Making a Check',
    category: 'Core Rules',
    headings: ['Making a Check', 'Build Your Dice Pool', 'Apply Rerolls', 'Keep Dice', 'Count Successes', 'Determine Outcome', 'Target Number', 'TN', 'Approach', 'Skill'],
    keywords: ['dice', 'pool', 'approach dice', 'skill dice', 'd6', 'd12', 'explosion', 'success', 'opportunity', 'strife', 'target number', 'TN', 'check', 'roll', 'reroll', 'keep', 'kept dice', 'difficulty']
  },
  {
    route: '/approaches-and-derived-attributes',
    title: 'Approaches & Derived Attributes',
    category: 'Core Rules',
    headings: ['Approaches', 'Power', 'Precision', 'Swiftness', 'Resilience', 'Fortune', 'Derived Attributes', 'Vitality', 'Composure', 'Resolve', 'Vigilance', 'Defense', 'Speed', 'Approach Limit'],
    keywords: ['approach', 'Power', 'Precision', 'Swiftness', 'Resilience', 'Fortune', 'attribute', 'derived', 'Vitality', 'Composure', 'Resolve', 'Vigilance', 'Defense', 'Speed', 'stat', 'stats']
  },
  {
    route: '/skills',
    title: 'Skills',
    category: 'Core Rules',
    headings: ['Skills', 'Combat', 'Fieldcraft', 'Technical', 'Social', 'Blades', 'Exotic Weapons', 'Explosives', 'Firearms', 'Hand-To-Hand', 'Fieldcraft', 'Awareness', 'Piloting', 'Stealth', 'Survival', 'Computers', 'Crafting', 'Mechanics', 'Medicine', 'Science', 'Culture', 'Deception', 'Insight', 'Negotiation', 'Performance', 'Subterfuge'],
    keywords: ['skill', 'combat', 'fieldcraft', 'technical', 'social', 'rating', 'training']
  },
  {
    route: '/conditions',
    title: 'Conditions',
    category: 'Combat & Harm',
    headings: ['Conditions', 'Negative Conditions', 'Positive Conditions', 'Bleeding', 'Burning', 'Compromised', 'Dazed', 'Disoriented', 'Encumbered', 'Exhausted', 'Frightened', 'Immobilized', 'Impaired', 'Incapacitated', 'Prone', 'Silenced', 'Staggered', 'Stunned', 'Weakened'],
    keywords: ['condition', 'status', 'bleeding', 'burning', 'compromised', 'dazed', 'disoriented', 'Bleeding', 'Burning', 'Compromised', 'Dazed']
  },
  {
    route: '/harm-and-healing',
    title: 'Harm & Healing',
    category: 'Combat & Harm',
    headings: ['Harm', 'Healing', 'Fatigue', 'Critical Strike', 'Injury', 'Severity', 'Medical Treatment', 'Recovery'],
    keywords: ['harm', 'healing', 'fatigue', 'critical', 'strike', 'injury', 'severity', 'medical', 'treatment', 'recovery', 'wound']
  },
  {
    route: '/strife',
    title: 'Strife & Emotional Pressure',
    category: 'Combat & Harm',
    headings: ['Strife', 'Emotional Pressure', 'Gaining Strife', 'Comparing Strife to Composure', 'Narrating Strife', 'Venting', 'Composure', 'Compromised', 'Stable'],
    keywords: ['strife', 'composure', 'venting', 'compromised', 'stable', 'emotional', 'pressure', 'stress']
  },
  {
    route: '/collapse-radiation',
    title: 'Collapse Radiation',
    category: 'Combat & Harm',
    headings: ['Collapse Radiation', 'ELID', 'Contamination', 'Exposure', 'Radiation Levels'],
    keywords: ['collapse', 'radiation', 'ELID', 'contamination', 'exposure', 'mutant', 'infected']
  },
  {
    route: '/electronic-warfare',
    title: 'Electronic Warfare',
    category: 'Combat & Harm',
    headings: ['Electronic Warfare', 'EW', 'Hacking', 'ICE', 'Network Actions', 'Cyber Combat'],
    keywords: ['electronic', 'warfare', 'EW', 'hacking', 'ICE', 'network', 'cyber', 'digital']
  },
  {
    route: '/scenes',
    title: 'Scenes & Turn Order',
    category: 'Core Rules',
    headings: ['Scenes', 'Turn Order', 'Initiative', 'Rounds', 'Actions', 'Movement', 'Attack', 'Scheme', 'Support'],
    keywords: ['scene', 'turn', 'order', 'initiative', 'round', 'action', 'movement', 'attack', 'scheme', 'support']
  },
  {
    route: '/experience',
    title: 'Experience & Advancement',
    category: 'Characters',
    headings: ['Experience', 'XP', 'Advancement', 'Spending XP', 'Discipline Progression'],
    keywords: ['experience', 'XP', 'advancement', 'level', 'progress', 'spend', 'cost']
  },
  {
    route: '/humanity-and-fame',
    title: 'Humanity & Fame',
    category: 'Characters',
    headings: ['Humanity', 'Fame', 'Reputation', 'Humanity Loss', 'Fame Tiers'],
    keywords: ['humanity', 'fame', 'reputation', 'infamy', 'notoriety']
  },
  {
    route: '/weapons-and-armor',
    title: 'Weapons & Armor',
    category: 'Combat & Harm',
    headings: ['Weapons', 'Armor', 'Weapon Categories', 'Damage', 'Range', 'Armor Value'],
    keywords: ['weapon', 'armor', 'damage', 'range', 'pistol', 'rifle', 'shotgun', 'SMG', 'machine gun', 'sniper', 'blade']
  },
  {
    route: '/poisons-and-drugs',
    title: 'Poisons & Drugs',
    category: 'Combat & Harm',
    headings: ['Poisons', 'Drugs', 'Toxins', 'Delivery Methods', 'Effects'],
    keywords: ['poison', 'drug', 'toxin', 'chemical', 'substance', 'dose']
  },
  {
    route: '/range-bands',
    title: 'Range Bands',
    category: 'Combat & Harm',
    headings: ['Range Bands', 'Positioning', 'Close', 'Medium', 'Long', 'Extreme'],
    keywords: ['range', 'band', 'position', 'distance', 'close', 'medium', 'long', 'extreme']
  },
  {
    route: '/crime',
    title: 'Crime & Underworld',
    category: 'World',
    headings: ['Crime', 'Underworld', 'Criminal Organizations', 'Black Market'],
    keywords: ['crime', 'underworld', 'criminal', 'black market', 'illegal', 'smuggling']
  },
  {
    route: '/remoulding',
    title: 'Remoulding',
    category: 'World',
    headings: ['Remoulding', 'Remoulding Unit', 'Module Installation', 'Upgrading', 'Fortification', 'Technique Trees', 'Attack Tree', 'Life Drain Tree', 'Blast Tree', 'Barrier Tree', 'Mobility Tree', 'Terrain Control Tree', 'Resolve', 'GM Guidance', 'Failure Table'],
    keywords: ['remoulding', 'remould', 'remoulding unit', 'module', 'technique tree', 'skill tree', 'spell', 'fortification', 'upgrade', 'xp', 'resolve', 'collapse radiation', 'reverse collapse', 'failure table', 'mishap']
  },
  {
    route: '/driving-and-vehicles',
    title: 'Driving & Vehicles',
    category: 'Combat & Harm',
    headings: ['Driving', 'Vehicles', 'Vehicle Combat', 'Pursuit', 'Vehicle Stats'],
    keywords: ['driving', 'vehicle', 'car', 'pursuit', 'chase', 'pilot']
  },
  {
    route: '/factions',
    title: 'Factions',
    category: 'World',
    headings: ['Factions', 'URNC', 'Griffin & Kryuger', 'NOMFA', 'IOP Manufacturing', 'Girard Group', 'Paradeus'],
    keywords: ['faction', 'URNC', 'Griffin', 'Kryuger', 'NOMFA', 'IOP', 'Girard', 'Paradeus', 'organization']
  },
  {
    route: '/setting-and-t-dolls',
    title: 'Setting & T-Dolls',
    category: 'World',
    headings: ['Setting', 'T-Dolls', 'Tactical Dolls', 'Collapse Radiation', 'World of Girls Frontline', 'What is a T-Doll?'],
    keywords: ['setting', 'world', 'T-Doll', 'Tactical Doll', 'android', 'IOP', 'URNC', 'collapse', 'radiation', 'lore', 'Girls Frontline']
  },
  {
    route: '/a-boy-and-his-doll',
    title: 'A Boy & His Doll',
    category: 'Characters',
    headings: ['A Boy & His Doll', 'Character Creation', 'Pairs', 'Boy', 'Doll', 'Bond'],
    keywords: ['boy', 'doll', 'pair', 'bond', 'creation', 'character']
  },
  {
    route: '/building-a-commander',
    title: 'Building a Commander',
    category: 'Characters',
    headings: ['Building a Commander', 'Commander Creation', 'Nationality', 'Background', 'Origin'],
    keywords: ['commander', 'build', 'creation', 'nationality', 'background', 'origin', 'human']
  },
  {
    route: '/building-your-t-doll',
    title: 'Building Your T-Doll',
    category: 'Characters',
    headings: ['Building Your T-Doll', 'T-Doll Creation', 'Frame', 'Module', 'Weapon', 'Doll Creation'],
    keywords: ['T-Doll', 'build', 'creation', 'frame', 'module', 'weapon', 'doll']
  },
  {
    route: '/disciplines',
    title: 'Disciplines',
    category: 'Characters',
    headings: ['Disciplines', 'Structure', 'Progression', 'Adding a Discipline', 'Techniques', 'Fortification', 'Rank Thresholds'],
    keywords: ['discipline', 'rank', 'progression', 'fortification', 'capstone', 'perk', 'XP']
  },
  {
    route: '/remoulding-failure-table',
    title: 'Remoulding Failure Table',
    category: 'Reference',
    headings: ['Remoulding Failure Table', 'Failure Table', 'Running the Table', 'GM Guidance', 'Frequency', 'Narrative Framing', 'Adapting Severity', 'Player Agency'],
    keywords: ['remoulding', 'failure', 'mishap', 'backlash', 'bloom', 'collapse leak', 'd20', 'table', 'hardlock', 'thermal overload', 'neural static', 'gravity glitch', 'lingering bloom', 'unexpected overclock', 'fizzle', 'scramble', 'uncontrollable honesty', 'displaced', 'power sink', 'backflow', 'bloom flash', 'epiphyllum rejection', 'cosmetic remoulding', 'GM guidance', 'roll']
  },
  {
    route: '/attribution',
    title: 'Attribution',
    category: 'Reference',
    headings: ['Attribution', 'Credits'],
    keywords: ['attribution', 'credits', 'thanks']
  }
]

// ---------------------------------------------------------------------------
// Build the unified search corpus
// ---------------------------------------------------------------------------
function buildCorpus() {
  const entries = []

  // --- Passions ---
  for (const p of passions) {
    entries.push({
      id: `passion-${p.id}`,
      title: p.name,
      category: 'Passions',
      route: '/passions',
      hash: `#${p.id}`,
      text: [p.name, p.flavor, ...(p.effects || []), ...(p.types || [])].join(' '),
      snippet: p.flavor || ''
    })
  }

  // --- Advantages ---
  for (const a of advantages) {
    entries.push({
      id: `advantage-${a.id}`,
      title: a.name,
      category: 'Advantages',
      route: '/advantages',
      hash: `#${a.id}`,
      text: [a.name, a.flavor, ...(a.effects || []), ...(a.types || [])].join(' '),
      snippet: a.flavor || ''
    })
  }

  // --- Disadvantages ---
  for (const d of disadvantages) {
    entries.push({
      id: `disadvantage-${d.id}`,
      title: d.name,
      category: 'Disadvantages',
      route: '/disadvantages',
      hash: `#${d.id}`,
      text: [d.name, d.flavor, ...(d.effects || []), ...(d.types || [])].join(' '),
      snippet: d.flavor || ''
    })
  }

  // --- Anxieties ---
  for (const a of anxieties) {
    entries.push({
      id: `anxiety-${a.id}`,
      title: a.name,
      category: 'Anxieties',
      route: '/anxieties',
      hash: `#${a.id}`,
      text: [a.name, a.flavor, ...(a.effects || []), ...(a.types || [])].join(' '),
      snippet: a.flavor || ''
    })
  }

  // --- NPCs ---
  for (const n of npcs) {
    const attackText = (n.attacks || []).map(a => `${a.name} ${a.description || ''}`).join(' ')
    const specialText = (n.specialRules || []).join(' ')
    entries.push({
      id: `npc-${n.id}`,
      title: n.name,
      category: 'NPCs',
      route: '/npcs',
      hash: `#${n.id}`,
      text: [n.name, n.type, n.flavor, n.behaviors, n.background, attackText, specialText].join(' '),
      snippet: (n.flavor || n.background || '').slice(0, 200)
    })
  }

  // --- Techniques ---
  // Map technique JSON keys to route paths
  const techniqueRouteMap = {
    combat: '/techniques/combat',
    command: '/techniques/command',
    conditioning: '/techniques',  // fallback — conditioning has no entries
    electronic_warfare: '/techniques/electronic-warfare',
    remoulding: '/techniques/remoulding',
    science: '/techniques/science',
    social: '/techniques/social',
    street: '/techniques/street',
    vehicle: '/techniques/vehicle'
  }
  for (const typeKey of Object.keys(techniques)) {
    const list = techniques[typeKey] || []
    if (list.length === 0) continue
    const routePath = techniqueRouteMap[typeKey] || '/techniques'
    const catLabel = typeKey.charAt(0).toUpperCase() + typeKey.slice(1).replace(/_/g, ' ')
    for (let i = 0; i < list.length; i++) {
      const t = list[i]
      if (t.id === 'activation') continue // skip activation pseudo-entries
      const activationEntry = list[i + 1]
      const opportunities = (activationEntry && activationEntry.id === 'activation' && activationEntry.opportunities)
        ? activationEntry.opportunities.filter(o => o !== '---').join(' ')
        : ''
      entries.push({
        id: `technique-${t.id}`,
        title: t.name,
        category: `Techniques - ${catLabel}`,
        route: routePath,
        hash: `#${t.id}`,
        text: [t.name, t.flavor, t.approach, t.skill, t.activation, opportunities].join(' '),
        snippet: t.flavor || ''
      })
    }
  }

  // --- Weapons ---
  const weapons = Object.entries(rawWeapons).map(([name, data]) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), name, ...data }))
  for (const w of weapons) {
    entries.push({
      id: `weapon-${w.id}`,
      title: w.name,
      category: 'Weapons',
      route: '/weapons',
      hash: `#${w.id}`,
      text: [w.name, w.category, w.skill, String(w.damage), String(w.deadliness), String(w.price), ...(w.qualities || []), w.flavor || ''].join(' '),
      snippet: (w.flavor || '').replace(/<[^>]*>/g, '').slice(0, 200)
    })
  }

  // --- Armor ---
  const armor = Object.entries(rawArmor).map(([name, data]) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), name, ...data }))
  for (const a of armor) {
    entries.push({
      id: `armor-${a.id}`,
      title: a.name,
      category: 'Armor',
      route: '/armor',
      hash: `#${a.id}`,
      text: [a.name, String(a.protection), String(a.cost), String(a.weight), a.flavor || '', a.description || ''].join(' '),
      snippet: (a.flavor || '').slice(0, 200)
    })
  }

  // --- Items ---
  const items = Object.entries(rawItems).map(([name, data]) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), name, ...data }))
  for (const item of items) {
    entries.push({
      id: `item-${item.id}`,
      title: item.name,
      category: 'Items',
      route: '/items',
      hash: `#${item.id}`,
      text: [item.name, String(item.cost), String(item.rarity), item.flavor || '', item.description || ''].join(' '),
      snippet: (item.flavor || '').slice(0, 200)
    })
  }

  // --- Modules ---
  const modules = Object.entries(rawModules).map(([name, data]) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), name, ...data }))
  for (const m of modules) {
    entries.push({
      id: `module-${m.id}`,
      title: m.name,
      category: 'Modules',
      route: '/modules',
      hash: `#${m.id}`,
      text: [m.name, m.type, String(m.cost), m.approach || '', m.skill || '', m.flavor || '', m.description || ''].join(' '),
      snippet: (m.flavor || '').replace(/<[^>]*>/g, '').slice(0, 200)
    })
  }

  // --- Perks ---
  const perks = Object.entries(rawPerks).map(([name, data]) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), name, ...data }))
  for (const p of perks) {
    entries.push({
      id: `perk-${p.id}`,
      title: p.name,
      category: 'Perks',
      route: '/perks',
      hash: `#${p.id}`,
      text: [p.name, p.flavor || '', p.description || ''].join(' '),
      snippet: (p.flavor || '').slice(0, 200)
    })
  }

  // --- Capstones ---
  const capstones = Object.entries(rawCapstones).map(([name, data]) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), name, ...data }))
  for (const c of capstones) {
    entries.push({
      id: `capstone-${c.id}`,
      title: c.name,
      category: 'Capstones',
      route: '/capstones',
      hash: `#${c.id}`,
      text: [c.name, c.flavor || '', c.description || ''].join(' '),
      snippet: (c.flavor || '').slice(0, 200)
    })
  }

  // --- Disciplines ---
  for (const d of disciplines) {
    const techNames = d.techniques.map(t => t.name)
    entries.push({
      id: `discipline-${d.title.toLowerCase().replace(/\s+/g, '-')}`,
      title: d.title,
      category: 'Disciplines',
      route: '/disciplines',
      hash: '',
      text: [d.title, d.flavor, d.perk.title, d.perk.text, d.capstone.title, d.capstone.text, ...d.skills, ...techNames].join(' '),
      snippet: d.flavor || ''
    })
  }

  // --- Rule Pages ---
  for (const p of rulePages) {
    entries.push({
      id: `rule-${p.route.replace(/\//g, '-')}`,
      title: p.title,
      category: p.category,
      route: p.route,
      hash: '',
      text: [p.title, ...p.headings, ...p.keywords].join(' '),
      snippet: `Rule page: ${p.title}`
    })
    // Also index individual headings as separate entries so they surface directly
    for (const h of p.headings) {
      if (h === p.title) continue
      entries.push({
        id: `rule-${p.route.replace(/\//g, '-')}-${h.toLowerCase().replace(/\s+/g, '-')}`,
        title: h,
        category: p.category,
        route: p.route,
        hash: '',
        text: [h, p.title, ...p.keywords].join(' '),
        snippet: `Section in ${p.title}`
      })
    }
  }

  return entries
}

// ---------------------------------------------------------------------------
// Scoring helpers
// ---------------------------------------------------------------------------
function scoreTerm(term, text) {
  const lower = text.toLowerCase()
  const termLower = term.toLowerCase()

  // Exact word match
  const wordRe = new RegExp(`\\b${escapeRe(termLower)}\\b`, 'i')
  if (wordRe.test(lower)) return 10

  // Prefix match (starts with)
  if (lower.startsWith(termLower)) return 8

  // Contains match
  if (lower.includes(termLower)) return 5

  return 0
}

function escapeRe(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ---------------------------------------------------------------------------
// Main search function
// ---------------------------------------------------------------------------
let _corpus = null
function getCorpus() {
  if (!_corpus) _corpus = buildCorpus()
  return _corpus
}

export function search(query) {
  if (!query || !query.trim()) return []

  const corpus = getCorpus()
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const scored = []

  for (const entry of corpus) {
    let totalScore = 0
    for (const term of terms) {
      // Title matches are heavily weighted
      const titleScore = scoreTerm(term, entry.title)
      if (titleScore > 0) {
        totalScore += titleScore * 3
      }
      // Category match
      totalScore += scoreTerm(term, entry.category) * 0.5
      // Text match
      totalScore += scoreTerm(term, entry.text)
    }

    if (totalScore > 0) {
      scored.push({ ...entry, score: totalScore })
    }
  }

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score)

  // Deduplicate by id (keep highest score)
  const seen = new Set()
  const deduped = []
  for (const e of scored) {
    if (!seen.has(e.id)) {
      seen.add(e.id)
      deduped.push(e)
    }
  }

  return deduped
}

export function useSearch() {
  return { search }
}
