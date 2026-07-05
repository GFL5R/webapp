<!--
  REFERENCE IMPLEMENTATION — Drop Zone Panel
  ===========================================
  This is the canonical pattern for builder drop-zone sections.
  PeculiarityPanel.vue follows the identical pattern: sections[] array of
  { dragType, itemType, title, emptyText } with a shared drop-target component.

  Pattern summary:
    1. Define sections[] with dragType + label metadata
    2. Each section renders: title (builder-section-title) + drop zone
    3. Drop zone: @dragover.prevent, @dragleave, @drop.prevent
    4. On drop: parse dataTransfer JSON, validate dragType, call handleDrop()
    5. Items display: iterate getItemsByType(), each with remove button
    6. handleDrop calls addItem(itemType, data); @drop.stop prevents bubble
-->
<template>
  <div>
    <div v-for="section in sections" :key="section.itemType" class="builder-section">
      <div class="builder-section-title">{{ section.title }}</div>
      <div v-if="section.hint" class="builder-weapon-hint">{{ section.hint }}</div>
      <div
        class="builder-drop-zone"
        :class="{
          'drag-over': dragOver === section.itemType,
          'empty': section.items.length === 0
        }"
        @dragover.prevent="onDragOver(section.itemType)"
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
            @click.stop="builder.removeItem(item._id || item.name)"
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

// Weapon category display names (from weapons.json categories)
const CATEGORY_NAMES = {
  HG: 'Handguns', SMG: 'Submachine Guns', SG: 'Shotguns',
  AR: 'Assault Rifles', BR: 'Battle Rifles', RF: 'Sniper Rifles',
  MG: 'Machine Guns', BLD: 'Blades', KNF: 'Knives', SHD: 'Shields',
  BOW: 'Bows',
}

const weaponGrant = computed(() => {
  const discId = builder.character.system.disciplines.slot1.disciplineId
  if (!discId) return null
  return builder.getDisciplineWeaponGrant(discId) || null
})

const weaponGrantText = computed(() => {
  const g = weaponGrant.value
  if (!g) return null
  const cat = CATEGORY_NAMES[g.category] || g.category
  return `Discipline grants: ${cat} ≤ ${g.maxPrice} cr`
})

// ---------------------------------------------------------------------------
// Section definitions — the ONLY thing that changes between panels
// ---------------------------------------------------------------------------
const sections = computed(() => [
  {
    dragType: DRAG_TYPES.WEAPON,
    itemType: 'weapon',
    title: 'Weapons',
    emptyText: weaponGrantText.value || 'Drag weapons here',
    hint: weaponGrantText.value,
    items: builder.getItemsByType('weapon'),
  },
  {
    dragType: DRAG_TYPES.ARMOR,
    itemType: 'armor',
    title: 'Armor',
    emptyText: 'Drag armor here',
    items: builder.getItemsByType('armor'),
  },
  {
    dragType: DRAG_TYPES.ITEM,
    itemType: 'item',
    title: 'Items',
    emptyText: 'Drag items here',
    items: builder.getItemsByType('item'),
  },
  {
    dragType: DRAG_TYPES.MODULE,
    itemType: 'module',
    title: 'Modules',
    emptyText: 'Drag modules here',
    items: builder.getItemsByType('module'),
  },
])

// ---------------------------------------------------------------------------
// Drag-and-drop handlers
// ---------------------------------------------------------------------------
function onDragOver(itemType) {
  dragOver.value = itemType
}

function onDragLeave() {
  dragOver.value = null
}

/**
 * @param {DragEvent} event
 * @param {{ dragType: string, itemType: string }} section
 *
 * To adapt this for another panel (e.g. PeculiarityPanel):
 *   1. Change sections[] to use DRAG_TYPES.ADVANTAGE / DISADVANTAGE / PASSION / ANXIETY
 *   2. Change getItemsByType to getPeculiaritiesByType
 *   3. Change addItem to addPeculiarity
 *   4. Everything else stays identical.
 */
function onDrop(event, section) {
  dragOver.value = null
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)

    if (dragType !== section.dragType) return

    builder.addItem(section.itemType, data)
  } catch {
    // Ignore malformed drag data
  }
}
</script>

<style scoped>
.builder-weapon-hint {
  font-family: var(--font-mono);
  font-size: 0.54rem;
  color: var(--amber);
  margin-bottom: 6px;
  padding-left: 2px;
}
</style>
