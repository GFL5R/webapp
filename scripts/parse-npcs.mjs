import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = resolve(__dirname, '..', '..', 'data', 'npcs.md')
const outPath = resolve(__dirname, '..', 'src', 'data', 'npcs.json')

const text = readFileSync(dataPath, 'utf8')

// Split into NPC sections: each starts with ## Name
const sections = text.split(/\n(?=## )/).filter(s => s.trim().startsWith('## '))

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseApproachLine(line) {
  // "- **Power:** 1" (colon is inside the bold markers)
  const m = line.match(/\*\*(\w+):\*\*\s*(\d+)/)
  if (m) return { name: m[1], value: parseInt(m[2]) }
  return null
}

function parseSkillLine(line) {
  return parseApproachLine(line) // same format
}

function parseBoldKeyValue(line) {
  // "**Armor:** 0" (colon is inside the bold markers)
  const m = line.match(/\*\*(.+?):\*\*\s*(.+)/)
  if (m) return { key: m[1].trim(), value: m[2].trim() }
  return null
}

function boldToStrong(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

function parseNpc(section) {
  const lines = section.split('\n')

  // Extract name from first line
  const nameLine = lines[0]
  const nameMatch = nameLine.match(/^## (.+)/)
  if (!nameMatch) return null
  const name = nameMatch[1].trim()
  const id = slugify(name)

  const npc = {
    id,
    name,
    type: '',
    approaches: {},
    skills: {},
    armor: 0,
    advantages: '',
    disadvantages: '',
    passion: '',
    anxiety: '',
    flavor: '',
    attacks: [],
    specialRules: [],
    behaviors: '',
    background: ''
  }

  let currentSection = null // 'approaches', 'skills', 'flavor', 'attacks', 'special-rules', 'behaviors', 'background'
  let currentAttack = null

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Section headers
    if (trimmed.startsWith('### ')) {
      const sectionName = trimmed.replace(/^### /, '').toLowerCase().trim()
      currentAttack = null
      if (sectionName === 'approaches') {
        currentSection = 'approaches'
        continue
      } else if (sectionName === 'skills') {
        currentSection = 'skills'
        continue
      } else if (sectionName === 'flavor') {
        currentSection = 'flavor'
        continue
      } else if (sectionName === 'attacks') {
        currentSection = 'attacks'
        continue
      } else if (sectionName === 'special rules') {
        currentSection = 'special-rules'
        continue
      } else if (sectionName === 'behaviors') {
        currentSection = 'behaviors'
        continue
      } else if (sectionName === 'background') {
        currentSection = 'background'
        continue
      } else {
        currentSection = null
        continue
      }
    }

    // Attack subsections
    if (trimmed.startsWith('#### ') && currentSection === 'attacks') {
      const attackName = trimmed.replace(/^#### /, '').trim()
      currentAttack = { name: attackName, description: '' }
      npc.attacks.push(currentAttack)
      continue
    }

    // Helper: try inline bold key-values (type, armor, advantages, etc.)
    function tryBoldKV() {
      const kv = parseBoldKeyValue(trimmed)
      if (!kv) return false
      const k = kv.key.toLowerCase()
      if (k === 'type') {
        npc.type = kv.value
      } else if (k === 'armor') {
        npc.armor = parseInt(kv.value) || 0
      } else if (k === 'advantages') {
        npc.advantages = kv.value
      } else if (k === 'disadvantages') {
        npc.disadvantages = kv.value
      } else if (k === 'passion') {
        npc.passion = kv.value
      } else if (k === 'anxiety') {
        npc.anxiety = kv.value
      } else {
        return false
      }
      return true
    }

    // Inline bold key-values (outside sections, and as fallback inside approach/skill sections)
    if (!currentSection || currentSection === 'approaches' || currentSection === 'skills') {
      if (tryBoldKV()) continue
    }

    // Approaches bullet items
    if (currentSection === 'approaches') {
      if (trimmed.startsWith('- ')) {
        const parsed = parseApproachLine(trimmed)
        if (parsed) {
          npc.approaches[parsed.name] = parsed.value
        }
        continue
      }
    }

    // Skills bullet items
    if (currentSection === 'skills') {
      if (trimmed.startsWith('- ')) {
        const parsed = parseSkillLine(trimmed)
        if (parsed) {
          npc.skills[parsed.name] = parsed.value
        }
        continue
      }
    }

    // In section content accumulation
    if (currentSection === 'flavor') {
      if (trimmed && !trimmed.startsWith('#')) {
        // Collect flavor paragraphs, stripping leading/trailing * for italic markers
        let content = trimmed
        // Remove leading/trailing * if the whole line is italic
        if (content.startsWith('*') && content.endsWith('*') && !content.startsWith('**')) {
          content = content.slice(1, -1)
        }
        npc.flavor += (npc.flavor ? '\n\n' : '') + content
      }
      continue
    }

    if (currentSection === 'attacks' && currentAttack) {
      if (trimmed && !trimmed.startsWith('#')) {
        currentAttack.description += (currentAttack.description ? '\n' : '') + trimmed
      }
      continue
    }

    if (currentSection === 'special-rules') {
      if (trimmed.startsWith('- ')) {
        npc.specialRules.push(trimmed.replace(/^- /, ''))
      } else if (trimmed && !trimmed.startsWith('#')) {
        // Continuation of previous rule
        if (npc.specialRules.length > 0) {
          npc.specialRules[npc.specialRules.length - 1] += ' ' + trimmed
        }
      }
      continue
    }

    if (currentSection === 'behaviors') {
      if (trimmed === '---') continue // skip separator lines
      if (trimmed && !trimmed.startsWith('#')) {
        npc.behaviors += (npc.behaviors ? '\n\n' : '') + trimmed
      }
      continue
    }

    if (currentSection === 'background') {
      if (trimmed && !trimmed.startsWith('#')) {
        npc.background += (npc.background ? '\n\n' : '') + trimmed
      }
      continue
    }
  }

  // Convert **bold** to <strong> in attack descriptions
  npc.attacks.forEach(atk => {
    atk.description = boldToStrong(atk.description)
  })

  // Compute ratings: (average of approaches + skill group) × 2, rounded down
  const approachVals = Object.values(npc.approaches)
  const avgApproach = approachVals.length
    ? approachVals.reduce((a, b) => a + b, 0) / approachVals.length
    : 0
  npc.combatRating = Math.floor((avgApproach + (npc.skills.Combat || 0)) * 2)
  npc.socialRating = Math.floor((avgApproach + (npc.skills.Social || 0)) * 2)

  return npc
}

const npcs = sections.map(parseNpc).filter(Boolean)

writeFileSync(outPath, JSON.stringify(npcs, null, 2))
console.log(`Wrote ${npcs.length} NPCs to ${outPath}`)
