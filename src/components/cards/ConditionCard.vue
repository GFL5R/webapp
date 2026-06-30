<template>
  <div class="card">
    <div class="card-header">
      <span class="card-header-name">{{ title }}</span>
    </div>

    <div class="card-body">
      <div v-if="description" class="cond-section">
        <span class="data-label">Description</span>
        <p>{{ description }}</p>
      </div>

      <div v-if="effects && effects.length" class="cond-section">
        <span class="data-label">Effects</span>
        <ul>
          <li v-for="e in effects" :key="e">{{ e }}</li>
        </ul>
      </div>

      <slot />
    </div>

    <div v-if="removal" class="cond-removal">
      {{ removal }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  effects: { type: Array, default: () => [] },
  removal: { type: String, default: '' }
})
</script>

<style scoped>
.cond-section {
  margin-bottom: 12px;
}
.cond-removal {
  background: var(--panel-2);
  color: var(--cyan);
  font-size: 0.88rem;
  padding: 12px 16px;
  margin: 0 -24px -20px;
  border-top: 1px solid var(--line);
}
</style>