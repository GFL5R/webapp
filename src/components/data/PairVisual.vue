<template>
  <div class="pair-visual">
    <div class="pair-side">{{ sideA }}</div>
    <div class="pair-connector">⟶</div>
    <div class="pair-side">{{ sideB }}</div>
  </div>
</template>

<script setup>
defineProps({
  sideA: { type: String, required: true },
  sideB: { type: String, required: true },
  connector: { type: String, default: '⟶' }
})
</script>

<style scoped>
/* Styles in global CSS — .pair-visual */
</style>