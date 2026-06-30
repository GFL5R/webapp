<template>
  <component :is="tag" class="section-divider">
    {{ label }}
  </component>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  tag: { type: String, default: 'div' }
})
</script>

<style scoped>
/* Styles in global CSS — .section-divider */
</style>