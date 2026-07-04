<template>
  <div class="card" style="background: var(--panel-2);" draggable="true" @dragstart="onDragStart">
    <h4 class="mod-name">{{ title }}</h4>
    <p class="mod-desc">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' }
})

// -- Drag source (ref: DisciplineCard.vue pattern) --
function onDragStart(event) {
  const dragData = {
    dragType: DRAG_TYPES.MODULE,
    id: props.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '',
    data: {
      name: props.title,
      description: props.description,
    },
  }
  event.dataTransfer.setData('application/json', JSON.stringify(dragData))
  event.dataTransfer.effectAllowed = 'copy'
}
</script>

<style scoped>
.mod-name {
  margin-top: 0;
  color: #fff;
  font-size: 0.95rem;
}
.mod-desc {
  font-size: 0.85rem;
  color: var(--ink-dim);
}
</style>