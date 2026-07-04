<template>
  <div class="builder-section">
    <div class="builder-section-title">Skills</div>

    <template v-for="group in skillGroups" :key="group.id">
      <!-- Only show group header if there are skills with non-zero values -->
      <template v-if="hasGroupSkills(group)">
        <div class="builder-skill-group">{{ group.label }}</div>
        <div
          v-for="skillId in group.skills"
          :key="skillId"
        >
          <div
            v-if="totalRank(skillId) > 0"
            class="builder-skill-row"
          >
            <span class="builder-skill-name">{{ formatSkill(skillId) }}</span>
            <span class="builder-skill-rank">
              <template v-if="character.system.skills_free[skillId] > 0">
                <span class="free">+{{ character.system.skills_free[skillId] }}</span>
              </template>
              <template v-if="character.system.skills[skillId] > 0">
                <span class="base" v-if="character.system.skills_free[skillId] > 0">/</span>
                <span class="base">{{ character.system.skills[skillId] }}</span>
              </template>
            </span>
          </div>
        </div>
      </template>
    </template>

    <div v-if="!hasAnySkills" class="builder-empty-note">
      No skills yet. Select a discipline or change your background/frame.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'

const builder = useCharacterBuilder()
const { character, SKILL_IDS } = builder

const skillGroups = [
  {
    id: 'combat',
    label: 'Combat',
    skills: ['blades', 'exotic_weapons', 'explosives', 'firearms', 'hand_to_hand', 'tactics'],
  },
  {
    id: 'fieldcraft',
    label: 'Fieldcraft',
    skills: ['conditioning', 'resolve', 'crafting', 'insight', 'stealth', 'survival'],
  },
  {
    id: 'technical',
    label: 'Technical',
    skills: ['computers', 'mechanics', 'medicine', 'piloting', 'science', 'subterfuge'],
  },
  {
    id: 'social',
    label: 'Social',
    skills: ['arts', 'command', 'culture', 'deception', 'negotiation', 'performance'],
  },
]

function totalRank(skillId) {
  return (character.system.skills[skillId] || 0) + (character.system.skills_free[skillId] || 0)
}

function hasGroupSkills(group) {
  return group.skills.some(s => totalRank(s) > 0)
}

const hasAnySkills = computed(() =>
  skillGroups.some(g => hasGroupSkills(g))
)

function formatSkill(id) {
  return id
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}
</script>

<style scoped>
.builder-empty-note {
  font-size: 0.68rem;
  font-style: italic;
  color: var(--ink-faint);
  text-align: center;
  padding: 8px 0;
}
</style>
