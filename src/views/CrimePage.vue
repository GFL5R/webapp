<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>Crime</h1>

    <p>Criminal activity in 2072 leaves marks. URNC surveillance, corporate logging systems, and private security networks make it difficult to act without generating a record; every intrusion, transaction, and violent act creates data, and data creates evidence.</p>

    <SectionDivider label="EVIDENCE" />

    <h2>Evidence</h2>

    <p>Evidence is the material record of a crime: physical traces, digital logs, documents, and testimony. The GM maintains the evidence picture for any active investigation; players track it when building a case.</p>

    <h3>Types of Evidence</h3>

    <ul>
      <li><strong>Physical Evidence</strong> — Objects, biometrics, and environmental traces. Spent casings, blood, forced locks, displaced furniture, neural activity logs.</li>
      <li><strong>Digital Evidence</strong> — Surveillance footage, network access logs, financial records, communications intercepts. The most abundant category in 2072; also the most easily falsified or erased.</li>
      <li><strong>Testimonial Evidence</strong> — Witness accounts, informant reports, coerced or voluntary statements.</li>
      <li><strong>Documentary Evidence</strong> — Identity records, permits, manifests, paperwork authentic or forged.</li>
    </ul>

    <h3>Supporting &amp; Contrary Evidence</h3>

    <p>Each piece of evidence is either <strong>Supporting</strong> (points toward the accused) or <strong>Contrary</strong> (points away). The two types cancel each other out. The <strong>net count</strong> (Supporting minus Contrary) modifies the TN of accusation checks.</p>

    <ExampleBox>
      <p>An investigator has three supporting pieces (surveillance log, recovered weapon, matched biometric) and one contrary piece (timestamped entry record placing the suspect elsewhere). Net is +2 Supporting, so the accusation check TN is reduced by 2.</p>
    </ExampleBox>

    <p>Evidence can be forged, destroyed, or planted. A forged contrary piece counts the same as a genuine one; investigators who later identify the forgery remove it from the picture.</p>

    <SectionDivider label="INVESTIGATION" />

    <h2>Investigation Checks</h2>

    <h3>Gathering Evidence</h3>

    <p>Each success on an investigation check produces one piece of evidence. The GM determines whether it is Supporting or Contrary based on what it actually shows.</p>

    <table>
      <thead>
        <tr><th>Activity</th><th>Skill</th></tr>
      </thead>
      <tbody>
        <tr><td>Examine a physical scene or object</td><td>Science or Insight</td></tr>
        <tr><td>Access surveillance footage or network logs</td><td>Computers</td></tr>
        <tr><td>Interrogate a witness or suspect</td><td>Insight or Deception</td></tr>
        <tr><td>Recover deleted or corrupted digital records</td><td>Computers</td></tr>
        <tr><td>Identify forged documents or planted evidence</td><td>Science or Insight</td></tr>
      </tbody>
    </table>

    <p>Opportunities on investigation checks can surface additional details: exact timestamps, financial connections, or specific tools used to alter a document.</p>

    <h3>Covering Tracks</h3>

    <p>Characters hiding their involvement make checks to raise the TN of follow-up investigation against that source. The cover check is made at the time of the act.</p>

    <table>
      <thead>
        <tr><th>Activity</th><th>Skill</th></tr>
      </thead>
      <tbody>
        <tr><td>Remove physical traces from a scene</td><td>Stealth or Subterfuge</td></tr>
        <tr><td>Sanitize a location or object</td><td>Subterfuge or Science</td></tr>
        <tr><td>Delete or corrupt digital records</td><td>Computers</td></tr>
        <tr><td>Forge supporting documentation or evidence</td><td>Deception or Subterfuge</td></tr>
        <tr><td>Provide a false account under questioning</td><td>Deception</td></tr>
      </tbody>
    </table>

    <p>A successful cover check raises investigation TN by 1. Success with 2+ bonus successes raises it by 2 instead. Failure means the source can be investigated at standard TN.</p>

    <SectionDivider label="ACCUSATION" />

    <h2>Accusation Checks</h2>

    <p>When someone formally or effectively accuses a character of a crime, they make an <strong>Accusation Check</strong>.</p>

    <RulesCallout>
      <ul>
        <li><strong>Base TN:</strong> 4</li>
        <li><strong>Supporting Evidence:</strong> Reduce TN by 1 per net piece</li>
        <li><strong>Contrary Evidence:</strong> Increase TN by 1 per net piece</li>
      </ul>
    </RulesCallout>

    <p>The check uses:</p>
    <ul>
      <li><strong>Negotiation</strong> if presenting a truthful case.</li>
      <li><strong>Deception</strong> if lying, framing, or misrepresenting evidence.</li>
    </ul>

    <p>The accused may contest as direct opposition using Negotiation (truthful defense) or Deception (false cover). Handle as a brief Intrigue for extended confrontation, or a single opposed check for quick resolution.</p>

    <ExampleBox>
      <p>A corporate investigator has 4 Supporting pieces and 1 Contrary piece. Net is +3 Supporting, so TN drops to 1. Even a weak roll likely succeeds. The Commander's player contests with Deception, hoping to invalidate one piece through cross-examination.</p>
    </ExampleBox>

    <SectionDivider label="INVESTIGATIONS AGAINST THE PARTY" />

    <h2>Investigations Against the Party</h2>

    <p>When NPCs investigate the party, the GM runs it as a background process. At intervals (typically after significant acts or during Downtime scenes), the GM makes investigation checks against the relevant cover TNs.</p>

    <p>The party is generally unaware of the case building against them unless they take steps to find out, or until consequences become visible: a tail, frozen accounts, an unexpected summons.</p>

    <h3>Investigating NPCs</h3>

    <p>The same system applies when the party builds a case against a target. The GM determines what evidence exists before play; what the party finds depends on where they look and how checks resolve.</p>

    <SectionDivider label="STOLEN PROPERTY" />

    <h2>Stolen Property</h2>

    <p>Any item acquired through theft carries the <strong>Stolen</strong> quality. Its serial number, ownership record, or network ID still points to the original owner, or it appears in law enforcement and corporate databases as missing property. Carrying it creates exposure.</p>

    <h3>The Stolen Quality</h3>

    <p>Stolen is an item quality with no mechanical effect in combat and one liability outside it: any investigation check that physically examines the item automatically produces one piece of Supporting evidence without requiring a success. The registration speaks for itself.</p>

    <h3>Fencing</h3>

    <p>To clear the Stolen quality, a character must locate a <strong>fence</strong> (an underworld contact who re-registers, re-serializes, or scrubs an item from tracking databases) and make a deal. This is a Downtime activity.</p>

    <RulesCallout>
      <ul>
        <li><strong>Locate a Fence:</strong> Make a <strong>TN 3 Culture check</strong>. In a Green Zone, fences are common knowledge. In a White Zone, TN rises to 5. On failure, no contact is available in this location; try elsewhere or wait for the next Downtime.</li>
        <li><strong>Cost:</strong> 25% of the item's listed value. Once paid, the Stolen quality is removed.</li>
      </ul>
    </RulesCallout>

    <SectionDivider label="TECHNIQUES" />

    <h2>Techniques &amp; Crime</h2>

    <table>
      <thead>
        <tr><th>Technique</th><th>Source</th><th>Effect</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Scrub</strong></td>
          <td>Street, Rank 1</td>
          <td>Destroys or conceals incriminating material. Removes one piece of Supporting evidence per Opportunity spent.</td>
        </tr>
        <tr>
          <td><strong>Alibi</strong></td>
          <td>Street, Rank 2</td>
          <td>Forges contradictory material. Creates one piece of Contrary evidence per Opportunity spent.</td>
        </tr>
        <tr>
          <td><strong>Falsify Data</strong></td>
          <td>Electronic Warfare, Rank 2</td>
          <td>Replaces a digital file with a forgery. Supporting evidence becomes Contrary (or is removed entirely).</td>
        </tr>
        <tr>
          <td><strong>Cleanup Detail</strong></td>
          <td>Electronic Warfare, Rank 2</td>
          <td>Removes all traces of operator activity from a network node, preventing that activity from yielding Supporting evidence.</td>
        </tr>
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
import ExampleBox from '@/components/callouts/ExampleBox.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Crime' }
]

const prev = { to: '/conditions', label: 'Conditions' }
const next = { to: '/disciplines', label: 'Disciplines' }
</script>
