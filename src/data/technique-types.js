/**
 * Configuration for technique type pages.
 * Each entry maps a route param slug to display metadata.
 *
 * Routes: /techniques/:type → TechniqueTypePage.vue
 * Old routes (now served by the single parameterized component):
 *   /techniques/combat
 *   /techniques/command
 *   /techniques/electronic-warfare
 *   /techniques/remoulding
 *   /techniques/science
 *   /techniques/social
 *   /techniques/street
 *   /techniques/vehicle
 */

export const TECHNIQUE_TYPES = {
  combat: {
    slug: 'combat',
    title: 'Combat Techniques',
    dataKey: 'combat',            // key in techniques.json
    intro: 'Honed through years of conflict and bloodshed, Combat techniques are the bread and butter of any fighter. From precise strikes to overwhelming force, these abilities define how a character handles themselves when the shooting starts… or the shooting stops and things get personal.',
    searchPlaceholder: 'Search combat techniques…',
    prev: { to: '/anxieties', label: 'Anxieties' },
    next: { to: '/techniques/command', label: 'Command Techniques' }
  },

  command: {
    slug: 'command',
    title: 'Command Techniques',
    dataKey: 'command',
    intro: 'Command techniques are the art of leadership on the battlefield. These abilities focus on coordinating units, managing morale, and directing the flow of large-scale engagements. From rallying broken formations to orchestrating complex maneuvers, Command techniques turn individual fighters into a cohesive fighting force capable of winning mass battles and managing cohorts effectively.',
    searchPlaceholder: 'Search command techniques…',
    prev: { to: '/techniques/combat', label: 'Combat Techniques' },
    next: { to: '/techniques/electronic-warfare', label: 'EW Techniques' }
  },

  'electronic-warfare': {
    slug: 'electronic-warfare',
    title: 'EW Techniques',
    dataKey: 'electronic_warfare',
    intro: 'In a world where data is power, Electronic Warfare techniques determine who controls the flow of information. Whether cracking ICE on a hostile network, ghosting through corporate security, or locking down your own systems against intrusion, these abilities are the weapons of the invisible battlefield.',
    searchPlaceholder: 'Search EW techniques…',
    prev: { to: '/techniques/command', label: 'Command Techniques' },
    next: { to: '/techniques/remoulding', label: 'Remoulding Techniques' }
  },

  remoulding: {
    slug: 'remoulding',
    title: 'Remoulding Techniques',
    dataKey: 'remoulding',
    intro: 'Remoulding techniques are the bleeding edge of what\'s possible, harnessing collapse radiation to bend, break, or rewrite reality itself. Unpredictable and dangerous, these abilities are the domain of those who are willing to risk everything for a chance at power beyond imagination.',
    searchPlaceholder: 'Search remoulding techniques…',
    prev: { to: '/techniques/electronic-warfare', label: 'EW Techniques' },
    next: { to: '/techniques/science', label: 'Science Techniques' }
  },

  science: {
    slug: 'science',
    title: 'Science Techniques',
    dataKey: 'science',
    intro: 'Knowledge is a weapon. Science techniques represent a character\'s ability to read the world around them, breaking down compounds, reverse-engineering technology, or making intuitive leaps that leave others behind. Where others see chaos, a scientist sees data.',
    searchPlaceholder: 'Search science techniques…',
    prev: { to: '/techniques/remoulding', label: 'Remoulding Techniques' },
    next: { to: '/techniques/social', label: 'Social Techniques' }
  },

  social: {
    slug: 'social',
    title: 'Social Techniques',
    dataKey: 'social',
    intro: 'Not every fight is won with fists. Social techniques are the tools of persuaders, manipulators, and silver-tongued operators, the ability to read a room, turn an enemy into an ally, or talk your way through a door that was never meant to open for you.',
    searchPlaceholder: 'Search social techniques…',
    prev: { to: '/techniques/science', label: 'Science Techniques' },
    next: { to: '/techniques/street', label: 'Street Techniques' }
  },

  street: {
    slug: 'street',
    title: 'Street Techniques',
    dataKey: 'street',
    intro: 'Survival in the gutter teaches lessons no academy ever could. Street techniques are the dirty tricks, the shortcuts, and the hard-earned instincts of someone who grew up knowing the rules were never written for them. Intimidation, deception, sleight of hand, whatever it takes.',
    searchPlaceholder: 'Search street techniques…',
    prev: { to: '/techniques/social', label: 'Social Techniques' },
    next: { to: '/techniques/vehicle', label: 'Vehicle Techniques' }
  },

  vehicle: {
    slug: 'vehicle',
    title: 'Vehicle Techniques',
    dataKey: 'vehicle',
    intro: 'The road is a battlefield too. Vehicle techniques cover everything from high-speed pursuit to evasive maneuvers to coaxing a dying engine one more mile. In the right hands, any vehicle becomes a weapon, or an escape route.',
    searchPlaceholder: 'Search vehicle techniques…',
    prev: { to: '/techniques/street', label: 'Street Techniques' },
    next: { to: '/attribution', label: 'Attribution' }
  }
}

/**
 * Order of technique types (used for prev/next navigation).
 * Must match the sidebar order.
 */
export const TECHNIQUE_TYPE_ORDER = [
  'combat',
  'command',
  'electronic-warfare',
  'remoulding',
  'science',
  'social',
  'street',
  'vehicle'
]