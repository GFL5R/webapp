<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Vehicles</h1>

    <p>A catalog of ground vehicles commonly encountered in the post-war world of 2072. From civilian runabouts to surplus armored personnel carriers, each vehicle has its own durability, passenger capacity, and tactical role.</p>

    <p class="kicker">Vehicle stats are used in chase scenes. See <router-link to="/driving-and-vehicles">Driving &amp; Vehicles</router-link> for full rules.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search vehicles…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A-Z</option>
        <option value="armor">By Armor</option>
        <option value="threshold">By Damage Threshold</option>
        <option value="price">By Price</option>
      </select>
    </div>

    <FilterBar v-model="activeType" :filters="typeFilters" />

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ vehicles.length }} vehicles</p>

    <!-- Vehicles grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="v in filtered"
        :key="v.id"
        :id="v.id"
        class="db-item"
        :class="{ expanded: expanded === v.id }"
        draggable="true"
        @dragstart="onDragStart($event, v)"
        @click="toggleVehicle(v.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ v.name }}</span>
          <span class="db-item-types">
            <span class="db-type-tag">{{ v.type }}</span>
            <span class="db-type-tag">Armor {{ v.armor_value }}</span>
            <span class="db-type-tag">DT {{ v.damage_threshold }}</span>
            <span class="db-type-tag">{{ v.passenger_capacity }} seats</span>
            <span class="db-type-tag" v-if="v.min_crew > 0 || v.needs_operator">Crew {{ v.min_crew }}{{ v.crew > v.min_crew ? '-' + v.crew : '' }}</span>
            <span class="db-type-tag" v-if="v.weapons && v.weapons.length">{{ v.weapons.length }} weapon{{ v.weapons.length > 1 ? 's' : '' }}</span>
          </span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === v.id">
          <div class="db-item-flavor" v-if="v.flavor" v-html="v.flavor"></div>

          <div class="vehicle-stats-grid">
            <div class="vehicle-stat">
              <span class="vehicle-stat-label">Armor Value</span>
              <span class="vehicle-stat-value">{{ v.armor_value }}</span>
            </div>
            <div class="vehicle-stat">
              <span class="vehicle-stat-label">Damage Threshold</span>
              <span class="vehicle-stat-value">{{ v.damage_threshold }}</span>
            </div>
            <div class="vehicle-stat">
              <span class="vehicle-stat-label">Passenger Capacity</span>
              <span class="vehicle-stat-value">{{ v.passenger_capacity }}</span>
            </div>
            <div class="vehicle-stat">
              <span class="vehicle-stat-label">Speed</span>
              <span class="vehicle-stat-value">{{ v.speed }}</span>
            </div>
            <div class="vehicle-stat">
              <span class="vehicle-stat-label">Rarity</span>
              <span class="vehicle-stat-value">{{ v.rarity }}/10</span>
            </div>
            <div class="vehicle-stat">
              <span class="vehicle-stat-label">Price</span>
              <span class="vehicle-stat-value">{{ v.price.toLocaleString() }} cr</span>
            </div>
          </div>

          <!-- Crew info -->
          <div class="vehicle-crew-section" v-if="v.crew_notes">
            <span class="section-subtitle">Crew</span>
            <p class="crew-text">
              <strong v-if="v.needs_operator">Remote operated.</strong>
              <strong v-else-if="v.crew === 0">No crew.</strong>
              <strong v-else-if="v.min_crew === v.crew">{{ v.crew }} crew.</strong>
              <strong v-else>{{ v.min_crew }} to {{ v.crew }} crew.</strong>
              {{ v.crew_notes }}
            </p>
          </div>

          <!-- Weapons -->
          <div class="vehicle-weapons-section" v-if="v.weapons && v.weapons.length">
            <span class="section-subtitle">Armament</span>
            <div v-for="(w, i) in v.weapons" :key="i" class="vehicle-weapon-block">
              <div class="weapon-block-header">
                <span class="weapon-name">{{ w.name }}</span>
                <span class="weapon-mount">({{ w.mount }})</span>
              </div>
              <div class="weapon-stats-row">
                <span class="weapon-stat-chip">Category {{ w.category }}</span>
                <span class="weapon-stat-chip">Range {{ w.range }}</span>
                <span class="weapon-stat-chip">Dmg {{ w.damage }}</span>
                <span class="weapon-stat-chip">Dead {{ w.deadliness }}</span>
                <span class="weapon-stat-chip" v-if="w.skill">{{ w.skill }}</span>
              </div>
              <div class="weapon-qualities-row" v-if="w.qualities && w.qualities.length">
                <span v-for="q in w.qualities" :key="q" class="db-type-tag">{{ q }}</span>
              </div>
              <p class="weapon-notes" v-if="w.notes">{{ w.notes }}</p>
            </div>
          </div>

          <div class="vehicle-description" v-if="v.description" v-html="v.description"></div>

          <button class="db-copy-link" @click.stop="copyLink(v.id)">
            {{ linkCopied === v.id ? '✓ Copied!' : '🔗 Copy Link' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No vehicles match your filters.</p>
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
import rawVehicles from '@/data/vehicles.json'
import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Vehicles' }
]

const prev = { to: '/modules', label: 'Modules' }
const next = { to: '/npcs', label: 'NPCs' }

const vehicles = Object.entries(rawVehicles).map(([name, data]) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  ...data
}))

const search = ref('')
const sortBy = ref('name')
const activeType = ref('All')
const expanded = ref(null)
const linkCopied = ref(null)

const allTypes = [...new Set(vehicles.map(v => v.type))].sort()

const typeFilters = [
  { label: 'All', value: 'All' },
  ...allTypes.map(t => ({ label: t, value: t }))
]

const filtered = computed(() => {
  let results = vehicles

  if (activeType.value !== 'All') {
    results = results.filter(v => v.type === activeType.value)
  }

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(v =>
      v.name.toLowerCase().includes(q) ||
      (v.flavor && v.flavor.toLowerCase().includes(q)) ||
      v.type.toLowerCase().includes(q)
    )
  }

  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'armor') {
    results = [...results].sort((a, b) => b.armor_value - a.armor_value || a.name.localeCompare(b.name))
  } else if (sortBy.value === 'threshold') {
    results = [...results].sort((a, b) => b.damage_threshold - a.damage_threshold || a.name.localeCompare(b.name))
  } else if (sortBy.value === 'price') {
    results = [...results].sort((a, b) => a.price - b.price || a.name.localeCompare(b.name))
  }

  return results
})

function onDragStart(event, item) {
  const dragData = {
    dragType: DRAG_TYPES.VEHICLE,
    id: item.id,
    data: item,
  }
  event.dataTransfer.setData('application/json', JSON.stringify(dragData))
  event.dataTransfer.effectAllowed = 'copy'
}

function toggleVehicle(id) {
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

function hasVehicle(id) {
  return vehicles.some(v => v.id === id)
}

onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash && hasVehicle(hash)) {
    expanded.value = hash
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && hasVehicle(id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>

<style scoped>
.vehicle-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 8px;
  margin: 12px 0;
  padding: 8px;
  background: var(--panel-2);
  border: 1px solid var(--border);
}

.vehicle-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.vehicle-stat-label {
  font-size: 0.7em;
  color: var(--dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.vehicle-stat-value {
  font-family: var(--font-mono);
  color: var(--amber);
  font-size: 1.1em;
  font-weight: bold;
}

.vehicle-description {
  margin: 12px 0;
}

.vehicle-description ul {
  padding-left: 1.5em;
  margin: 4px 0;
}

.vehicle-description li {
  margin: 2px 0;
  font-size: 0.9em;
  color: var(--text-dim);
}

.kicker {
  font-family: var(--font-mono);
  font-size: 0.8em;
  color: var(--dim);
  margin-top: -8px;
  margin-bottom: 12px;
}

.kicker a {
  color: var(--cyan);
}

.section-subtitle {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.75em;
  color: var(--dim);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 16px 0 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--border);
}

.crew-text {
  margin: 4px 0 0;
  font-size: 0.9em;
  color: var(--text-dim);
}

.crew-text strong {
  color: var(--cyan);
}

.vehicle-weapon-block {
  margin: 8px 0;
  padding: 8px;
  background: var(--panel-2);
  border: 1px solid var(--border);
  border-left: 3px solid var(--amber);
}

.weapon-block-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.weapon-name {
  font-weight: bold;
  color: var(--amber);
}

.weapon-mount {
  font-size: 0.8em;
  color: var(--dim);
  font-family: var(--font-mono);
}

.weapon-stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 4px 0;
}

.weapon-stat-chip {
  font-family: var(--font-mono);
  font-size: 0.75em;
  padding: 2px 6px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--cyan);
}

.weapon-qualities-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 4px 0;
}

.weapon-notes {
  margin: 4px 0 0;
  font-size: 0.85em;
  color: var(--text-dim);
  font-style: italic;
}
</style>