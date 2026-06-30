<template>
  <div class="filter-bar">
    <button
      v-for="f in filters"
      :key="f.value"
      class="filter-chip"
      :class="{ active: modelValue === f.value }"
      @click="$emit('update:modelValue', f.value)"
    >
      {{ f.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, required: true },
  filters: { type: Array, required: true }
  // Each: { label, value }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Styles in global CSS — .filter-bar, .filter-chip */
</style>