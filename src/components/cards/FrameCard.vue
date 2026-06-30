<template>
  <div class="card" style="background: var(--panel-2);">
    <div class="frame-header">
      <span class="frame-name">{{ title }}</span>
      <span v-if="skills && skills.length" class="skill-tags">
        <span v-for="s in skills" :key="s" class="tag frame-skill-tag">{{ s }}</span>
      </span>
    </div>
    <div v-if="approaches" class="frame-approaches">
      Approaches: {{ approaches }}
    </div>
    <p v-if="description" class="frame-desc">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  skills: { type: Array, default: () => [] },
  approaches: { type: String, default: '' },
  description: { type: String, default: '' }
})
</script>

<style scoped>
.frame-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
.frame-name {
  font-family: var(--font-disp);
  font-size: 1rem;
  font-weight: 500;
  color: var(--cyan);
}
.frame-skill-tag {
  color: var(--amber);
  border-color: var(--amber);
  background: rgba(255, 179, 71, 0.08);
}
.frame-approaches {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--ink-faint);
  padding-top: 8px;
  border-top: 1px solid var(--line-soft);
  margin-bottom: 8px;
}
.frame-desc {
  font-size: 0.85rem;
  color: var(--ink-dim);
}
</style>