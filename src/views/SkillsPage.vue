<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Skills</h1>
    <p>Skills are organized into four groups: Combat, Fieldcraft, Technical, and Social. Each skill has a rating (0–5) that determines how many skill dice you roll. The approach listed indicates which approach ring typically pairs with the skill; the skill itself determines what you are trying to accomplish.</p>

    <SectionDivider label="Combat" />
    <StatBlock :stats="combatSkills" />

    <SectionDivider label="Fieldcraft" />
    <StatBlock :stats="fieldcraftSkills" />

    <SectionDivider label="Technical" />
    <StatBlock :stats="technicalSkills" />

    <SectionDivider label="Social &amp; Cultural" />
    <StatBlock :stats="socialSkills" />

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import StatBlock from '@/components/data/StatBlock.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Skills' }
]

const combatSkills = [
  { name: 'Blades', value: 'Power', desc: 'Training with edged weapons used for close quarters combat. A character with this skill knows how to control distance, angle a strike, and maintain pressure during rapid engagements. Blades covers everything from tactical knives to longer melee weapons common among specialized T-Dolls.' },
  { name: 'Exotic Weapons', value: 'Precision', desc: 'Proficiency with unconventional or rare weapons that fall outside standard military issue. These tools often require unique handling methods or specialized drills. Characters with this skill can safely wield gear that most personnel would find unwieldy or risky.' },
  { name: 'Explosives', value: 'Precision', desc: 'Competence with grenades, charges, mines, and other devices designed to disrupt, destroy, or redirect enemy movement. This skill covers proper setup, safe preparation, yield assessment, and tactical placement.' },
  { name: 'Firearms', value: 'Precision', desc: 'Familiarity with ranged weapons powered by ammunition. This skill governs accuracy, recoil control, reloading technique, and general marksmanship under duress. Characters with strong Firearms training maintain consistent performance across varied combat zones.' },
  { name: 'Hand-To-Hand', value: 'Power', desc: 'Close combat technique without weapons. Covers striking, grappling, counters, and defensive maneuvers suited for confined spaces or last resort encounters.' },
  { name: 'Tactics', value: 'Swiftness', desc: 'Battlefield reasoning applied in real time. This includes squad coordination, threat analysis, route planning, and recognition of shifting priorities. Characters with this skill keep a team functioning even when communication falters.' }
]

const fieldcraftSkills = [
  { name: 'Conditioning', value: 'Resilience', desc: 'Physical capability in demanding situations. Running, climbing, vaulting, swimming, and heavy lifting all rely on this skill. Characters with high Conditioning can push through exhaustion and perform maneuvers that would slow or stop others.' },
  { name: 'Resolve', value: 'Resilience', desc: 'Disciplined mental fortitude under hostile conditions. This includes emotional control, focused intent in unfamiliar or collapsing environments, and resistance to invasive influence such as ELID progression, coercive interrogation, or hostile signal traffic.' },
  { name: 'Crafting', value: 'Precision', desc: 'Practical ability to create, modify, or repair items using available tools and materials. This includes field repairs on gear, improvised equipment, and maintenance of worn components. Crafting keeps a squad operational between resupply opportunities.' },
  { name: 'Insight', value: 'Precision', desc: 'A refined sense for reading others. Characters with this skill can pick up shifts in tone, posture, and intent. Insight helps detect lies, anticipate decisions, and understand motivations that are not explicitly stated.' },
  { name: 'Stealth', value: 'Swiftness', desc: 'Movement and positioning that avoid detection. This skill governs silent travel, concealment, and exploiting blind spots, whether slipping through ruined structures or bypassing patrols.' },
  { name: 'Survival', value: 'Resilience', desc: 'Instinctive and practical knowledge for staying alive in any environment, from collapsing urban centers to sparse frontier districts. This skill covers resource scavenging, hazard recognition, sheltering strategies, and identifying safe paths.' }
]

const technicalSkills = [
  { name: 'Computers', value: 'Precision', desc: 'Operation, intrusion, and manipulation of digital systems. Characters with this skill navigate encrypted networks, bypass firewalls, secure data, and interface with advanced platforms. See <router-link to="/electronic-warfare">Electronic Warfare</router-link> for full rules.' },
  { name: 'Mechanics', value: 'Precision', desc: 'Practical understanding of machines, vehicles, and physical hardware. The skill covers disassembly, repair, calibration, and construction of mechanical components. It ensures that devices remain reliable under extreme field conditions.' },
  { name: 'Medicine', value: 'Precision', desc: 'Knowledge of first aid, trauma care, stabilization techniques, and longer-term treatment. Characters with this skill assess injuries, manage bleeding, administer medication, and maintain squad readiness. See <router-link to="/harm-and-healing">Harm & Healing</router-link> for recovery rules.' },
  { name: 'Piloting', value: 'Swiftness', desc: 'Training in the control of ground, air, or specialized vehicles. This skill ensures stable handling, rapid maneuvering, and situational awareness during transport or combat flight. A skilled pilot reacts fluidly to unpredictable terrain and enemy interference.' },
  { name: 'Science', value: 'Precision', desc: 'Formal study and experimental reasoning applied to field investigation. Characters use this skill to analyze materials, understand biological or chemical hazards, and interpret data from sensors or research tools.' },
  { name: 'Subterfuge', value: 'Precision', desc: 'Practical covert work involving tools and mechanical systems. Lockpicking, trap manipulation, sabotage of enemy equipment, and discreet removal of items fall under this skill. Subterfuge enables a character to bypass defenses without raising alarms.' }
]

const socialSkills = [
  { name: 'Arts', value: 'Fortune', desc: 'Creative expression across visual, musical, or written mediums. This skill allows characters to produce cultural works, interpret existing art, and understand how creativity influences morale and identity.' },
  { name: 'Command', value: 'Fortune', desc: 'Presence and authority that drive compliance. A character with this skill issues directives that others follow without hesitation. Command keeps a unit coordinated when a firm voice is required.' },
  { name: 'Culture', value: 'Precision', desc: 'Understanding of regional customs, languages, etiquette, and historical context. Characters use Culture to navigate unfamiliar communities, identify social structures, and interpret symbolic references that would be opaque to outsiders.' },
  { name: 'Deception', value: 'Swiftness', desc: 'The art of misguiding an observer through misleading statements, tactical omissions, or false signals. Characters use this skill to create uncertainty, misdirect attention, or obscure their intentions.' },
  { name: 'Negotiation', value: 'Fortune', desc: 'Skill in reaching agreements through dialogue. This includes bargaining, persuasion, conflict resolution, and smoothing interactions between groups with different interests. Negotiation helps secure cooperation without relying on force.' },
  { name: 'Performance', value: 'Fortune', desc: 'The practiced ability to maintain a persona under scrutiny. This includes acting, showmanship, and convincing roleplay during infiltration. A character with this skill can hold an audience\'s attention or support a disguise without slipping.' }
]

const prev = { to: '/approaches-and-derived-attributes', label: 'Approaches & Attributes' }
const next = { to: '/building-a-commander', label: 'Building a Commander' }
</script>
