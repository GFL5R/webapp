<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>Remoulding</h1>

    <p class="kicker">Collapse Epiphyllum Cultivation and Reverse-Collapse Pattern Remoulding Device</p>

    <p>Remoulding harnesses Collapse radiation to restructure matter at the molecular level, letting a T-Doll exceed their frame's limits. In GFL5R, remoulding techniques work like spells: focused abilities that run on dedicated hardware and scale with investment. They're tied to the <router-link to="/skills">Resolve</router-link> skill. See the <router-link to="/techniques/remoulding">Remoulding Techniques compendium</router-link> for the full list.</p>

    <p>This technology is experimental. Reverse Collapse theory has been understood in principle for decades, but practical field hardware has only recently become viable. The units in service are early prototypes: bulky, unstable, and limited compared to what the theory suggests. They work, and on a battlefield where every edge counts, that's enough.</p>

    <RulesCallout>
      <p>Before using this page, make sure you understand <router-link to="/modules">Modules</router-link>, which cover the hardware that powers remoulding, and <router-link to="/disciplines">Disciplines</router-link>, which cover Fortification requirements.</p>
    </RulesCallout>

    <SectionDivider label="THE REMOULDING MODULE" />

    <h2>The Remoulding Unit</h2>

    <p>Every remoulding technique needs a <strong><router-link to="/modules#remoulding-unit">Remoulding Unit</router-link></strong>, a specialized module implant that channels ambient Collapse radiation. Unlike other modules that grant passive stat increases, a Remoulding Unit is dedicated spellware: each unit holds <strong>exactly one technique</strong>.</p>

    <table>
      <thead>
        <tr><th>Module</th><th>Base Cost</th><th>Effect</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><router-link to="/modules#remoulding-unit">Remoulding Unit</router-link></td>
          <td>60,000 cr</td>
          <td>Allows use of one remoulding technique. Comes with a free rank 1 technique.</td>
        </tr>
      </tbody>
    </table>

    <h3>Installation</h3>
    <p>When you buy a Remoulding Unit, pick any rank 1 technique to install at no extra XP cost. The unit is locked to that technique tree until upgraded. You cannot swap techniques. Upgrading advances the one you chose.</p>

    <h3>Second Unit</h3>
    <p>A T-Doll can normally install only <strong>one Remoulding Unit</strong>. A second unit costs the full installation price (60,000 cr) plus <strong>24 XP</strong> and strong narrative justification. A GM may grant a second unit as a story reward. Most T-Dolls cannot survive housing two collapse-channeling systems.</p>

    <SectionDivider label="PROGRESSION" />

    <h2>Upgrading Your Technique</h2>

    <p>Every remoulding technique has three ranks. Higher ranks are upgrades to the same ability, not separate techniques. You grow deeper in one direction rather than spreading across many.</p>

    <table>
      <thead>
        <tr><th>Upgrade</th><th>XP Cost</th><th>Fortification Required</th></tr>
      </thead>
      <tbody>
        <tr><td>Rank 1 → Rank 2</td><td>5 XP</td><td>Fortification 2+</td></tr>
        <tr><td>Rank 2 → Rank 3</td><td>10 XP</td><td>Fortification 3+</td></tr>
      </tbody>
    </table>

    <h3>Fortification</h3>
    <p>Your <strong>Fortification</strong> value must be at least equal to the technique's target rank. Fortification is the sum of all <strong>completed</strong> discipline ranks across your disciplines. One completed discipline at Rank 2 gives Fortification 2. Three completed disciplines at Rank 1 each gives Fortification 3. See <router-link to="/disciplines#fortification">Disciplines</router-link> for the full rules.</p>

    <ExampleBox>
      <h4>Progression Example</h4>
      <p>Lenna buys a Remoulding Unit and installs Vampirism (rank 1). After several missions she has 5 XP and a completed discipline rank, giving Fortification 2. She spends the 5 XP to upgrade Vampirism to rank 2: it becomes Channeled Sacrifice, draining an enemy and routing the energy to an ally. Later, with Fortification 3 and 10 more XP, she hits rank 3: The Power to Take and Give Life, splitting the drain across multiple allies.</p>
    </ExampleBox>

    <SectionDivider label="TECHNIQUE TREES" />

    <h2>The Remoulding Skill Trees</h2>

    <p>Each tree is a single technique concept that scales through three ranks. Rank 1 comes with the module. Rank 2 costs 5 XP and needs Fort 2. Rank 3 costs 10 XP and needs Fort 3.</p>

    <div class="tech-trees">
      <!-- Line of Absolute Attack -->
      <div class="tech-tree">
        <h3 class="tree-name">Attack Tree</h3>
        <p class="tree-theme">Focuses collapse energy into a directed band, sweeping multiple targets.</p>
        <div class="tree-ranks">
          <div class="tree-rank rank-1">
            <span class="tree-rank-badge">R1</span>
            <router-link to="/techniques/remoulding#line-of-absolute-attack">Line of Absolute Attack</router-link>
            <span class="tree-rank-desc">TN 2 Resolve. Deal elemental damage to two adjacent spaces. Remove terrain with opportunities.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-2">
            <span class="tree-rank-badge">R2</span>
            <router-link to="/techniques/remoulding#sweeping-advance">Sweeping Advance</router-link>
            <span class="tree-rank-desc">TN 2 Resolve. As rank 1, but also removes dangerous, entangling, or obscuring terrain at no cost.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-3">
            <span class="tree-rank-badge">R3</span>
            <router-link to="/techniques/remoulding#scorched-horizon">Scorched Horizon</router-link>
            <span class="tree-rank-desc">TN 2 Resolve. As rank 2, but also removes elevated terrain, inflicting a critical strike on anyone in it.</span>
          </div>
        </div>
      </div>

      <!-- Life Drain -->
      <div class="tech-tree">
        <h3 class="tree-name">Life Drain Tree</h3>
        <p class="tree-theme">Pulls energy from enemies and routes it through the user to heal.</p>
        <div class="tree-ranks">
          <div class="tree-rank rank-1">
            <span class="tree-rank-badge">R1</span>
            <router-link to="/techniques/remoulding#vampirism">Vampirism</router-link>
            <span class="tree-rank-desc">TN 2 Resolve. Deal elemental damage to one enemy. Recover fatigue equal to bonus successes.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-2">
            <span class="tree-rank-badge">R2</span>
            <router-link to="/techniques/remoulding#channeled-sacrifice">Channeled Sacrifice</router-link>
            <span class="tree-rank-desc">TN 3 Resolve. Deal damage to one enemy. An ally recovers fatigue equal to bonus successes instead of you.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-3">
            <span class="tree-rank-badge">R3</span>
            <router-link to="/techniques/remoulding#the-power-to-take-and-give-life">The Power to Take and Give Life</router-link>
            <span class="tree-rank-desc">TN 4 Resolve. As rank 2. With (op)(op), target a second ally to also recover fatigue.</span>
          </div>
        </div>
      </div>

      <!-- AOE Blast -->
      <div class="tech-tree">
        <h3 class="tree-name">Blast Tree</h3>
        <p class="tree-theme">A collapse discharge that grows in radius and intensity.</p>
        <div class="tree-ranks">
          <div class="tree-rank rank-1">
            <span class="tree-rank-badge">R1</span>
            <router-link to="/techniques/remoulding#unstable-discharge">Unstable Discharge</router-link>
            <span class="tree-rank-desc">TN 2 Resolve. Deal elemental damage to every creature within 1 range band, including yourself.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-2">
            <span class="tree-rank-badge">R2</span>
            <router-link to="/techniques/remoulding#energy-overflow">Energy Overflow</router-link>
            <span class="tree-rank-desc">TN 4 Resolve. Deal damage to every enemy within 2 range bands. With (op)(op), inflict Burning.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-3">
            <span class="tree-rank-badge">R3</span>
            <router-link to="/techniques/remoulding#total-saturation">Total Saturation</router-link>
            <span class="tree-rank-desc">TN 5 Resolve. Deal damage to every enemy within 3 range bands. Also inflicts Burning, Bleeding, and Dazed.</span>
          </div>
        </div>
      </div>

      <!-- Barrier -->
      <div class="tech-tree">
        <h3 class="tree-name">Barrier Tree</h3>
        <p class="tree-theme">Turns collapse energy inward, hardening the user or allies against harm.</p>
        <div class="tree-ranks">
          <div class="tree-rank rank-1">
            <span class="tree-rank-badge">R1</span>
            <router-link to="/techniques/remoulding#elemental-aegis">Elemental Aegis</router-link>
            <span class="tree-rank-desc">TN 2 Resolve. Gain Resilient and Hardened conditions.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-2">
            <span class="tree-rank-badge">R2</span>
            <router-link to="/techniques/remoulding#projected-aegis">Projected Aegis</router-link>
            <span class="tree-rank-desc">TN 3 Resolve. One ally within 2 range bands gains Resilient and Hardened instead of you.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-3">
            <span class="tree-rank-badge">R3</span>
            <router-link to="/techniques/remoulding#iron-sky">Iron Sky</router-link>
            <span class="tree-rank-desc">TN 4 Resolve. You and all allies within 2 range bands gain Resilient and Hardened.</span>
          </div>
        </div>
      </div>

      <!-- Mobility -->
      <div class="tech-tree">
        <h3 class="tree-name">Mobility Tree</h3>
        <p class="tree-theme">Collapse bursts applied to frame systems for rapid repositioning.</p>
        <div class="tree-ranks">
          <div class="tree-rank rank-1">
            <span class="tree-rank-badge">R1</span>
            <router-link to="/techniques/remoulding#battlefield-logistics">Battlefield Logistics</router-link>
            <span class="tree-rank-desc">TN 3 Resolve. Move up to 2 range bands or enter elevated terrain.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-2">
            <span class="tree-rank-badge">R2</span>
            <router-link to="/techniques/remoulding#tactical-relay">Tactical Relay</router-link>
            <span class="tree-rank-desc">TN 3 Resolve. You or one ally moves up to 3 range bands.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-3">
            <span class="tree-rank-badge">R3</span>
            <router-link to="/techniques/remoulding#forced-displacement">Forced Displacement</router-link>
            <span class="tree-rank-desc">TN 4 Resolve. Move any character up to 3 range bands, ignoring their consent.</span>
          </div>
        </div>
      </div>

      <!-- Terrain Control -->
      <div class="tech-tree">
        <h3 class="tree-name">Terrain Control Tree</h3>
        <p class="tree-theme">Rewrites the environment with collapse energy.</p>
        <div class="tree-ranks">
          <div class="tree-rank rank-1">
            <span class="tree-rank-badge">R1</span>
            <router-link to="/techniques/remoulding#terraforming">Terraforming</router-link>
            <span class="tree-rank-desc">TN 4 Resolve. One area within 1 range band becomes Entangling Terrain. With (op)(op), affect a second area.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-2">
            <span class="tree-rank-badge">R2</span>
            <router-link to="/techniques/remoulding#denial-zone">Denial Zone</router-link>
            <span class="tree-rank-desc">TN 4 Resolve. One area becomes Entangling, Dangerous, or Radiation Terrain (choose one). With (op)(op), affect a second area.</span>
          </div>
          <div class="tree-rank-arrow">→</div>
          <div class="tree-rank rank-3">
            <span class="tree-rank-badge">R3</span>
            <router-link to="/techniques/remoulding#total-terrain-dominance">Total Terrain Dominance</router-link>
            <span class="tree-rank-desc">TN 4 Resolve. One area within 2 range bands becomes any terrain type. With (op)(op), affect a second area.</span>
          </div>
        </div>
      </div>
    </div>

    <SectionDivider label="TECHNOLOGY" />

    <h2>An Experimental Technology</h2>

    <p>While <router-link to="/collapse-radiation">Reverse Collapse technology</router-link> has been studied for decades (Hollow City used it for supercomputer storage in 2049 and experimental reactors date back to the 2040s), Miniaturizing the technology for portable use is a recent development. At its core, a Remoulding Unit contains fragments of cultivated <strong>Collapse Epiphyllum</strong>, a plant mutated by Collapse radiation that stores and releases energy during its bloom cycle. When activated, the unit forces a partial bloom, channeling the released energy through Reverse Collapse circuitry to allow the user to perform feats previously considered impossible.</p>

    <p>Experimental technology, of course, carries significant risk. When using a remoulding unit, take great care, as a failed roll can have unintended consequences. The <router-link to="/remoulding-failure-table">Remoulding Failure Table</router-link> guides the GM in determining what goes wrong when a technique fails catastrophically.</p>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import ExampleBox from '@/components/callouts/ExampleBox.vue'
import PageNav from '@/components/layout/PageNav.vue'
import { RouterLink } from 'vue-router'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Remoulding' }
]

const prev = { to: '/crime', label: 'Crime' }
const next = { to: '/remoulding-failure-table', label: 'Failure Table' }
</script>

<style scoped>
.tech-trees {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.tech-tree {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 225, 53, 0.15);
  padding: 1.25rem;
  border-radius: 4px;
}

.tree-name {
  margin: 0 0 0.25rem 0;
  font-family: 'Chakra Petch', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--cyan);
}

.tree-theme {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  color: var(--text-dim);
}

.tree-ranks {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tree-rank {
  flex: 1;
  min-width: 180px;
  padding: 0.75rem;
  border-radius: 3px;
  font-size: 0.85rem;
  line-height: 1.4;
}

.tree-rank.rank-1 {
  background: rgba(255, 225, 53, 0.05);
  border: 1px solid rgba(255, 225, 53, 0.2);
}

.tree-rank.rank-2 {
  background: rgba(255, 170, 0, 0.05);
  border: 1px solid rgba(255, 170, 0, 0.2);
}

.tree-rank.rank-3 {
  background: rgba(255, 80, 0, 0.05);
  border: 1px solid rgba(255, 80, 0, 0.2);
}

.tree-rank-badge {
  display: inline-block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
  margin-right: 0.4rem;
  vertical-align: middle;
}

.rank-1 .tree-rank-badge {
  background: var(--cyan);
  color: var(--bg);
}

.rank-2 .tree-rank-badge {
  background: #fa0;
  color: var(--bg);
}

.rank-3 .tree-rank-badge {
  background: #f50;
  color: var(--bg);
}

.tree-rank-desc {
  display: block;
  margin-top: 0.3rem;
  color: var(--text-dim);
  font-size: 0.8rem;
}

.tree-rank-arrow {
  font-size: 1.5rem;
  color: var(--cyan);
  opacity: 0.5;
  padding-top: 0.75rem;
  flex-shrink: 0;
}
</style>
