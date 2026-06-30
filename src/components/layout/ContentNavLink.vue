<template>
  <router-link :to="to" class="content-nav-link">
    {{ label }} →
  </router-link>
</template>

<script setup>
defineProps({
  to: { type: String, required: true },
  label: { type: String, required: true }
})
</script>
