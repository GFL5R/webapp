<template>
  <div class="builder-section">
    <div class="builder-section-title">Discipline</div>

    <!-- Single discipline slot (0 XP characters start with one) -->
    <div
      class="builder-discipline-slot"
      :class="{
        empty: !slot.disciplineId,
        'drag-over': dragOver
      }"
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent.stop="onDrop($event)"
    >
      <!-- Empty slot -->
      <template v-if="!slot.disciplineId">
        {{ isTDoll ? 'Drop a weapon discipline here' : 'Drop a discipline here' }}
      </template>

      <!-- Filled slot -->
      <template v-else>
        <div class="builder-discipline-name">
          <span>{{ slot.disciplineId }}</span>
          <span
            class="remove"
            @click.stop="builder.removeDiscipline('slot1')"
            title="Remove discipline"
          >&times;</span>
        </div>

        <div class="builder-discipline-meta">
          <span>Rank {{ slot.currentRank }}</span>
          <span>{{ slot.xpSpent }} XP</span>
        </div>

        <!-- Perk -->
        <div v-if="perkName" class="builder-discipline-perk">
          {{ perkName }}
        </div>

        <!-- Capstone -->
        <div v-if="capstoneName" class="builder-discipline-capstone">
          {{ capstoneName }}
        </div>
      </template>
    </div>

    <!-- Technique drop zone — T-Doll only -->
    <template v-if="isTDoll && slot.disciplineId">
      <div class="builder-section-title" style="margin-top:8px">Techniques</div>
      <div
        class="builder-drop-zone"
        :class="{
          'drag-over': techDragOver,
          'empty': slot.techniquesLearned.length === 0
        }"
        @dragover.prevent="techDragOver = true"
        @dragleave="techDragOver = false"
        @drop.prevent.stop="onTechDrop($event)"
      >
        <template v-if="slot.techniquesLearned.length === 0">
          Drop techniques here
        </template>
        <div
          v-for="tech in slot.techniquesLearned"
          :key="tech.id"
          class="builder-discipline-tech"
        >
          <span>{{ tech.name }}</span>
          <span
            class="remove"
            @click.stop="builder.removeTechniqueFromSlot('slot1', tech.id)"
            title="Remove technique"
          >&times;</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCharacterBuilder, DRAG_TYPES } from '@/composables/useCharacterBuilder.js'
import disciplines from '@/data/disciplines.js'

const builder = useCharacterBuilder()
const dragOver = ref(false)
const techDragOver = ref(false)

const slot = computed(() => builder.character.system.disciplines.slot1)
const isTDoll = computed(() => builder.character.system.identity.characterType === 't-doll')

// Weapon disciplines — only these are valid for T-Dolls
const WEAPON_DISCIPLINE_TITLES = [
  'Knives', 'Swords', 'Pistols', 'Submachine Guns',
  'Shotguns', 'Assault Rifles', 'Battle Rifles', 'Snipers', 'Machine Guns',
]

// Build a lookup map from discipline title to the full discipline object
const disciplineMap = computed(() => {
  const map = {}
  for (const d of disciplines) {
    map[d.title] = d
  }
  return map
})

const discData = computed(() => disciplineMap.value[slot.value.disciplineId] || null)

const perkName = computed(() => discData.value?.perk?.title || '')
const capstoneName = computed(() => discData.value?.capstone?.title || '')

// -- Discipline drop --
function onDrop(event) {
  dragOver.value = false
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)

    if (dragType !== DRAG_TYPES.DISCIPLINE) return

    // T-Doll validation: only weapon disciplines allowed
    if (isTDoll.value && !WEAPON_DISCIPLINE_TITLES.includes(data.title)) {
      return
    }

    builder.setDiscipline('slot1', data)
  } catch {
    // Ignore malformed drag data
  }
}

// -- Technique drop --
function onTechDrop(event) {
  techDragOver.value = false
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)

    if (dragType !== DRAG_TYPES.TECHNIQUE) return

    builder.addTechniqueToSlot('slot1', data)
  } catch {
    // Ignore malformed drag data
  }
}
</script>
