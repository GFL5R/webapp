<template>
  <div class="builder-section">
    <div class="builder-section-title">Export</div>

    <div style="font-size: 0.65rem; color: var(--ink-faint); margin-bottom: 4px;">
      {{ charName }}
    </div>
    <div style="font-family: var(--font-mono); font-size: 0.6rem; color: var(--ink-dim); margin-bottom: 4px;">
      XP: {{ character.system.advancement.xp_total }} &middot;
      Disciplines: {{ disciplineCount }}
    </div>

    <button class="builder-export-btn" @click="onExport">
      Export Foundry JSON
    </button>
    <button class="builder-reset-btn" @click="onReset">
      Reset Character
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'

const builder = useCharacterBuilder()
const { character } = builder

const charName = computed(() => character.name || 'Unnamed Character')

const disciplineCount = computed(() => {
  const slots = character.system.disciplines
  return Object.values(slots).filter(s => s.disciplineId != null).length
})

function onExport() {
  builder.downloadJSON()
}

function onReset() {
  if (window.confirm('Reset character? This cannot be undone.')) {
    builder.reset()
  }
}
</script>
