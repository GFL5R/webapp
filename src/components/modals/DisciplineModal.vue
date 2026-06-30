<template>
  <teleport to="body">
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-discipline">
        <button class="modal-close" @click="$emit('close')">✕ CLOSE</button>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.modal-discipline {
  position: relative;
  max-width: 780px;
  width: 95%;
  max-height: 85vh;
  overflow-y: auto;
}
</style>