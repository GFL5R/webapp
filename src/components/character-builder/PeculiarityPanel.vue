<!--
  PeculiarityPanel — Drop zones for narrative peculiarities.
  Pattern copied from EquipmentPanel.vue (canonical drop-zone reference).

  Key differences from EquipmentPanel:
  - Uses DRAG_TYPES.ADVANTAGE / .DISADVANTAGE / .PASSION / .ANXIETY
  - Sections keyed by narrativeType (not itemType)
  - Calls builder.getPeculiaritiesByType(narrativeType) instead of getItemsByType
  - Calls builder.addPeculiarity(narrativeType, data) instead of addItem
  - Remove via builder.removePeculiarity
-->
<template>
  <div>
    <div v-for="section in sections" :key="section.narrativeType" class="builder-section">
      <div class="builder-section-title">{{ section.title }}</div>
      <div
        class="builder-drop-zone"
        :class="{
          'drag-over': dragOver === section.narrativeType,
          'empty': section.items.length === 0
        }"
        @dragover.prevent="onDragOver(section.narrativeType)"
        @dragleave="onDragLeave"
        @drop.prevent.stop="onDrop($event, section)"
      >
        <!-- Empty state -->
        <template v-if="section.items.length === 0">
          {{ section.emptyText }}
        </template>

        <!-- Items -->
        <div
          v-for="item in section.items"
          :key="item._id || item.name"
          class="builder-item"
        >
          <span class="builder-item-name">{{ item.name }}</span>
          <button
            class="builder-item-remove"
            @click.stop="builder.removePeculiarity(item._id || item.name)"
            title="Remove"
          >&times;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCharacterBuilder, DRAG_TYPES } from '@/composables/useCharacterBuilder.js'

const builder = useCharacterBuilder()
const dragOver = ref(null)

// ---------------------------------------------------------------------------
// Section definitions
// ---------------------------------------------------------------------------
const sections = computed(() => [
  {
    dragType: DRAG_TYPES.ADVANTAGE,
    narrativeType: 'advantage',
    title: 'Advantages',
    emptyText: 'Drag advantages here',
    items: builder.getPeculiaritiesByType('advantage'),
  },
  {
    dragType: DRAG_TYPES.DISADVANTAGE,
    narrativeType: 'disadvantage',
    title: 'Disadvantages',
    emptyText: 'Drag disadvantages here',
    items: builder.getPeculiaritiesByType('disadvantage'),
  },
  {
    dragType: DRAG_TYPES.PASSION,
    narrativeType: 'passion',
    title: 'Passions',
    emptyText: 'Drag passions here',
    items: builder.getPeculiaritiesByType('passion'),
  },
  {
    dragType: DRAG_TYPES.ANXIETY,
    narrativeType: 'anxiety',
    title: 'Anxieties',
    emptyText: 'Drag anxieties here',
    items: builder.getPeculiaritiesByType('anxiety'),
  },
])

// ---------------------------------------------------------------------------
// Drag-and-drop handlers
// ---------------------------------------------------------------------------
function onDragOver(narrativeType) {
  dragOver.value = narrativeType
}

function onDragLeave() {
  dragOver.value = null
}

function onDrop(event, section) {
  dragOver.value = null
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)

    if (dragType !== section.dragType) return

    builder.addPeculiarity(section.narrativeType, data)
  } catch {
    // Ignore malformed drag data
  }
}
</script>
