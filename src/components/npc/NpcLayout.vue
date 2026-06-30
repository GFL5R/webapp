<template>
  <div class="npc-layout">
    <div class="npc-left">
      <!-- Stat icons -->
      <div class="stat-grid" v-if="stats && stats.length">
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="npc-stat-icon"
          :style="{ borderColor: stat.color }"
        >
          <div class="npc-stat-value" :style="{ color: stat.color }">{{ stat.value }}</div>
          <div class="npc-stat-label">{{ stat.name }}</div>
        </div>
      </div>

      <!-- Derived stats -->
      <div v-if="derived && derived.length" class="npc-derived">
        <span v-for="d in derived" :key="d.label" class="npc-derived-item">
          <span class="npc-derived-label">{{ d.label }}</span>
          <span class="npc-derived-value">{{ d.value }}</span>
        </span>
      </div>

      <slot name="attacks" />
      <slot name="behaviors" />
    </div>

    <div class="npc-right" v-if="portrait">
      <img :src="portrait" :alt="name" class="npc-portrait" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, default: '' },
  stats: { type: Array, default: () => [] },
  derived: { type: Array, default: () => [] },
  portrait: { type: String, default: '' }
})
</script>

<style scoped>
.npc-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  margin: 20px 0;
}
.npc-stat-icon {
  background: var(--panel-2);
  border: 1px solid;
  padding: 12px;
  text-align: center;
}
.npc-stat-value {
  font-family: var(--font-mono);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.1;
}
.npc-stat-label {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-top: 4px;
}
.npc-derived {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}
.npc-derived-item {
  font-family: var(--font-mono);
  font-size: 0.72rem;
}
.npc-derived-label { color: var(--ink-faint); margin-right: 6px; }
.npc-derived-value { color: var(--ink); }
.npc-portrait {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid var(--line);
}
@media (max-width: 768px) {
  .npc-layout {
    grid-template-columns: 1fr;
  }
}
</style>