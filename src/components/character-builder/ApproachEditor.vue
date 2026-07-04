<template>
  <div class="builder-section">
    <div class="builder-section-title">Approaches</div>

    <!-- Approach rows -->
    <div class="builder-approach-list">
      <div
        v-for="approach in APPROACH_IDS"
        :key="approach"
        class="builder-approach-row"
      >
        <span class="builder-approach-name">{{ capitalize(approach) }}</span>
        <div class="builder-approach-stepper">
          <button
            class="builder-approach-btn"
            :disabled="character.system.approaches[approach] <= 1"
            @click="builder.decrementApproach(approach)"
          >&minus;</button>
          <span class="builder-approach-value">
            {{ character.system.approaches[approach] }}
          </span>
          <button
            class="builder-approach-btn"
            :disabled="character.system.approaches[approach] >= MAX_APPROACH_AT_CREATION"
            @click="builder.incrementApproach(approach)"
          >&#43;</button>
        </div>
      </div>
    </div>

    <!-- Chargen limit note -->
    <div class="builder-approach-warning" style="margin-top: 6px">
      Max {{ MAX_APPROACH_AT_CREATION }} at character creation
    </div>

    <!-- Derived attributes grid -->
    <div class="builder-section-title" style="margin-top:12px">Derived Attributes</div>
    <div class="builder-derived">
      <div class="builder-derived-item">
        <span class="builder-derived-label">Endurance</span>
        <span class="builder-derived-value">{{ derived.endurance }}</span>
      </div>
      <div class="builder-derived-item">
        <span class="builder-derived-label">Composure</span>
        <span class="builder-derived-value">{{ derived.composure }}</span>
      </div>
      <div class="builder-derived-item">
        <span class="builder-derived-label">Focus</span>
        <span class="builder-derived-value">{{ derived.focus }}</span>
      </div>
      <div class="builder-derived-item">
        <span class="builder-derived-label">Vigilance</span>
        <span class="builder-derived-value">{{ derived.vigilance }}</span>
      </div>
      <div class="builder-derived-item">
        <span class="builder-derived-label">Fortune Max</span>
        <span class="builder-derived-value">{{ derived.fortunePointsMax }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'

const builder = useCharacterBuilder()
const { character, APPROACH_IDS, derived, MAX_APPROACH_AT_CREATION } = builder

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>

<style scoped>
.builder-approach-warning {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  color: var(--rose);
  margin-top: 2px;
  padding-left: 4px;
}
</style>
