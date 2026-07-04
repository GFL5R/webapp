<template>
  <div class="builder-section">
    <div class="builder-section-title">Disciplines</div>

    <div
      v-for="slotKey in SLOT_KEYS"
      :key="slotKey"
      class="builder-discipline-slot"
      :class="{
        empty: !slots[slotKey].disciplineId,
        'drag-over': dragOver === slotKey
      }"
      @dragover.prevent="onDragOver(slotKey)"
      @dragleave="onDragLeave"
      @drop.prevent.stop="onDrop($event, slotKey)"
    >
      <!-- Empty slot -->
      <template v-if="!slots[slotKey].disciplineId">
        Drop discipline here
      </template>

      <!-- Filled slot -->
      <template v-else>
        <div class="builder-discipline-name">
          <span>{{ disciplineTitle(slotKey) }}</span>
          <span
            class="remove"
            @click.stop="builder.removeDiscipline(slotKey)"
            title="Remove discipline"
          >&times;</span>
        </div>

        <div class="builder-discipline-meta">
          <span>Rank {{ slots[slotKey].currentRank }}</span>
          <span>{{ slots[slotKey].xpSpent }} XP</span>
        </div>

        <!-- Perk -->
        <div v-if="perkName(slotKey)" class="builder-discipline-perk">
          {{ perkName(slotKey) }}
        </div>

        <!-- Capstone -->
        <div v-if="capstoneName(slotKey)" class="builder-discipline-capstone">
          {{ capstoneName(slotKey) }}
        </div>

        <!-- Technique drop zone within the slot -->
        <div
          class="builder-drop-zone"
          :class="{
            'drag-over': techDragOver === slotKey,
            'empty': slots[slotKey].techniquesLearned.length === 0
          }"
          @dragover.prevent="onTechDragOver(slotKey)"
          @dragleave="onTechDragLeave"
          @drop.prevent.stop="onTechDrop($event, slotKey)"
        >
          <template v-if="slots[slotKey].techniquesLearned.length === 0">
            Drop techniques here
          </template>
          <div
            v-for="tech in slots[slotKey].techniquesLearned"
            :key="tech.id"
            class="builder-discipline-tech"
          >
            <span>{{ tech.name }}</span>
            <span
              class="remove"
              @click.stop="builder.removeTechniqueFromSlot(slotKey, tech.id)"
              title="Remove technique"
            >&times;</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCharacterBuilder, DRAG_TYPES } from '@/composables/useCharacterBuilder.js'
import disciplines from '@/data/disciplines.js'

const builder = useCharacterBuilder()

const SLOT_KEYS = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5']
const dragOver = ref(null)
const techDragOver = ref(null)

const slots = computed(() => builder.character.system.disciplines)

// Build a lookup map from discipline title to the full discipline object
const disciplineMap = computed(() => {
  const map = {}
  for (const d of disciplines) {
    map[d.title] = d
  }
  return map
})

function disciplineTitle(slotKey) {
  return slots.value[slotKey]?.disciplineId || ''
}

function perkName(slotKey) {
  const disc = disciplineMap.value[slots.value[slotKey]?.disciplineId]
  return disc?.perk?.title || ''
}

function capstoneName(slotKey) {
  const disc = disciplineMap.value[slots.value[slotKey]?.disciplineId]
  return disc?.capstone?.title || ''
}

// -- Discipline slot drag handlers --
function onDragOver(slotKey) {
  dragOver.value = slotKey
}

function onDragLeave() {
  dragOver.value = null
}

function onDrop(event, slotKey) {
  dragOver.value = null
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)

    if (dragType !== DRAG_TYPES.DISCIPLINE) return

    builder.setDiscipline(slotKey, data)
  } catch {
    // Ignore malformed drag data
  }
}

// -- Technique drop handlers (within a discipline slot) --
function onTechDragOver(slotKey) {
  techDragOver.value = slotKey
}

function onTechDragLeave() {
  techDragOver.value = null
}

function onTechDrop(event, slotKey) {
  techDragOver.value = null
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)

    if (dragType !== DRAG_TYPES.TECHNIQUE) return

    builder.addTechniqueToSlot(slotKey, data)
  } catch {
    // Ignore malformed drag data
  }
}
</script>
