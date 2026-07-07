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
  "fsa":                  ["Duct Tape", "Road Flare", "Pocket Knife"],
  "ara":                  ["Ration Brick", "Multitool", "Sturdy Boots"],
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
// Discipline → { category: string, maxPrice: number } | null
//
// category is the weapon category code from weapons.json (HG, SMG, SG, AR, BR,
// RF, MG, BLD, KNF, SHD). maxPrice is the most expensive weapon allowed.
// null means no weapon grant (Knuckle Dragger fights unarmed).
//
// Commander disciplines get a sidearm or thematic weapon.
// T-Doll weapon disciplines match the weapon category exactly.
// ---------------------------------------------------------------------------
export const DISCIPLINE_WEAPON_GRANTS = {
  // === Commander disciplines ===
  "Ghost":              { category: "HG",  maxPrice: 1700 },  // sidearm — quiet, concealable
  "Sicario":            { category: "HG",  maxPrice: 1700 },  // sidearm — versatile assassin
  "Street Kid":         { category: "KNF", maxPrice: 1500 },  // knife — street brawler
  "Heartbreaker":       { category: "HG",  maxPrice: 1700 },  // sidearm — charm and a backup
  "Smooth Talker":      { category: "HG",  maxPrice: 1700 },  // sidearm — diplomat's piece
  "Commander":          { category: "HG",  maxPrice: 1700 },  // sidearm — officer's weapon
  "Black Hat":          { category: "HG",  maxPrice: 1700 },  // sidearm — hacker's backup
  "Spider":             { category: "HG",  maxPrice: 1700 },  // sidearm — EW specialist
  "Knuckle Dragger":    null,                                 // unarmed fighter
  "Analyst":            { category: "HG",  maxPrice: 1700 },  // sidearm — analyst's backup
  "Field Medic":        { category: "HG",  maxPrice: 1700 },  // sidearm — medic's sidearm
  "Grease Monkey":      { category: "HG",  maxPrice: 1700 },  // sidearm — mechanic's backup
  "Frontliner":         { category: "SHD", maxPrice: 2500 },  // shield — frontline defender
  "Baby Driver":        { category: "HG",  maxPrice: 1700 },  // sidearm — driver's piece
  "Chauffeur":          { category: "HG",  maxPrice: 1700 },  // sidearm — driver's piece

  // === T-Doll weapon disciplines ===
  "Knives":             { category: "KNF", maxPrice: 1500 },
  "Swords":             { category: "BLD", maxPrice: 1500 },
  "Pistols":            { category: "HG",  maxPrice: 1700 },
  "Submachine Guns":    { category: "SMG", maxPrice: 2000 },
  "Shotguns":           { category: "SG",  maxPrice: 2400 },
  "Assault Rifles":     { category: "AR",  maxPrice: 1950 },
  "Battle Rifles":      { category: "BR",  maxPrice: 1800 },
  "Snipers":            { category: "RF",  maxPrice: 2600 },
  "Machine Guns":       { category: "MG",  maxPrice: 1750 },
}
