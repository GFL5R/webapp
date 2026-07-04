<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Anxieties</h1>

    <p>Anxieties are persistent fears and psychological burdens that afflict characters in the field. They represent traumas, prejudices, compulsions, and deep-seated worries that surface under stress. When an anxiety causes trouble for your character in a scene, you gain a fortune point — turning a weakness into a narrative resource.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search anxieties…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
        <option value="type">By Type</option>
      </select>
    </div>

    <FilterBar v-model="activeType" :filters="typeFilters" />

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ anxieties.length }} anxieties</p>

    <!-- Anxiety grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="a in filtered"
        :key="a.id"
        :id="a.id"
        class="db-item"
        :class="{ expanded: expanded === a.id }"
        draggable="true"
        @dragstart="onDragStart($event, a)"
        @click="toggleAnxiety(a.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ a.name }}</span>
          <span class="db-item-types">
            <span v-for="t in a.types" :key="t" class="db-type-tag">{{ t }}</span>
          </span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === a.id">
          <div class="db-item-flavor" v-if="a.flavor">
            <em>{{ a.flavor }}</em>
          </div>
          <div class="db-item-effects">
            <ul>
              <li v-for="(e, i) in a.effects" :key="i">{{ e }}</li>
            </ul>
          </div>
          <button class="db-copy-link" @click.stop="copyLink(a.id)">{{ linkCopied === a.id ? '✓ Copied!' : '🔗 Copy Link' }}</button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No anxieties match your filters.</p>
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
import anxieties from '@/data/anxieties.json'
import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Anxieties' }
]

const prev = { to: '/disadvantages', label: 'Disadvantages' }
const next = { to: '/techniques', label: 'Techniques' }

// State
const search = ref('')
const sortBy = ref('name')
const activeType = ref('All')
const expanded = ref(null)
const linkCopied = ref(null)

// Derive all unique types
const allTypes = [...new Set(anxieties.flatMap(a => a.types))].sort()

const typeFilters = [
  { label: 'All', value: 'All' },
  ...allTypes.map(t => ({ label: t, value: t }))
]

// Filtered + sorted
const filtered = computed(() => {
  let results = anxieties

  // Type filter
  if (activeType.value !== 'All') {
    results = results.filter(a => a.types.includes(activeType.value))
  }

  // Search
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.flavor.toLowerCase().includes(q) ||
      a.types.some(t => t.toLowerCase().includes(q))
    )
  }

  // Sort
  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'type') {
    results = [...results].sort((a, b) => {
      const ta = a.types.join(',')
      const tb = b.types.join(',')
      return ta.localeCompare(tb) || a.name.localeCompare(b.name)
    })
  }

  return results
})

// -- Drag source --
function onDragStart(event, item) {
  const dragData = {
    dragType: DRAG_TYPES.ANXIETY,
    id: item.id,
    data: item,
  }
  event.dataTransfer.setData('application/json', JSON.stringify(dragData))
  event.dataTransfer.effectAllowed = 'copy'
}

// Toggle expand
function toggleAnxiety(id) {
  if (expanded.value === id) {
    expanded.value = null
    router.replace({ hash: '' })
  } else {
    expanded.value = id
    router.replace({ hash: '#' + id })
  }
}

// Copy link to clipboard
function copyLink(id) {
  const url = window.location.origin + window.location.pathname + '#/' + route.path + '#' + id
  navigator.clipboard.writeText(url).then(() => {
    linkCopied.value = id
    setTimeout(() => { linkCopied.value = null }, 2000)
  })
}

// Restore expanded from hash on mount
onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash && anxieties.some(a => a.id === hash)) {
    expanded.value = hash
    // Scroll to element
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

// Watch hash changes
watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && anxieties.some(a => a.id === id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>
