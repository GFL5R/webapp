<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Advantages</h1>

    <p>Advantages are unique traits, talents, or circumstances that set your character apart. Each advantage grants two benefits: a narrative truth about your character, and a mechanical reroll when performing relevant checks.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search advantages…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
        <option value="type">By Type</option>
      </select>
    </div>

    <FilterBar v-model="activeType" :filters="typeFilters" />

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ advantages.length }} advantages</p>

    <!-- Advantage grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="p in filtered"
        :key="p.id"
        :id="p.id"
        class="db-item"
        :class="{ expanded: expanded === p.id }"
        @click="toggleAdvantage(p.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ p.name }}</span>
          <span class="db-item-types">
            <span v-for="t in p.types" :key="t" class="db-type-tag">{{ t }}</span>
          </span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === p.id">
          <div class="db-item-flavor" v-if="p.flavor">
            <em>{{ p.flavor }}</em>
          </div>
          <div class="db-item-effects">
            <ul>
              <li v-for="(e, i) in p.effects" :key="i">{{ e }}</li>
            </ul>
          </div>
          <button class="db-copy-link" @click.stop="copyLink(p.id)">{{ linkCopied === p.id ? '✓ Copied!' : '🔗 Copy Link' }}</button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No advantages match your filters.</p>
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
import advantages from '@/data/advantages.json'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Advantages' }
]

const prev = { to: '/passions', label: 'Passions' }
const next = { to: '/disciplines', label: 'Disciplines' }

// State
const search = ref('')
const sortBy = ref('name')
const activeType = ref('All')
const expanded = ref(null)
const linkCopied = ref(null)

// Derive all unique types
const allTypes = [...new Set(advantages.flatMap(p => p.types))].sort()

const typeFilters = [
  { label: 'All', value: 'All' },
  ...allTypes.map(t => ({ label: t, value: t }))
]

// Filtered + sorted
const filtered = computed(() => {
  let results = advantages

  // Type filter
  if (activeType.value !== 'All') {
    results = results.filter(p => p.types.includes(activeType.value))
  }

  // Search
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.flavor.toLowerCase().includes(q) ||
      p.types.some(t => t.toLowerCase().includes(q))
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
function toggleAdvantage(id) {
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
  if (hash && advantages.some(p => p.id === hash)) {
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
  if (id && advantages.some(p => p.id === id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>
