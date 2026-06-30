<template>
  <div class="breadcrumb">
    <template v-for="(crumb, i) in crumbs" :key="crumb.to || crumb.label">
      <router-link v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</router-link>
      <span v-else>{{ crumb.label }}</span>
      <span v-if="i < crumbs.length - 1"> &gt; </span>
    </template>
  </div>
</template>

<script setup>
defineProps({
  crumbs: { type: Array, required: true }
  // Each: { label, to? }
})
</script>

<style scoped>
/* Styles in global CSS — .breadcrumb */
</style>