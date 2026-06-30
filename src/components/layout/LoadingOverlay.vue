<template>
  <div class="loading-overlay" v-if="visible">
    <div class="loading-spinner"></div>
    <div class="loading-text">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: true },
  text: { type: String, default: 'LOADING…' }
})
</script>

<style scoped>
.loading-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(6, 10, 16, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.loading-spinner {
  width: 48px; height: 48px;
  border: 2px solid var(--line);
  border-top-color: var(--cyan);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.loading-text {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  color: var(--cyan);
  animation: blink 1.2s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }
</style>