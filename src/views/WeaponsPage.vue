<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Weapons &amp; Armor</h1>
    <p>Weapons and armor in 2072 blend cutting-edge technology with proven designs, providing tactical advantages in the field while carrying the weight of their consequences. From concealed knives to heavy machine guns, and from lightweight vests to powered exosuits, these tools define a character's capabilities in combat and survival.</p>

    <SectionDivider label="Weapon Attributes" />
    <p>Weapons use the following attributes to define their performance, detectability, and impact on a target:</p>
    <StatBlock :stats="weaponAttributes" />

    <h3>Weapon Categories</h3>
    <StatBlock :stats="weaponCategories" />

    <RulesCallout>
      <p><strong>Attachments:</strong> Attachments are modifications purchased separately and fitted to a weapon. Each attachment applies a quality to the weapon for as long as it remains installed. See the <router-link to="/items">Items list</router-link> for available attachments and their costs.</p>
    </RulesCallout>

    <SectionDivider label="Weapon Qualities" />
    <p>Weapons may possess one or more qualities that modify how they function in the field:</p>
    <StatBlock :stats="weaponQualities" />

    <SectionDivider label="Readied &amp; Sheathed Weapons" />
    <StatBlock :stats="readyStates" />
    <p>A character may ready:</p>
    <ul>
      <li>One pair of one-handed weapons, <em>or</em></li>
      <li>One two-handed weapon</li>
    </ul>

    <SectionDivider label="Armor" />
    <p>Armor represents protective gear worn to survive hostile environments and incoming fire. Each suit or plate offers a tradeoff between protection, mobility, and concealability.</p>

    <h3>Armor Attributes</h3>
    <StatBlock :stats="armorAttributes" />

    <h3>Armor Profile Guidelines</h3>
    <ul>
      <li><strong>Higher Protection</strong> often comes with higher <strong>Weight</strong> and <strong>Signature</strong></li>
      <li>A powered exosuit reduces the Weight penalty of worn armor, at the cost of unavoidable Signature</li>
      <li>Low-Signature armor sacrifices Protection to remain concealable</li>
    </ul>
    <p>Characters select armor based on mission needs: discretion, mobility, or raw survivability depending on expected threats.</p>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import StatBlock from '@/components/data/StatBlock.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Weapons & Armor' }
]

const weaponAttributes = [
  { name: 'Category', value: 'Classification', desc: 'The broad classification of the weapon. Some techniques or equipment interact with specific categories.' },
  { name: 'Name', value: 'Model', desc: 'The specific model or designation. Most are based on real-world firearms or recognizable equivalents.' },
  { name: 'Skill', value: 'Required', desc: 'The Skill required to use the weapon effectively (Blades, Firearms, etc.).' },
  { name: 'Ideal Range', value: 'Band', desc: 'The range band at which the weapon performs best. Attacking outside this band increases TN by +1 per band beyond ideal.' },
  { name: 'Damage', value: 'Base', desc: 'The weapon\'s base Fatigue output. Bonus successes increase Damage.' },
  { name: 'Deadliness', value: 'Severity', desc: 'The severity of critical effects the weapon inflicts. Higher Deadliness means deeper trauma.' },
  { name: 'Grip', value: '1H or 2H', desc: 'How the weapon is held. Some weapons list alternative grips.' },
  { name: 'Threat', value: 'Detection', desc: 'How many range bands away the weapon\'s fire can be detected.' },
  { name: 'Signature', value: 'Concealment', desc: 'How difficult the weapon is to conceal. Sets the TN for Subterfuge checks to hide the weapon.' },
  { name: 'Qualities', value: 'Traits', desc: 'Special traits that modify how the weapon functions.' },
  { name: 'Price', value: 'Credits', desc: 'The cost to acquire the weapon. Prices reflect combat effectiveness.' }
]

const weaponCategories = [
  { name: 'KNF', value: 'Knives', desc: 'Bladed weapons under 30 cm; concealable and quick to draw.' },
  { name: 'BLD', value: 'Swords', desc: 'Bladed weapons over 30 cm; effective for silent takedowns and melee dominance.' },
  { name: 'HG', value: 'Handguns', desc: 'Compact firearms for one-handed use; ideal as backup or concealed weapons.' },
  { name: 'SMG', value: 'Submachine Guns', desc: 'Automatic firearms in pistol calibers; excel in close-quarters.' },
  { name: 'SG', value: 'Shotguns', desc: 'Close-quarters spread weapons; devastating at short range with area effect.' },
  { name: 'AR', value: 'Assault Rifles', desc: 'Automatic firearms using intermediate cartridges; the standard infantry weapon.' },
  { name: 'BR', value: 'Battle Rifles', desc: 'Automatic firearms firing full-power cartridges; high recoil, long reach.' },
  { name: 'RF', value: 'Rifles', desc: 'Precision, full-powered long guns for marksman or sniper roles.' },
  { name: 'MG', value: 'Machine Guns', desc: 'Heavy automatic weapons for sustained fire and area denial.' }
]

const weaponQualities = [
  { name: 'AOE', value: 'Area of Effect', desc: 'The weapon targets an entire grid square rather than a single target. All characters within the affected area must defend against the attack.' },
  { name: 'Concealable', value: 'Hidden', desc: 'The weapon is small enough that concealing it does not require a Subterfuge check. It can be hidden on the person without drawing attention.' },
  { name: 'Cumbersome', value: 'Mobility Penalty', desc: 'The weapon is heavy or awkward to wield. The wielder\'s free movement is reduced to 1 range band (instead of 2) when carrying this weapon readied.' },
  { name: 'Defensive X', value: 'Protection', desc: 'The weapon is designed to protect its wielder. When wielded, add X to the character\'s physical resistance against attacks. Applies even when not attacking.' },
  { name: 'Deployable', value: 'Fixed Position', desc: 'The weapon can be set up in a fixed position. When deployed, the wielder gains the benefits of cover, but cannot move until they spend an action to retrieve the weapon.' },
  { name: 'Durable', value: 'Hard to Break', desc: 'A utilitarian item that is hard to break. If the weapon would gain the Damaged quality, it loses Durable instead.' },
  { name: 'Heavy Barrel', value: 'Precision Tradeoff', desc: 'The weapon has a heavy barrel fitted. Deadliness is increased by 1, and Damage is decreased by 1.' },
  { name: 'Mobile', value: 'Enhanced Movement', desc: 'The weapon is light enough to use on the move. The wielder may move 2 range bands as free movement, but attacks after this enhanced movement have TN +1.' },
  { name: 'Compensated', value: 'Muzzle Brake', desc: 'The weapon has a compensator fitted. Damage is increased by 1, and both Threat and Signature are increased by 1.' },
  { name: 'Scoped', value: 'Range Extension', desc: 'The weapon has a scope fitted. Ideal range is increased by 1, to a maximum of 6.' },
  { name: 'Stationary', value: 'No Movement', desc: 'The weapon cannot be fired on the same turn as movement. The operator must be stationary to engage targets effectively.' },
  { name: 'Suppressed', value: 'Quiet', desc: 'The weapon has a suppressor attached. Threat is reduced by 2, and Signature is increased by 1.' }
]

const readyStates = [
  { name: 'Readied', value: 'In Hand', desc: 'Physically prepared to fire, swing, or use immediately. During narrative time, characters may ready weapons freely. During combat, readying requires an action unless otherwise specified.' },
  { name: 'Sheathed', value: 'Stowed', desc: 'Stowed, holstered, slung, or otherwise not in hand. Sheathing follows the same timing rules as readying.' }
]

const armorAttributes = [
  { name: 'Weight', value: 'Encumbrance', desc: 'How physically encumbering the armor is. When taking Fatigue from non-combat sources (running, climbing, forced marches), Weight increases the Fatigue taken.' },
  { name: 'Signature', value: 'Visibility', desc: 'How visible or recognizable the armor is. Serves as the TN for Subterfuge checks to conceal the armor beneath clothing.' },
  { name: 'Protection', value: 'Damage Reduction', desc: 'Reduces the Damage a character takes from incoming attacks. Protection is applied before bonus successes increase Damage. Even modest armor can keep a character functional under fire.' }
]

const prev = { to: '/strife', label: 'Strife' }
const next = { to: '/collapse-radiation', label: 'Collapse & Radiation' }
</script>