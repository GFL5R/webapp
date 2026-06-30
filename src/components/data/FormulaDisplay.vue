<template>
  <span class="formula">{{ text }}</span>
</template>

<script setup>
defineProps({
  text: { type: String, required: true }
})
</script>

<style scoped>
/* Styles in global CSS — .formula */
</style>