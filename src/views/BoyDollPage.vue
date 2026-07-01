<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>A Boy &amp; His Doll</h1>

    <p>Character creation in GFL5R builds <strong>two characters at once</strong>: your human and your T-Doll. These characters form a pair, partners navigating the complexities of 2072's recovering world together. They might be commander and subordinate, handler and agent, friends, or something more complicated. That relationship is yours to define.</p>

    <ul>
      <li><strong>Total Questions:</strong> 24</li>
      <li><strong>Human Questions:</strong> 12</li>
      <li><strong>T-Doll Questions:</strong> 12</li>
    </ul>

    <p>Each question guides you through building your character's capabilities, background, personality, and place in the world. By the end, you'll have two fully-functioning characters ready to play.</p>

    <SectionDivider label="THE PAIR DYNAMIC" />

    <h2>The Pair Dynamic</h2>

    <table>
      <thead>
        <tr>
          <th>Human</th>
          <th>&amp;</th>
          <th>T-Doll</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Social capability:</strong> connections, influence, understanding of human society, and navigation of the URNC's bureaucratic world.</td>
          <td></td>
          <td><strong>Combat capability:</strong> tactical skills, weapon proficiency, and effectiveness in dangerous situations.</td>
        </tr>
      </tbody>
    </table>

    <p>These are tendencies, not rules. You can build your pair however you like. What matters is that they complement each other. Where one is weak, the other is strong. Where one hesitates, the other acts. Together, they're greater than the sum of their parts.</p>

    <SectionDivider label="TWO PERSPECTIVES" />

    <h2>Two Perspectives, One Story</h2>

    <p>Playing a pair lets you engage with the setting from multiple angles:</p>

    <ul>
      <li><strong>Your human</strong> experiences the world as a survivor in an authoritarian system, weighing safety against freedom, navigating corporate and government power.</li>
      <li><strong>Your T-Doll</strong> experiences the world as artificial life claiming personhood, pushing back against being treated as property, finding meaning beyond their programmed purpose.</li>
    </ul>

    <p>Both characters have full agency. Both matter equally to the story. Both grow and change through play.</p>

    <SectionDivider label="READY TO BEGIN" />

    <h2>Ready to Begin?</h2>

    <p>The following sections will walk you through the 24 questions that create your pair. Answer them thoughtfully. Consider how your characters know each other, why they work together, and what they mean to one another.</p>

    <ContentNavLink to="/building-a-commander" label="Start with your human" />

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import ContentNavLink from '@/components/layout/ContentNavLink.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'A Boy & His Doll' }
]

const prev = { to: '/electronic-warfare', label: 'Electronic Warfare' }
const next = { to: '/building-a-commander', label: 'Building a Commander' }
</script>
