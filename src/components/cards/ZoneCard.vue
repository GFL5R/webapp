<template>
  <div class="zone-card">
    <div class="zone-indicator" :style="{ background: indicatorColor }"></div>
    <div class="zone-body">
      <h4>{{ title }}</h4>
      <ul v-if="points && points.length">
        <li v-for="p in points" :key="p">{{ p }}</li>
      </ul>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  zone: { type: String, default: 'white' },
  points: { type: Array, default: () => [] }
})

const zoneColors = {
  white: '#e0e8f0',
  green: '#39ff14',
  yellow: '#FFE135',
  red: '#ff3d3d',
  black: '#556677',
  purification: '#4aa8ff'
}

const indicatorColor = computed(() => zoneColors[props.zone] || zoneColors.white)
</script>

<style scoped>
.zone-card {
  background: var(--panel);
  border: 1px solid var(--line);
  margin-bottom: 16px;
  overflow: hidden;
}
.zone-indicator { height: 4px; }
.zone-body { padding: 16px 20px; }
.zone-body h4 { margin-top: 0; color: #fff; }
</style>