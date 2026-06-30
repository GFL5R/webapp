<template>
  <div class="vent-card">
    <h4 class="vent-title">{{ title }}</h4>
    <p v-if="description" class="vent-desc">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>

<style scoped>
.vent-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-left: 3px solid var(--rose);
  padding: 20px 24px;
  margin-bottom: 16px;
}
.vent-title {
  margin-top: 0;
  color: var(--rose);
}
.vent-desc {
  font-size: 0.9rem;
}
</style>