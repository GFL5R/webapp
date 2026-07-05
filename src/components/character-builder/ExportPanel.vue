<template>
  <div class="builder-section">
    <div class="builder-section-title">Export</div>

    <div style="font-size: 0.65rem; color: var(--ink-faint); margin-bottom: 6px;">
      {{ charName }}
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

function onExport() {
  builder.downloadJSON()
}

function onReset() {
  if (window.confirm('Reset character? This cannot be undone.')) {
    builder.reset()
  }
}
</script>
