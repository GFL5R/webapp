<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>Going Solo</h1>
    <p class="kicker">Optional Variant Rules</p>

    <RulesCallout>
      <p><strong>These are variant rules for those adamant about not playing two characters at once.</strong></p>
      <p>Included are targeted buffs to a single character meant to shore up the weaknesses of a single character, but make no mistake: it is no replacement for two characters worth of action economy, health pools, and XP income. <strong>This is hard mode, and you have been warned.</strong></p>
    </RulesCallout>

    <p>Not everyone can manage the task of keeping track of two separate characters at the same time, and not every table wants to have eight to twelve characters in the party for a campaign. For these scenarios, the going-solo rules exist.</p>

        <SectionDivider label="LONE HUMANS" />

    <h2>Going Solo as a Human</h2>

    <p>Some commanders can't afford a doll. Some don't trust them. Some run with all-human crews where the question never came up. Whatever the reason, you operate without a partner, and you have survived long enough to close the gaps that would otherwise get you killed.</p>

    <p>Create your Human normally using the 12 questions in <router-link to="/building-a-commander">Building a Commander</router-link>. Then answer these additional questions.</p>

    <h3>Additional Questions (Humans)</h3>

    <QuestionBlock :number="13" id="h-q13">
      <h2>What skills have you learned that other commanders leave to their dolls?</h2>

      <p>A doll fills a role: pointman, technician, medic, heavy weapons. In a paired squad, the commander delegates and the doll executes. Without one, that role sits empty until you fill it yourself. You taught yourself field medicine after a job went bad and there was no doll to staunch the bleeding. A veteran took you aside and walked you through drone operation, one agonizing lesson at a time. You got better at things your original training never covered, because no one else was going to do it for you.</p>

      <RulesCallout>
        <p>Select a second <strong><router-link to="/disciplines">Discipline</router-link></strong>. You gain <strong>+1 to each of its associated skills</strong>, the <strong>Discipline Perk</strong>, and <strong>one rank 1 technique</strong> of your choice from it. This discipline grants no additional XP or weapons.</p>
        <p><strong>Describe the gap you stepped into and the hard lessons that came with it.</strong></p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="14" id="h-q14">
      <h2>What do people notice about you first?</h2>

      <p>Everyone who lasts in this line of work has something that sets them apart. A voice that settles a room before you have said anything worth hearing. Eyes that catch details other people miss until it is too late. A build that makes people reconsider starting a fight. A way of being in the right place at the right time so reliably that your squad stopped calling it luck years ago. This quality has defined you longer than any job title has, and it has opened doors that your credentials could not.</p>

      <RulesCallout>
        <p>Select one additional <strong><router-link to="/advantages">Advantage</router-link></strong> that suits your answer.</p>
        <p><strong>Describe the trait that defines you before you have to prove anything.</strong></p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="15" id="h-q15">
      <h2>What occupies your mind when the guns are silent?</h2>

      <p>A doll's mind is always working: threat assessment, tactical analysis, maintenance scheduling. Yours wanders. Maybe it wanders to a person. Maybe to a place you left behind. Maybe to the novel you have been writing in your head for three years. Something other than survival lives in the space between jobs, and it is what makes you more than just a gun for hire.</p>

      <RulesCallout>
        <p>Select one additional <strong><router-link to="/passions">Passion</router-link></strong> that suits your answer.</p>
        <p><strong>Describe how this pursuit anchors you.</strong></p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="16" id="h-q16">
      <h2>How did you afford all this?</h2>

      <p>Dolls are expensive. Purchase costs, maintenance fees, ammunition, repairs. It all adds up fast. By going without, you have freed up significant resources. A chunk of that money went into your kit. Some came from jobs that pay better when you do not split the take. And some of it was simply taken from people who bet wrong about someone without a doll at their side.</p>

      <RulesCallout>
        <p>Spend up to <strong>30,000 Credits</strong> on weapons, armor, items, or modules. This budget does not carry over, so use it or lose it.</p>
        <p><strong>Describe one piece of equipment with a story behind it.</strong></p>
      </RulesCallout>
    </QuestionBlock>

    <SectionDivider label="LONE DOLLS" />

    <h2>Going Solo as a Doll</h2>

    <p>You are a Rogue doll. You have no human handler for whatever reason, and as such you've had to adapt to a human dominated world far more than a typical doll would. The following questions will explore this additional experience and adaptation.</p>

    <p>Create your Doll normally using the 12 questions in <router-link to="/building-your-t-doll">Building Your T-Doll</router-link>. Then answer these additional questions.</p>

    <h3>Additional Questions (Dolls)</h3>

    <QuestionBlock :number="13" id="d-q13">
      <h2>How have you learned to operate outside your imprint?</h2>

      <p>Most rogue dolls never make it longer than a few weeks. You have, because you've found something better than a master: A teacher. It could be another rogue doll who's been at it longer than you. It could be a kind-hearted human who saw you as more than a machine. It could even be a malformed OGAS entitity in your head, guiding you from within using the memories of a fallen comrade. Whoever they are, they taught how to do more than just fight.</p>

      <RulesCallout>
        <p>Select a second <strong><router-link to="/disciplines">Discipline</router-link></strong>. You gain <strong>+1 to each of its associated skills</strong>, the <strong>Discipline Perk</strong>, and <strong>one rank 1 technique</strong> of your choice from it. This discipline grants no additional XP or weapons.</p>
        <p><strong>Describe the situation that forced you to grow beyond your original imprint.</strong></p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="14" id="d-q14">
      <h2>How have you adapted to independence?</h2>

      <p>Dolls are originally designed to work as part of a team, either as a squad of dolls or partnered with a human. This teamwork allowed you to cover your allies weaknesses, and they covered yours in turn. But without that support network, you've had to push beyond your limits and unlock new capabilities to cover your own weaknesses.</p>

      <RulesCallout>
        <p>Select one additional <strong><router-link to="/advantages">Advantage</router-link></strong> that suits your answer.</p>
        <p><strong>Describe the strength you've cultivated since going independent.</strong></p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="15" id="d-q15">
      <h2>How do you spend your free time?</h2>

      <p>It's pretty typical for dolls to form quirks given enough time since manufacture, but you've had enough time on your own to form proper hobbies and interests.</p>

      <RulesCallout>
        <p>Select one additional <strong><router-link to="/passions">Passion</router-link></strong> that suits your answer.</p>
        <p>T-Dolls without an Olfactory Unit may not select Passions related to food, drink, scent, or taste.</p>
        <p><strong>Describe how you picked up this hobby.</strong></p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="16" id="d-q16">
      <h2>What things do you own?</h2>

      <p>Freedom includes the ability to own things. You've formed a collection: Gear looted from enemies, items purchased with money from the odd-job, modules stripped from dolls who didn't make it. Whatever they are, they're yours now.</p>

      <RulesCallout>
        <p>Spend up to <strong>30,000 Credits</strong> on weapons, armor, items, or modules. This budget does not carry over, so use it or lose it.</p>
        <p><strong>Describe one piece of equipment that has sentimental value to you.</strong></p>
      </RulesCallout>
    </QuestionBlock>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import ContentNavLink from '@/components/layout/ContentNavLink.vue'
import PageNav from '@/components/layout/PageNav.vue'
import QuestionBlock from '@/components/callouts/QuestionBlock.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'

const route = useRoute()

function scrollToQuestion() {
  const hash = route.hash?.replace('#', '')
  if (hash) {
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}
onMounted(scrollToQuestion)
watch(() => route.hash, scrollToQuestion)

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Going Solo' }
]

const prev = { to: '/building-your-t-doll', label: 'Building Your T-Doll' }
const next = { to: '/disciplines', label: 'Disciplines' }
</script>
