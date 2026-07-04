/**
 * Starting equipment grants at character creation.
 *
 * Mappings from nationality, background, and discipline to free gear.
 * Used by the character builder composable and Foundry's character generator.
 */

// ---------------------------------------------------------------------------
// Nationality → item names (flavorful, mundane, survival/identity gear)
// ---------------------------------------------------------------------------
export const NATIONALITY_ITEMS = {
  "united-states":        ["Duct Tape", "Road Flare", "Pocket Knife"],
  "neo-soviet-union":     ["Canteen", "Disposable Lighter", "Paracord"],
  "china":                ["Compass", "Ration Brick", "Bottled Water"],
  "latin-america":        ["Flashlight", "Zip Ties", "Hard Candy"],
  "japan":                ["Chemlight", "Basic Medical Supplies"],
  "pan-europe":           ["Binoculars", "Pocket Knife"],
  "yugoslavian-federation": ["Disposable Lighter", "Pack of Cigarettes", "Duct Tape"],
  "north-african-union":  ["Canteen", "Sleeping Bag", "Road Flare"],
  "australia":            ["Compass", "Sleeping Bag", "Hard Candy"],
  "yellow-zone":          ["Gas Mask", "Bottled Water", "Paracord"],
}

// ---------------------------------------------------------------------------
// Background → { items: string[], armor: string | null }
// ---------------------------------------------------------------------------
export const BACKGROUND_GEAR = {
  "military": {
    items: ["Basic Medical Supplies", "Flashlight"],
    armor: "Tactical Vest",
  },
  "pmc-commander": {
    items: ["Binoculars", "Paracord"],
    armor: "Concealable Vest",
  },
  "corporate-drone": {
    items: ["Multitool", "Zip Ties"],
    armor: null,
  },
  "scavenger": {
    items: ["Crowbar", "Duct Tape", "Road Flare"],
    armor: null,
  },
  "technician": {
    items: ["Multitool", "Duct Tape", "Chemlight"],
    armor: null,
  },
  "medic": {
    items: ["Medical Kit", "Paracord"],
    armor: null,
  },
  "criminal": {
    items: ["Lock Picking Set", "Zip Ties"],
    armor: null,
  },
  "scholar": {
    items: ["Compass", "Journal and Pen", "Bottled Water"],
    armor: null,
  },
}

// ---------------------------------------------------------------------------
// Discipline → { skill: string, maxPrice: number }
//
// The skill is the weapon skill (snake_case) that the discipline's weapon
// must use. maxPrice is the most expensive weapon allowed at creation.
//
// Commander disciplines get a weapon matching their theme.
// T-Doll weapon disciplines match the weapon category exactly.
// ---------------------------------------------------------------------------
export const DISCIPLINE_WEAPON_GRANTS = {
  // === Commander disciplines ===
  "Ghost":              { skill: "firearms",    maxPrice: 1800 },
  "Sicario":            { skill: "firearms",    maxPrice: 1800 },
  "Street Kid":         { skill: "blades",      maxPrice: 1500 },
  "Heartbreaker":       { skill: "firearms",    maxPrice: 1700 },
  "Smooth Talker":      { skill: "firearms",    maxPrice: 1700 },
  "Commander":          { skill: "firearms",    maxPrice: 1800 },
  "Black Hat":          { skill: "firearms",    maxPrice: 1700 },
  "Spider":             { skill: "firearms",    maxPrice: 1700 },
  "Knuckle Dragger":    { skill: "hand_to_hand", maxPrice: 0 },
  "Analyst":            { skill: "firearms",    maxPrice: 1700 },
  "Field Medic":        { skill: "firearms",    maxPrice: 1700 },
  "Grease Monkey":      { skill: "firearms",    maxPrice: 1700 },
  "Frontliner":         { skill: "exotic_weapons", maxPrice: 2500 },
  "Baby Driver":        { skill: "firearms",    maxPrice: 1700 },
  "Chauffeur":          { skill: "firearms",    maxPrice: 1700 },

  // === T-Doll weapon disciplines ===
  "Knives":             { skill: "blades",      maxPrice: 1500 },
  "Swords":             { skill: "blades",      maxPrice: 1500 },
  "Pistols":            { skill: "firearms",    maxPrice: 1700 },
  "Submachine Guns":    { skill: "firearms",    maxPrice: 2000 },
  "Shotguns":           { skill: "firearms",    maxPrice: 2400 },
  "Assault Rifles":     { skill: "firearms",    maxPrice: 1950 },
  "Battle Rifles":      { skill: "firearms",    maxPrice: 1800 },
  "Snipers":            { skill: "firearms",    maxPrice: 2600 },
  "Machine Guns":       { skill: "firearms",    maxPrice: 1750 },
}
