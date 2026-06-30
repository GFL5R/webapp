<template>
  <div class="card" style="background: var(--panel-2);">
    <h4 class="mod-name">{{ title }}</h4>
    <p class="mod-desc">{{ description }}</p>
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
.mod-name {
  margin-top: 0;
  color: #fff;
  font-size: 0.95rem;
}
.mod-desc {
  font-size: 0.85rem;
  color: var(--ink-dim);
}
</style>