// Display names for weapon category codes (matches weapons.json categories
// and Foundry's CONFIG.gfl5r.weaponCategories).
export const WEAPON_CATEGORY_NAMES = {
  KNF: 'Knives',
  BLD: 'Swords',
  HG: 'Handguns',
  SMG: 'Submachine Guns',
  SG: 'Shotguns',
  AR: 'Assault Rifles',
  BR: 'Battle Rifles',
  RF: 'Sniper Rifles',
  MG: 'Machine Guns',
  SHD: 'Shields',
  BOW: 'Bows',
}

export function weaponCategoryName(code) {
  return WEAPON_CATEGORY_NAMES[code] || code
}
