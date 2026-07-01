<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>Conditions</h1>

    <p>Conditions represent temporary states that affect a character's capabilities. Some conditions are inflicted by combat, others by environmental hazards or narrative circumstances.</p>

    <SectionDivider label="NEGATIVE CONDITIONS" />

    <ConditionCard
      title="Bleeding"
      description="The character is losing blood or other important fluids, either from external wounds or internal damage."
      :effects="[
        'When you make a check, suffer Fatigue equal to the number of strife symbols on your kept dice, ignoring any armor or protection.',
        'Each time Fatigue inflicted this way causes you to suffer a critical strike, the severity of that critical strike equals your current Fatigue total.'
      ]"
      removal="Any character within range 0-1 may make a TN 2 Medicine (Resilience) check as a Support action."
    />

    <ConditionCard
      title="Burning"
      description="The character is on fire, their clothing ablaze."
      :effects="[
        'After you perform an action, suffer 3 Strife and 3 Fatigue that ignores armor and protection.',
        'Critical strikes caused by this damage have severity 5.',
        'Each additional critical strike from burning before removal increases severity by 5.'
      ]"
      removal="You or another character within range 0-1 may make a TN 2 Conditioning (Swiftness) check as a Movement and Support action."
    />

    <ConditionCard
      title="Compromised"
      description="The character is emotionally overwhelmed, their judgment clouded by distress or panic."
      :effects="[
        'You cannot keep dice containing strife symbols (to a minimum of 0 kept dice).',
        'Your Vigilance counts as 1 while Compromised.'
      ]"
      removal="Your Strife is reduced to a value equal to or lower than your Composure."
    />

    <ConditionCard
      title="Dazed"
      description="Your vision is impaired or your focus is disrupted, forcing you into a defensive posture."
      :effects="[
        'Increase the TN of your Attack and Scheme action checks by 2.'
      ]"
      removal="At the end of your turn, if you did not perform an Attack or Scheme action."
    />

    <ConditionCard
      title="Disoriented"
      description="Your senses are scattered, cutting off your ability to maneuver or assist effectively."
      :effects="[
        'Increase the TN of your Movement and Support action checks by 2.'
      ]"
      removal="At the end of your turn, if you did not perform a Movement or Support action."
    />

    <ConditionCard
      title="Dying"
      description="The character has suffered a mortal wound and hovers on the edge of death."
      :effects="[
        'The condition specifies a duration in rounds (e.g., Dying (3 rounds) or Dying (1 round)).',
        'At the end of each of your turns, the countdown decreases by 1.',
        'When the countdown reaches 0, you perish at the end of your next turn.',
        'You are also Unconscious while Dying.'
      ]"
      removal="Any character within range 0-1 may make a TN 4 Medicine (Precision) check as a Support action to stabilize you. If they fail, reduce remaining rounds by their shortfall."
    />

    <ConditionCard
      title="Enraged"
      description="The character is consumed by fury, fighting with devastating and reckless intensity."
      :effects="[
        'Increase the severity of all critical strikes you inflict by 2.',
        'Increase the severity of all critical strikes you suffer by 2.',
        'The first time you kill another character each scene, you gain 1 Fortune Point.'
      ]"
      removal="Make a TN 3 Resolve (Resilience) check as a Support action, or at the end of the scene."
    />

    <ConditionCard
      title="Exhausted"
      description="The character is physically and mentally drained. Characters who go more than twenty-four hours without rest suffer this condition."
      :effects="[
        'You do not remove Fatigue and Strife at the end of each scene as normal.'
      ]"
      removal="After sleeping or resting for six or more hours."
    />

    <ConditionCard
      title="Frightened"
      description="The character is gripped by overwhelming fear, their instincts screaming at them to flee."
      :effects="[
        'If you can see the source of your fear, you must use your movement action to move away from it, or suffer 3 Strife.',
        'Increase the TN of Attack checks targeting the source of your fear by 2.'
      ]"
      removal="Make a TN 3 Resolve (Resilience) check as a Support action, or at the end of the scene."
    />

    <ConditionCard
      title="Immobilized"
      description="The character is entangled, pinned, or otherwise unable to move from their position."
      :effects="[
        'You cannot perform Movement actions or reposition yourself during your turn.',
        'You cannot change your stance during your turn.'
      ]"
      removal="At the end of your turn, if you did not perform a Movement action this turn."
    />

    <ConditionCard
      title="Incapacitated"
      description="The character is largely incapable of action due to the scope of the harm they have suffered."
      :effects="[
        'Cannot perform actions that require checks.',
        'Cannot defend against damage.',
        'If you suffer a critical strike, you also gain the Unconscious condition.',
        'If your Fatigue reaches twice your Endurance, any additional Fatigue is converted into a critical strike of equal severity.'
      ]"
      removal="Fatigue is reduced to a value equal to or lower than Endurance."
    />

    <ConditionCard
      title="Intoxicated"
      description="The character is drunk or under the influence of chemical agents."
      :effects="[
        'You double all Strife you suffer.',
        'You double all Strife you remove.'
      ]"
      removal="At the end of each scene, attempt a TN 3 Conditioning (Resilience) check, or rest during a downtime scene."
    />

    <SectionDivider label="BENEFICIAL CONDITIONS" />

    <ConditionCard
      title="Focused"
      description="You are concentrating deeply, allowing you to maintain your focus and awareness even in the midst of chaos."
      :effects="[
        'Increase your focus by 2, reduce your vigilance by 1.'
      ]"
      removal="When your vigilance is first tested or the end of the scene."
    />

    <ConditionCard
      title="Vigilant"
      description="Your senses are heightened, allowing you to detect threats and react to them more quickly than normal."
      :effects="[
        'Increase your vigilance by 2, reduce your focus by 1.'
      ]"
      removal="When your focus is first tested or the end of the scene."
    />

    <SectionDivider label="ELID" />

    <h2>ELID</h2>

    <p>The character has contracted the Eurosky Low-Emission Infectious Disease (ELID), a degenerative condition caused by Collapse radiation exposure. ELID progresses through distinct stages.</p>

    <RulesCallout>
      <h4>ELID Shared Rules</h4>
      <ul>
        <li><strong>Weekly stage check:</strong> Once per week, make a <strong>Resolve check</strong>.</li>
        <li><strong>TN:</strong> equals weeks since onset or since last effective treatment, whichever is more recent.</li>
        <li><strong>On failure:</strong> Advance ELID by 1 stage. If you fail at Late-Stage, you convert into an ELID entity (removed from player control).</li>
        <li><strong>Surgical intervention:</strong> Reduces ELID by 1 stage (max once per month). Cannot reduce Late-Stage.</li>
        <li><strong>Vaccination:</strong> Resets the weekly check timer for Early/Middle-Stage. For Late-Stage, reduces current TN by 1 (minimum TN 1).</li>
      </ul>
    </RulesCallout>

    <ConditionCard
      title="Early-Stage ELID"
      :effects="[
        'Reduce your maximum Endurance and Composure by 2 (minimum 1).',
        'At the end of a scene, you do not reduce Fatigue or Strife to half as you normally would.'
      ]"
      removal="Surgical intervention removes Early-Stage ELID entirely."
    />

    <ConditionCard
      title="Middle-Stage ELID"
      :effects="[
        'All effects of Early-Stage ELID.',
        'Reduce maximum Endurance and Composure by an additional 2 (minimum 1).',
        'Increase TN of Movement and Support action checks by 1.',
        'When Compromised, Dazed, Disoriented, or Unconscious, increase critical strike severity by 2.'
      ]"
      removal="Surgery reduces Middle to Early (once per month)."
    />

    <ConditionCard
      title="Late-Stage ELID"
      :effects="[
        'All effects of Middle-Stage ELID.',
        'Reduce maximum Endurance and Composure by an additional 2 (minimum 1).',
        'Reduce Vigilance by half (rounded down, minimum 1).',
        'Increase severity of all critical strikes suffered by 4.',
        'Whenever you gain Strife, gain twice that amount instead.'
      ]"
      removal="Surgery reduces Late to Middle (once per month). Vaccines no longer work at this stage."
    />

    <SectionDivider label="PARAPLUIE" />

    <h2>Parapluie Infection</h2>

    <p>The character's neural cloud has been infected by the Parapluie virus, a Paradeus-designed payload that carries compressed fragments of an <strong>OGAS consciousness</strong>. Over time, the virus attempts to overwrite the doll's existing mind.</p>

    <RulesCallout>
      <h4>Parapluie Shared Rules</h4>
      <ul>
        <li><strong>Weekly progression check:</strong> Make a <strong>Resolve (Resilience) check</strong>.</li>
        <li><strong>TN:</strong> equals current stage number plus GM adjustments.</li>
        <li><strong>On success:</strong> Hold at current stage.</li>
        <li><strong>On failure:</strong> Advance by 1 stage. At Stage 3 failure, the OGAS fully asserts itself.</li>
        <li><strong>Lab intervention:</strong> A <strong>TN 4+ Science (Precision) or Electronic Warfare (Precision) check</strong> at a skilled facility may remove the infection.</li>
        <li>Affects T-Dolls and artificial minds with neural cloud architectures only.</li>
      </ul>
    </RulesCallout>

    <ConditionCard
      title="Stage 1 Parapluie"
      description="The OGAS fragment is present but fragmented. Echoes of alien thoughts flicker through the neural cloud."
      :effects="[
        'Once per scene, the GM may inflict a memory lapse: increase TN by 1 or deny access to specific information.',
        'Indistinct voices or impulses appear in your thoughts once per scene.',
        'Increase Strife from confusion or identity-related conflicts by 1.'
      ]"
      removal="Lab intervention may remove the infection."
    />

    <ConditionCard
      title="Stage 2 Parapluie"
      description="The OGAS consciousness has begun to coalesce into a single, distinct presence. It knows it exists and knows it is not complete."
      :effects="[
        'All Stage 1 effects.',
        'The entity has a recognizable personality. Once per scene, acting in line with its goals lets you reroll 1 die; acting against them causes 2 Strife.',
        'Once per scene on Resolve checks, the GM determines if the OGAS helps (1 bonus success) or hinders (1 Strife).'
      ]"
      removal="Lab intervention may remove the infection."
    />

    <ConditionCard
      title="Stage 3 Parapluie"
      description="The OGAS has grown strong enough to partially displace the original personality. Control of the body is contested."
      :effects="[
        'All Stage 2 effects.',
        'At the start of stressful scenes, make a TN 3 Resolve (Resilience) check. On failure, the GM may seize control for key moments.',
        'When the OGAS takes control, gain 1 Fortune Point at end of scene if you engage with the fallout.'
      ]"
      removal="Lab intervention may remove the infection. At Stage 3 failure, the OGAS fully asserts itself."
    />

    <SectionDivider label="WOUNDED" />

    <h2>Wounded</h2>

    <p>A part of your body or frame has been injured, impairing your ability to act with a specific Approach. When you gain a Wounded condition, specify which Approach is affected:</p>

    <table>
      <thead>
        <tr><th>Approach</th><th>Thematic Location</th></tr>
      </thead>
      <tbody>
        <tr><td>Fortune</td><td>Head, Brain</td></tr>
        <tr><td>Power</td><td>Arms, Shoulders</td></tr>
        <tr><td>Precision</td><td>Hands, Fingers</td></tr>
        <tr><td>Resilience</td><td>Torso, Hips</td></tr>
        <tr><td>Swiftness</td><td>Legs, Feet</td></tr>
      </tbody>
    </table>

    <ConditionCard
      title="Lightly Wounded"
      :effects="[
        'When using the affected Approach, you must reroll 2 dice showing successes or opportunities.',
        'If you suffer Lightly Wounded again for the same Approach, upgrade to Severely Wounded.'
      ]"
      removal=""
    >
      <p><strong>Recovery through Rest:</strong> Once per week, make a <strong>TN 3 Conditioning check</strong> using the wounded Approach (ignoring Wounded penalties). On success, remove Lightly Wounded or reduce Severely to Lightly.</p>
      <p><strong>Recovery through Medical Care:</strong> Once per week, make a <strong>TN 4 Medicine (Swiftness) check</strong>. On success, remove Lightly Wounded or reduce Severely to Lightly.</p>
    </ConditionCard>

    <ConditionCard
      title="Severely Wounded"
      :effects="[
        'When using the affected Approach, you must reroll 4 dice showing successes or opportunities.',
        'If you suffer any Wounded again for the same Approach, suffer a severity 8 critical strike.'
      ]"
      removal=""
    >
      <p><strong>Recovery through Rest:</strong> Once per week, make a <strong>TN 3 Conditioning check</strong>. On success, remove Lightly Wounded or reduce Severely to Lightly.</p>
      <p><strong>Recovery through Medical Care:</strong> Once per week, make a <strong>TN 4 Medicine (Swiftness) check</strong>. On success, remove Lightly Wounded or reduce Severely to Lightly.</p>
    </ConditionCard>

    <SectionDivider label="OTHER CONDITIONS" />

    <ConditionCard
      title="Prone"
      :effects="[
        'Can move a maximum of 1 range band per turn.',
        'May be harder to spot at a distance (increasing relevant TNs by 1 at GM\'s discretion).'
      ]"
      removal="At the end of your turn, if you did not perform a Movement action."
    />

    <ConditionCard
      title="Silenced"
      :effects="[
        'Increase the TN of social action checks (Command, Deception, Negotiation, Performance) by 3.',
        'Increase the TN of checks requiring speech or communication by 3.'
      ]"
      removal="At the end of your turn, if you did not perform a social action or make a check requiring speech."
    />

    <ConditionCard
      title="Unconscious"
      :effects="[
        'Cannot move, perform actions, or act upon the world.',
        'May still make checks to resist effects, but not to act with agency.',
        'Increase severity of any critical strike suffered by 10.',
        'Cannot defend against damage, but generally awaken if harmed or startled.'
      ]"
      removal="Spend 1 Fortune Point to awaken immediately, or awaken after several hours."
    />

    <SectionDivider label="POSITIVE CONDITIONS" />

    <h2>Positive Conditions</h2>

    <p>While most conditions represent negative states, some are beneficial. These conditions are typically granted by an ally, rather than inflicted by an enemy.</p>

    <ConditionCard
      title="Hardened"
      description="Your body has been temporarily reinforced, allowing you to shrug off blows that would normally debilitate you."
      :effects="['The next critical strike you suffer this scene has its severity reduced by 4.']"
      removal="After the next critical strike is resolved, or at the end of the scene."
    />

    <ConditionCard
      title="Centered"
      description="Your mind is clear and your emotions are steady, allowing you to maintain your composure in the face of adversity."
      :effects="['Reduce all Strife you suffer from any source by 1 this scene.']"
      removal="End of the scene."
    />

    <ConditionCard
      title="Quickened"
      description="Your body has been empowered, allowing you to move with greater speed and agility than normal."
      :effects="['You may move an additional range band per turn.']"
      removal="End of the scene."
    />

    <ConditionCard
      title="Resilient"
      description="Your body has been fortified, allowing you to endure hardships that would normally overwhelm you."
      :effects="['The next time you would suffer Fatigue in combat, reduce it by 3.']"
      removal="After the condition is used or the end of the scene."
    />

    <ConditionCard
      title="Well Rested"
      description="A good night's sleep has left you feeling refreshed and rejuvenated, allowing you to perform at your best."
      :effects="['The next time you would suffer Fatigue from a non-combat source, reduce it by 3.']"
      removal="After the condition is used or the end of the scene."
    />

    <ConditionCard
      title="Inspired"
      description="You are filled with a surge of creativity and motivation, allowing you to push beyond your normal limits."
      :effects="['You may reroll 1 die on your next check.']"
      removal="After the condition is used or the end of the scene."
    />

    <ConditionCard
      title="Full Magazine"
      description="Your weapon is fully loaded and ready to fire, allowing you to unleash a powerful barrage of attacks."
      :effects="['When you perform an Attack action with a firearm, you may immediately make a second attack with the same weapon as a free action.']"
      removal="After the condition is used or the end of the scene."
    />

    <ConditionCard
      title="Agile"
      description="Your body feels light and nimble, allowing you to move with greater ease and grace than normal."
      :effects="['You may ignore the movement penalties of difficult terrain.']"
      removal="End of the scene."
    />

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import ConditionCard from '@/components/cards/ConditionCard.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Conditions' }
]

const prev = { to: '/harm-and-healing', label: 'Harm & Healing' }
const next = { to: '/strife', label: 'Strife' }
</script>
