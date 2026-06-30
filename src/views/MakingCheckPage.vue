<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Making a Check</h1>

    <p>When a character attempts an action with meaningful risk, they make a check by combining an <strong>Approach</strong> with a <strong>Skill</strong>. The Approach determines the character's method, while the Skill reflects training and experience.</p>

    <p>Every check uses two types of dice:</p>
    <ul>
      <li><strong>Approach Dice</strong> (d6): Represent natural talent, instinct, or raw capability.</li>
      <li><strong>Skill Dice</strong> (d12): Represent practiced technique, drilled reflexes, and specialized knowledge. These dice have stronger faces and roll better overall.</li>
    </ul>

    <p>Each die face can show one or more of the following symbols:</p>
    <ul>
      <li><strong>Success</strong> <DiceSymbol name="Success" /></li>
      <li><strong>Opportunity</strong> <DiceSymbol name="Opportunity" /></li>
      <li><strong>Strife</strong> <DiceSymbol name="Strife" /></li>
      <li><strong>Explosion</strong> <DiceSymbol name="Explosion" /></li>
    </ul>

    <p>Certain results only appear on Skill Dice.</p>

    <SectionDivider label="Rolling Step by Step" />

    <h2><StepIndicator :number="1" /><br/> Build Your Dice Pool</h2>
    <p>Choose an <strong>Approach</strong> and a <strong>Skill</strong> that apply to your action.</p>
    <ul>
      <li>Roll a number of <strong>Approach Dice</strong> equal to your Approach rating.</li>
      <li>Roll a number of <strong>Skill Dice</strong> equal to your Skill rating.</li>
    </ul>
    <p>Both sets of dice are rolled together.</p>

    <h2><StepIndicator :number="2" /><br/> Apply Rerolls</h2>
    <p>If you have an effect, talent, or item that allows rerolling, use it now before choosing which dice to keep.</p>

    <h2><StepIndicator :number="3" /><br/> Keep Dice</h2>
    <p>After all rerolls, choose which dice to keep.</p>
    <p>You may keep a number of dice <strong>up to your Approach rating</strong>.</p>
    <p>Any die showing <strong>Explosion</strong> counts as a success and immediately rolls an additional die of the same type. The bonus die from an Explosion does <strong>not</strong> count toward your kept-dice limit and may be kept freely.</p>

    <h2><StepIndicator :number="4" /><br/> Resolve Symbols</h2>
    <p>Once you have chosen your kept dice (including any Explosion dice), total the symbols:</p>
    <ul>
      <li><strong>Successes:</strong> Compare to the action's <strong>Target Number (TN)</strong>. Meeting or exceeding the TN means the action succeeds. Falling short means the action fails.</li>
      <li><strong>Opportunities:</strong> Spend on special effects providing tactical advantages, environmental benefits, or unique outcomes determined by the skill or situation.</li>
      <li><strong>Strife:</strong> Add all Strife generated to your character's current Strife total. Strife reflects stress, emotional pressure, or overcommitment during the action.</li>
    </ul>

    <SectionDivider label="Difficulty" />

    <TNGuide :rows="tnRows" />

    <h2>Dice Faces</h2>
    <DiceFaces :columns="diceColumns" />

    <h2>Opportunities</h2>
    <RulesCallout>
      <p>Opportunity results can be spent to gain advantages, learn information, or activate special abilities. Unspent opportunities add to the GM's strife pool.</p>
    </RulesCallout>

    <h2>Strife</h2>
    <p>Strife results represent mental and emotional pressure. Accumulating too much strife can trigger outbursts.</p>

    <SectionDivider label="Assistance" />

    <p>Characters often work together to accomplish tasks. When one character dedicates their effort to helping another, use the following rules.</p>

    <h3>Providing Assistance</h3>
    <p>When a character makes a roll, one or more allies may support them.</p>
    <ul>
      <li>If the assisting character has <strong>1 or more ranks</strong> in the Skill being used, the acting character adds <strong>+1 Skill Die</strong> to their pool.</li>
      <li>If the assisting character has <strong>0 ranks</strong> in that Skill, the acting character adds <strong>+1 Approach Die</strong> instead.</li>
    </ul>
    <p>Each assisting player must describe how their character helps. The GM decides whether the assistance is legitimate and whether the assisting character can meaningfully contribute.</p>

    <h3>Influence on the Roll</h3>
    <p>After the dice pool is rolled and any rerolls are used:</p>
    <ul>
      <li>When choosing dice to keep, the acting character may keep <strong>+1 additional die per assisting character</strong>. This reflects improved positioning or coordinated effort.</li>
      <li>During symbol resolution, each assisting character may take <strong>1 Strife</strong> to remove <strong>1 Strife</strong> from the acting character's kept dice.</li>
    </ul>
    <p>The GM may also allow a relevant advantage, item, or situational benefit from <strong>one</strong> assisting character if the fiction supports it.</p>

    <h3>Limits on Assistance</h3>
    <p>The GM determines how many characters can assist based on the situation. Physical space, timing, and the nature of the action often limit assistance to <strong>one</strong> helper, though more may be appropriate during large coordinated tasks.</p>

    <SectionDivider label="Bonus Successes & Shortfall" />

    <h3>Bonus Successes</h3>
    <p>If a character succeeds on a check, their <strong>bonus successes</strong> are the number of Success symbols (including those from Explosions) exceeding the Target Number. Bonus successes can improve the result, speed up completion, increase damage, strengthen positioning, or trigger effects defined by Skills, equipment, or techniques.</p>

    <h3>Shortfall</h3>
    <p>If a character fails a check, their <strong>shortfall</strong> is calculated as:</p>
    <FormulaDisplay text="Shortfall = TN - total Successes" />
    <p>Shortfall can determine the severity of a complication, how badly the situation escalates, or how much ground is lost.</p>

    <SectionDivider label="Checks to Resist Effects" />

    <p>Some effects allow the target to resist by making their own check.</p>
    <p>When a character attempts an action that imposes harmful or forceful consequences on a target (such as throwing someone, hacking their system, or overwhelming their senses), the target may attempt a resistance check using the Approach and Skill that best reflects their method of countering it.</p>
    <ul>
      <li><strong>If the target succeeds</strong>, they avoid or reduce the effect.</li>
      <li><strong>If the target fails</strong>, the effect applies as normal, often modified by the attacker's bonus successes.</li>
    </ul>

    <h3>Setting the TN for Resistance</h3>
    <p>If an effect does not list a TN for resistance, the GM sets one appropriate to the situation. If the GM wants to reflect the aggressor's strength or precision, they may <strong>increase the TN by the attacker's bonus successes</strong>.</p>
    <p>This models stronger attacks being harder to resist while still leaving room for dramatic reversals.</p>

    <ExampleBox>
      <h4>Example Check</h4>
      <p>Kestrel attempts a difficult shot through a narrow window with her precision rifle. The GM sets TN 3. Kestrel rolls 3 approach dice (Precision ring 3) and 2 skill dice (Marksmanship 2). She keeps 3 dice and must get 2+ successes to hit.</p>
    </ExampleBox>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import StepIndicator from '@/components/layout/StepIndicator.vue'
import FormulaDisplay from '@/components/data/FormulaDisplay.vue'
import TNGuide from '@/components/data/TNGuide.vue'
import DiceFaces from '@/components/data/DiceFaces.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import ExampleBox from '@/components/callouts/ExampleBox.vue'
import DiceSymbol from '@/components/data/DiceSymbol.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Making a Check' }
]

const tnRows = [
  { tn: 1, label: 'Routine Action', description: 'Simple tasks with little resistance, such as opening an unsecured crate, identifying a common piece of tech, or vaulting a low obstacle.' },
  { tn: 2, label: 'Standard Challenge', description: 'Typical field actions that require attention, such as keeping steady aim in poor lighting, bypassing a civilian-grade lock, or navigating cluttered terrain at speed.' },
  { tn: 3, label: 'Difficult Task', description: 'Demands skill, preparation, or decisive execution, such as hacking a military terminal, stabilizing a wounded ally under fire, or breaching a reinforced doorway efficiently.' },
  { tn: 4, label: 'Serious Obstacle', description: 'Requires strong technique or an inspired approach, such as outmaneuvering a trained opponent, rewiring damaged equipment mid-operation, or crossing exposed ground under hostile surveillance.' },
  { tn: 5, label: 'Extreme Feat', description: 'At the outer edge of what a trained combatant or T-Doll can accomplish, such as snapping off a pinpoint shot through heavy debris, defeating active security protocols during an alert, or performing high-speed maneuvers in collapsing structures.' },
  { tn: 6, label: 'Exceptional Achievement', description: 'Reserved for extraordinary moments. Actions at this level reshape the engagement, turn failure into opportunity, or showcase a character\'s highest potential.' },
]

const diceColumns = [
  {
    name: 'Approach Dice (d6)',
    subtitle: 'Rolled for every check',
    faces: [
      { label: 'Success', symbol: 'Success' },
      { label: 'Success + Strife', symbol: 'Success, Strife' },
      { label: 'Opportunity', symbol: 'Opportunity' },
      { label: 'Opportunity + Strife', symbol: 'Opportunity, Strife' },
      { label: 'Explosion + Strife', symbol: 'Explosion, Strife' },
      { label: 'Blank', symbol: '\u2014' },
    ]
  },
  {
    name: 'Skill Dice (d12)',
    subtitle: 'Added for trained skills',
    faces: [
      { label: 'Success', symbol: 'Success' },
      { label: 'Success', symbol: 'Success' },
      { label: 'Success + Strife', symbol: 'Success, Strife' },
      { label: 'Success + Strife', symbol: 'Success, Strife' },
      { label: 'Success + Opportunity', symbol: 'Success, Opportunity' },
      { label: 'Opportunity', symbol: 'Opportunity' },
      { label: 'Opportunity', symbol: 'Opportunity' },
      { label: 'Opportunity', symbol: 'Opportunity' },
      { label: 'Explosion', symbol: 'Explosion' },
      { label: 'Explosion + Strife', symbol: 'Explosion, Strife' },
      { label: 'Blank', symbol: '\u2014' },
      { label: 'Blank', symbol: '\u2014' },
    ]
  }
]

const prev = { to: '/', label: 'Home' }
const next = { to: '/approaches-and-derived-attributes', label: 'Approaches & Attributes' }
</script>