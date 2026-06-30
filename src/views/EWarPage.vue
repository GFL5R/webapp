<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Electronic Warfare</h1>

    <p>In 2072, the global network is a patchwork of point-to-point microwave relays, local mesh networks, and hardened fiber backbones. Satellite links are rare and jealously guarded. Most secure systems are air-gapped, connected to wider networks only at scheduled intervals or through physical terminals. To hack something important, you usually have to be close enough to touch it, or close enough to get shot trying.</p>

    <p>Electronic warfare follows the same Roll and Keep rules as every other check. Choose an <strong>Approach</strong> and a relevant <strong>Skill</strong>, roll dice, keep up to your Approach rating, compare successes to a <strong>TN</strong>.</p>

    <p>Relevant skills most often include <strong>Computers</strong> for network and system work, <strong>Subterfuge</strong> for physical bypass and social engineering, <strong>Mechanics</strong> for hardware interfaces, and <strong>Insight</strong> for reading network traffic and pattern recognition.</p>

    <SectionDivider label="Nodes & Connections" />

    <p>Every hackable network is a map of <strong>nodes</strong> connected by <strong>links</strong>. A node represents a single device or cluster of related devices: a camera bank, a locked door, a drone relay, a server, a security panel. Each node is a place in cyberspace where a hacker can act.</p>

    <p>Links connect nodes to one another. Some links are open; others are protected by <strong>barriers</strong> that must be bypassed before a hacker can cross them. A hacker's avatar begins at the node corresponding to the device they physically connected to, and must traverse links to reach other nodes.</p>

    <h2>Avatars</h2>
    <p>A hacker's <strong>avatar</strong> is their digital presence on a network: a virtual proxy that occupies a single node at a time. Everything a hacker does on a network originates from the avatar's location. EW actions target systems relative to the avatar's node, sentries and operators engage the avatar directly, and traversing links moves the avatar from one node to the next.</p>

    <p>An avatar is visible to other entities on the same node by default. Operators can detect avatars through scanning, and sentries engage any unauthorized avatar they encounter. Some techniques can conceal an avatar or reveal a hidden one.</p>

    <h2>Designing a Network</h2>
    <p>When preparing a network for play, the GM should decide:</p>
    <ul>
      <li><strong>Nodes:</strong> What devices exist on this network? Give each node a brief label (Security Cameras, Server Room, Drone Bay, Main Door).</li>
      <li><strong>Links:</strong> Which nodes connect to which? Draw lines between them.</li>
      <li><strong>Barriers:</strong> Are any links locked? A barrier requires a check to bypass.</li>
      <li><strong>Security Rating:</strong> The network's overall defensive strength.</li>
      <li><strong>Sentries:</strong> Does the network have autonomous defense programs or a human operator?</li>
    </ul>

    <SectionDivider label="Security Rating" />

    <p>Every network has a <strong>Security Rating</strong> from 1 to 6:</p>

    <table>
      <thead>
        <tr><th>Rating</th><th>Examples</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>1</strong></td><td>Consumer home network, unencrypted personal devices</td></tr>
        <tr><td><strong>2</strong></td><td>Small business, street gang hideout, civilian drones</td></tr>
        <tr><td><strong>3</strong></td><td>Corporate branch office, police precinct, military surplus</td></tr>
        <tr><td><strong>4</strong></td><td>Corporate high-security network, government facility</td></tr>
        <tr><td><strong>5</strong></td><td>Military installation, IOP black site, Sangvis Ferri relay</td></tr>
        <tr><td><strong>6</strong></td><td>KCCO command net, Paradeus node, Agency zero-day vault</td></tr>
      </tbody>
    </table>

    <FormulaDisplay text="TN = Security Rating" />

    <p>The GM may adjust by +1 or -1 for specific circumstances (especially hardened node, outdated firmware, insider credentials), but the Security Rating is the baseline.</p>

    <h2>Network Disposition</h2>
    <p>Every network has a <strong>disposition</strong> toward each operator on it: either <strong>Hostile</strong> or <strong>Friendly</strong>.</p>

    <p>A network is <strong>Hostile</strong> by default for anyone who has not been granted access. Acting on a Hostile network accumulates Heat, requires footholds, and uses the network's Security Rating as TN.</p>

    <p>A network is <strong>Friendly</strong> toward you if you have legitimate credentials or authorization to be there. This includes your own team's network, networks where you have been provisioned access for a mission, and nodes temporarily granted Friendly status by techniques such as Privilege Escalation. While on a Friendly network:</p>

    <ul>
      <li>You do not accumulate Heat for actions taken there.</li>
      <li>You may traverse links freely without a Crack check.</li>
      <li>The network's Security Rating does not apply. Instead, TN for any check is the <strong>EW Rating</strong> of the specific sentry, operator, or device you are acting against.</li>
      <li>Passive devices with no listed EW Rating (doors, cameras, control panels) use a default <strong>EW Rating of 2</strong>.</li>
      <li>Techniques that require a Friendly network (such as Spider techniques) are available.</li>
    </ul>

    <RulesCallout>
      <h3>Operators on Their Home Network</h3>
      <p>A network operator defending their own system is always Friendly on that network. They do not need to Crack systems, can traverse links freely, and do not accumulate Heat.</p>
    </RulesCallout>

    <SectionDivider label="EW Rating" />

    <p>Characters who engage in electronic warfare have an <strong>EW Rating</strong> representing their hardware, software, and exploits:</p>

    <table>
      <thead>
        <tr><th>Equipment</th><th>EW Rating</th></tr>
      </thead>
      <tbody>
        <tr><td>Civilian tablet, improvised rig</td><td>1</td></tr>
        <tr><td>Standard cyberdeck, field terminal</td><td>2</td></tr>
        <tr><td>Military-grade deck, custom-built rig</td><td>3</td></tr>
        <tr><td>Cutting-edge prototype, Zener network suite</td><td>4</td></tr>
      </tbody>
    </table>

    <p><strong>Modifiers:</strong> Stolen credentials, inside information, or mission-specific preparation can grant +1 for a specific network. Damaged or outdated equipment may impose -1.</p>

    <RulesCallout>
      <h3>T-Dolls as Hackers</h3>
      <p>T-Dolls are electronic devices <em>and</em> potential hackers. A T-Doll has both a Security Rating (for resisting intrusion) and an EW Rating (for performing electronic warfare). They can interface with networks directly through physical connection or short-range wireless link, and do not require a separate cyberdeck.</p>
    </RulesCallout>

    <SectionDivider label="The Intrusion Scene" />

    <p>An intrusion into a hostile network is a conflict scene using the standard phase structure:</p>

    <h3>Phase 1: Initiative</h3>
    <p>Each participant makes a <strong>TN 1 Computers check</strong>. Base initiative is their <strong>Focus</strong> (if prepared) or <strong>Vigilance</strong> (if caught off-guard). On success, add 1 plus bonus successes. The GM also rolls initiative for sentries and operators.</p>

    <h3>Phase 2: Take Turns</h3>
    <p>Characters act in initiative order, highest to lowest. Each turn follows:</p>
    <ol>
      <li><strong>Beginning of Turn:</strong> Resolve beginning-of-turn effects.</li>
      <li><strong>Set Stance:</strong> Choose your Approach for this turn.</li>
      <li><strong>Perform Action:</strong> Take one action from the EW Actions list or use a Technique. You may also <strong>traverse one link</strong> before or after your action (equivalent to moving one range band). Traversing a barrier requires an action instead.</li>
      <li><strong>End of Turn:</strong> Resolve end-of-turn effects. Then gain Heat.</li>
    </ol>

    <h3>Phase 3: Resolution</h3>
    <p>The intrusion ends when the hacker achieves their objective, is forced to disconnect, or chooses to withdraw.</p>

    <SectionDivider label="Heat" />

    <p><strong>Heat</strong> is a per-character resource that tracks how much noise you're making on a hostile network. It begins at 0 and rises as you act.</p>

    <h3>Gaining Heat</h3>
    <ul>
      <li>At the <strong>end of your turn</strong>, if you performed an action against a hostile system, gain 1 Heat.</li>
      <li>If you <strong>failed</strong> a check against a hostile system, gain 1 <em>additional</em> Heat (stacks).</li>
      <li>Some <strong>Techniques</strong> include a heat cost.</li>
    </ul>

    <h3>Heat Thresholds</h3>

    <table>
      <thead>
        <tr><th>Heat</th><th>State</th><th>Effect</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>0-3</strong></td><td>Unseen</td><td>The network has not noticed you. No additional effects.</td></tr>
        <tr><td><strong>4-6</strong></td><td>Noticed</td><td>The system flags anomalous activity. GM may have sentries begin patrolling or operators log in. No mechanical penalty yet.</td></tr>
        <tr><td><strong>7-9</strong></td><td>Hunted</td><td>The network actively interferes: <strong>increase TN of your checks by 1</strong> while at this threshold or above.</td></tr>
        <tr><td><strong>10+</strong></td><td>Burned</td><td>Forcibly disconnected, physical location traced, on-site security alerted. <strong>Your intrusion is over.</strong></td></tr>
      </tbody>
    </table>

    <h3>Managing Heat</h3>
    <ul>
      <li><strong>Running Silent:</strong> At the start of your turn, declare you are running silent. While running silent, you do not gain Heat at end of turn for performing actions (you still gain Heat from failed checks). However, increase TN of all your checks by 1. You may stop running silent at any time before making a check.</li>
      <li><strong><DiceSymbol name="Opportunity" size="small" />:</strong> When you generate Opportunity on a check against a hostile system, spend Opportunity to reduce Heat gained from that check by 1 per Opportunity spent (can reduce to 0).</li>
      <li><strong>Pause:</strong> The Pause action reduces Heat directly (see EW Actions below).</li>
    </ul>

    <SectionDivider label="EW Actions" />

    <p>The following actions are available to <strong>all characters</strong> in an EW scene: no special training required. More specialized capabilities require <strong><router-link to="/techniques/electronic-warfare">Techniques</router-link></strong>.</p>

    <h3>Crack</h3>
    <p><strong>Activation:</strong> <em>Scheme action</em> &mdash; <strong>Computers check</strong> at network TN, targeting one system reachable from your current node.</p>
    <p><strong>Effect:</strong> Gain a <strong>foothold</strong> on the target system. While you hold this foothold, you may perform actions against this system without needing to Crack again. Lasts until disconnect or forced removal.</p>
    <ul>
      <li><strong><DiceSymbol name="Opportunity" size="small" />:</strong> Leave no entry logs; reduce Heat by 1.</li>
      <li><strong><DiceSymbol name="Opportunity" size="small" /><DiceSymbol name="Opportunity" size="small" />:</strong> Discover a <strong>backdoor</strong>: a hidden link bypassing one barrier to an adjacent node (if it exists).</li>
    </ul>

    <h3>Bypass</h3>
    <p><strong>Activation:</strong> <em>Scheme action</em> &mdash; <strong>Computers check</strong> at network TN to unlock a barrier on an adjacent link.</p>
    <p><strong>Effect:</strong> The barrier is removed for the rest of the scene. You may immediately traverse the link as part of this action.</p>
    <ul>
      <li><strong><DiceSymbol name="Opportunity" size="small" />:</strong> No Heat gained from this check.</li>
      <li><strong><DiceSymbol name="Opportunity" size="small" /><DiceSymbol name="Opportunity" size="small" />:</strong> Relock the barrier behind you, sealing it against pursuit.</li>
    </ul>

    <h3>Disrupt</h3>
    <p><strong>Activation:</strong> <em>Attack action</em> &mdash; <strong>Computers check</strong> at network TN, targeting one device, sentry, or character on your current or adjacent node (where you hold foothold).</p>
    <p><strong>Effect:</strong> Target suffers <strong>Dazed</strong>. If the target is a device, it is disabled for 1 + bonus successes rounds.</p>
    <ul>
      <li><strong><DiceSymbol name="Opportunity" size="small" />:</strong> Disruption cascades to one other device on the same node (narrative opening, no mechanical effect).</li>
      <li><strong><DiceSymbol name="Opportunity" size="small" /><DiceSymbol name="Opportunity" size="small" />:</strong> Inflict <strong>Immobilized</strong> instead of/in addition to Dazed. Affected sentries cannot traverse links.</li>
    </ul>

    <h3>Scan</h3>
    <p><strong>Activation:</strong> <em>Support action</em> &mdash; <strong>Computers check</strong> at network TN.</p>
    <p><strong>Effect:</strong> GM reveals the layout of all nodes and links within two links, including the presence (but not type) of barriers, sentries, or operators.</p>
    <ul>
      <li><strong><DiceSymbol name="Opportunity" size="small" />:</strong> Identify the specific type and capabilities of one sentry or device within scan range.</li>
      <li><strong><DiceSymbol name="Opportunity" size="small" /><DiceSymbol name="Opportunity" size="small" />:</strong> Discover a vulnerability; your next check against that system has TN reduced by 1.</li>
    </ul>

    <h3>Pause</h3>
    <p><strong>Activation:</strong> <em>Support action</em> &mdash; No check required.</p>
    <p><strong>Effect:</strong> Reduce your Heat by 1 and remove 1 Strife.</p>

    <h3>Defend</h3>
    <p><strong>Activation:</strong> <em>Support action</em> &mdash; <strong>Computers check</strong> at network TN, targeting yourself, one ally, or one device on your current node.</p>
    <p><strong>Effect:</strong> Until your next turn, increase TN of hostile EW checks targeting the defended system by 1, plus 1 per two bonus successes. Functions like the Guard action in a skirmish.</p>

    <SectionDivider label="Sentries & Operators" />

    <h2>Sentries</h2>
    <p>Autonomous defense programs that patrol or guard nodes. They follow programming with rigid precision.</p>

    <table>
      <thead>
        <tr><th>Sentry</th><th>Integrity</th><th>Attack</th><th>EW Rating</th><th>Security</th><th>Typical Behavior</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Watchdog</strong></td><td>4</td><td>3</td><td>2</td><td>2</td><td>Alert, then attack intruders</td></tr>
        <tr><td><strong>Cerberus</strong></td><td>8</td><td>4</td><td>3</td><td>3</td><td>Alert, attack, pursue intruders</td></tr>
        <tr><td><strong>Manticore</strong></td><td>12</td><td>5</td><td>4</td><td>4</td><td>Alert, attack, lock barriers, pursue</td></tr>
        <tr><td><strong>Hydra</strong></td><td>18</td><td>6</td><td>5</td><td>5</td><td>Alert, attack all in node, pursue, reboot devices</td></tr>
      </tbody>
    </table>

    <p>Sentries use simplified initiative equal to their Security Rating. When a sentry attacks, it deals damage equal to half its Attack Rating (rounded up) plus bonus successes. On a Friendly network, a sentry's <strong>EW Rating</strong> is the TN for all checks made against it.</p>

    <h2>Operators</h2>
    <p>An <strong>operator</strong> is a human (or T-Doll) hacker defending the network. Operators use full character rules with Approaches, skills, stances, and techniques. They do not need to Crack systems on their own network, can traverse links freely (ignoring barriers), and do not accumulate Heat on their home network.</p>

    <SectionDivider label="T-Dolls & EW" />

    <h2>Targeting a T-Doll</h2>
    <p>A T-Doll can be targeted by EW actions just like any networked device. The attacker must either be on the same network or within range 0-2 with a wireless-capable deck. The TN for hostile actions is the T-Doll's own Security Rating.</p>

    <h2>Level II</h2>
    <p>T-Dolls can project their neural cloud directly into a network, entering an immersive virtual layer called <strong>Level II</strong>. This commits their full processing power, gaining enormous capability at the cost of physical vulnerability.</p>

    <RulesCallout>
      <h3>While in Level II</h3>
      <ul>
        <li>Increase your <strong>EW Rating by 2</strong>.</li>
        <li>Reduce your <strong>Security Rating by 1</strong> (minimum 0).</li>
        <li>Your physical body is unresponsive and treated as <strong>Immobilized</strong>.</li>
      </ul>
    </RulesCallout>

    <p>Leaving Level II safely requires spending your action on your turn. If your connection is severed unsafely (Burned Heat, forced disconnect, physical line cut), your neural cloud becomes <strong>trapped</strong>:</p>

    <RulesCallout>
      <h3>While Trapped</h3>
      <ul>
        <li>Your physical body is treated as <strong>Incapacitated</strong>.</li>
        <li>You cannot act in physical scenes until your connection is restored.</li>
        <li>Your neural cloud exists as a vulnerable target on the network.</li>
        <li>Rescue requires another hacker to reach your node and succeed on a <strong>TN 4 Computers check</strong>.</li>
      </ul>
    </RulesCallout>

    <SectionDivider label="Hacker Duels" />

    <p>When two hackers meet with hostile intent, the encounter becomes a <strong>Hacker Duel</strong> (following standard duel rules with modifications):</p>

    <ul>
      <li><strong>Initiative:</strong> A <strong>TN 1 Computers check</strong> (rather than Resolve).</li>
      <li><strong>Staredown:</strong> At the start of each round, both participants gain <strong>Heat equal to the current round number</strong>. Then participants who are not Compromised may bid Strife to increase initiative.</li>
      <li><strong>Range:</strong> Both hackers are at range for all effects. Physical positioning is irrelevant.</li>
      <li><strong>Ending:</strong> Ends when one participant disconnects for any reason: Burned Heat, voluntary disconnect, Incapacitated, or physical connection severed.</li>
    </ul>

    <SectionDivider label="Connecting to a Network" />

    <table>
      <thead>
        <tr><th>Connection Type</th><th>Details</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Physical</strong></td><td>Hardline cable from cyberdeck (or T-Doll frame port) to a network device. Full capability, no penalties.</td></tr>
        <tr><td><strong>Wireless</strong></td><td>Connect to a device within range 2 with line of sight. <strong>TN +1</strong> on all EW checks. Avatar cannot move beyond the connected node.</td></tr>
      </tbody>
    </table>

    <p>Connections persist until you voluntarily disconnect, your cable is physically removed, you move out of wireless range, or you are forcibly disconnected.</p>

    <SectionDivider label="EW & Physical Scenes" />

    <ul>
      <li><strong>Splitting Actions:</strong> A jacked-in character can act in <em>either</em> the physical or virtual realm on their turn, but not both. Movement can be spent in whichever realm they act in.</li>
      <li><strong>Awareness:</strong> A connected character remains aware of physical surroundings unless in Level II. They can speak, observe, and react, but physical action requires dedicating their turn.</li>
      <li><strong>Embedding EW in Other Scenes:</strong> An intrusion can run concurrently with a skirmish, chase, or intrigue. Use the same initiative order; each character declares which realm they're acting in.</li>
    </ul>

    <SectionDivider label="Stances in EW" />

    <p>All five stances function normally during EW. Their effects apply to cyberspace checks just as in physical conflict:</p>

    <table>
      <thead>
        <tr><th>Stance</th><th>Style</th><th>Effect</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Resilience</strong></td><td>Methodical, defensive</td><td>Others cannot spend OP on Attack/Scheme checks targeting you to inflict critical strikes or conditions.</td></tr>
        <tr><td><strong>Swiftness</strong></td><td>Adaptive, efficient</td><td>Perform one additional action (no check, different type from main action).</td></tr>
        <tr><td><strong>Power</strong></td><td>Aggressive, overwhelming</td><td>Bonus successes from strife on kept dice.</td></tr>
        <tr><td><strong>Precision</strong></td><td>Measured, exact</td><td>Increase TN of Attack/Scheme checks targeting you by 1.</td></tr>
        <tr><td><strong>Fortune</strong></td><td>Instinctive, intuitive</td><td>Do not receive strife from kept dice.</td></tr>
      </tbody>
    </table>

    <SectionDivider label="Opportunity in EW" />

    <table>
      <thead>
        <tr><th>Approach</th><th>OP Use</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Precision</strong></td><td>Learn another hacker's Heat level, or identify a sentry's next approach.</td></tr>
        <tr><td><strong>Resilience</strong></td><td>Recall a detail about the network type: a common vulnerability, standard layout, or known flaw.</td></tr>
        <tr><td><strong>Power</strong></td><td>Your action is conspicuously effective: allies who see the result remove 2 Strife.</td></tr>
        <tr><td><strong>Swiftness</strong></td><td>Spot an alternate route: a hidden link, unlocked service port, or diagnostic channel.</td></tr>
        <tr><td><strong>Fortune</strong></td><td>Sense something wrong: a trap, hidden sentry, or data anomaly suggesting outside compromise.</td></tr>
      </tbody>
    </table>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import FormulaDisplay from '@/components/data/FormulaDisplay.vue'
import DiceSymbol from '@/components/data/DiceSymbol.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Electronic Warfare' }
]

const prev = { to: '/driving-and-vehicles', label: 'Driving & Vehicles' }
const next = { to: '/collapse-radiation', label: 'Collapse & Radiation' }
</script>