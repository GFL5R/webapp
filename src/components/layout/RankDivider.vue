<template>
  <div class="rank-divider">
    {{ label }}
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true }
})
</script>

<style scoped>
/* Styles in global CSS — .rank-divider */
</style>