<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>Approaches</h1>

    <p>Every character has five <strong>Approaches</strong>. These are your core stats, representing both your ability and your style when facing challenges. A higher Approach means you roll more dice when using it, but the <strong>Approach you choose also changes how you narrate your action.</strong></p>

    <div class="approach-tabs">
      <!-- Tab bar -->
      <div class="approach-tab-bar">
        <button
          v-for="a in approaches"
          :key="a.key"
          class="approach-tab-btn"
          :class="[a.key, { active: activeApproach === a.key }]"
          @click="activeApproach = a.key"
        >
          {{ a.name }}
        </button>
      </div>

      <!-- Active panel -->
      <div class="approach-tab-panel" v-if="activePanel">
        <h3>{{ activePanel.name }}</h3>
        <p>{{ activePanel.desc }}</p>
      </div>
    </div>

    <h3>Approach Limit</h3>
    <p>No single Approach may exceed the combined value of a character's two lowest Approaches. This ensures that each character maintains a balanced foundation and cannot specialize beyond what their overall capability supports.</p>

    <ExampleBox>
      <h4>Approaches in Action</h4>
      <p>The squad reaches a locked security door deep inside a collapsed research facility. Time is short.</p>
      <p><strong>Using Power:</strong> The first character squares their stance and grips the doorframe. Their muscles tense as they draw on raw force. With a single hard pull, the hinges bend. A second shove sends the door crashing inward. The barrier gives way through strength and momentum.</p>
      <p><strong>Using Precision:</strong> The second character kneels beside the lock and studies its internals. They withdraw a compact tool kit and work with steady, exact motions. Each pin clicks into place under careful pressure. After a quiet moment of focused adjustment, the mechanism releases. The door swings open cleanly, leaving no trace of entry.</p>
    </ExampleBox>

    <SectionDivider label="DERIVED ATTRIBUTES" />

    <h2>Derived Attributes</h2>

    <p>Derived Attributes are secondary statistics calculated from a character's Approaches. Unlike Approaches or Skills, players do not assign points to these directly. Each Derived Attribute reflects how a character performs under pressure, manages long tasks, or reacts to threats.</p>

    <StatBlock :stats="derivedStats" />

    <SectionDivider label="FORTUNE POINTS" />

    <h2>Fortune Points</h2>

    <p>Fortune Points let characters bend events in their favor. They're a renewable resource, spent when you need luck on your side and earned back when things go badly.</p>

    <p>A character starts with Fortune Points equal to half their Fortune score (rounded down). Their maximum pool equals their full Fortune.</p>

    <h3>Spending Fortune Points</h3>
    <p>Fortune Points may be spent to:</p>
    <ul>
      <li>Increase your dice pool by 1 for a single check</li>
      <li>Survive an event that would otherwise take you out</li>
      <li>Activate techniques or abilities that cost a Fortune Point</li>
    </ul>

    <h3>Gaining Fortune Points</h3>
    <p>Characters regain Fortune Points by encountering meaningful adversity. This includes:</p>
    <ul>
      <li>Failing a check where one of your disadvantages is relevant</li>
      <li>Once per scene, when an anxiety meaningfully affects the situation</li>
      <li>Whenever the GM hides the TN of a check, creating uncertainty the player has to act through (see Target Numbers in Play)</li>
    </ul>

    <SectionDivider label="APPROACH RANKS" />

    <h2>Approach Ranks</h2>

    <TNGuide :rows="approachRanks" />

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import { ref, computed } from 'vue'
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import ExampleBox from '@/components/callouts/ExampleBox.vue'
import StatBlock from '@/components/data/StatBlock.vue'
import TNGuide from '@/components/data/TNGuide.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Approaches & Derived Attributes' }
]

const prev = { to: '/', label: 'Home' }
const next = { to: '/attribution', label: 'Attribution' }

const approaches = [
  {
    key: 'power',
    name: 'Power',
    desc: 'The essence of power is force. Physical force to push through an enemy with all your might. Force of personality to steer a conversation to your will. Power doesn\'t see a closed door, it sees a temporary one, to be ripped from its hinges and thrown across the room. Power charges at problems head-on and overwhelms them in one fell swoop. It is aggressive and, above all, honest.'
  },
  {
    key: 'precision',
    name: 'Precision',
    desc: 'Precision is quiet, calm, and controlled. A perfectly placed round from a sniper rifle, fired with the gentlest of trigger pulls. A carefully crafted speech that rallies a crowd to your cause. A lock picked so cleanly the door may as well have never been closed. Precision doesn\'t see challenges, only puzzles to be solved with patience and craftsmanship. It is meticulous and carefully dishonest.'
  },
  {
    key: 'swiftness',
    name: 'Swiftness',
    desc: 'Swiftness is more than raw speed. It\'s thinking on your feet. Turning an attack into a feint and changing angles in the same heartbeat. Reading a room the moment you step through the door. Closing distance on a target and vanishing before anyone reacts. Swiftness moves with the flow of things, never against it.'
  },
  {
    key: 'resilience',
    name: 'Resilience',
    desc: 'Resilience is endurance. The ability to absorb hardship, pain, or stress and emerge stronger on the other side. To reason with an enemy in one breath and hold your ground when they attack anyway. To carry a memory that should have faded long ago but refuses to. Resilience is patient, stubborn, and unchanging.'
  },
  {
    key: 'fortune',
    name: 'Fortune',
    desc: 'Fortune is trust. Trust in your luck. Trust in your allies to pull off the impossible. Trust in your future self to make the right call when it matters. Fortune quiets the mind amid chaos, because you\'re either going to make it or you\'re not. And that\'s okay. Uncertainty is a fact of life that fortune accepts, embraces, and turns into an advantage.'
  }
]

const activeApproach = ref('power')

const activePanel = computed(() =>
  approaches.find(a => a.key === activeApproach.value)
)

const derivedStats = [
  {
    name: 'Endurance',
    value: 'Variable',
    desc: 'How long you last when everything hurts. The ability to keep moving when your body is telling you to stop. Humans: (Power + Resilience) x 2. T-Dolls: (Power + Resilience) x 3.'
  },
  {
    name: 'Composure',
    value: 'Variable',
    desc: 'Your ability to think clearly when the world is falling apart around you and everyone else is panicking. (Resilience + Swiftness) x 2.'
  },
  {
    name: 'Vigilance',
    value: 'Variable',
    desc: 'The instinct that something is wrong before you know what it is, and the ability to catch details others miss. (Precision + Swiftness) / 2 (rounded up).'
  },
  {
    name: 'Focus',
    value: 'Variable',
    desc: 'The ability to stay locked in during long tasks, repetitive work, and other tedious problems that bore you to death. Power + Precision.'
  }
]

const approachRanks = [
  { tn: 1, label: 'Limited', description: 'Barely functional. You avoid this approach when you can and lean on others when you can\'t.' },
  { tn: 2, label: 'Typical', description: 'Gets the job done. Nothing impressive, nothing embarrassing.' },
  { tn: 3, label: 'Strong', description: 'Noticeably good. People trust you when this approach is what the situation calls for.' },
  { tn: 4, label: 'Remarkable', description: 'Trained, practiced, or just built different. You stand out even in skilled company.' },
  { tn: 5, label: 'Mastery', description: 'This approach defines you. Others measure themselves against what you do with it.' },
  { tn: 6, label: 'Beyond Human', description: 'The domain of elite T-Dolls, advanced prototypes, and those shaped by something beyond normal experience. Few ever get here.' }
]
</script>