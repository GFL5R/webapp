<template>
  <div class="card">
    <h3 class="subs-name">{{ title }}</h3>

    <!-- Alternate names table -->
    <div v-if="altNames && altNames.length" class="subs-names">
      <div v-for="n in altNames" :key="n.label" class="subs-name-row">
        <span class="subs-name-label">{{ n.label }}</span>
        <span class="subs-name-value">{{ n.value }}</span>
      </div>
    </div>

    <!-- Use blocks -->
    <div v-if="useBlocks && useBlocks.length">
      <div
        v-for="block in useBlocks"
        :key="block.title"
        class="subs-use-block"
        :class="block.type"
      >
        <h4>{{ block.title }}</h4>
        <p>{{ block.text }}</p>
      </div>
    </div>

    <!-- Onset / Duration footer -->
    <div v-if="onset || duration" class="subs-footer">
      <span v-if="onset"><span class="data-label">Onset:</span> {{ onset }}</span>
      <span v-if="onset && duration" class="subs-footer-sep">|</span>
      <span v-if="duration"><span class="data-label">Duration:</span> {{ duration }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  altNames: { type: Array, default: () => [] },
  useBlocks: { type: Array, default: () => [] },
  onset: { type: String, default: '' },
  duration: { type: String, default: '' }
})
</script>

<style scoped>
.subs-name {
  margin-top: 0;
}
.subs-names {
  margin-bottom: 12px;
}
.subs-name-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  font-size: 0.85rem;
  padding: 3px 0;
}
.subs-name-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--amber);
}
.subs-name-value {
  color: var(--ink-dim);
}
.subs-use-block {
  padding: 12px 16px;
  margin-bottom: 10px;
  border-left: 3px solid var(--line);
  background: var(--panel-2);
}
.subs-use-block.medical { border-left-color: var(--cyan); }
.subs-use-block.harmful { border-left-color: var(--rose); }
.subs-footer {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--ink-faint);
  padding-top: 12px;
  border-top: 1px solid var(--line-soft);
  margin-top: 12px;
}
.subs-footer-sep { margin: 0 12px; }
</style>