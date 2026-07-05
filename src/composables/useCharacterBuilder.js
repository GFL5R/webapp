/**
 * useCharacterBuilder — Central reactive state store for the GFL5R character creator.
 *
 * Maintains a single character object matching Foundry's actor data model
 * (template.json Actor.character) plus an embedded items[] array.
 *
 * Persists to localStorage under key "gfl5r-character-builder".
 *
 * Exports DRAG_TYPES constant for drag-and-drop type discrimination.
 */

import { reactive, ref, computed, watch } from 'vue'
import {
  NATIONALITY_ITEMS,
  BACKGROUND_GEAR,
  DISCIPLINE_WEAPON_GRANTS,
} from '@/data/starting-equipment.js'

// ---------------------------------------------------------------------------
// Drag type constants — used by drag sources and drop targets
// ---------------------------------------------------------------------------
export const DRAG_TYPES = {
  TECHNIQUE:    'gfl5r:technique',
  DISCIPLINE:   'gfl5r:discipline',
  WEAPON:       'gfl5r:weapon',
  ARMOR:        'gfl5r:armor',
  ITEM:         'gfl5r:item',
  MODULE:       'gfl5r:module',
  PERK:         'gfl5r:perk',
  CAPSTONE:     'gfl5r:capstone',
  ADVANTAGE:    'gfl5r:advantage',
  DISADVANTAGE: 'gfl5r:disadvantage',
  PASSION:      'gfl5r:passion',
  ANXIETY:      'gfl5r:anxiety',
}

// ---------------------------------------------------------------------------
// Skill list — snake_case IDs matching Foundry template.json
// ---------------------------------------------------------------------------
const SKILL_IDS = [
  // Combat
  'blades', 'exotic_weapons', 'explosives', 'firearms', 'hand_to_hand', 'tactics',
  // Fieldcraft
  'conditioning', 'resolve', 'crafting', 'insight', 'stealth', 'survival',
  // Technical
  'computers', 'mechanics', 'medicine', 'piloting', 'science', 'subterfuge',
  // Social
  'arts', 'command', 'culture', 'deception', 'negotiation', 'performance',
]

const APPROACH_IDS = ['power', 'precision', 'swiftness', 'resilience', 'fortune']

/** No single approach may exceed this value during character creation */
const MAX_APPROACH_AT_CREATION = 3

// ---------------------------------------------------------------------------
// ID helpers
// ---------------------------------------------------------------------------

/** Generate a deterministic 16-char Foundry ID from a string */
function makeFoundryId(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  return hex + hex  // 8 + 8 = 16 chars
}

// ---------------------------------------------------------------------------
// Default character skeleton (exact match to Foundry template.json)
// ---------------------------------------------------------------------------
function makeDefaultSkills() {
  const obj = {}
  SKILL_IDS.forEach(id => { obj[id] = 0 })
  return obj
}

function makeDefaultDisciplineSlot() {
  return {
    disciplineId: null,
    perkId: null,
    capstoneId: null,
    unlockCost: 0,
    xpSpent: 0,
    currentRank: 1,
    ranksCompleted: 0,
    techniquesLearned: [],
  }
}

function makeDefaultDisciplines() {
  return {
    slot1: makeDefaultDisciplineSlot(),
    slot2: makeDefaultDisciplineSlot(),
    slot3: makeDefaultDisciplineSlot(),
    slot4: makeDefaultDisciplineSlot(),
    slot5: makeDefaultDisciplineSlot(),
  }
}

function makeDefaultCharacter() {
  return {
    name: '',
    type: 'character',
    img: 'systems/gfl5r/assets/icons/actors/character.svg',
    system: {
      identity: {
        characterType: 'human',
        age: '',
        nationality: '',
        background: '',
        frame: '',
        manufacturer: '',
        model: '',
        name_origin: '',
      },
      approaches: {
        power: 1,
        precision: 1,
        swiftness: 1,
        resilience: 1,
        fortune: 1,
      },
      skills: makeDefaultSkills(),
      skills_free: makeDefaultSkills(),
      social: {
        humanity: 50,
        fame: 40,
        status: 30,
        stress_tell: '',
        view_of_dolls: '',
      },
      conflict: {
        endurance: 0,
        composure: 0,
        focus: 0,
        vigilance: 0,
        fortune_points: { max: 0, value: 0 },
        fatigue: { max: 0, value: 0 },
        strife: { max: 0, value: 0 },
        heat: 0,
        stance: 'power',
        prepared: true,
      },
      harm: {
        wounded: {
          power: null,
          precision: null,
          swiftness: null,
          resilience: null,
          fortune: null,
        },
        elid_stage: 0,
        parapluie_stage: 0,
        collapse: { max: 0, value: 0 },
      },
      ew: {
        ew_rating: 0,
        security_rating: 0,
      },
      advancement: {
        xp_total: 0,
        xp_spent: 0,
        xp_saved: 0,
      },
      disciplines: makeDefaultDisciplines(),
      narrative: {
        notes: '',
        description: '',
        personal_goal: '',
        name_meaning: '',
        story_end: '',
        met_commander: '',
      },
    },
    items: [],
  }
}

// ---------------------------------------------------------------------------
// LocalStorage helpers
// ---------------------------------------------------------------------------
const STORAGE_KEY = 'gfl5r-character-builder'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    migrateItemIds(parsed)
    // Deep-merge with defaults so new fields added later are present
    return deepMergeDefaults(makeDefaultCharacter(), parsed)
  } catch {
    return null
  }
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/** Shallow merge for top-level keys — ensures new fields in defaults exist */
function deepMergeDefaults(defaults, saved) {
  const result = { ...defaults }
  for (const key of Object.keys(result)) {
    if (saved[key] === undefined) continue
    if (typeof result[key] === 'object' && result[key] !== null && !Array.isArray(result[key])) {
      // Nested objects deeper than 1 level: system.*
      if (key === 'system' && typeof saved[key] === 'object') {
        result[key] = deepMergeDefaults(result[key], saved[key])
      } else {
        result[key] = { ...result[key], ...saved[key] }
      }
    } else if (Array.isArray(result[key])) {
      result[key] = Array.isArray(saved[key]) ? [...saved[key]] : [...result[key]]
    } else {
      result[key] = saved[key]
    }
  }
  return result
}

/** Fix old items with non-hex _id values to valid Foundry IDs */
function migrateItemIds(character) {
  if (!Array.isArray(character.items)) return
  const hex16 = /^[0-9a-f]{16}$/i
  character.items.forEach(item => {
    if (!item._id || !hex16.test(item._id)) {
      item._id = makeFoundryId(item.name || 'item')
    }
  })
}

// ---------------------------------------------------------------------------
// Derived attribute helpers (match ActorGfl5r.computeDerivedAttributes)
// ---------------------------------------------------------------------------
function computeEndurance(power, resilience, characterType) {
  const multiplier = characterType === 't-doll' ? 3 : 2
  return (power + resilience) * multiplier
}

function computeComposure(resilience, swiftness) {
  return (resilience + swiftness) * 2
}

function computeFocus(power, precision) {
  return power + precision
}

function computeVigilance(precision, swiftness) {
  return Math.ceil((precision + swiftness) / 2)
}

function computeApproachLimit(approaches) {
  const vals = Object.values(approaches).map(Number).sort((a, b) => a - b)
  return vals[0] + vals[1]
}

function computeFortification(disciplines) {
  return Object.values(disciplines).reduce(
    (sum, slot) => sum + (slot.ranksCompleted || 0), 0
  )
}

function computeCollapseMax(approaches) {
  return Object.values(approaches).reduce((sum, v) => sum + Number(v), 0) * 5
}

// ---------------------------------------------------------------------------
// XP cost constants (match CONFIG.gfl5r.xp)
// ---------------------------------------------------------------------------
const XP = {
  APPROACH_MULTIPLIER: 3,
  SKILL_MULTIPLIER: 2,
  TECHNIQUE_COST: 3,
  DISCIPLINE_ENTRY_COST: 5,
  DISCIPLINE_RANK_COSTS: [16, 20, 24],  // per-rank (cumulative: 16, 36, 60)
}

// ---------------------------------------------------------------------------
// Singleton state
// ---------------------------------------------------------------------------
const isOpen = ref(false)

// Load persisted or create fresh
const saved = loadFromStorage()
const character = reactive(saved || makeDefaultCharacter())

// Auto-save on any change
watch(
  () => character,
  (state) => saveToStorage(state),
  { deep: true }
)

// ---------------------------------------------------------------------------
// Computed derived attributes
// ---------------------------------------------------------------------------
const derived = computed(() => {
  const app = character.system.approaches
  const power = Number(app.power)
  const precision = Number(app.precision)
  const swiftness = Number(app.swiftness)
  const resilience = Number(app.resilience)
  const fortune = Number(app.fortune)
  const charType = character.system.identity.characterType

  const endurance = computeEndurance(power, resilience, charType)
  const composure = computeComposure(resilience, swiftness)
  const focus = computeFocus(power, precision)
  const vigilance = computeVigilance(precision, swiftness)
  const approachLimit = computeApproachLimit(app)
  const fortification = computeFortification(character.system.disciplines)
  const collapseMax = charType === 't-doll' ? 0 : computeCollapseMax(app)

  return {
    endurance,
    composure,
    focus,
    vigilance,
    approachLimit,
    fortification,
    collapseMax,
    fortunePointsMax: fortune,
  }
})

// ---------------------------------------------------------------------------
// Discipline helpers
// ---------------------------------------------------------------------------
function findEmptyDisciplineSlot() {
  const slots = character.system.disciplines
  for (const key of Object.keys(slots)) {
    if (!slots[key].disciplineId) return key
  }
  return null
}

// ---------------------------------------------------------------------------
// Public composable
// ---------------------------------------------------------------------------
export function useCharacterBuilder() {
  // ---- Builder panel state ----
  function toggle() {
    isOpen.value = !isOpen.value
  }

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  // ---- Character type ----
  function setCharacterType(type) {
    // type: 'human' | 't-doll'
    character.system.identity.characterType = type
    // Reset frame/nationality/background fields
    character.system.identity.nationality = ''
    character.system.identity.background = ''
    character.system.identity.frame = ''
    character.system.identity.manufacturer = ''
    character.system.identity.model = ''
    // Reset approaches to base
    APPROACH_IDS.forEach(a => {
      character.system.approaches[a] = 1
    })
    // Reset skills
    SKILL_IDS.forEach(s => {
      character.system.skills[s] = 0
      character.system.skills_free[s] = 0
    })
  }

  function setIdentity(field, value) {
    character.system.identity[field] = value
  }

  // ---- Approaches ----
  function setApproach(approach, value) {
    if (APPROACH_IDS.includes(approach)) {
      character.system.approaches[approach] = Math.min(MAX_APPROACH_AT_CREATION, Math.max(1, Number(value) || 1))
    }
  }

  function incrementApproach(approach) {
    setApproach(approach, character.system.approaches[approach] + 1)
  }

  function decrementApproach(approach) {
    setApproach(approach, character.system.approaches[approach] - 1)
  }

  function setAllApproaches(values) {
    // values: { power: 2, precision: 2, ... }
    for (const [approach, val] of Object.entries(values)) {
      if (APPROACH_IDS.includes(approach)) {
        character.system.approaches[approach] = Math.max(1, Number(val) || 1)
      }
    }
  }

  // ---- Skills ----
  function setSkill(skill, rank) {
    if (character.system.skills[skill] !== undefined) {
      character.system.skills[skill] = Math.max(0, Number(rank) || 0)
    }
  }

  function addFreeSkill(skill, ranks) {
    if (character.system.skills_free[skill] !== undefined) {
      character.system.skills_free[skill] = (character.system.skills_free[skill] || 0) + ranks
    }
  }

  function setFreeSkills(skillsList) {
    // skillsList: ['firearms', 'tactics']
    // Replaces all free skills — used by IdentityEditor for background/frame
    SKILL_IDS.forEach(s => { character.system.skills_free[s] = 0 })
    skillsList.forEach(s => { addFreeSkill(s, 1) })
  }

  function addFreeSkills(skillsList) {
    // Additive — does not wipe existing free skills. Used by discipline grants.
    skillsList.forEach(s => { addFreeSkill(s, 1) })
  }

  // ---- Social ----
  function setSocial(field, value) {
    if (character.system.social[field] !== undefined) {
      character.system.social[field] = value
    }
  }

  // ---- Disciplines ----
  function setDiscipline(slotKey, disciplineData) {
    const slot = character.system.disciplines[slotKey]
    if (!slot) return false
    if (slot.disciplineId) return false // slot already occupied

    slot.disciplineId = disciplineData.id || disciplineData.title
    slot.perkId = disciplineData.perk ? disciplineData.perk.id || disciplineData.perk.title : null
    slot.capstoneId = disciplineData.capstone ? disciplineData.capstone.id || disciplineData.capstone.title : null
    slot.unlockCost = XP.DISCIPLINE_ENTRY_COST

    // Auto-assign free skill ranks from discipline's associated skills (first 2)
    if (disciplineData.skills?.length) {
      const free = disciplineData.skills.slice(0, 2).map(s => s.toLowerCase().replace(/\s+/g, '_'))
      slot.grantedSkills = free
      addFreeSkills(free)
    }

    return true
  }

  function removeDiscipline(slotKey) {
    const slot = character.system.disciplines[slotKey]
    if (!slot) return
    slot.disciplineId = null
    slot.perkId = null
    slot.capstoneId = null
    slot.unlockCost = 0
    slot.xpSpent = 0
    slot.currentRank = 1
    slot.ranksCompleted = 0
    slot.techniquesLearned = []
    // Only remove free skills granted by this discipline
    if (slot.grantedSkills) {
      slot.grantedSkills.forEach(s => {
        if (character.system.skills_free[s] !== undefined) {
          character.system.skills_free[s] = Math.max(0, (character.system.skills_free[s] || 0) - 1)
        }
      })
      slot.grantedSkills = null
    }
  }

  function addTechniqueToSlot(slotKey, techniqueData) {
    const slot = character.system.disciplines[slotKey]
    if (!slot || !slot.disciplineId) return false
    if (slot.techniquesLearned.find(t => t.id === techniqueData.id)) return false // already learned
    slot.techniquesLearned.push({
      id: techniqueData.id,
      name: techniqueData.name,
      rank: techniqueData.rank || 1,
    })
    slot.xpSpent += XP.TECHNIQUE_COST
    return true
  }

  function removeTechniqueFromSlot(slotKey, techniqueId) {
    const slot = character.system.disciplines[slotKey]
    if (!slot) return
    const idx = slot.techniquesLearned.findIndex(t => t.id === techniqueId)
    if (idx >= 0) {
      slot.techniquesLearned.splice(idx, 1)
      slot.xpSpent = Math.max(0, slot.xpSpent - XP.TECHNIQUE_COST)
    }
  }

  function setDisciplineRank(slotKey, rank) {
    const slot = character.system.disciplines[slotKey]
    if (!slot) return
    slot.currentRank = Math.max(1, Math.min(3, Number(rank) || 1))
    // Calculate XP for completed ranks from costs
    slot.ranksCompleted = slot.currentRank - 1
    let cumulative = 0
    for (let i = 0; i < slot.ranksCompleted; i++) {
      cumulative += XP.DISCIPLINE_RANK_COSTS[i] || 0
    }
    slot.xpSpent = cumulative + (slot.techniquesLearned.length * XP.TECHNIQUE_COST) + (slot.disciplineId ? XP.DISCIPLINE_ENTRY_COST : 0)
  }

  // ---- XP Calculations ----
  function computeTotalXP() {
    let total = 0
    const disc = character.system.disciplines
    for (const key of Object.keys(disc)) {
      if (disc[key].disciplineId) {
        total += disc[key].xpSpent || 0
      }
    }
    // Approach XP: each rank above 1 costs newRank × APPROACH_MULTIPLIER
    APPROACH_IDS.forEach(a => {
      const rank = character.system.approaches[a]
      if (rank > 1) {
        for (let r = 2; r <= rank; r++) {
          total += r * XP.APPROACH_MULTIPLIER
        }
      }
    })
    // Skill XP (non-free): each rank × SKILL_MULTIPLIER
    SKILL_IDS.forEach(s => {
      const rank = character.system.skills[s] || 0
      if (rank > 0) {
        for (let r = 1; r <= rank; r++) {
          total += r * XP.SKILL_MULTIPLIER
        }
      }
    })
    return total
  }

  function updateXP() {
    const total = computeTotalXP()
    character.system.advancement.xp_total = total
    character.system.advancement.xp_spent = total
    character.system.advancement.xp_saved = 0
  }

  // ---- Conflict values (updated by derived) ----
  function syncConflict() {
    const d = derived.value
    character.system.conflict.endurance = d.endurance
    character.system.conflict.composure = d.composure
    character.system.conflict.focus = d.focus
    character.system.conflict.vigilance = d.vigilance
    character.system.conflict.fortune_points.max = d.fortunePointsMax
    character.system.conflict.fortune_points.value = d.fortunePointsMax
    character.system.conflict.fatigue.max = d.endurance
    character.system.conflict.strife.max = d.composure
    // Collapse
    if (character.system.identity.characterType !== 't-doll') {
      character.system.harm.collapse.max = d.collapseMax
    }
  }

  // ---- Equipment ----
  function addItem(itemType, itemData) {
    // itemType: 'weapon' | 'armor' | 'item' | 'module'
    // Normalize data to Foundry item format
    const foundryItem = normalizeItem(itemType, itemData)
    // Avoid duplicates
    const existing = character.items.find(i => i._id === foundryItem._id || i.name === foundryItem.name)
    if (existing) {
      if (itemType === 'item' && existing.system?.quantity !== undefined) {
        existing.system.quantity += 1
      }
      return existing
    }
    character.items.push(foundryItem)
    return foundryItem
  }

  function removeItem(itemId) {
    const idx = character.items.findIndex(i => (i._id || i.name) === itemId)
    if (idx >= 0) character.items.splice(idx, 1)
  }

  function toggleEquipped(itemId) {
    const item = character.items.find(i => (i._id || i.name) === itemId)
    if (item && item.system?.equipped !== undefined) {
      item.system.equipped = !item.system.equipped
    }
  }

  function toggleReadied(itemId) {
    const item = character.items.find(i => (i._id || i.name) === itemId)
    if (item && item.system?.readied !== undefined) {
      item.system.readied = !item.system.readied
    }
  }

  function normalizeItem(itemType, itemData) {
    const base = {
      _id: makeFoundryId(itemData.name || itemData.title || itemType),
      name: itemData.name || itemData.title || '',
      type: mapItemType(itemType),
      img: 'icons/svg/item-bag.svg',
      system: {},
    }

    switch (itemType) {
      case 'weapon':
        base.system = {
          category: itemData.category || '',
          skill: itemData.skill?.toLowerCase().replace(/\s+/g, '_') || 'firearms',
          ideal_range: itemData.range || itemData.ideal_range || 2,
          damage: itemData.damage || 0,
          deadliness: itemData.deadliness || 0,
          grip: itemData.grip || '1-Handed',
          threat: itemData.threat || 0,
          signature: itemData.signature || 0,
          qualities: itemData.qualities || [],
          price: itemData.price || itemData.cost || 0,
          equipped: false,
          readied: false,
          source: itemData.source || '',
          page: itemData.page || 0,
          flavor: itemData.flavor || '',
          description: itemData.description || '',
        }
        break
      case 'armor':
        base.system = {
          weight: itemData.weight || 0,
          signature: itemData.signature || 0,
          protection: itemData.protection || 0,
          price: itemData.price || itemData.cost || 0,
          equipped: false,
          source: itemData.source || '',
          page: itemData.page || 0,
          flavor: itemData.flavor || '',
          description: itemData.description || '',
        }
        break
      case 'item':
        base.system = {
          quantity: 1,
          weight: itemData.weight || 0,
          price: itemData.price || itemData.cost || 0,
          rarity: itemData.rarity || 'common',
          equipped: false,
          source: itemData.source || '',
          page: itemData.page || 0,
          flavor: itemData.flavor || '',
          description: itemData.description || '',
        }
        break
      case 'module':
        base.system = {
          module_type: itemData.type || itemData.module_type || 'Frame Augmentation',
          cost: itemData.cost || 0,
          approach: itemData.approach || null,
          skill: itemData.skill ? itemData.skill.toLowerCase().replace(/\s+/g, '_') : null,
          modifies: itemData.modifies || {},
          source: itemData.source || '',
          page: itemData.page || 0,
          flavor: itemData.flavor || '',
          description: itemData.description || '',
        }
        break
    }

    return base
  }

  function mapItemType(itemType) {
    const map = {
      weapon: 'weaponry',
      armor: 'armor',
      item: 'item',
      module: 'module',
    }
    return map[itemType] || itemType
  }

  function getItemsByType(itemType) {
    const foundryType = mapItemType(itemType)
    return character.items.filter(i => i.type === foundryType)
  }

  // ---- Peculiarities (stored as narrative items in items[] array) ----
  function addPeculiarity(narrativeType, itemData) {
    // narrativeType: 'advantage' | 'disadvantage' | 'passion' | 'anxiety'
    const foundryItem = {
      _id: makeFoundryId(itemData.name || itemData.title || narrativeType),
      name: itemData.name || itemData.title || '',
      type: 'narrative',
      img: 'icons/svg/scroll.svg',
      system: {
        narrative_type: narrativeType,
        ring_bonus: itemData.approach_bonus || null,
        tags: itemData.types || [],
        source: itemData.source || '',
        page: itemData.page || 0,
        flavor: itemData.flavor || '',
        description: (itemData.effects || []).join('; ') || itemData.description || '',
      },
    }
    // Avoid duplicates
    if (!character.items.find(i => i._id === foundryItem._id)) {
      character.items.push(foundryItem)
    }
    return foundryItem
  }

  function removePeculiarity(itemId) {
    removeItem(itemId)
  }

  function getPeculiaritiesByType(narrativeType) {
    return character.items.filter(i => i.type === 'narrative' && i.system?.narrative_type === narrativeType)
  }

  // ---- Handle drop from drag sources ----
  function handleDrop(dragType, itemData) {
    switch (dragType) {
      case DRAG_TYPES.DISCIPLINE: {
        const slot = findEmptyDisciplineSlot()
        if (!slot) return { success: false, message: 'All discipline slots are full.' }
        const ok = setDiscipline(slot, itemData)
        return ok
          ? { success: true, slot }
          : { success: false, message: 'Could not add discipline.' }
      }
      case DRAG_TYPES.TECHNIQUE:
      case DRAG_TYPES.PERK:
      case DRAG_TYPES.CAPSTONE:
        // For techniques/perks/capstones, they're contextual (need a discipline slot)
        return { success: false, message: 'Drop techniques onto a discipline slot.' }
      case DRAG_TYPES.WEAPON:
        addItem('weapon', itemData)
        return { success: true }
      case DRAG_TYPES.ARMOR:
        addItem('armor', itemData)
        return { success: true }
      case DRAG_TYPES.ITEM:
        addItem('item', itemData)
        return { success: true }
      case DRAG_TYPES.MODULE:
        addItem('module', itemData)
        return { success: true }
      case DRAG_TYPES.ADVANTAGE:
        addPeculiarity('advantage', itemData)
        return { success: true }
      case DRAG_TYPES.DISADVANTAGE:
        addPeculiarity('disadvantage', itemData)
        return { success: true }
      case DRAG_TYPES.PASSION:
        addPeculiarity('passion', itemData)
        return { success: true }
      case DRAG_TYPES.ANXIETY:
        addPeculiarity('anxiety', itemData)
        return { success: true }
      default:
        return { success: false, message: `Unknown item type: ${dragType}` }
    }
  }

  // ---- Equipment grants at character creation ----

  let _lastNationalityKey = null
  let _lastBackgroundKey = null

  function applyNationalityGear(nationalityKey) {
    // Revoke previous nationality items
    if (_lastNationalityKey && _lastNationalityKey !== nationalityKey) {
      const oldNames = NATIONALITY_ITEMS[_lastNationalityKey] || []
      oldNames.forEach(name => {
        const idx = character.items.findIndex(i => i.name === name && i.type === 'item')
        if (idx >= 0) character.items.splice(idx, 1)
      })
    }
    _lastNationalityKey = nationalityKey

    // Grant new nationality items
    const itemNames = NATIONALITY_ITEMS[nationalityKey]
    if (!itemNames) return
    itemNames.forEach(name => {
      if (!character.items.find(i => i.name === name)) {
        addItem('item', { name })
      }
    })
  }

  function applyBackgroundGear(backgroundKey) {
    // Revoke previous background items + armor
    if (_lastBackgroundKey && _lastBackgroundKey !== backgroundKey) {
      const oldGear = BACKGROUND_GEAR[_lastBackgroundKey]
      if (oldGear) {
        if (oldGear.items) {
          oldGear.items.forEach(name => {
            const idx = character.items.findIndex(i => i.name === name && i.type === 'item')
            if (idx >= 0) character.items.splice(idx, 1)
          })
        }
        if (oldGear.armor) {
          const idx = character.items.findIndex(i => i.name === oldGear.armor && i.type === 'armor')
          if (idx >= 0) character.items.splice(idx, 1)
        }
      }
    }
    _lastBackgroundKey = backgroundKey

    // Grant new background items + armor
    const gear = BACKGROUND_GEAR[backgroundKey]
    if (!gear) return
    if (gear.items) {
      gear.items.forEach(name => {
        if (!character.items.find(i => i.name === name)) {
          addItem('item', { name })
        }
      })
    }
    if (gear.armor) {
      if (!character.items.find(i => i.name === gear.armor)) {
        addItem('armor', { name: gear.armor })
      }
    }
  }

  function getDisciplineWeaponGrant(disciplineTitle) {
    return DISCIPLINE_WEAPON_GRANTS[disciplineTitle] || null
  }

  // ---- Reset ----
  function reset() {
    const fresh = makeDefaultCharacter()
    Object.keys(fresh).forEach(key => {
      if (typeof fresh[key] === 'object' && fresh[key] !== null && !Array.isArray(fresh[key])) {
        Object.assign(character[key], fresh[key])
      } else if (Array.isArray(fresh[key])) {
        character[key].splice(0, character[key].length, ...fresh[key])
      } else {
        character[key] = fresh[key]
      }
    })
    // Deep reset nested objects
    character.system.identity = { ...fresh.system.identity }
    character.system.approaches = { ...fresh.system.approaches }
    character.system.skills = { ...fresh.system.skills }
    character.system.skills_free = { ...fresh.system.skills_free }
    character.system.social = { ...fresh.system.social }
    character.system.ew = { ...fresh.system.ew }
    character.system.advancement = { ...fresh.system.advancement }
    character.system.narrative = { ...fresh.system.narrative }
    character.system.disciplines = makeDefaultDisciplines()
    character.system.conflict = { ...fresh.system.conflict }
    character.system.harm = JSON.parse(JSON.stringify(fresh.system.harm))
    character.items.splice(0)
    _lastNationalityKey = null
    _lastBackgroundKey = null
    updateXP()
    syncConflict()
  }

  // ---- Export ----
  function exportToFoundryJSON() {
    updateXP()
    syncConflict()

    const exportData = {
      name: character.name || 'New Character',
      type: 'character',
      img: character.img,
      system: JSON.parse(JSON.stringify(character.system)),
      items: JSON.parse(JSON.stringify(character.items)),
      prototypeToken: {
        name: character.name || 'Character',
        actorLink: true,
        disposition: 1,
        texture: { src: character.img },
        width: 1,
        height: 1,
        depth: 0,
        bar1: { attribute: 'fatigue' },
        bar2: { attribute: 'strife' },
      },
    }

    return JSON.stringify(exportData, null, 2)
  }

  function downloadJSON(filename) {
    const json = exportToFoundryJSON()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename || `${(character.name || 'character').replace(/\s+/g, '_').toLowerCase()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ---- Init: sync conflict values on load ----
  syncConflict()

  // ---- Return public API ----
  return {
    // State
    character,
    isOpen,
    derived,

    // Panel control
    toggle,
    open,
    close,

    // Identity
    setCharacterType,
    setIdentity,

    // Approaches
    setApproach,
    incrementApproach,
    decrementApproach,
    setAllApproaches,

    // Skills
    setSkill,
    addFreeSkill,
    setFreeSkills,
    addFreeSkills,

    // Social
    setSocial,

    // Disciplines
    setDiscipline,
    removeDiscipline,
    addTechniqueToSlot,
    removeTechniqueFromSlot,
    setDisciplineRank,
    findEmptyDisciplineSlot,

    // XP
    updateXP,
    syncConflict,

    // Equipment
    addItem,
    removeItem,
    toggleEquipped,
    toggleReadied,
    getItemsByType,

    // Peculiarities
    addPeculiarity,
    removePeculiarity,
    getPeculiaritiesByType,

    // Drop handler (universal entry point for drag-and-drop)
    handleDrop,

    // Equipment grants at character creation
    applyNationalityGear,
    applyBackgroundGear,
    getDisciplineWeaponGrant,

    // Reset & Export
    reset,
    exportToFoundryJSON,
    downloadJSON,

    // Constants
    SKILL_IDS,
    APPROACH_IDS,
    MAX_APPROACH_AT_CREATION,
  }
}
