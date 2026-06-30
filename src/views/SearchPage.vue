<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Search</h1>

    <!-- Search input -->
    <div class="search-hero">
      <input
        ref="searchInput"
        v-model="query"
        type="text"
        class="search-hero-input"
        placeholder="Search rules, compendium, disciplines…"
        @keydown.enter="doSearch"
        autofocus
      />
      <button class="search-hero-btn" @click="doSearch">Search</button>
    </div>

    <!-- Loading / Empty states -->
    <div v-if="!searched" class="search-placeholder">
      <p>Enter a search term above to find rules, compendium entries, techniques, disciplines, NPCs, and more.</p>
    </div>

    <div v-else-if="results.length === 0" class="search-empty">
      <p>No results found for <strong>"{{ lastQuery }}"</strong>.</p>
      <p>Try a different spelling, a shorter term, or browse via the sidebar.</p>
    </div>

    <!-- Results, grouped by category -->
    <div v-else class="search-results">
      <p class="search-summary">{{ results.length }} result{{ results.length === 1 ? '' : 's' }} for <strong>"{{ lastQuery }}"</strong></p>

      <div
        v-for="group in groupedResults"
        :key="group.category"
        class="search-group"
      >
        <h2 class="search-group-title">{{ group.category }}</h2>
        <div
          v-for="r in group.entries"
          :key="r.id"
          class="search-result-item"
        >
          <router-link
            :to="resultLink(r)"
            class="search-result-link"
            @click="clearSearch"
          >
            <span class="search-result-name">{{ r.title }}</span>
            <span class="search-result-route">{{ r.category }}</span>
          </router-link>
          <p class="search-result-snippet" v-if="r.snippet">{{ r.snippet.slice(0, 280) }}{{ r.snippet.length > 280 ? '…' : '' }}</p>
        </div>
      </div>
    </div>
  </ContentFrame>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { search } from '@/composables/useSearch'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Search' }
]

const query = ref('')
const lastQuery = ref('')
const searched = ref(false)
const searchInput = ref(null)

// Read query param on mount / route change
function syncFromRoute() {
  const q = route.query.q
  if (q) {
    query.value = q
    lastQuery.value = q
    searched.value = true
  }
}
syncFromRoute()
watch(() => route.query.q, syncFromRoute)

// Focus input on mount
onMounted(() => {
  nextTick(() => {
    if (searchInput.value) searchInput.value.focus()
  })
})

// Search
const results = computed(() => {
  if (!lastQuery.value) return []
  return search(lastQuery.value)
})

// Group by category, preserving score order within groups
const groupedResults = computed(() => {
  const groups = new Map()
  for (const r of results.value) {
    if (!groups.has(r.category)) groups.set(r.category, [])
    groups.get(r.category).push(r)
  }
  // Return as array, sorted by total group score (sum of entry scores)
  const arr = []
  for (const [category, entries] of groups) {
    arr.push({ category, entries })
  }
  arr.sort((a, b) => {
    const aScore = a.entries.reduce((s, e) => s + e.score, 0)
    const bScore = b.entries.reduce((s, e) => s + e.score, 0)
    return bScore - aScore
  })
  return arr
})

function doSearch() {
  const q = query.value.trim()
  if (!q) return
  lastQuery.value = q
  searched.value = true
  router.replace({ query: { q } })
}

function resultLink(result) {
  if (result.hash) {
    return { path: result.route, hash: result.hash }
  }
  return result.route
}

function clearSearch() {
  // Allow the sidebar to close on navigation (handled by App.vue)
}
</script>

<style scoped>
/* --- Search Hero --- */
.search-hero {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.search-hero-input {
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e0e0c0;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.05rem;
  padding: 0.75rem 1rem;
  border-radius: 0;
  outline: none;
  transition: border-color 0.2s;
}

.search-hero-input:focus {
  border-color: #c8a84e;
}

.search-hero-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.search-hero-btn {
  background: rgba(200, 168, 78, 0.15);
  border: 1px solid #c8a84e;
  color: #c8a84e;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.95rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.search-hero-btn:hover {
  background: rgba(200, 168, 78, 0.3);
}

/* --- Placeholder / Empty --- */
.search-placeholder,
.search-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  line-height: 1.7;
}

.search-empty strong {
  color: #c8a84e;
}

/* --- Summary --- */
.search-summary {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.search-summary strong {
  color: #c8a84e;
}

/* --- Groups --- */
.search-group {
  margin-bottom: 2rem;
}

.search-group-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #c8a84e;
  border-bottom: 1px solid rgba(200, 168, 78, 0.25);
  padding-bottom: 0.4rem;
  margin-bottom: 0.75rem;
}

/* --- Result Items --- */
.search-result-item {
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-link {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: color 0.15s;
}

.search-result-link:hover .search-result-name {
  color: #c8a84e;
}

.search-result-name {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  color: #e0e0c0;
  transition: color 0.15s;
}

.search-result-route {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.search-result-snippet {
  margin: 0.3rem 0 0 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
  font-style: italic;
}
</style>
