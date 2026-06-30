<template>
  <nav class="page-nav">
    <router-link
      v-if="prev"
      :to="prev.to"
      class="page-nav-btn"
    >
      <span class="nav-arrow">←</span>
      <span class="nav-label">PREVIOUS</span>
      <span class="nav-title">{{ prev.label }}</span>
    </router-link>
    <div v-else style="flex:1"></div>

    <router-link
      v-if="next"
      :to="next.to"
      class="page-nav-btn"
      style="text-align:right"
    >
      <span class="nav-arrow">→</span>
      <span class="nav-label">NEXT</span>
      <span class="nav-title">{{ next.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
defineProps({
  prev: { type: Object, default: null }, // { to, label }
  next: { type: Object, default: null }  // { to, label }
})
</script>

<style scoped>
/* Styles in global CSS — .page-nav, .page-nav-btn */
</style>