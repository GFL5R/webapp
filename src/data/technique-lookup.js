import rawTechniques from '@/data/techniques.json'

/**
 * Mapping from techniques.json key to route slug and path.
 * Conditioning is empty so it's excluded.
 */
const KEY_TO_SLUG = {
  combat: 'combat',
  command: 'command',
  electronic_warfare: 'electronic-warfare',
  remolding: 'remolding',
  science: 'science',
  social: 'social',
  street: 'street',
  vehicle: 'vehicle'
}

/**
 * Map from technique name → { id, type, typeSlug, route, hash }
 * Built once at module scope so it's shared across all imports.
 */
const lookupMap = new Map()

for (const [jsonKey, entries] of Object.entries(rawTechniques)) {
  const typeSlug = KEY_TO_SLUG[jsonKey]
  if (!typeSlug || !entries.length) continue

  const route = `/techniques/${typeSlug}`

  for (const entry of entries) {
    // Skip activation entries (they have id === 'activation', name === 'Activation:')
    if (entry.id === 'activation') continue

    lookupMap.set(entry.name, {
      id: entry.id,
      type: entry.type,
      typeSlug,
      route,
      hash: `#${entry.id}`
    })
  }
}

/**
 * Look up a technique by its display name.
 * @param {string} name - The technique name, e.g. "Phantom Step"
 * @returns {{ id: string, type: string, typeSlug: string, route: string, hash: string } | null}
 */
export default function lookupTechnique(name) {
  return lookupMap.get(name) ?? null
}
