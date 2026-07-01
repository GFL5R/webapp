<template>
  <ContentFrame>
    <div class="home-hero">
      <div class="home-hero__title">
        <span class="hero-gfl">GFL</span><span class="hero-5r">5R</span>
      </div>
      <div class="home-hero__subtitle">TACTICAL FIELD MANUAL</div>
      <div class="home-hero__line"></div>
      <p class="home-hero__desc">
        A tabletop roleplaying game set in the near-future cyberpunk world of <em>Girls' Frontline</em>:
        autonomous T-Dolls, collapse radiation, and asymmetric warfare. Built on <em>Legend of the Five Rings</em>'
        roll-and-keep dice engine, with its framework of basic actions, techniques, advantages, and passions
        ported wholesale into a sci-fi setting.
      </p>
      <p class="home-hero__why">
        <strong>Why GFL5R?</strong>
        It's a portmanteau of two acronyms: <em>GFL</em> from <em>Girls' Frontline</em> and <em>L5R</em> from
        <em>Legend of the Five Rings</em>.
      </p>
    </div>

    <div class="home-grid">
      <HomeCard
        v-for="card in homeCards"
        :key="card.to"
        :icon="card.icon"
        :title="card.title"
        :description="card.description"
        :to="card.to"
      />
    </div>

    <p class="readout">GFL5R Field Manual v1.0 · Secure Link Active</p>
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import HomeCard from '@/components/cards/HomeCard.vue'

const homeCards = [
  { icon: '▣', title: 'Setting & T-Dolls', description: 'The world of 2095, T-Doll technology, and the state of the battlefield.', to: '/setting-and-t-dolls' },
  { icon: '◆', title: 'Making a Check', description: 'Core dice mechanics: approach dice, skill dice, TNs, opportunities, and strife.', to: '/making-a-check' },
  { icon: '◈', title: 'Approaches & Attributes', description: 'The five approaches and derived attributes that define every character.', to: '/approaches-and-derived-attributes' },
  { icon: '▸', title: 'Skills', description: 'Combat, Fieldcraft, Technical, and Social skill groups with full descriptions.', to: '/skills' },
  { icon: '◎', title: 'Building a Commander', description: 'Step-by-step character creation for human commanders.', to: '/building-a-commander' },
  { icon: '◉', title: 'Building Your T-Doll', description: 'Step-by-step creation of your T-Doll companion character.', to: '/building-your-t-doll' },
  { icon: '⬡', title: 'Disciplines', description: 'Character schools and specializations with techniques and perks.', to: '/disciplines' },
  { icon: '▲', title: 'Harm & Healing', description: 'Endurance, injuries, critical hits, medical care, and recovery.', to: '/harm-and-healing' },
  { icon: '▽', title: 'Conditions', description: 'Status effects, their penalties, and how to remove them.', to: '/conditions' },
  { icon: '◫', title: 'Weapons & Armor', description: 'Weapon tags, armor qualities, equipment tables, and item rules.', to: '/weapons-and-armor' },
  { icon: '◧', title: 'Scenes', description: 'Structuring gameplay: conflict scenes, downtime, interludes, and pacing.', to: '/scenes' },
  { icon: '⬒', title: 'Range Bands', description: 'Positioning and distance in tactical combat: ranges and movement.', to: '/range-bands' },
  { icon: '⬓', title: 'Strife', description: 'Mental and emotional pressure: accumulating strife, outbursts, and recovery.', to: '/strife' },
  { icon: '☢', title: 'Collapse & Radiation', description: 'Hazardous environments, contamination zones, and radiation effects.', to: '/collapse-radiation' },
  { icon: '⚡', title: 'Electronic Warfare', description: 'Hacking, jamming, drones, and digital combat operations.', to: '/electronic-warfare' },
  { icon: '☠', title: 'Poisons & Drugs', description: 'Toxic substances, medical drugs, and their game effects.', to: '/poisons-and-drugs' },
  { icon: '⚙', title: 'Driving & Vehicles', description: 'Vehicle rules, chase sequences, and vehicular combat.', to: '/driving-and-vehicles' },
  { icon: '⬆', title: 'Experience', description: 'Advancement, XP awards, rank progression, and character growth.', to: '/experience' },
  { icon: '◈', title: 'Humanity & Fame', description: 'Reputation, social standing, humanity loss, and fame mechanics.', to: '/humanity-and-fame' },
  { icon: '⬟', title: 'A Boy & His Doll', description: 'The bond between commander and T-Doll: teamwork and relationship rules.', to: '/a-boy-and-his-doll' },
  { icon: '▣', title: 'Factions', description: 'Major powers and organizations in the GFL5R world.', to: '/factions' },
  { icon: '◑', title: 'Crime', description: 'Illegal activities, underworld contacts, and criminal enterprise rules.', to: '/crime' },
  { icon: '⚠', title: 'Remoulding Failure Table', description: 'Mishap outcomes and catastrophic bloom events for remoulding techniques.', to: '/remoulding-failure-table' },
  { icon: '⬡', title: 'NPCs', description: 'Non-player character stat blocks, behaviors, and encounter design.', to: '/npcs' },
  { icon: '†', title: 'Attribution', description: 'Credits, acknowledgments, and open source licenses.', to: '/attribution' },
  { icon: '◉', title: 'Techniques', description: 'Combat, social, EW, remoulding, street, and vehicle techniques.', to: '/techniques' },
  { icon: '◉', title: 'Advantages', description: 'Traits that let you reroll dice when conditions are met.', to: '/advantages' },
  { icon: '◉', title: 'Disadvantages', description: 'Flaws that force rerolls of favorable dice — and earn fortune.', to: '/disadvantages' },
  { icon: '◉', title: 'Passions', description: 'Emotional anchors that remove Strife when engaged.', to: '/passions' },
  { icon: '◉', title: 'Anxieties', description: 'Emotional triggers that add Strife when provoked — and grant fortune.', to: '/anxieties' },
  { icon: '◉', title: 'Modules', description: 'T-Doll augmentations, flash training, and upgrade packages.', to: '/modules' },
  { icon: '◉', title: 'Weapons', description: 'Firearms, blades, and combat equipment catalog.', to: '/weapons' },
  { icon: '◉', title: 'Items', description: 'Gear, attachments, and accessories.', to: '/items' },
  { icon: '◉', title: 'Armor', description: 'Protective equipment: vests, carriers, and exosuits.', to: '/armor' },
  { icon: '◉', title: 'Perks', description: 'Special abilities unlocked through Disciplines.', to: '/perks' },
  { icon: '◉', title: 'Capstones', description: 'Legendary rank-5 Discipline mastery abilities.', to: '/capstones' },
]
</script>
