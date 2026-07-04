<template>
  <!-- Builder toggle tab (always visible) -->
  <BuilderToggle />

  <!-- Main builder panel -->
  <div class="builder-panel" :class="{ closed: !isOpen }">
    <!-- Header -->
    <div class="builder-header">
      <span class="builder-header-title">CHARACTER BUILDER</span>
      <button class="builder-header-close" @click="close" title="Close">&times;</button>
    </div>

    <!-- Scrollable body (all sections) -->
    <div class="builder-body">
      <IdentityEditor />
      <ApproachEditor />
      <SkillEditor />
      <DisciplineSlots />
      <EquipmentPanel />
      <PeculiarityPanel />
      <ExportPanel />
    </div>
  </div>
</template>

<script setup>
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'
import BuilderToggle from './BuilderToggle.vue'
import IdentityEditor from './IdentityEditor.vue'
import ApproachEditor from './ApproachEditor.vue'
import SkillEditor from './SkillEditor.vue'
import DisciplineSlots from './DisciplineSlots.vue'
import EquipmentPanel from './EquipmentPanel.vue'
import PeculiarityPanel from './PeculiarityPanel.vue'
import ExportPanel from './ExportPanel.vue'

const { isOpen, close } = useCharacterBuilder()
</script>
