<!--
  REFERENCE IMPLEMENTATION — Database Page Drag Source
  =====================================================
  This is the canonical pattern for making db-item rows draggable.
  All ~13 database pages (ArmorPage, ItemsPage, ModulesPage, PerksPage,
  CapstonesPage, PassionsPage, AdvantagesPage, DisadvantagesPage,
  AnxietiesPage) follow this identical pattern:
    1. Import DRAG_TYPES from @/composables/useCharacterBuilder.js
    2. Add draggable="true" on each .db-item div
    3. Add @dragstart="onDragStart($event, item)" on each .db-item div
    4. Define onDragStart(event, item) that builds { dragType, id, data }
    5. Use @click.stop on the copy-link button if it overlaps with drag
-->
<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Weapons</h1>

    <p>A catalog of firearms, blades, shields, and specialist weapons available across the battlefields of 2072. Each entry includes full attributes, qualities, and tactical notes.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search weapons…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
        <option value="damage">By Damage</option>
        <option value="deadliness">By Deadliness</option>
        <option value="price">By Price</option>
      </select>
    </div>

    <FilterBar v-model="activeCategory" :filters="categoryFilters" />

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ weapons.length }} weapons</p>

    <!-- Weapons grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="w in filtered"
        :key="w.id"
        :id="w.id"
        class="db-item"
        :class="{ expanded: expanded === w.id }"
        draggable="true"
        @dragstart="onDragStart($event, w)"
        @click="toggleWeapon(w.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ w.name }}</span>
          <span class="db-item-types">
            <span class="db-type-tag">{{ w.category }}</span>
            <span class="db-type-tag">Dmg {{ w.damage }}</span>
            <span class="db-type-tag">Dead {{ w.deadliness }}</span>
            <span class="db-type-tag">Range {{ w.range }}</span>
          </span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === w.id">
          <div class="db-item-flavor" v-if="w.flavor" v-html="w.flavor"></div>

          <div class="tech-meta">
            <span class="tech-tag approach">{{ w.category }}</span>
            <span class="tech-tag rank">Skill: {{ w.skill }}</span>
            <span class="tech-tag skill">Grip: {{ w.grip }}</span>
          </div>

          <div class="weapon-stats-grid">
            <div class="weapon-stat">
              <span class="weapon-stat-label">Range</span>
              <span class="weapon-stat-value">{{ w.range }}</span>
            </div>
            <div class="weapon-stat">
              <span class="weapon-stat-label">Damage</span>
              <span class="weapon-stat-value">{{ w.damage }}</span>
            </div>
            <div class="weapon-stat">
              <span class="weapon-stat-label">Deadliness</span>
              <span class="weapon-stat-value">{{ w.deadliness }}</span>
            </div>
            <div class="weapon-stat">
              <span class="weapon-stat-label">Threat</span>
              <span class="weapon-stat-value">{{ w.threat }}</span>
            </div>
            <div class="weapon-stat">
              <span class="weapon-stat-label">Signature</span>
              <span class="weapon-stat-value">{{ w.signature }}</span>
            </div>
            <div class="weapon-stat">
              <span class="weapon-stat-label">Price</span>
              <span class="weapon-stat-value">{{ w.price }} cr</span>
            </div>
          </div>

          <div class="weapon-qualities" v-if="w.qualities && w.qualities.length">
            <div class="tech-opps-label">Qualities</div>
            <div class="tech-meta">
              <span v-for="q in w.qualities" :key="q" class="tech-tag skill">{{ q }}</span>
            </div>
          </div>

          <button class="db-copy-link" @click.stop="copyLink(w.id)">
            {{ linkCopied === w.id ? '✓ Copied!' : '🔗 Copy Link' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No weapons match your filters.</p>
    </div>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import FilterBar from '@/components/data/FilterBar.vue'
import PageNav from '@/components/layout/PageNav.vue'
import rawWeapons from '@/data/weapons.json'
import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Weapons' }
]

const prev = { to: '/techniques', label: 'Techniques' }
const next = { to: '/armor', label: 'Armor' }

const weapons = Object.entries(rawWeapons).map(([name, data]) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  ...data
}))

const search = ref('')
const sortBy = ref('name')
const activeCategory = ref('All')
const expanded = ref(null)
const linkCopied = ref(null)

const allCategories = [...new Set(weapons.map(w => w.category))].sort()

const categoryFilters = [
  { label: 'All', value: 'All' },
  ...allCategories.map(c => ({ label: c, value: c }))
]

const filtered = computed(() => {
  let results = weapons

  if (activeCategory.value !== 'All') {
    results = results.filter(w => w.category === activeCategory.value)
  }

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(w =>
      w.name.toLowerCase().includes(q) ||
      (w.flavor && w.flavor.toLowerCase().includes(q)) ||
      w.category.toLowerCase().includes(q) ||
      w.skill.toLowerCase().includes(q)
    )
  }

  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'damage') {
    results = [...results].sort((a, b) => b.damage - a.damage || a.name.localeCompare(b.name))
  } else if (sortBy.value === 'deadliness') {
    results = [...results].sort((a, b) => b.deadliness - a.deadliness || a.name.localeCompare(b.name))
  } else if (sortBy.value === 'price') {
    results = [...results].sort((a, b) => a.price - b.price || a.name.localeCompare(b.name))
  }

  return results
})

// -- Drag source (reference pattern for all database pages) --
/**
 * @param {DragEvent} event
 * @param {Object} item — the weapon/item/armor/etc. object
 *
 * To adapt for another page (e.g. ArmorPage):
 *   1. Change DRAG_TYPES.WEAPON to DRAG_TYPES.ARMOR
 *   2. The item object is passed directly as data
 */
function onDragStart(event, item) {
  const dragData = {
    dragType: DRAG_TYPES.WEAPON,
    id: item.id,
    data: item,
  }
  event.dataTransfer.setData('application/json', JSON.stringify(dragData))
  event.dataTransfer.effectAllowed = 'copy'
}

function toggleWeapon(id) {
  if (expanded.value === id) {
    expanded.value = null
    router.replace({ hash: '' })
  } else {
    expanded.value = id
    router.replace({ hash: '#' + id })
  }
}

function copyLink(id) {
  const url = window.location.origin + window.location.pathname + '#/' + route.path + '#' + id
  navigator.clipboard.writeText(url).then(() => {
    linkCopied.value = id
    setTimeout(() => { linkCopied.value = null }, 2000)
  })
}

function hasWeapon(id) {
  return weapons.some(w => w.id === id)
}

onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash && hasWeapon(hash)) {
    expanded.value = hash
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && hasWeapon(id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>

<style scoped>
.weapon-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  margin: 12px 0;
  padding: 8px;
  background: var(--panel-2);
  border: 1px solid var(--border);
}

.weapon-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.weapon-stat-label {
  font-size: 0.7em;
  color: var(--dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.weapon-stat-value {
  font-family: var(--font-mono);
  color: var(--cyan);
  font-size: 1.1em;
  font-weight: bold;
}

.weapon-qualities {
  margin: 12px 0;
}
</style>