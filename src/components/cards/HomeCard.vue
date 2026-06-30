<template>
  <div
    class="home-card"
    @click="$router.push(to)"
  >
    <div class="home-card-icon">{{ icon }}</div>
    <div class="home-card-title">{{ title }}</div>
    <div class="home-card-desc">{{ description }}</div>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  to: { type: String, required: true }
})
</script>

<style scoped>
/* Styles in global CSS — .home-card */
</style>