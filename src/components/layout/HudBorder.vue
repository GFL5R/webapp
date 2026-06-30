<template>
  <div class="hud-border">
    <slot />
  </div>
</template>

<script setup>
// Glass panel with cyan corner accents at top-left and bottom-right only
</script>

<style scoped>
.hud-border {
  background: var(--panel);
  border: 1px solid var(--line);
  padding: 24px;
  position: relative;
}
.hud-border::before,
.hud-border::after {
  content: '';
  position: absolute;
  width: 12px; height: 12px;
  border: 2px solid var(--cyan);
  filter: drop-shadow(var(--glow-cyan));
}
.hud-border::before {
  top: -1px; left: -1px;
  border-right: 0; border-bottom: 0;
}
.hud-border::after {
  bottom: -1px; right: -1px;
  border-left: 0; border-top: 0;
}
</style>