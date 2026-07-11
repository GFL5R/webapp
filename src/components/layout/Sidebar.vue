<template>
  <nav class="sidebar" :class="{ open }">
    <SidebarSection
      v-for="section in sections"
      :key="section.label"
      :label="section.label"
      :links="section.links"
      :sub-sections="section.subSections"
      :default-open="section.defaultOpen"
    />
  </nav>
</template>

<script setup>
import SidebarSection from './SidebarSection.vue'

defineProps({
  open: { type: Boolean, default: false }
})

const sections = [
  {
    label: 'Core Rules',
    defaultOpen: true,
    links: [
      { to: '/making-a-check', label: 'Making a Check' },
      { to: '/approaches-and-derived-attributes', label: 'Approaches & Attributes' },
      { to: '/skills', label: 'Skills' },
      { to: '/range-bands', label: 'Range Bands' },
      { to: '/scenes', label: 'Scenes' },
    ]
  },
  {
    label: 'Combat & Harm',
    defaultOpen: false,
    links: [
      { to: '/harm-and-healing', label: 'Harm & Healing' },
      { to: '/conditions', label: 'Conditions' },
      { to: '/strife', label: 'Strife' },
      { to: '/weapons-and-armor', label: 'Weapons & Armor' },
      { to: '/collapse-radiation', label: 'Collapse & Radiation' },
      { to: '/poisons-and-drugs', label: 'Poisons & Drugs' },
      { to: '/driving-and-vehicles', label: 'Driving & Vehicles' },
      { to: '/electronic-warfare', label: 'Electronic Warfare' },
    ]
  },
  {
    label: 'Characters',
    defaultOpen: false,
    links: [
      { to: '/a-boy-and-his-doll', label: 'A Boy & His Doll' },
      { to: '/building-a-commander', label: 'Building a Commander' },
      { to: '/building-your-t-doll', label: 'Building Your T-Doll' },
      { to: '/going-solo', label: 'Going Solo (Variant)' },
      { to: '/disciplines', label: 'Disciplines' },
      { to: '/experience', label: 'Experience' },
      { to: '/humanity-and-fame', label: 'Humanity & Fame' },
    ],

  },
  {
    label: 'World',
    defaultOpen: false,
    links: [
      { to: '/setting-and-t-dolls', label: 'Setting & T-Dolls' },
      { to: '/factions', label: 'Factions' },
      { to: '/crime', label: 'Crime' },
      { to: '/remoulding', label: 'Remoulding' },
      { to: '/remoulding-failure-table', label: 'Remoulding Failure Table' },
      { to: '/transhumanism', label: 'Transhumanism' },
    ]
  },
  {
    label: 'Compendium',
    defaultOpen: false,
    links: [
      { to: '/npcs', label: 'NPCs' },
    ],
    subSections: [
      {
        label: 'Peculiarities',
        defaultOpen: true,
        links: [
          { to: '/passions', label: 'Passions' },
          { to: '/advantages', label: 'Advantages' },
          { to: '/disadvantages', label: 'Disadvantages' },
          { to: '/anxieties', label: 'Anxieties' },
        ]
      },
      {
        label: 'Techniques',
        defaultOpen: false,
        links: [
          { to: '/techniques/combat', label: 'Combat' },
          { to: '/techniques/command', label: 'Command' },
          { to: '/techniques/electronic-warfare', label: 'EW' },
          { to: '/techniques/remoulding', label: 'Remoulding' },
          { to: '/techniques/science', label: 'Science' },
          { to: '/techniques/social', label: 'Social' },
          { to: '/techniques/street', label: 'Street' },
          { to: '/techniques/vehicle', label: 'Vehicle' },
          { to: '/perks', label: 'Perks' },
          { to: '/capstones', label: 'Capstones' },
        ]
      },
      {
        label: 'Equipment',
        defaultOpen: false,
        links: [
          { to: '/weapons', label: 'Weapons' },
          { to: '/armor', label: 'Armor' },
          { to: '/items', label: 'Items' },
          { to: '/modules', label: 'Modules' },
          { to: '/vehicles', label: 'Vehicles' },
        ]
      },
    ]
  },
  {
    label: 'Reference',
    defaultOpen: false,
    links: [
      { to: '/attribution', label: 'Attribution' },
    ]
  }
]
</script>
