<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Scenes &amp; Operations</h1>
    <p>When an operator gears up for a deployment, they never know if the next hour will be a tense waiting game or a desperate fight for survival. Days might pass in the monotony of base life or transit, punctuated only by maintenance drills and briefings. Then, a single operation can explode into a chaotic melee of noise, adrenaline, and lethal force. This chapter covers the rules for framing the narrative flow of the game, managing the passage of time, and resolving the conflicts that arise when objectives clash with opposition.</p>

    <h2>The Structure of Play</h2>
    <p>Each session is broken down into <strong>scenes</strong>. A scene is a discrete segment of the game: a briefing, a firefight, a tense negotiation, or a quiet night in the barracks, where the characters interact with the world in pursuit of a specific goal or in reaction to unfolding events.</p>
    <p>The GM decides when a scene begins and ends. At the outset, the GM establishes the sensory details of the environment and the stakes at hand. At the end, they provide a resolution and transition the narrative to the next moment of importance.</p>

    <h3>Key Properties for Any Scene</h3>
    <p>Every scene, whether a quiet conversation or a chaotic breach, shares common elements that define how the game is played. The GM should clarify these elements at the start:</p>

    <RulesCallout>
      <h4>Operational Parameters</h4>
      <ul>
        <li><strong>Purpose:</strong> The objective of the scene. What are the characters trying to achieve or prevent?</li>
        <li><strong>Duration:</strong> The narrative time scale. Does this scene take minutes, hours, or days?</li>
        <li><strong>Turn Order:</strong> The flow of action. Is it freeform narrative flow, or is it structured by rounds?</li>
        <li><strong>Initiative:</strong> How is action priority determined? Who acts first when the shooting starts?</li>
        <li><strong>Common Actions:</strong> What specific moves or checks are relevant to the tension?</li>
        <li><strong>Outcomes:</strong> What ends the scene? Is it a withdrawal, a completed objective, or an escalation?</li>
      </ul>
    </RulesCallout>

    <h3>Scene Transitions</h3>
    <p>The GM calls transitions when the fiction changes what the rules need to track. Escalate to structured play when timing and action sequence become load-bearing; de-escalate when pressure drops.</p>

    <StatBlock :stats="escalationMap" />

    <p>If an outcome can be settled with a single meaningful check, stay in Narrative mode. Structured conflict exists for sustained opposition where fairness requires sequenced turns.</p>

    <SectionDivider label="Narrative Scenes" />

    <p>Narrative scenes are the default mode of play, covering moments where characters investigate, negotiate, plan, infiltrate, and manage social pressure without entering structured combat timing. This is where most intelligence gathering, legwork, and relationship play happens.</p>
    <p>Time flows naturally in narrative scenes. The GM does not count rounds unless the fiction demands it; instead, spotlight moves between characters as they act. The goal is to maintain momentum while still giving each player meaningful influence over events.</p>

    <RulesCallout>
      <h4>Narrative Procedure</h4>
      <ol>
        <li><strong>Frame the situation:</strong> Establish location, immediate stakes, who is present, and what pressure is building.</li>
        <li><strong>Set intent:</strong> Ask each player what they are trying to achieve in this scene right now.</li>
        <li><strong>Follow the fiction:</strong> Resolve actions in conversational order, shifting spotlight as logic and pacing demand.</li>
        <li><strong>Call for checks selectively:</strong> Roll when outcomes are uncertain, costly, opposed, or time-sensitive.</li>
        <li><strong>Apply consequences:</strong> Success should change the situation; failure should introduce cost, delay, exposure, or escalation.</li>
        <li><strong>Close or transition:</strong> End when goals are resolved, momentum drops, or the scene escalates into Downtime or Conflict.</li>
      </ol>
    </RulesCallout>

    <h3>Checks in Narrative Play</h3>
    <p>Do not roll for every statement or simple action. Roll when the answer is genuinely in doubt and the result matters. A check should either open an opportunity or create a new problem. If neither would happen, resolve by narration.</p>
    <ul>
      <li><strong>Unopposed checks:</strong> Used for uncertain tasks against the environment (tailing a suspect, cracking a lock, reading a crowd).</li>
      <li><strong>Opposed checks:</strong> Used when another character or NPC actively resists (deception vs scrutiny, coercion vs resolve).</li>
      <li><strong>Assistance and setup:</strong> Characters can create favorable positioning, tools, or intel before a key roll to improve later odds.</li>
    </ul>

    <h3>Pacing and Spotlight</h3>
    <p>Narrative scenes work best when each player gets short, decisive spotlight turns. Keep actions focused, then hand focus to the next character at a natural beat. If two or more actions become tightly interlocked in time and sequence, consider shifting to structured play.</p>

    <h4>Electronic Warfare in Narrative Scenes</h4>
    <p>Hacking an undefended or low-security network does not require structured time. Handle it as a standard narrative check: the character states their goal, the GM sets a TN equal to the network's Security Rating, and the result either opens the next door or introduces a complication.</p>
    <p>Heat is not tracked in narrative EW. The network has no active opposition capable of generating real-time pressure. Failure does not mean disconnection: it means noise, partial access, a longer route, or a flag that might matter later.</p>

    <ExampleBox>
      <h4>The Dead Drop</h4>
      <p>You meet a contact in a rainy, neon-lit alleyway. The GM frames the stakes: confirm whether the data chip is authentic without alerting surveillance. You open with small talk while another operator watches rooftops. A <strong>Precision + Insight</strong> check reads the contact's body language; success reveals coercion, but your visible caution raises suspicion with nearby observers. The team pivots, changes extraction route, and exits before the scene can escalate into a street skirmish.</p>
    </ExampleBox>

    <SectionDivider label="Downtime Scenes" />

    <p>Downtime scenes represent the interludes between operations: stretches of rest, travel, maintenance, training, or personal projects that can span hours, days, or weeks. Stakes are usually lower than in active conflicts, but the consequences are still meaningful. This is where characters rebuild, reposition, and prepare for what comes next.</p>

    <RulesCallout>
      <h4>Downtime Procedure</h4>
      <ol>
        <li><strong>Set the scope:</strong> The GM states how much time is passing and what constraints apply.</li>
        <li><strong>Choose activities:</strong> Each player declares one primary downtime activity for their character.</li>
        <li><strong>Play the key beats:</strong> Roleplay only important anecdotes and turning points; summarize routine hours or days.</li>
        <li><strong>Call for checks when needed:</strong> Roll only when uncertainty or risk matters.</li>
        <li><strong>Resolve outcomes:</strong> Apply gains, setbacks, and project progress, then transition to the next scene.</li>
      </ol>
    </RulesCallout>

    <h3>Downtime Activities</h3>
    <p>At the start of downtime, each character picks what they are pursuing. Activities should be broad, practical goals rather than second-by-second action scripts. Typical choices include recovery, training, social networking, logistics, gear work, investigation, and travel.</p>

    <h3>How Much Can Be Done?</h3>
    <ul>
      <li><strong>Short downtime (hours to one day):</strong> One focused task, light recovery, or quick prep.</li>
      <li><strong>Long downtime (more than two days):</strong> As a rule of thumb, each character can complete <strong>one downtime activity per two days</strong> of available time.</li>
      <li><strong>Demanding downtime (forced march, evasive travel, nonstop duty):</strong> The activity may be limited to enduring the journey itself.</li>
    </ul>

    <ExampleBox>
      <h4>Med Leave</h4>
      <p>After a botched extraction, the team gets six days of medical leave in a secure rear base. The GM sets constraints: limited workshop access, full hospital support, and one scheduled debrief. You choose recovery and clear accumulated Strife; another operator chooses gear work and tunes their sidearm; a third uses the remaining days to build a local contact network. The GM roleplays two key moments, asks for one check where uncertainty matters, then summarizes the rest of the week before the next briefing scene.</p>
    </ExampleBox>

    <SectionDivider label="Conflict Scenes" />

    <p>When two or more characters are in sustained opposition and timing matters, the GM should call for a <strong>Conflict Scene</strong>. This mode is built for extended contests where sequence, pressure, and counterplay all matter: firefights, breaches, hacker duels, command clashes, and other high-stakes engagements.</p>

    <p>Not every tense exchange needs full conflict rules. If the outcome can be settled with one meaningful contest, use a single opposed or competitive check and keep the scene in Narrative mode.</p>

    <h3>Conflict Types</h3>
    <StatBlock :stats="conflictTypes" />

    <h3>Structured Time</h3>
    <p>In structured time, the narrative slows down. Characters act in a regulated order, and each is limited in what they can accomplish before their opponents have a chance to react.</p>
    <ul>
      <li><strong>Actions:</strong> Discrete tasks undertaken during a scene, usually resolved with a check.</li>
      <li><strong>Turns:</strong> A character's opportunity to perform an action.</li>
      <li><strong>Rounds:</strong> The span of time in which every participant takes one turn.</li>
    </ul>

    <h3>Conflict Flow (3 Phases)</h3>
    <ol>
      <li><strong>Phase 1: Initiative:</strong> Characters assess the situation, roll Initiative checks, and establish action order.</li>
      <li><strong>Phase 2: Take Turns:</strong> Conflict proceeds round by round; each participant takes one turn in initiative order.</li>
      <li><strong>Phase 3: Resolution:</strong> Once objectives are secured, broken, or abandoned, resolve end-of-conflict effects and transition scenes.</li>
    </ol>

    <h3>Initiative</h3>
    <p>Initiative determines who acts first and how momentum unfolds. Default checks are <strong>TN 1</strong>; late arrivals entering under fire may face TN 2 or higher.</p>
    <StatBlock :stats="initiativeSkills" />

    <p>Your base value is <strong>Focus</strong> if you were prepared (ambush set, weapons drawn) or <strong>Vigilance</strong> if caught off guard. On a successful check, add 1 plus bonus successes. Characters act in descending order; ties go to situational edge.</p>

    <h3>Turn Sequence</h3>
    <RulesCallout>
      <ol>
        <li><strong>Beginning of Turn:</strong> Resolve effects that trigger at turn start.</li>
        <li><strong>Set Stance:</strong> Keep current stance or switch to a new one.</li>
        <li><strong>Perform Action:</strong> Take one primary action (usually with a check).</li>
        <li><strong>Reposition:</strong> Once per turn, move a short distance before or after your action.</li>
        <li><strong>End of Turn:</strong> Resolve turn-end effects and pass initiative.</li>
      </ol>
    </RulesCallout>

    <h3>Actions in Conflict</h3>
    <ul>
      <li><strong>Attack:</strong> Inflict harm, suppress, disable, or force displacement.</li>
      <li><strong>Scheme:</strong> Manipulate behavior, morale, positioning, or decisions.</li>
      <li><strong>Support:</strong> Assist allies, improve position, create tactical opportunities.</li>
      <li><strong>Movement:</strong> Reposition, flank, withdraw, cross danger areas.</li>
    </ul>

    <h3>Momentum for Complex Objectives</h3>
    <p>Some conflict goals take multiple actions to complete. For these, assign a <strong>difficulty value</strong> and track <strong>momentum</strong> toward completion. Each successful contributing action grants at least 1 momentum; bonus successes may add more. When accumulated momentum meets the difficulty value, the objective is achieved.</p>

    <h3>Combat Approaches</h3>
    <StatBlock :stats="combatApproaches" />

    <SectionDivider label="Intrigues" />

    <p>Intrigues are structured social conflicts used to secure support, force concessions, expose vulnerabilities, and shape decisions before violence begins. Run an Intrigue when many active voices are competing and freeform conversation no longer keeps outcomes clear.</p>

    <h3>Social Objectives</h3>
    <p>At the start of Phase 1, each participating character selects a <strong>social objective</strong>: a concrete, measurable goal they are trying to achieve. Characters can share one objective or pursue different ones.</p>

    <StatBlock :stats="socialObjectives" />

    <h3>Intrigue Initiative</h3>
    <p>Intrigues use a <strong>TN 1 Insight</strong> Initiative check. Speaking order is fluid: each character takes one turn per round when they choose. Initiative resolves timing conflicts when two or more characters try to act at once.</p>

    <h3>Core Intrigue Actions</h3>
    <ul>
      <li><strong>Assist (Support):</strong> Provide an ally with argument framing, intel, or social cover; grant assistance to their next relevant check.</li>
      <li><strong>Calming Breath (Support):</strong> Regain composure and stabilize under pressure.</li>
      <li><strong>Persuade (Scheme):</strong> Make a social skill check to advance an objective directly.</li>
      <li><strong>Unique Action:</strong> Use another relevant skill to create leverage.</li>
    </ul>

    <ExampleBox>
      <h4>The Interrogation</h4>
      <p>You are questioning a captured operative during a joint command review. Your objective is to <strong>Discern Someone's Qualities</strong> (identify handler loyalty and one hidden weakness), while your political rival's objective is to <strong>Discredit Someone</strong> (make you appear reckless). Initiative is rolled with Insight, but turn timing is conversational. You use <strong>Precision</strong> stance and Persuade carefully to avoid overcommitting. A successful check adds momentum toward your objective; your rival uses Assist to undermine your framing. By round end, you reach the objective threshold first, exposing a contradiction in the detainee's cover story and forcing command to continue the interrogation under your lead.</p>
    </ExampleBox>

    <SectionDivider label="Duels" />

    <p>Duels are one-on-one confrontations where two combatants deliberately narrow the fight to a direct contest of nerve, skill, and commitment. The stakes are personal and practical: command trust, unit confidence, mission authority, reputation for reliability, and sometimes survival.</p>

    <RulesCallout>
      <h4>Duel Terms Checklist</h4>
      <ul>
        <li><strong>Objective:</strong> First clean hit, first blood, incapacitation, forced withdrawal, confirmed kill, or surrender.</li>
        <li><strong>Allowed methods:</strong> Weapon class, fighting style, tools, and whether support tech is legal.</li>
        <li><strong>Environment:</strong> Starting distance, terrain limits, visibility, and interference risks.</li>
        <li><strong>Outside interference:</strong> Strictly prohibited, tolerated, or expected as part of real combat.</li>
        <li><strong>Consequence profile:</strong> Training discipline, command ruling, unit reputation shift, legal fallout, or lethal consequence.</li>
      </ul>
    </RulesCallout>

    <h3>Initiative and Pressure</h3>
    <p>Duels use a <strong>TN 1 Resolve</strong> Initiative check. At the start of each round, both duelists take escalating pressure equal to the round number as Strife (1 in round one, 2 in round two, and so on). After this, each duelist who is not Compromised may secretly bid additional Strife from 0 up to Focus; reveal simultaneously and add that amount to initiative for this round only.</p>

    <h3>Finishing Window</h3>
    <p>The first time an opponent becomes Compromised or unmasks during a duel, the other duelist may immediately make a <strong>Finishing Blow</strong> as an out-of-turn Attack action. Resolve it immediately; if it meets duel objective, the duel ends at once.</p>

    <h3>Actions in Duels</h3>
    <ul>
      <li><strong>Calming Breath (Support):</strong> Shed pressure before committing to a decisive exchange.</li>
      <li><strong>Center (Support):</strong> Bank execution quality for a later decisive check.</li>
      <li><strong>Predict (Scheme/Attack):</strong> Call and punish your opponent's likely stance or rhythm.</li>
      <li><strong>Prepare Item (Support):</strong> Change grip, swap tools, ready backup gear.</li>
      <li><strong>Strike (Attack):</strong> Deliver the decisive attempt when your opening appears.</li>
    </ul>

    <h3>Concession and Mercy</h3>
    <p>At the start of any round, a duelist may concede. This is an immediate loss for objective purposes, but concession can preserve life, mission cohesion, and long-term relationships. The victor may enforce full terms or show restraint.</p>

    <h3>Optional Quick Duel (One Roll)</h3>
    <p>For faster pacing, each duelist declares approach and intent, then both make a single competitive check (base TN 1, adjusted by circumstances). Higher net result wins and applies duel objective effects immediately.</p>

    <ExampleBox>
      <h4>Rooftop Counter-Sniper</h4>
      <p>You and an enemy marksman are pinning each other across adjacent towers while both squads are stalled below. Terms are set: objective is forced withdrawal or incapacitation; no outside shot calls, but spotter chatter is allowed. Initiative uses Resolve. In round two, both of you bid Strife to seize first action; you act first, use Predict to bait a peek angle, then Strike from Precision stance. The hit does not kill, but it forces the target to break line and retreat. The duel ends as a clear win: your team regains movement corridor, and command confidence in your call rises for the next operation.</p>
    </ExampleBox>

    <h3>Hacker Duels (Special Duel Type)</h3>
    <p>A hacker duel is a one-on-one cyberspace confrontation using duel structure with electronic warfare rules. It is used when two hostile operators directly contest control of the same network objective.</p>
    <p>Use a <strong>TN 1 Computers</strong> Initiative check. At round start, both duelists gain Heat equal to the current round number. Common actions are Crack, Bypass, Disrupt, Scan, Defend, and Pause. When Finishing Blow triggers, instead of normal damage apply one of: Spike (+3 Heat), Crash (Dazed + can't Run Silent), or Lockout (barred from objective path).</p>

    <ExampleBox>
      <h4>Counter-Intrusion Lockout</h4>
      <p>You are exfiltrating target files when an enemy operator engages directly. The duel objective is asymmetric: you need a clean disconnect with data, they need to force your Burned state. Initiative is TN 1 Computers. In round three, both of you spike Heat from pressure; you win initiative with a Strife bid, trigger a Finishing Blow after they unmask, and choose Lockout to block their route to your extraction node. They fail the recovery check, you disconnect cleanly, and the duel resolves as a clear defensive win with your trace footprint intact.</p>
    </ExampleBox>

    <SectionDivider label="Skirmishes" />

    <p>Skirmishes are pitched firefights between small units: a handful of operators, a squad at most. They cover ambushes on debris-choked roads, raids on fortified checkpoints, rearguard actions in collapsing structures, desperate stands while an extraction burns in. A skirmish ends when one side is defeated, driven off, or no longer capable of resistance.</p>

    <h3>Skirmish Initiative</h3>
    <p>Skirmishes use a <strong>TN 1 Tactics</strong> Initiative check. Characters may spend Opportunity from the check before the first round begins to gain intel, ready a weapon, or dive for nearby cover.</p>

    <h3>Skirmish Turn Sequence</h3>
    <RulesCallout>
      <ol>
        <li><strong>Beginning of Turn:</strong> Resolve any effects that trigger at turn start.</li>
        <li><strong>Set Stance:</strong> Keep your current stance or switch to a new one.</li>
        <li><strong>Move:</strong> Move 1 range band before or after your action. This is not an action.</li>
        <li><strong>Perform an Action:</strong> Take one primary action.</li>
        <li><strong>End of Turn:</strong> Resolve turn-end effects and pass initiative.</li>
      </ol>
    </RulesCallout>

    <h3>Skirmish Actions</h3>

    <h4>Assist <em>(Attack, Scheme, or Support)</em></h4>
    <p>Call out a firing solution, relay threat data, or apply pressure on a flank to open an opportunity for an ally. Describe how you are helping one other character at range 0–2. Provide assistance on the chosen character's next action check.</p>

    <h4>Calming Breath <em>(Support)</em></h4>
    <p>Draw a controlled breath between bursts. If your Strife exceeds half your Composure, remove 1 Strife. If your Fatigue exceeds half your Endurance, remove 1 Fatigue.</p>

    <h4>Challenge <em>(Scheme)</em></h4>
    <p>Lock eyes with one specific enemy and call them out. Make a <strong>TN 1 Command</strong> check targeting one character at range 0–5. On success, stake <strong>5 Fame</strong> on the outcome. The target must accept (stakes 5 Fame, commits to clash) or decline (forfeits Fame, their allies suffer 2 Strife, you gain 1 Fortune Point). At end of round, accepted challenges resolve as a clash.</p>

    <h4>Guard <em>(Support)</em></h4>
    <p>Take up a defensive position. <strong>TN 1 Tactics</strong> check targeting yourself or one ally within the weapon's range. On success, the target is guarded: increase TN of Attack checks against them by 1, plus 1 more per 2 bonus successes.</p>

    <h4>Maneuver <em>(Movement)</em></h4>
    <p>Push across the field. Move 1 range band. May also make a <strong>TN 2 Conditioning</strong> check; on success, move 2 range bands instead, plus 1 per 2 bonus successes.</p>

    <h4>Prepare Item <em>(Support)</em></h4>
    <p>Ready, stow, or change the grip on a weapon or piece of equipment: swapping magazines, holstering a sidearm, activating a piece of kit.</p>

    <h4>Strike <em>(Attack)</em></h4>
    <p>Deliver an attack against a single target. <strong>TN 2 check with the appropriate combat skill</strong> targeting one character within the weapon's range. On success, deal the weapon's base damage plus bonus successes. <em>Opportunity:</em> Spend Opportunity to inflict a critical strike at severity equal to the weapon's Deadliness.</p>

    <h4>Wait <em>(Attack, Scheme, or Support)</em></h4>
    <p>Hold your action for a precise moment. Declare a non-Movement action and specify a trigger event. If the event occurs, perform the declared action immediately. If not, you may perform any action of your choice (other than Wait) at the end of the round.</p>

    <h3>Clashes</h3>
    <p>A clash is a duel embedded inside a skirmish. It can be triggered by a successful Challenge action or by narrative circumstances. Participants step out of initiative order and fight one duel round per clash round, gaining Strife equal to the current clash round number. The clash continues until one side wins, concedes, or both agree to withdraw.</p>

    <h3>Breaches (Skirmish Variant)</h3>
    <p>A breach is a skirmish with a physical barrier dividing attacker and defender. It runs on standard skirmish rules with three phases:</p>
    <ul>
      <li><strong>Phase 1: Preparation —</strong> Each side takes one action blind before the barrier breaks.</li>
      <li><strong>Phase 2: The Entry —</strong> The barrier breaks. Roll Initiative (TN 1 Tactics). All Attack checks by <strong>attackers</strong> have TN +1 during this round (the fatal funnel).</li>
      <li><strong>Phase 3: Clearance —</strong> TN penalty lifts. The engagement becomes a standard skirmish.</li>
    </ul>

    <ExampleBox>
      <h4>Locked Ward</h4>
      <p>The team needs to pull an asset from a fortified detention block. The breach point is a reinforced security door, hacked open by the team's EW specialist. Setup establishes range 0–1 dominance inside, two guard positions flanking the entry corridor. In Phase 1, the lead operator primes a flashbang; the guards barricade the corridor and set fields of fire. Phase 2: the door opens. Flashbang resolves before initiative: both defenders gain Dazed. Initiative rolls with Tactics. The lead moves in at range 0 and Strikes at TN 3 (base TN 2, +1 Entry penalty). One success still lands. By round end, one guard is Compromised. Phase 3: the penalty lifts and clearance becomes a standard skirmish. The team secures the space in two more rounds.</p>
    </ExampleBox>

    <h3>Electronic Warfare Scenes (Skirmish Variant)</h3>
    <p>An EW scene runs on the same phase structure as a skirmish with these modifications:</p>
    <ul>
      <li><strong>Initiative:</strong> TN 1 <strong>Computers</strong> instead of Tactics.</li>
      <li><strong>Battlefield:</strong> Nodes and links replace range bands. Once per turn, traverse one link before or after your action as free movement. Barriers require a Bypass action.</li>
      <li><strong>Actions:</strong> Characters use EW actions: Crack, Bypass, Disrupt, Scan, Defend, and Pause, plus any learned techniques.</li>
      <li><strong>Heat:</strong> Tracks network exposure. Gain 1 Heat at end of turn when acting against a hostile system, +1 more on a failed check. At Heat 7–9, TN of all checks +1. At Heat 10 (Burned), forcibly disconnected.</li>
      <li><strong>Running Silent:</strong> Declare at turn start. No Heat from actions that turn, but TN of all checks +1.</li>
    </ul>

    <ExampleBox>
      <h4>Sensor Blackout</h4>
      <p>The team needs a fifteen-second gap in perimeter surveillance to move from Building A to Building B. The GM lays out the network: three camera nodes, one sensor relay node, and a security server. The hacker decides to target the relay, planning to loop static footage. Crack gains a foothold. Next turn, they Disrupt the relay. But the failure gains Heat, pushing them to Noticed. The security operator logs on. By round three, it's a race: the hacker running silent, the operator scanning nodes and closing in. The hacker completes the objective with 8 Heat, pulling the plug just before Burned. The team is through.</p>
    </ExampleBox>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import StatBlock from '@/components/data/StatBlock.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import ExampleBox from '@/components/callouts/ExampleBox.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Scenes & Operations' }
]

const escalationMap = [
  { name: 'Narrative', value: '→ Skirmish', desc: 'Weapons come out and both sides need fair action sequencing.' },
  { name: 'Narrative', value: '→ Duel', desc: 'Two specific combatants step away for a direct one-on-one confrontation.' },
  { name: 'Narrative', value: '→ Intrigue', desc: 'Multiple voices competing and freeform conversation can no longer keep outcomes clear.' },
  { name: 'Narrative', value: '→ EW', desc: 'The network starts actively pushing back: a sentry triggers, a hostile operator engages.' },
  { name: 'Narrative', value: '→ Mass Battle', desc: 'The scale of conflict grows beyond a small unit and command-level decisions drive outcomes.' },
  { name: 'Narrative', value: '→ Downtime', desc: 'Immediate pressure resolves and the story shifts to recovery, travel, or longer-horizon work.' },
  { name: 'Downtime', value: '→ Any Conflict', desc: 'Active opposition emerges and action economy suddenly matters.' },
  { name: 'Any Conflict', value: '→ Narrative', desc: 'One side is defeated, driven off, or the outcome is no longer in meaningful doubt.' }
]

const conflictTypes = [
  { name: 'Intrigues', value: 'Insight', desc: 'Structured social pressure, negotiation, interrogation, political maneuvering.' },
  { name: 'Duels', value: 'Resolve', desc: 'One-on-one high-stakes confrontations.' },
  { name: 'Skirmishes', value: 'Tactics', desc: 'Small-unit tactical combat.' },
  { name: 'Breaches', value: 'Tactics', desc: 'Close-quarters forced entry engagements.' },
  { name: 'Electronic Warfare', value: 'Computers', desc: 'Contested cyber operations under pressure.' },
  { name: 'Mass Battles', value: 'Command', desc: 'Large-scale command-level engagements.' }
]

const initiativeSkills = [
  { name: 'Intrigues', value: 'Insight', desc: 'Reading the room and social dynamics.' },
  { name: 'Duels', value: 'Resolve', desc: 'Mental fortitude and nerve.' },
  { name: 'Skirmishes & Breaches', value: 'Tactics', desc: 'Situational awareness and threat read.' },
  { name: 'Mass Battles', value: 'Command', desc: 'Leadership presence and strategic overview.' },
  { name: 'Electronic Warfare', value: 'Computers', desc: 'Processing speed and network awareness.' }
]

const combatApproaches = [
  { name: 'Resilience', value: 'Bunkering down', desc: 'Others cannot spend Opportunity on Attack or Scheme checks targeting you to inflict critical strikes or conditions. You are a fortress.' },
  { name: 'Swiftness', value: 'Fluid movement', desc: 'Perform one additional action that does not require a check (cannot share a type with another action this turn). Adapt and overcome.' },
  { name: 'Power', value: 'Aggressive assault', desc: 'When you succeed on a check, count each Strife symbol on your kept dice as one additional bonus success. Overwhelm the enemy.' },
  { name: 'Precision', value: 'Cunning precision', desc: 'Increase TN of Attack/Scheme checks targeting you by 1 (or 2 if Discipline rank total is 4+). Make yourself a hard target.' },
  { name: 'Fortune', value: 'Instinct and luck', desc: 'You do not receive Strife from Strife symbols on your kept dice. You remain cool under pressure; other Strife sources still apply.' }
]

const socialObjectives = [
  { name: 'Appeal', value: 'Persuade', desc: 'Convince a target to adopt your position or stop resisting it. Starting difficulty guideline: target\'s Focus.' },
  { name: 'Discern', value: 'Investigate', desc: 'Uncover hidden priorities, loyalties, strengths, or weaknesses. Starting difficulty guideline: target\'s Vigilance.' },
  { name: 'Discredit', value: 'Undermine', desc: 'Push a target into public loss of face, forcing concession, retreat, or reputational damage.' },
  { name: 'Spread a Rumor', value: 'Seed', desc: 'Seed a narrative through multiple parties until it becomes self-sustaining in the scene.' }
]

const prev = { to: '/range-bands', label: 'Range Bands' }
const next = { to: '/harm-and-healing', label: 'Harm & Healing' }
</script>