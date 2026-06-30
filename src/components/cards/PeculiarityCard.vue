<template>
  <div class="card">
    <div class="pec-header">
      <span class="pec-name">{{ title }}</span>
      <span v-if="type" class="tag pec-tag">{{ type }}</span>
    </div>
    <p v-if="description" class="pec-desc">{{ description }}</p>
    <p v-if="effects" class="pec-effects">{{ effects }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  type: { type: String, default: '' },
  description: { type: String, default: '' },
  effects: { type: String, default: '' }
})
</script>

<style scoped>
.pec-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.pec-name {
  font-family: var(--font-disp);
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
}
.pec-tag {
  color: var(--cyan-dim);
  border-color: var(--cyan-dim);
}
.pec-desc {
  font-size: 0.85rem;
  color: var(--ink-dim);
  margin-bottom: 8px;
}
.pec-effects {
  font-size: 0.92rem;
  color: var(--ink);
}
</style>