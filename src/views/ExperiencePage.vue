<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Experience Points</h1>

    <h2>Overview</h2>
    <p>Each session awards:</p>
    <ul>
      <li><strong>Party XP</strong> for shared progress and overall engagement.</li>
      <li><strong>Accolade XP</strong> for standout individual contributions.</li>
    </ul>
    <p>A typical session yields <strong>4 to 6 XP</strong>.</p>

    <SectionDivider label="Party XP" />
    <p>Awarded equally to all players at the end of the session.</p>

    <RulesCallout>
      <h3>Progress (2 XP)</h3>
      <p>Granted when the group meaningfully advances its goals for that session. Goals may be dramatic, investigative, social, or recreational. A lighthearted interlude still counts when it reflects what the players set out to do.</p>
    </RulesCallout>

    <RulesCallout>
      <h3>Engagement (1-2 XP)</h3>
      <p>Granted when the table stays attentive and involved. Low energy, quiet roleplay, or slower pacing are acceptable. Reserving XP is appropriate only when players are checked out or intentionally disruptive. Use judgment; distinguish fatigue from disinterest.</p>
    </RulesCallout>

    <SectionDivider label="Individual Accolades" />
    <p>Each player votes for someone who strengthened the session through roleplay, decision-making, problem-solving, or character development. The player with the most votes gains <strong>1 XP</strong>. If multiple players tie, each gains <strong>1 XP</strong>.</p>
    <p>Total Accolade XP across the table is capped at <strong>2 XP</strong>.</p>

    <SectionDivider label="Catch-Up Adjustment" />
    <p>At the end of each session, any character more than <strong>10 percent below the party's average XP</strong> gains <strong>1 bonus XP</strong>. This continues until the gap closes.</p>

    <SectionDivider label="Impact" />
    <p>A character creates impact when their actions shift circumstances, reveal information, guide decisions, or contribute meaningfully to the atmosphere or narrative. Spotlight size does not determine impact; relevance does.</p>

    <SectionDivider label="Spending XP" />

    <h2>Approaches</h2>
    <p>Increasing an approach costs <strong>three times the new rank</strong> in XP. A character cannot raise an approach above the Approach Limit.</p>

    <table>
      <thead>
        <tr><th>New Rank</th><th>XP Cost</th></tr>
      </thead>
      <tbody>
        <tr><td>2</td><td>6</td></tr>
        <tr><td>3</td><td>9</td></tr>
        <tr><td>4</td><td>12</td></tr>
        <tr><td>5</td><td>15</td></tr>
        <tr><td>6</td><td>18</td></tr>
      </tbody>
    </table>

    <h2>Skills</h2>
    <p>Increasing a skill counts toward the progression of any discipline that lists that skill as an associated skill. Increasing a skill costs <strong>twice the new rank</strong> in XP.</p>

    <table>
      <thead>
        <tr><th>New Rank</th><th>XP Cost</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>2</td></tr>
        <tr><td>2</td><td>4</td></tr>
        <tr><td>3</td><td>6</td></tr>
        <tr><td>4</td><td>8</td></tr>
        <tr><td>5</td><td>10</td></tr>
        <tr><td>6</td><td>12</td></tr>
      </tbody>
    </table>

    <h2>Techniques</h2>
    <p>Learning a technique costs <strong>3 XP</strong>. A character must meet the technique's rank requirement within the relevant discipline before purchasing it. XP spent on techniques counts toward the progression of the discipline that offers the technique.</p>

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
  { label: 'Experience' }
]

const prev = { to: '/disciplines', label: 'Disciplines' }
const next = { to: '/humanity-and-fame', label: 'Humanity & Fame' }
</script>