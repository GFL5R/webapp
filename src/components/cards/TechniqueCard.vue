<template>
  <div class="card" ref="cardEl" :class="{ collapsed: isCollapsed }" draggable="true" @dragstart="onDragStart">
    <!-- Header bar -->
    <div class="card-header" v-if="title">
      <span class="card-header-name">{{ title }}</span>
      <span class="card-header-tags" v-if="tags && tags.length">
        <span v-for="tag in tags" :key="tag.label" class="tag" :style="tagStyle(tag)">{{ tag.label }}</span>
      </span>
    </div>

    <!-- Flavor text -->
    <p v-if="flavor" class="flavor-text">{{ flavor }}</p>

    <!-- Body -->
    <div class="card-body" v-show="!isCollapsed">
      <slot />
    </div>

    <!-- Collapse toggle -->
    <button
      v-if="collapsible"
      class="collapse-toggle"
      @click="isCollapsed = !isCollapsed"
    >
      {{ isCollapsed ? '▼ EXPAND' : '▲ COLLAPSE' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'

const props = defineProps({
  title: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
  flavor: { type: String, default: '' },
  collapsible: { type: Boolean, default: true }
})

const isCollapsed = ref(false)
const cardEl = ref(null)

function tagStyle(tag) {
  const color = tag.color || 'var(--cyan)'
  return {
    color,
    borderColor: color,
    background: `${color}11`
  }
}

// -- Drag source (ref: DisciplineCard.vue pattern) --
function onDragStart(event) {
  const techniqueData = {
    id: props.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '',
    name: props.title,
    flavor: props.flavor,
  }
  const tagMap = {}
  if (props.tags) {
    props.tags.forEach(t => {
      const label = t.label || ''
      if (label.match(/Power|Precision|Swiftness|Resilience|Fortune/i)) tagMap.approach = label
      else if (label.match(/^(Combat|Command|Conditioning|Electronic Warfare|Remoulding|Science|Social|Street|Vehicle)(
|\s|$)/i)) tagMap.type = label
      else if (label.match(/^Rank\s/)) tagMap.rank = label.replace('Rank ', '')
      else if (!tagMap.skill) tagMap.skill = label
    })
  }
  const dragData = {
    dragType: DRAG_TYPES.TECHNIQUE,
    id: techniqueData.id,
    data: {
      ...techniqueData,
      approach: tagMap.approach || null,
      skill: tagMap.skill || null,
      type: tagMap.type || null,
      rank: tagMap.rank ? parseInt(tagMap.rank) : 1,
    },
  }
  event.dataTransfer.setData('application/json', JSON.stringify(dragData))
  event.dataTransfer.effectAllowed = 'copy'
}
</script>

<style scoped>
.card-header-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.flavor-text {
  font-style: italic;
  font-size: 0.85rem;
  color: var(--ink-faint);
  margin-bottom: 12px;
}
.card-body {
  font-size: 0.92rem;
}
.card.collapsed .card-body { display: none; }
</style>