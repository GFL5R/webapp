<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Disadvantages</h1>

    <p>Disadvantages are persistent flaws, weaknesses, or burdens that complicate your character's life. Each disadvantage introduces a narrative complication and a mechanical drawback: when it interferes, you must reroll two successful dice, but failing earns you a fortune point.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search disadvantages…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
        <option value="type">By Type</option>
      </select>
    </div>

    <FilterBar v-model="activeType" :filters="typeFilters" />

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ disadvantages.length }} disadvantages</p>

    <!-- Disadvantage grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="d in filtered"
        :key="d.id"
        :id="d.id"
        class="db-item"
        :class="{ expanded: expanded === d.id }"
        @click="toggleDisadvantage(d.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ d.name }}</span>
          <span class="db-item-types">
            <span v-for="t in d.types" :key="t" class="db-type-tag">{{ t }}</span>
          </span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === d.id">
          <div class="db-item-flavor" v-if="d.flavor">
            <em>{{ d.flavor }}</em>
          </div>
          <div class="db-item-effects">
            <ul>
              <li v-for="(e, i) in d.effects" :key="i">{{ e }}</li>
            </ul>
          </div>
          <button class="db-copy-link" @click.stop="copyLink(d.id)">{{ linkCopied === d.id ? '✓ Copied!' : '🔗 Copy Link' }}</button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No disadvantages match your filters.</p>
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
import disadvantages from '@/data/disadvantages.json'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Disadvantages' }
]

const prev = { to: '/advantages', label: 'Advantages' }
const next = { to: '/anxieties', label: 'Anxieties' }

// State
const search = ref('')
const sortBy = ref('name')
const activeType = ref('All')
const expanded = ref(null)
const linkCopied = ref(null)

// Derive all unique types
const allTypes = [...new Set(disadvantages.flatMap(d => d.types))].sort()

const typeFilters = [
  { label: 'All', value: 'All' },
  ...allTypes.map(t => ({ label: t, value: t }))
]

// Filtered + sorted
const filtered = computed(() => {
  let results = disadvantages

  // Type filter
  if (activeType.value !== 'All') {
    results = results.filter(d => d.types.includes(activeType.value))
  }

  // Search
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.flavor.toLowerCase().includes(q) ||
      d.types.some(t => t.toLowerCase().includes(q))
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

// Toggle expand
function toggleDisadvantage(id) {
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
  if (hash && disadvantages.some(d => d.id === hash)) {
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
  if (id && disadvantages.some(d => d.id === id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>