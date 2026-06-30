<template>
  <span class="step-indicator">
    STEP {{ number }}
  </span>
</template>

<script setup>
defineProps({
  number: { type: [String, Number], required: true }
})
</script>
