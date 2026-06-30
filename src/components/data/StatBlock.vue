<template>
  <div class="stat-grid">
    <div v-for="stat in stats" :key="stat.name" class="stat-item">
      <div class="stat-name">{{ stat.name }}</div>
      <div class="stat-value">{{ stat.value }}</div>
      <div v-if="stat.desc" class="stat-desc">{{ stat.desc }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: { type: Array, required: true }
  // Each: { name, value, desc? }
})
</script>

<style scoped>
/* Styles in global CSS — .stat-grid, .stat-item, etc. */
</style>