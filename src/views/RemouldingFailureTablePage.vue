<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>Remoulding Failure Table</h1>

    <p class="kicker">D20 Table of Remoulding Mishaps</p>

    <p>Remoulding Units are experimental technology. The theory is sound, but the hardware is early-generation, and the Collapse Epiphyllum at its heart is a living organism that does not always cooperate. When a remoulding technique fails under stress, the result is unpredictable: sometimes the safeties hold and nothing happens, sometimes the unit backfires spectacularly, and occasionally the chaos works in your favor. The only certainty is that a failed remoulding check is never boring.</p>

    <p>This table provides the GM with twenty possible outcomes when a remoulding technique fails catastrophically. These effects assume the user is a T-Doll or transhuman; only synthetic frames can house a Remoulding Unit. Humans cannot install or use these systems.</p>

    <RulesCallout>
      <p><strong>When to roll:</strong> The GM may call for a roll on this table when a remoulding technique check fails. Suggested triggers: the check fails with (st)(st) or more in the dice pool; the check was attempted at TN 4 or higher and failed; or any failure the GM considers dramatic enough to warrant consequences. Roll 1d20 and apply the result immediately.</p>
    </RulesCallout>

    <SectionDivider label="FAILURE TABLE" />

    <table class="failure-table">
      <thead>
        <tr>
          <th>1d20</th>
          <th>Effect</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="roll-cell">1</td>
          <td>
            <strong>Collapse Leak.</strong> The unit's containment field flickers and raw Collapse radiation vents into the area. For the remainder of the scene, treat the immediate vicinity (a 2-range-band radius centered on you) as <strong>one zone step higher</strong> for Collapse exposure purposes. Everyone in the area, including you, gains Collapse accordingly at the end of the scene. If the area is already Black Zone, skip to the Collapse storm rules.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">2</td>
          <td>
            <strong>Thermal Overload.</strong> The unit exceeds safe thermal limits and forces an emergency shutdown. The Remoulding Unit cannot be activated again for the rest of the scene.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">3</td>
          <td>
            <strong>Hardlock.</strong> The unit's emergency safeties engage, freezing all collapse-channeling circuitry. The Remoulding Unit is <strong>non-functional</strong> until repaired at a workshop (1,000 cr in parts, 1 hour of work by someone with appropriate expertise). You cannot use any remoulding technique while the unit is hardlocked.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">4</td>
          <td>
            <strong>System Cascade.</strong> The energy feedback destabilizes your core processes faster than your error-correction can handle. Take <strong>fatigue</strong> equal to 2 + the technique's rank, and gain the <strong>Dazed</strong> condition.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">5</td>
          <td>
            <strong>Neural Fragmentation.</strong> Collapse interference corrupts active memory sectors. One skill of the GM's choice is treated as <strong>rank 0</strong> for the remainder of the scene. If the corrupted skill was rank 0 already, the interference spreads: the GM chooses a second skill.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">6</td>
          <td>
            <strong>Fizzle.</strong> The unit stutters and the Epiphyllum fails to bloom, but the emergency safeties contain the energy before anything goes wrong. The technique fails, but there are no additional consequences. You may attempt the same technique again on your next turn.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">7</td>
          <td>
            <strong>Gravity Glitch.</strong> The collapse field briefly inverts local gravity around you. You and everything within range 0 floats roughly a meter off the ground for one round, then drops harmlessly. No damage. The technique still fails.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">8</td>
          <td>
            <strong>Power Sink.</strong> The failed bloom drains power from your frame's reserves instead of channeling it outward. Gain the <strong>Exhausted</strong> condition.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">9</td>
          <td>
            <strong>Kinetic Kickback.</strong> The collapse energy discharges as raw kinetic force instead of remoulding its intended target. You are <strong>thrown 1 range band</strong> in a random direction (GM chooses or rolls 1d6 for bearing), land prone, and suffer 1 fatigue.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">10</td>
          <td>
            <strong>Scramble.</strong> The unit's remoulding field misfires across a short radius. Every character within range 0-1 (including you) has their worn clothing, armor, and carried equipment randomly redistributed among everyone in the area. Nothing is lost or damaged; everything is simply on the wrong person. Untangling the mess takes a round of downtime.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">11</td>
          <td>
            <strong>Backflow.</strong> The partial bloom collapses inward and residual collapse energy saturates the unit's regulation circuitry. Your next remoulding check suffers <strong>+2 TN</strong>. You may spend an action to purge the charge and clear the penalty early.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">12</td>
          <td>
            <strong>Uncontrollable Honesty.</strong> The collapse feedback scrambles your social inhibition filters. For the remainder of the scene, you feel an irrepressible compulsion to share an embarrassing secret, uncomfortable truth, or private thought. The GM may prompt you; what you reveal and to whom is up to you, but resisting the urge costs 2 Strife per suppression.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">13</td>
          <td>
            <strong>Resonance Pulse.</strong> The failure emits a wideband electromagnetic pulse as the collapse circuitry oscillates out of phase. All electronic equipment within <strong>3 range bands</strong> (comms, sensors, smart-linked weapons, cybernetic modules) malfunctions for <strong>1 round</strong>, imposing +1 TN on any check that relies on electronics during that round. This affects allies and enemies alike.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">14</td>
          <td>
            <strong>Displaced.</strong> Collapse energy wraps around your frame and deposits you up to <strong>1 range band</strong> away in a direction of your choosing. Your weapons, armor, and carried equipment do not make the trip; they clatter to the ground where you were standing. You arrive fully functional but fully disarmed.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">15</td>
          <td>
            <strong>Neural Static.</strong> The feedback loop dumps raw noise into your neural cloud. Take <strong>Strife</strong> equal to 3 + the technique's rank.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">16</td>
          <td>
            <strong>Bloom Flash.</strong> The Epiphyllum blooms visibly through your frame, emitting a searing pulse of collapse-spectrum light. Every character who can see you (including allies) gains the <strong>Blinded</strong> condition for <strong>1 round</strong>. You are unaffected; the light projects outward.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">17</td>
          <td>
            <strong>Lingering Bloom.</strong> The Epiphyllum's partial bloom leaves a faint residual charge in your frame. Recover <strong>fatigue equal to the technique's rank</strong>. The technique still fails, but your systems feel a little sharper for the trouble.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">18</td>
          <td>
            <strong>Epiphyllum Rejection.</strong> The unit's biocompatible housing briefly rejects the Collapse Epiphyllum culture, triggering a violent autonomic response. You gain the <strong>Disoriented</strong> condition and cannot take reactions until the end of your next turn.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">19</td>
          <td>
            <strong>Cosmetic Remoulding.</strong> The collapse energy briefly remoulds a small, superficial part of your frame before dissipating. You gain a cosmetic modification of your choice: cat ears sprout from your head, your fingertips emit a faint glow, a synthetic tail flicks into existence, or something similarly harmless and visible. The addition is permanent until you spend 10 minutes removing it from your frame. No mechanical effect.
          </td>
        </tr>
        <tr>
          <td class="roll-cell">20</td>
          <td>
            <strong>Unexpected Overclock.</strong> The Collapse Epiphyllum overclocks, blooming past the unit's rated output. The technique fails to resolve as intended, but the excess energy floods your frame's core systems. For the remainder of the scene, you gain <strong>+1 rank to all five Approaches</strong>. When the scene ends, gain 3 fatigue as your systems come down from the surge.
          </td>
        </tr>
      </tbody>
    </table>

    <SectionDivider label="GM GUIDANCE" />

    <h2>Running the Table</h2>

    <p>This table is a tool, not a punishment. Remoulding is a high-risk, high-reward system; the threat of consequences makes successful technique use feel earned. That said, rolling on this table should feel tense, not spiteful.</p>

    <h3>Frequency</h3>
    <p>Not every failed remoulding check triggers the table. Reserve it for failures that happen at pivotal moments, when the stakes are high and the dice have already told a story. A rank 1 technique failing during a routine check does not need a table roll. A rank 3 technique failing while the party is pinned down by ELID infected in a Red Zone collapse storm absolutely does.</p>

    <h3>Narrative Framing</h3>
    <p>Describe the result in terms of what the character experiences. "You roll a 4, system cascade" is a mechanic. "The Remoulding Unit shrieks against your spine as the bloom backfires; your HUD fractures into static, your limbs go heavy, and for three terrifying seconds you cannot feel your own frame" is a moment. The table gives you the effect; your narration gives it weight.</p>

    <h3>Adapting Severity</h3>
    <p>Most results are self-contained scene-level effects. The harshest entries (Hardlock at result 3, Resonance Pulse at result 9) require the GM to judge whether the outcome fits the moment. The table is calibrated so that the worst results are recoverable with downtime, credits, or clever play. The core experience is "something unexpected happened," not "the game ground to a halt."</p>

    <h3>Player Agency</h3>
    <p>A character with high Resolve or relevant expertise (Science, Computers) may attempt to mitigate a result with a follow-up check, at the GM's discretion. A TN 3 Resolve check to vent excess heat before the unit hardlocks. A TN 2 Science check to flush saturated regulation circuitry before the backflow penalty locks in. These checks are not guaranteed and consume actions, but they give the player something to do other than simply endure the result.</p>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Remoulding', to: '/remoulding' },
  { label: 'Failure Table' }
]

const prev = { to: '/remoulding', label: 'Remoulding' }
const next = { to: '/poisons-and-drugs', label: 'Poisons & Drugs' }
</script>

<style scoped>
.failure-table {
  width: 100%;
  border-collapse: collapse;
}

.failure-table td {
  vertical-align: top;
  padding: 0.75rem 1rem;
  line-height: 1.5;
}

.failure-table td:first-child {
  white-space: nowrap;
  width: 1px;
}

.roll-cell {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.5rem;
  color: var(--cyan);
  text-align: center;
  vertical-align: middle !important;
  min-width: 3rem;
}
</style>
