<template>
  <div class="builder-section">
    <div class="builder-section-title">Skills</div>

    <div v-for="group in skillGroups" :key="group.label">
      <div class="builder-skill-group">{{ group.label }}</div>
      <div
        v-for="skillId in group.skills"
        :key="skillId"
        class="builder-skill-row"
      >
        <span class="builder-skill-name">{{ formatSkillName(skillId) }}</span>
        <span class="builder-skill-rank">
          <template v-if="totalRank(skillId) === 0">-</template>
          <template v-else>
            <span v-if="freeRank(skillId)" class="free">{{ freeRank(skillId) }}</span>
            <span v-if="baseRank(skillId)" class="base">{{ baseRank(skillId) }}</span>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'

const builder = useCharacterBuilder()

const skillGroups = [
  {
    label: 'Combat',
    skills: ['blades', 'exotic_weapons', 'explosives', 'firearms', 'hand_to_hand', 'tactics'],
  },
  {
    label: 'Fieldcraft',
    skills: ['conditioning', 'resolve', 'crafting', 'insight', 'stealth', 'survival'],
  },
  {
    label: 'Technical',
    skills: ['computers', 'mechanics', 'medicine', 'piloting', 'science', 'subterfuge'],
  },
  {
    label: 'Social',
    skills: ['arts', 'command', 'culture', 'deception', 'negotiation', 'performance'],
  },
]

function formatSkillName(id) {
  return id.replace(/_/g, ' ')
}

function baseRank(id) {
  return builder.character.system.skills[id] || 0
}

function freeRank(id) {
  return builder.character.system.skills_free[id] || 0
}

function totalRank(id) {
  return baseRank(id) + freeRank(id)
}
</script>
