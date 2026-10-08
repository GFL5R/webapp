<!--
  REFERENCE IMPLEMENTATION — Card Drag Source
  ============================================
  This is the canonical pattern for making a card component draggable.
  TechniqueCard.vue and ModuleCard.vue follow this identical pattern:
    1. Import DRAG_TYPES from @/composables/useCharacterBuilder.js
    2. Add draggable="true" on the root element
    3. Add @dragstart="onDragStart" handler
    4. In onDragStart: build { dragType, id, data } object, set as JSON on dataTransfer
    5. set effectAllowed = 'copy'
-->
<template>
  <div class="card" draggable="true" @dragstart="onDragStart">
    <!-- Header bar full-width -->
    <div class="disc-card-header">
      <span class="disc-card-name">{{ title }}</span>
    </div>

    <!-- Two-column layout -->
    <div class="disc-grid">
      <!-- Left: flavor + skills + perk -->
      <div class="disc-left">
        <p v-if="flavor" class="flavor-text">{{ flavor }}</p>

        <div v-if="skills && skills.length" class="skill-tags">
          <span v-for="s in skills" :key="s" class="tag skill-tag">{{ s }}</span>
        </div>

        <div v-if="startingWeapon && startingWeapon.category" class="disc-starting-weapon">
          <div class="data-label">Starting Weapon</div>
          <p>{{ weaponCategoryName(startingWeapon.category) }} (up to {{ startingWeapon.maxPrice }} cr)</p>
          <p class="flavor-text">Character creation only. Picking up additional disciplines during play does not grant additional weapons.</p>
        </div>

        <div v-if="perk" class="disc-perk">
          <h4>{{ perk.title }}</h4>
          <p v-if="perk.flavor" class="flavor-text">{{ perk.flavor }}</p>
          <p class="flavor-text">{{ perk.text }}</p>
          <div v-if="perk.description" class="disc-ability" v-html="perk.description"></div>
        </div>
      </div>

      <!-- Right: technique table -->
      <div class="disc-right" v-if="techniques && techniques.length">
        <div class="data-label">Techniques</div>
        <hr class="thin-hr" />
        <div v-for="tech in resolvedTechniques" :key="tech.name" class="tech-row">
          <router-link
            v-if="tech.info"
            :to="tech.info.route + tech.info.hash"
            class="tech-name link"
          >{{ tech.name }}</router-link>
          <span v-else class="tech-name">{{ tech.name }}</span>
          <span class="tech-type">{{ tech.info?.type ?? '' }}</span>
        </div>
      </div>
    </div>

    <!-- Capstone footer -->
    <div v-if="capstone" class="disc-capstone">
      <h4>{{ capstone.title }}</h4>
      <p v-if="capstone.flavor" class="flavor-text">{{ capstone.flavor }}</p>
      <p class="flavor-text">{{ capstone.text }}</p>
      <div v-if="capstone.description" class="disc-ability" v-html="capstone.description"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import lookupTechnique from '@/data/technique-lookup.js'
import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'
import { weaponCategoryName } from '@/data/weapon-categories.js'

const props = defineProps({
  title: { type: String, required: true },
  flavor: { type: String, default: '' },
  skills: { type: Array, default: () => [] },
  techniques: { type: Array, default: () => [] },
  perk: { type: Object, default: null },
  capstone: { type: Object, default: null },
  startingWeapon: { type: Object, default: null }
})

const resolvedTechniques = computed(() =>
  props.techniques.map(tech => ({
    ...tech,
    info: lookupTechnique(tech.name)
  }))
)

// -- Drag source (reference pattern for all card components) --
function onDragStart(event) {
  const dragData = {
    dragType: DRAG_TYPES.DISCIPLINE,
    id: props.title,
    data: {
      title: props.title,
      flavor: props.flavor,
      skills: props.skills,
      techniques: props.techniques,
      perk: props.perk,
      capstone: props.capstone,
      startingWeapon: props.startingWeapon,
    },
  }
  event.dataTransfer.setData('application/json', JSON.stringify(dragData))
  event.dataTransfer.effectAllowed = 'copy'
}
</script>

<style scoped>
.disc-card-header {
  padding: 14px 20px;
  margin: -20px -24px 16px;
  background: var(--panel-2);
  clip-path: polygon(14px 0, 100% 0, 100% 100%, 0 100%, 0 14px);
}
.disc-card-name {
  font-family: var(--font-disp);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--cyan);
}
.disc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 16px;
}
@media (max-width: 768px) {
  .disc-grid { grid-template-columns: 1fr; }
}
.flavor-text {
  font-style: italic;
  font-size: 0.85rem;
  color: var(--ink-faint);
}
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}
.skill-tag {
  color: var(--amber);
  border-color: var(--amber);
  background: rgba(255, 179, 71, 0.08);
}
.disc-perk {
  background: var(--panel-2);
  border: 1px solid var(--line-soft);
  padding: 16px;
  margin-top: 12px;
}
.disc-starting-weapon {
  background: var(--panel-2);
  border: 1px solid var(--line-soft);
  padding: 12px 16px;
  margin-bottom: 12px;
  font-size: 0.85rem;
}
.disc-starting-weapon p {
  margin: 4px 0 0;
}
.tech-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid rgba(56, 225, 214, 0.06);
  font-size: 0.85rem;
}
.tech-name { color: var(--ink); }
.tech-name.link {
  color: var(--cyan);
  text-decoration: none;
}
.tech-name.link:hover {
  text-decoration: underline;
}
.tech-type { color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.7rem; }
.disc-capstone {
  background: var(--panel-2);
  border: 1px solid var(--line-soft);
  padding: 16px;
  margin-top: 12px;
}
.disc-ability {
  font-size: 0.85rem;
}
.disc-ability :deep(h3) {
  font-size: 0.8rem;
  margin: 12px 0 4px;
}
.disc-ability :deep(p) {
  margin: 0 0 8px;
}
.disc-ability :deep(:last-child) {
  margin-bottom: 0;
}
.thin-hr {
  border: none;
  border-top: 1px solid var(--line-soft);
  margin: 8px 0;
}
</style>