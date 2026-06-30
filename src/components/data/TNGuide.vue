<template>
  <div>
    <h3 class="tn-title">DIFFICULTY</h3>
    <div class="tn-table">
      <div v-for="row in rows" :key="row.tn" class="tn-row">
        <span class="tn-value">TN {{ row.tn }}</span>
        <span class="tn-label">{{ row.label }}</span>
        <span class="tn-desc">{{ row.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  rows: { type: Array, required: true }
  // Each: { tn, label, description }
})
</script>

<style scoped>
.tn-title { margin-bottom: 12px; }
.tn-table { margin: 0; }
.tn-row {
  display: grid;
  grid-template-columns: 60px 1fr 2fr;
  gap: 16px;
  align-items: baseline;
  padding: 8px 0;
  border-bottom: 1px solid rgba(56, 225, 214, 0.06);
}
.tn-value {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--amber);
}
.tn-label {
  font-family: var(--font-disp);
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
}
.tn-desc {
  font-size: 0.85rem;
  color: var(--ink-dim);
}
@media (max-width: 600px) {
  .tn-row {
    grid-template-columns: 1fr;
    gap: 2px;
    padding: 10px 0;
  }
}
</style>