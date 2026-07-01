<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Poisons &amp; Drugs</h1>
    <p>The dose makes the poison. Almost every substance capable of killing someone is also, in the right quantity, capable of healing them. A character who understands chemistry does not think in terms of medicine versus poison; they think in terms of dose, delivery, and intent.</p>

    <h2>Doses</h2>
    <p>Substances are tracked in individual <strong>doses</strong>. A single dose is the amount needed to produce one application of either a medical or harmful effect. Acquiring doses requires procurement (purchase, theft, extraction) or preparation with a successful <strong>Crafting or Science check</strong> during downtime. A dose is consumed when applied, whether it works or not.</p>

    <h2>Administration</h2>
    <StatBlock :stats="administration" />

    <SectionDivider label="Resistance" />

    <p>When exposed to a harmful substance against their will, make a <strong>Conditioning check</strong> at the substance's listed TN. If the substance only inflicts a condition, a success negates it entirely. If the substance inflicts a condition for a set duration, each bonus success reduces that duration. A Session becomes a scene, a scene becomes five rounds, and further bonus successes reduce the duration by one round each.</p>

    <RulesCallout>
      <p>T-Dolls are generally immune to organic poisons but may be vulnerable to chemical processes affecting synthetic materials (solvents, oxidizers, corrosives). The GM determines applicability.</p>
    </RulesCallout>

    <SectionDivider label="Substances" />

    <SubstanceCard
      title="Stimulant"
      :altNames="[
        { label: 'Street', value: 'Burn / Voltage / Snap / Flare' },
        { label: 'Clinical', value: 'Accelerin / Catecholamex / Adrenasynth / Norepitrace' }
      ]"
      :useBlocks="[
        { title: 'Medical Use', text: 'Support action, TN 2 Medicine check. Remove Fatigue equal to bonus successes + 1. This Fatigue is deferred, not eliminated; it returns at end of scene.', type: 'medical' },
        { title: 'Harmful Use (TN 3 to resist)', text: 'Target gains Enraged immediately. At end of scene, target also gains Exhausted.', type: 'harmful' }
      ]"
      onset="Immediate"
      duration="Until end of scene (Enraged); Exhausted persists until full night's rest"
    />

    <SubstanceCard
      title="Sedative"
      :altNames="[
        { label: 'Street', value: 'Sink / Static / Fade / Hush' },
        { label: 'Clinical', value: 'Somnazine / Neurodorm / Calmazole / Benzoleptin' }
      ]"
      :useBlocks="[
        { title: 'Medical Use', text: 'Support action, no check for basic sedation (target gains Unconscious). TN 2 Medicine check to remove Strife equal to bonus successes + 1.', type: 'medical' },
        { title: 'Harmful Use (TN 4 to resist)', text: 'Target gains Unconscious.', type: 'harmful' }
      ]"
      onset="Immediate (injection) or 1 round (ingested)"
      duration="One scene, or until target spends 1 Fortune Point to rouse"
    />

    <SubstanceCard
      title="Analgesic"
      :altNames="[
        { label: 'Street', value: 'Soft / Gray / Numb / Ghost' },
        { label: 'Clinical', value: 'Dulcetine / Nocibloc / Algestone / Sensiphen' }
      ]"
      :useBlocks="[
        { title: 'Medical Use', text: 'Support action, TN 2 Medicine check. Target ignores reroll penalties from one Wounded condition of your choice until end of scene.', type: 'medical' },
        { title: 'Harmful Use (TN 2 to resist)', text: 'Target gains Disoriented (cannot remove until end of scene).', type: 'harmful' }
      ]"
      onset="1 round"
      duration="Until end of scene"
    />

    <SubstanceCard
      title="Coagulant"
      :altNames="[
        { label: 'Street', value: 'Clot / Seal / Crimp' },
        { label: 'Clinical', value: 'Fibrimax / Thrombex / Hemozine' }
      ]"
      :useBlocks="[
        { title: 'Medical Use', text: 'Support action, TN 1 Medicine check. Remove the Bleeding condition.', type: 'medical' },
        { title: 'Harmful Use (TN 3 to resist)', text: 'Target gains Immobilized. If already Immobilized, suffer a severity 4 critical strike instead.', type: 'harmful' }
      ]"
      onset="1 round"
      duration="Until end of scene (Immobilized)"
    />

    <SubstanceCard
      title="Vasodilator"
      :altNames="[
        { label: 'Street', value: 'Flow / Rush / Open' },
        { label: 'Clinical', value: 'Vasatrel / Dilazyme / Venacore' }
      ]"
      :useBlocks="[
        { title: 'Medical Use', text: 'Support action, no check. Healing checks targeting that character reduce their TN by 1 until end of scene.', type: 'medical' },
        { title: 'Harmful Use (TN 2 to resist)', text: 'Target gains Bleeding.', type: 'harmful' }
      ]"
      onset="Immediate"
      duration="Until end of scene (medical); Bleeding persists until treated"
    />

    <SubstanceCard
      title="Psychoactive Agent"
      :altNames="[
        { label: 'Street', value: 'Glass / Echo / Drift / Blur' },
        { label: 'Clinical', value: 'Psychesin / Neurophane / Serolysin / Cognirel' }
      ]"
      :useBlocks="[
        { title: 'Medical Use', text: 'Support action during downtime, no check. Remove 3 Strife. The GM may prompt a brief scene of reflection.', type: 'medical' },
        { title: 'Harmful Use (TN 3 to resist)', text: 'Target gains both Dazed and Disoriented (cannot remove either until end of scene).', type: 'harmful' }
      ]"
      onset="1 round"
      duration="Until end of scene"
    />

    <SubstanceCard
      title="Neurotoxin"
      :altNames="[
        { label: 'Street', value: 'Freeze / Lock / Still / Stop' },
        { label: 'Clinical', value: 'Neurocaine / Axonase / Myoblock / Nervecept' }
      ]"
      :useBlocks="[
        { title: 'Medical Use', text: 'Support action, TN 3 Medicine check. Target ignores reroll penalties from one Wounded condition per 2 bonus successes until end of scene.', type: 'medical' },
        { title: 'Harmful Use (TN 4 to resist)', text: 'Target gains Incapacitated. If already Incapacitated, gains Dying (3 rounds) instead.', type: 'harmful' }
      ]"
      onset="Immediate (injection or contact)"
      duration="Until end of scene (Incapacitated), or until stabilized (Dying)"
    />

    <SectionDivider label="Overdose" />

    <RulesCallout>
      <p>Administering multiple doses of the same substance category to a single target within the same scene triggers an overdose:</p>
      <ul>
        <li><strong>Second dose:</strong> The GM may increase resistance TN by 1 and escalate the harmful effect by one degree.</li>
        <li><strong>Third dose:</strong> Automatic overdose regardless of resistance; target suffers a <strong>severity 6 critical strike</strong> in addition to normal effects.</li>
      </ul>
    </RulesCallout>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import StatBlock from '@/components/data/StatBlock.vue'
import SubstanceCard from '@/components/cards/SubstanceCard.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Poisons & Drugs' }
]

const administration = [
  {
    name: 'Willing Target',
    value: 'Auto',
    desc: 'No check for basic delivery. A Medicine or Mechanics check may still be required for the medical effect.'
  },
  {
    name: 'Unwilling (Covert)',
    value: 'Subterfuge / Deception',
    desc: 'Subterfuge or Deception check to introduce the substance undetected. TN is typically the target\'s Vigilance, or TN 2 if distracted.'
  },
  {
    name: 'Unwilling (Forced)',
    value: 'Physical Check',
    desc: 'A physical check to administer by contact, injection, or blade. Treated as a hostile action.'
  }
]

const prev = { to: '/collapse-radiation', label: 'Collapse & Radiation' }
const next = { to: '/driving-and-vehicles', label: 'Driving & Vehicles' }
</script>