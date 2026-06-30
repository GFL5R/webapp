// Canonical discipline data — single source of truth.
// Imported by DisciplinesPage.vue (rendering) and useSearch.js (search index).

const disciplines = [
  {
    title: 'Ghost',
    flavor: 'Ghosts don\'t exist. They\'re just a tale people assign to unexplained phenomena. No one can prove that you exist either, just the effects you\'ve left behind, usually in the form of a corpse, if anything at all. Unseen operators like you are the stuff of nightmares for any security detail, and the stuff of legends for everyone else.',
    skills: ['Stealth', 'Subterfuge', 'Conditioning'],
    techniques: [
      { name: 'Phantom Step' }, { name: 'Scrub' }, { name: 'Field Recon' },
      { name: 'Ghost Step' }, { name: 'Alibi' }, { name: 'Prepared Ambush' },
      { name: 'Dead Air' }, { name: 'Silent Strike' }, { name: 'Vanishing Act' },
      { name: 'Silent Assassin' }, { name: 'Hunter\'s Patience' }, { name: 'Dead Angle' }
    ],
    perk: { title: 'Disappearing Act', text: 'Ghosts are experts at infiltration and evasion, trained to slip past security measures and leave little to no trace of their presence. Get in, get out, and leave no one the wiser.' },
    capstone: { title: 'Absolute Stealth', text: 'The pinnacle of covert operations. Your presence becomes functionally undetectable when you commit to remaining unseen.' }
  },
  {
    title: 'Sicario',
    flavor: 'A Sicario, spanish for \'hitman\', is a professional assassin, specializing in eliminating high-profile targets. They are often hired by powerful individuals or organizations to carry out their dirty work, and are known for their efficiency and discretion.',
    skills: ['Stealth', 'Blades', 'Firearms'],
    techniques: [
      { name: 'Phantom Step' }, { name: 'Poison Blade' }, { name: 'Throwing Knife' },
      { name: 'Sighting-in' }, { name: 'Shoot to Maim' }, { name: 'Dead Air' },
      { name: 'Silent Strike' }, { name: 'Gap in the Armor' }, { name: 'Closing Strike' },
      { name: 'Momentous Strike' }, { name: 'Silent Assassin' }, { name: 'Sniper\'s Advantage' },
      { name: 'Hand of God' }
    ],
    perk: { title: 'Killshot', text: 'Sicarios are highly skilled in the use of various weapons, including firearms and blades, making them deadly combatants at any range. If someone\'s dead and you don\'t know who did it, chances are it was a Sicario.' },
    capstone: { title: 'Professional Cleanup', text: 'The ultimate expression of a Sicario\'s art: a kill so clean it leaves no trace, no witness, and no question unanswered.' }
  },
  {
    title: 'Street Kid',
    flavor: 'No one taught the street kid how to survive. They had to learn on their own, and they had to learn fast. The streets are a harsh place, and only the strong survive. Street kids are resourceful and cunning, able to navigate the urban jungle with ease.',
    skills: ['Deception', 'Crafting', 'Survival'],
    techniques: [
      { name: 'Clean Hands' }, { name: 'Improvised Hazard' }, { name: 'Friends in Low Places' },
      { name: 'Beware the Smallest Mouse' }, { name: 'What\'s Yours Is Mine' }, { name: 'Volatile Dispersal' },
      { name: 'Improvise Weapon' }, { name: 'Alibi' }, { name: 'Call the Wild' },
      { name: 'Bend with the Storm' }
    ],
    perk: { title: 'Urban Scavenger', text: 'Street kids are experts at improvisation, able to make use of whatever they can find to get by. They are also skilled at deception, able to talk their way out of trouble and manipulate others to their advantage.' },
    capstone: { title: 'Born To Survive', text: 'When everything falls apart and there\'s nothing left to lose, the Street Kid finds a way through. Survival isn\'t a choice; it\'s a reflex.' }
  },
  {
    title: 'Heartbreaker',
    flavor: 'A Heartbreaker knows that the right word at the right time can accomplish what a bullet never could. They navigate social situations with effortless grace, turning obstacles into opportunities with nothing but wit.',
    skills: ['Performance', 'Deception', 'Insight'],
    techniques: [
      { name: 'Appreciate the Scenery' }, { name: 'Artisan\'s Appraisal' }, { name: 'Cadence' },
      { name: 'Feigned Opening' }, { name: 'Friends in Low Places' }, { name: 'Just a Joke' },
      { name: 'Keep Your Cool' }, { name: 'Read the Room' }, { name: 'Roast' },
      { name: 'Show Off' }, { name: 'Bravado' }, { name: 'Dramatic Entrance' },
      { name: 'Everyone Has a Price' }, { name: 'Get Under Their Skin' }, { name: 'Lighten the Mood' },
      { name: 'Manners maketh the Man' }, { name: 'Misdirection' }, { name: 'Slip of the Tongue' },
      { name: 'Social Manipulation' }, { name: 'Bend with the Storm' }
    ],
    perk: { title: 'Silver Tongue', text: 'Heartbreakers are masters of social manipulation, able to read people like open books and write their own stories in the margins. Everyone has a price, even if that price is just being listened to.' },
    capstone: { title: 'Irresistible Charisma', text: 'At the peak of their art, a Heartbreaker doesn\'t manipulate — they inspire. People want to do what the Heartbreaker asks because it feels like their own idea.' }
  },
  {
    title: 'Smooth Talker',
    flavor: 'A Smooth Talker can walk into a room full of people who want them dead and walk out with a contract and a dinner invitation. Whether defusing a standoff or negotiating terms that somehow favor everyone at the table, they always find the angle.',
    skills: ['Negotiation', 'Culture', 'Insight'],
    techniques: [
      { name: 'Keep Your Cool' }, { name: 'Read the Room' }, { name: 'Concession' },
      { name: 'Everyone Has a Price' }, { name: 'Manners maketh the Man' }, { name: 'Negotiation Tactics' },
      { name: 'Operational Insight' }, { name: 'Perception is Reality' }, { name: 'Strategic Insight' },
      { name: 'Tactical Assessment' }, { name: 'Two Heads are Better than One' }, { name: 'Bond of Heroes' },
      { name: 'Flexible Positioning' }
    ],
    perk: { title: 'Diplomatic Immunity', text: 'Smooth Talkers understand people the way a locksmith understands locks. Every person has a mechanism, and with the right touch, they open right up.' },
    capstone: { title: 'Master Diplomat', text: 'A true Master Diplomat doesn\'t just negotiate — they reshape the terms of engagement entirely, turning adversaries into assets and deadlocks into breakthroughs.' }
  },
  {
    title: 'Commander',
    flavor: 'A Commander creates certainty in chaos. When bullets fly and systems fail, they are the calm voice that guides the team through hell and back.',
    skills: ['Command', 'Tactics', 'Resolve'],
    techniques: [
      { name: 'Borrowed Courage' }, { name: 'Intimidation' }, { name: 'Let It Ride' },
      { name: 'Marching Orders' }, { name: 'War Cry' }, { name: 'Commanding Authority' },
      { name: 'Commanding Presence' }, { name: 'Field Fortifications' }, { name: 'Look Out!' },
      { name: 'Mentorship' }, { name: 'Prepared for Anything' }, { name: 'Provocative Challenge' },
      { name: 'No Retreat' }, { name: 'Plant a Seed' }, { name: 'Sacrifice Play' },
      { name: 'Scorched Earth' }, { name: 'Shock and Awe' }
    ],
    perk: { title: 'Natural Leader', text: 'Commanders are masters of leadership and battlefield strategy, able to turn a group of individuals into a cohesive unit that moves and fights as one. They understand that morale is as important as ammunition.' },
    capstone: { title: 'Battlefield Genius', text: 'At the height of command, the Commander sees the battlefield as a single interconnected system. Every move is calculated, every order anticipated, and victory is simply a matter of execution.' }
  },
  {
    title: 'Black Hat',
    flavor: 'Networks are doors, and a Black Hat doesn\'t wait for an invitation. They find the service entrance, the loading dock, the ventilation shaft, and if none of those work, they make a new opening.',
    skills: ['Computers', 'Subterfuge', 'Tactics'],
    techniques: [
      { name: 'Blackout' }, { name: 'Cleanup Detail' }, { name: 'Cloak' },
      { name: 'Dead Drop' }, { name: 'Exfiltrate' }, { name: 'Falsify Data' },
      { name: 'Hijack' }, { name: 'ICE Breaker' }, { name: 'Overclock' },
      { name: 'Payload Injection' }, { name: 'Privilege Escalation' }, { name: 'Puppet String' },
      { name: 'Siege Engine' }, { name: 'Spoof' }, { name: 'Spike' },
      { name: 'Total Eclipse' }, { name: 'Trace' }
    ],
    perk: { title: 'Zero Day', text: 'A Black Hat\'s advantage is asymmetric. A defender has to protect everything. A Black Hat only has to find one way in.' },
    capstone: { title: 'Proxy', text: 'The Black Hat\'s ultimate trick: routing their presence through compromised systems so thoroughly that they become functionally untraceable, acting through proxies that absorb all consequences.' }
  },
  {
    title: 'Spider',
    flavor: 'Every network someone is paid to protect has someone else trying to get through it. The Spider\'s job is to make sure that person fails, and to make sure everyone knows why.',
    skills: ['Computers', 'Insight', 'Science'],
    techniques: [
      { name: 'Cloak' }, { name: 'Forensics' }, { name: 'Honeypot' },
      { name: 'Neural Fortification' }, { name: 'Overclock' }, { name: 'Patch' },
      { name: 'Quarantine' }, { name: 'Rootkit' }, { name: 'Spike' },
      { name: 'Sweep' }, { name: 'System Rollback' }, { name: 'Trace' }
    ],
    perk: { title: 'Watchdog', text: 'Defense runs on information. A Spider who knows where an intrusion is coming from has already won half the fight before the attacker knows they\'ve been detected.' },
    capstone: { title: 'Emergency Shutdown', text: 'When the network is compromised beyond recovery, the Spider can execute a controlled shutdown that preserves critical systems, traps intruders, and denies the enemy everything.' }
  },
  {
    title: 'Knuckle Dragger',
    flavor: 'When the guns run dry and the knives break, there is only what you were born with. A Knuckle Dragger has made peace with this fact and, honestly, prefers it that way.',
    skills: ['Hand-To-Hand', 'Conditioning', 'Tactics'],
    techniques: [
      { name: 'Defensive Maneuver' }, { name: 'Pistol Whip' }, { name: 'Splat!' },
      { name: 'Whirling Strike' }, { name: 'Grappler' }, { name: 'Judo Throw' },
      { name: 'Last Stand' }, { name: 'Murderous Intent' }, { name: 'Rolling With the Punches' },
      { name: 'Wrest Control' }, { name: 'Cleaving Strike' }, { name: 'Counterattack' },
      { name: 'Crushing Blow' }
    ],
    perk: { title: 'Iron Fist', text: 'Knuckle Draggers thrive in chaos, using raw power to overwhelm opponents. The philosophy is simple: if it\'s still moving, hit it again.' },
    capstone: { title: 'Unstoppable Force', text: 'At the peak of conditioning and combat instinct, the Knuckle Dragger becomes a force of nature — an immovable object that keeps coming no matter what stands in the way.' }
  },
  {
    title: 'Analyst',
    flavor: 'Information is power, and an Analyst is a master of both. They can take a pile of data and turn it into actionable intelligence that can change the course of a mission.',
    skills: ['Science', 'Insight', 'Computers'],
    techniques: [
      { name: 'Ballistic Analysis' }, { name: 'Chemical Analysis' }, { name: 'Chemical Synthesis' },
      { name: 'Examine for ELID' }, { name: 'Forensic Analysis' }, { name: 'Jack of All Trades' },
      { name: 'Operational Insight' }, { name: 'Slip of the Tongue' }, { name: 'Strategic Insight' },
      { name: 'Tactical Assessment' }, { name: 'Um, Actually' }
    ],
    perk: { title: 'Analytical Mind', text: 'Analysts are the brains behind the brawn, using their knowledge and insight to outthink opponents and stay one step ahead. They understand that in the information age, the right piece of data can be more valuable than any weapon.' },
    capstone: { title: 'Elementary', text: 'When the Analyst reaches the peak of their art, no puzzle remains unsolved. They see patterns in chaos and answers in confusion, reducing complex situations to simple, actionable truths.' }
  },
  {
    title: 'Field Medic',
    flavor: 'When a teammate goes down, the clock starts. The Field Medic is the person who knows how to stop it.',
    skills: ['Medicine', 'Conditioning', 'Science'],
    techniques: [
      { name: 'Emergency Aid' }, { name: 'Combat Stimulant' }, { name: 'Emergency Triage' },
      { name: 'Field Dressing' }, { name: 'Field Surgery' }, { name: 'Hazard Detection' },
      { name: 'Pain Management' }, { name: 'Group Treatment' }, { name: 'Resuscitation' },
      { name: 'Stabilize the Dying' }, { name: 'Stop the Bleeding' }
    ],
    perk: { title: 'Triage', text: 'Field medicine is not clean or controlled. It\'s performed under fire, with inadequate supplies, on patients who can\'t stay still. What matters is outcome, and a good Field Medic gets people back on their feet in conditions where most would just be writing the after-action report.' },
    capstone: { title: 'Miracle Worker', text: 'When hope is lost and death seems certain, the Miracle Worker finds a way. They perform the impossible with steady hands and unshakeable resolve, pulling comrades back from the brink.' }
  },
  {
    title: 'Grease Monkey',
    flavor: 'A Grease Monkey looks at a battlefield and sees infrastructure. Defensible positions, structural weaknesses, killzones waiting to be established. The terrain isn\'t fixed; it\'s a starting condition.',
    skills: ['Crafting', 'Mechanics', 'Explosives'],
    techniques: [
      { name: 'Breach Charge' }, { name: 'Device Modification' }, { name: 'Emergency Frame Stabilization' },
      { name: 'Emergency Patch' }, { name: 'Emergency Repair' }, { name: 'Field Repair' },
      { name: 'Grease The Joints' }, { name: 'Improvised Fortification' }, { name: 'Jury-Rig' },
      { name: 'Remote Detonator' }, { name: 'Reserve Power' }, { name: 'Sensor Array' },
      { name: 'Structural Analysis' }, { name: 'Trip Wire' }
    ],
    perk: { title: 'Field Kit', text: 'Given time and materials, a Grease Monkey can change the conditions of any engagement. Given less time, they\'ll improvise. The outcome is the same.' },
    capstone: { title: 'On the Fly', text: 'The Grease Monkey\'s ultimate expression of craft: building, modifying, or destroying with nothing but instinct and whatever happens to be within reach. Preparation is optional; creativity is not.' }
  },
  {
    title: 'Knives',
    flavor: 'Knives are a weapon as old as humanity itself. A utilitarian tool for the masses that unlocked humanity\'s potential, making it possible to hunt, build, and defend ourselves.',
    skills: ['Blades', 'Stealth', 'Subterfuge'],
    techniques: [
      { name: 'Throwing Knife' }, { name: 'Gap in the Armor' }, { name: 'Closing Strike' },
      { name: 'Momentous Strike' }, { name: 'Wrest Control' }, { name: 'Evasive Footwork' },
      { name: 'Weapon Lock' }, { name: 'Hunter\'s Patience' }, { name: 'Dead Air' },
      { name: 'Sever the Artery' }
    ],
    perk: { title: 'Sleight of Hand', text: 'A knife is an extension of the body, a silent instrument of death that can strike with deadly precision.' },
    capstone: { title: 'Death\'s Whisper', text: 'At the pinnacle of knife mastery, the blade becomes invisible. Targets never see it coming, and witnesses never see it leave. Only the result remains.' }
  },
  {
    title: 'Swords',
    flavor: 'Using a sword in 2072 is a statement. Heroes of myth and legend wielded swords, and so now do you as well, perhaps as a nod to the past, or perhaps as a symbol of your own code of honor.',
    skills: ['Blades', 'Conditioning', 'Resolve'],
    techniques: [
      { name: 'Acrobatic Recovery' }, { name: 'Deflective Defense' }, { name: 'Cleaving Strike' },
      { name: 'Counterattack' }, { name: 'Gap in the Armor' }, { name: 'Closing Strike' },
      { name: 'Momentous Strike' }, { name: 'Judo Throw' }, { name: 'Murderous Intent' },
      { name: 'Wrest Control' }, { name: 'Evasive Footwork' }, { name: 'Weapon Lock' },
      { name: 'Forced Hand' }, { name: 'Takedown' }, { name: 'Hunter\'s Patience' }
    ],
    perk: { title: 'Razor Edged', text: 'A sword is a versatile weapon that can be used for both offense and defense, allowing for a wide range of techniques and strategies in combat.' },
    capstone: { title: 'Living Blade', text: 'At the peak of swordsmanship, the wielder and the weapon become one. The blade moves before conscious thought, answering threats the swordsman hasn\'t yet registered.' }
  },
  {
    title: 'Pistols',
    flavor: 'Pistols are the most common firearm in 2072, and for good reason. They\'re compact, easy to use, and effective at close to medium range. A pistol is a reliable sidearm that can be used in a variety of situations, making it a staple for any operator.',
    skills: ['Firearms', 'Subterfuge', 'Tactics'],
    techniques: [
      { name: 'Sighting-in' }, { name: 'Shoot to Maim' }, { name: 'Guns Akimbo' },
      { name: 'Disarming Shot' }, { name: 'Suppressive Fire' }, { name: 'Ricochet' },
      { name: 'Forced Hand' }, { name: 'AP Round' }, { name: 'Dead Angle' },
      { name: 'Murderous Intent' }, { name: 'Evasive Footwork' }
    ],
    perk: { title: 'Quick Draw', text: 'To specialize in pistols is to master them, making them a maneuverable and deadly weapon that can be drawn and fired before an opponent even realizes what\'s happening.' },
    capstone: { title: 'Deadeye', text: 'The pistol becomes an extension of the gunfighter\'s will. Distance, cover, and movement become irrelevant — the bullet finds its mark because the shooter has already placed it there in their mind.' }
  },
  {
    title: 'Submachine Guns',
    flavor: 'Submachine guns are the weapon of choice for close-quarters combat, offering a high rate of fire and excellent maneuverability. They are ideal for operators who need to move quickly and engage targets at close range.',
    skills: ['Firearms', 'Stealth', 'Tactics'],
    techniques: [
      { name: 'Aggressive Escort' }, { name: 'Acrobatic Recovery' }, { name: 'Distraction Tactics' },
      { name: 'Shoot to Maim' }, { name: 'Suppressive Fire' }, { name: 'Ricochet' },
      { name: 'Evasive Footwork' }, { name: 'Airborne Assault' }, { name: 'Pistol Whip' },
      { name: 'Shoot and Scoot' }
    ],
    perk: { title: 'Room Presence', text: 'They are especially effective in tight spaces where volume of fire matters more than precision, making them a favorite among operators who prefer a more aggressive posture.' },
    capstone: { title: 'Bullet Storm', text: 'At close range, the SMG specialist becomes a hurricane of lead. Every corner, every doorway, every confined space becomes a killzone with no escape.' }
  },
  {
    title: 'Shotguns',
    flavor: 'Shotguns have been around for centuries, and they continue to be a powerful weapon in 2072. They are devastating at close range, capable of taking down multiple targets with a single blast.',
    skills: ['Firearms', 'Conditioning', 'Survival'],
    techniques: [
      { name: 'Pistol Whip' }, { name: 'Crushing Blow' }, { name: 'Trench Sweeper' },
      { name: 'Swiss Cheese' }, { name: 'Quick Draw: Keep One In the Chamber' }, { name: 'Aggressive Escort' },
      { name: 'Suppressive Fire' }, { name: 'Ricochet' }, { name: 'Takedown' },
      { name: 'Last Stand' }
    ],
    perk: { title: 'Point Blank', text: 'There is no weapon more powerful at point blank than a shotgun. A rifle can put a hole in a target, but a shotgun can completely remove it from existence.' },
    capstone: { title: 'Thunderclap', text: 'The shotgunner\'s ultimate expression: a blast so devastating it defines the close-quarters engagement, leaving nothing in its wake but silence and scattered shell casings.' }
  },
  {
    title: 'Assault Rifles',
    flavor: 'The rifleman is the backbone of any combat unit, and the assault rifle is their weapon of choice. It offers a balance of range, accuracy, and firepower that makes it effective in a wide variety of combat situations.',
    skills: ['Firearms', 'Tactics', 'Conditioning'],
    techniques: [
      { name: 'Airborne Assault' }, { name: 'Sighting-in' }, { name: 'Anchor Point' },
      { name: 'Eyes on the Prize' }, { name: 'Shoot to Maim' }, { name: 'Suppressive Fire' },
      { name: 'Hunter\'s Patience' }, { name: 'Dead Angle' }, { name: 'AP Round' },
      { name: 'Distraction Tactics' }
    ],
    perk: { title: 'Versatile', text: 'Assault rifles are versatile weapons, capable of engaging targets at almost any range. It\'s never the best choice for any specific situation, but it\'s never the worst choice either.' },
    capstone: { title: 'Lead Rain', text: 'The rifleman achieves mastery of the intermediate cartridge: sustained, accurate fire at any practical combat range, controlling the engagement on their terms.' }
  },
  {
    title: 'Battle Rifles',
    flavor: 'Battle Rifles are Assault Rifles\' older, more powerful sibling. Unlike Assault Rifles which fire an intermediate cartridge, Battle Rifles retained the full power cartridges of their bolt-action ancestors, giving them superior range and stopping power at the cost of increased recoil and reduced magazine capacity.',
    skills: ['Firearms', 'Resolve', 'Tactics'],
    techniques: [
      { name: 'Airborne Assault' }, { name: 'Eyes Up!' }, { name: 'Sighting-in' },
      { name: 'Hand of God' }, { name: 'Shoot to Maim' }, { name: 'Hunter\'s Patience' },
      { name: 'Dug In' }, { name: 'AP Round' }, { name: 'Dead Angle' },
      { name: 'Eyes on the Prize' }
    ],
    perk: { title: 'Heavy Hitter', text: 'Battle Rifles are the weapon of choice for marksmen and snipers who need to engage targets at longer ranges, but they can also be effective in close quarters with the right training and techniques.' },
    capstone: { title: 'Stopping Power', text: 'With a full-power cartridge and the skill to place it, the Battle Rifle specialist doesn\'t need follow-up shots. One round, one target, one result.' }
  },
  {
    title: 'Snipers',
    flavor: 'Sniper Rifles encompass everything from your great grandpa\'s hunting rifle to the most advanced anti-materiel rifles of 2072. They are designed for precision shooting at long ranges, allowing snipers to take out targets from a distance with deadly accuracy.',
    skills: ['Firearms', 'Stealth', 'Survival'],
    techniques: [
      { name: 'Sighting-in' }, { name: 'Battle in the Mind' }, { name: 'Sniper\'s Advantage' },
      { name: 'Hand of God' }, { name: 'Hunter\'s Patience' }, { name: 'Dead Angle' },
      { name: 'Dug In' }, { name: 'Glass Case' }, { name: 'Shoot to Maim' },
      { name: 'Eyes on the Prize' }
    ],
    perk: { title: 'Patience', text: 'Snipers trade volume of fire for extreme precision, making them the premier choice for an operator who wants to reach out and touch someone without ever being seen.' },
    capstone: { title: 'One Shot', text: 'The sniper\'s creed fulfilled: one shot, one kill. At the peak of precision shooting, the bullet and the target are already connected before the trigger is pulled.' }
  },
  {
    title: 'Machine Guns',
    flavor: 'Machine Guns changed warfare forever, and they continue to be a dominant force on the battlefield in 2072. They are designed for sustained automatic fire, providing suppressive firepower that can pin down enemies and control the flow of battle.',
    skills: ['Firearms', 'Conditioning', 'Resolve'],
    techniques: [
      { name: 'Anchor Point' }, { name: 'Landmine' }, { name: 'Last Stand' },
      { name: 'Suppressive Fire' }, { name: 'Dug In' }, { name: 'Glass Case' },
      { name: 'AP Round' }, { name: 'Distraction Tactics' }, { name: 'Aggressive Escort' },
      { name: 'Shoot to Maim' }
    ],
    perk: { title: 'Suppressive Instinct', text: 'Machine Guns are the weapon of choice for operators who want to dominate the battlefield with overwhelming firepower, capable of mowing down waves of enemies and breaking through fortified positions.' },
    capstone: { title: 'Wall of Lead', text: 'When the Machine Gunner opens up at full capacity, the battlefield transforms. Movement stops. Heads stay down. The gunner owns every meter of ground in their field of fire.' }
  },
  {
    title: 'Frontliner',
    flavor: 'Someone has to go first. The Frontliner is the operator who volunteers for that role, armed with a shield and the training to use it. They are the wall between their team and the enemy, absorbing damage that would devastate anyone else.',
    skills: ['Exotic Weapons', 'Tactics', 'Conditioning'],
    techniques: [
      { name: 'Shield Bash' }, { name: 'Intercept' }, { name: 'Breach and Clear' },
      { name: 'Bulwark' }, { name: 'Judo Throw' }, { name: 'Grappler' },
      { name: 'Wrest Control' }, { name: 'Rolling With the Punches' }, { name: 'Weapon Lock' },
      { name: 'Dug In' }, { name: 'Takedown' }
    ],
    perk: { title: 'Shield Wall', text: 'Frontliners excel at close-quarters protection, using shields and defensive positioning to control the battlefield. They understand that the best way to protect their team is to make themselves the most obvious target, and the hardest one to bring down.' },
    capstone: { title: 'Unbreakable', text: 'At the pinnacle of defensive combat, the Frontliner becomes a fortress. Nothing gets past them, nothing moves them, and nothing stops them from standing between danger and their squad.' }
  },
  {
    title: 'Baby Driver',
    flavor: 'A Baby Driver slots into the driver\'s seat the way a magazine locks into a receiver. The wheel turns before conscious thought. The throttle answers questions the driver has not finished asking.',
    skills: ['Piloting', 'Firearms', 'Resolve'],
    techniques: [
      { name: 'J-Turn' }, { name: 'Bumper Tag' }, { name: 'Lead Foot' },
      { name: 'Drive-By Directive' }, { name: 'Dirty Windshield' }, { name: 'Shoot and Scoot' },
      { name: 'Suppressive Fire' }, { name: 'Evasive Footwork' }, { name: 'Ricochet' },
      { name: 'Chicken' }, { name: 'Ride the Line' }, { name: 'Totaled' },
      { name: 'Push It to the Limit' }, { name: 'Ghost Ride' }
    ],
    perk: { title: 'Redline', text: 'Speed settles arguments. Tight gaps are invitations. When the chase ends, the other driver fills out the paperwork. Always.' },
    capstone: { title: 'One Last Run', text: 'When everything is on the line and the only way out is through, the Baby Driver finds a gear nobody else knew existed. One last run, one perfect line, and the finish.' }
  },
  {
    title: 'Chauffeur',
    flavor: 'A Chauffeur treats the vehicle like a mobile safe room. Every input is measured. Every shift is invisible. Passengers arrive without remembering the drive.',
    skills: ['Piloting', 'Tactics', 'Insight'],
    techniques: [
      { name: 'Rapid Transit' }, { name: 'Read the Room' }, { name: 'Keep Your Cool' },
      { name: 'Defensive Maneuver' }, { name: 'Evasive Footwork' }, { name: 'PIT Maneuver' },
      { name: 'Thread the Needle' }, { name: 'Rolling Fortress' }, { name: 'Tactical Assessment' },
      { name: 'Look Out!' }, { name: 'Flexible Positioning' }, { name: 'Dug In' },
      { name: 'Ride the Line' }, { name: 'Smoke and Mirrors' }
    ],
    perk: { title: 'Smooth Operator', text: 'Pursuers lose the tail without knowing when they lost it. Road hazards become alternate routes before the passenger notices the lane change. The Chauffeur picks the cleanest line through the chaos. The car behind eats the wrong turn.' },
    capstone: { title: 'The Professional', text: 'At the peak of defensive driving, the Chauffeur doesn\'t evade pursuers — they make pursuers give up. Every route is pre-planned, every contingency anticipated, every passenger delivered.' }
  }
]

export default disciplines
