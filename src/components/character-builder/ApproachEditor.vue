<template>
  <div class="builder-section">
    <div class="builder-section-title">Approaches</div>

    <!-- Approach dots — read-only, colored like NPC compendium, horizontal row -->
    <div class="builder-approaches">
      <div
        v-for="approach in APPROACH_IDS"
        :key="approach"
        class="builder-approach-col"
      >
        <span class="builder-approach-label" :style="{ color: approachColor(approach) }">{{ abbr(approach) }}</span>
        <span
          class="builder-approach-dot"
          :style="{ borderColor: approachColor(approach) }"
        >{{ character.system.approaches[approach] }}</span>
      </div>
    </div>

    <!-- Derived attributes — same row style as approaches -->
    <div class="builder-section-title" style="margin-top:12px">Derived</div>
    <div class="builder-approaches">
      <div
        v-for="attr in derivedAttrs"
        :key="attr.key"
        class="builder-approach-col"
      >
        <span class="builder-approach-label" :style="{ color: attr.color }">{{ attr.label }}</span>
        <span
          class="builder-approach-dot"
          :style="{ borderColor: attr.color }"
        >{{ attr.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'

const builder = useCharacterBuilder()
const { character, APPROACH_IDS, derived } = builder

const approachColors = {
  power: 'var(--rose)',
  precision: 'var(--amber)',
  swiftness: '#4aa8ff',
  resilience: 'var(--success)',
  fortune: '#9c27b0',
}

const abbreviations = {
  power: 'POW',
  precision: 'PRE',
  swiftness: 'SWI',
  resilience: 'RES',
  fortune: 'FOR',
}

const derivedAttrs = computed(() => [
  { key: 'endurance', label: 'END', value: derived.value.endurance, color: 'var(--success)' },
  { key: 'composure', label: 'COM', value: derived.value.composure, color: '#4aa8ff' },
  { key: 'focus', label: 'FOC', value: derived.value.focus, color: 'var(--amber)' },
  { key: 'vigilance', label: 'VIG', value: derived.value.vigilance, color: 'var(--rose)' },
  { key: 'fortune', label: 'FOR', value: derived.value.fortunePointsMax, color: '#9c27b0' },
])

function approachColor(approach) {
  return approachColors[approach] || 'var(--cyan)'
}

function abbr(approach) {
  return abbreviations[approach] || approach
}
</script>

<style scoped>
.builder-approaches {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.builder-approach-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.builder-approach-label {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.builder-approach-dot {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  color: #fff;
  border: 1px solid;
  background: rgba(0,0,0,0.3);
}
</style>
