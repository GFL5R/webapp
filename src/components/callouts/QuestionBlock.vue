<template>
  <div class="question-block">
    <div v-if="number" class="question-number">Q{{ number }}</div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  number: { type: [String, Number], default: '' }
})
</script>

<style scoped>
.question-block :deep(h2) {
  color: var(--amber);
}
</style>
