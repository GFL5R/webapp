<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Techniques</h1>

    <p>Techniques are special actions that characters can perform in combat, social encounters, electronic warfare, and other situations. Each technique is tied to a specific approach and skill, and offers unique opportunities when activated.</p>

    <!-- Type tabs -->
    <div class="tech-tabs">
      <button
        v-for="t in types"
        :key="t.slug"
        class="tech-tab-btn"
        :class="{ active: activeType === t.slug }"
        @click="activeType = t.slug"
      >
        {{ t.name }}
        <span class="tech-tab-count">{{ typeCounts[t.slug] }}</span>
      </button>
    </div>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search techniques…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
        <option value="rank">By Rank</option>
      </select>
    </div>

    <FilterBar v-model="activeRank" :filters="rankFilters" />
    <FilterBar v-model="activeApproach" :filters="approachFilters" />
    <FilterBar v-model="activeSkill" :filters="skillFilters" />

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ currentTechniques.length }} techniques</p>

    <!-- Techniques grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="t in filtered"
        :key="t.id"
        :id="t.id"
        class="db-item"
        :class="{ expanded: expanded === t.id }"
        @click="toggleTechnique(t.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ t.name }}</span>
          <span class="db-item-types">
            <span class="db-type-tag">Rank {{ t.rank }}</span>
            <span v-if="t.approach && t.approach !== '—'" class="db-type-tag">{{ t.approach }}</span>
          </span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === t.id">
          <div class="db-item-flavor" v-if="t.flavor">
            <em>{{ t.flavor }}</em>
          </div>

          <div class="tech-meta">
            <span class="tech-tag rank">Rank {{ t.rank }}</span>
            <span v-if="t.approach && t.approach !== '—'" class="tech-tag approach">{{ t.approach }}</span>
            <span v-if="t.skill && t.skill !== '—'" class="tech-tag skill">{{ t.skill }}</span>
          </div>

          <div class="tech-activation" v-if="t.activation">
            <div class="tech-opps-label">Activation</div>
            <p>{{ t.activation }}</p>
          </div>

          <div class="tech-opps" v-if="t.opportunities && t.opportunities.length">
            <div class="tech-opps-label">Opportunities</div>
            <ul>
              <li v-for="(op, i) in t.opportunities" :key="i"><OpText :text="op" /></li>
            </ul>
          </div>

          <button class="db-copy-link" @click.stop="copyLink(t.id)">
            {{ linkCopied === t.id ? '✓ Copied!' : '🔗 Copy Link' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No techniques match your filters.</p>
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
import OpText from '@/components/data/OpText.vue'
import rawTechniques from '@/data/techniques.json'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Techniques' }
]

const prev = { to: '/anxieties', label: 'Anxieties' }
const next = { to: '/attribution', label: 'Attribution' }

// Type slugs to display names
const TYPE_NAMES = {
  combat: 'Combat',
  command: 'Command',
  conditioning: 'Conditioning',
  electronic_warfare: 'Electronic Warfare',
  remolding: 'Remolding',
  science: 'Science',
  social: 'Social',
  street: 'Street',
  vehicle: 'Vehicle'
}

// State
const search = ref('')
const sortBy = ref('name')
const activeType = ref('combat')
const activeRank = ref('All')
const activeApproach = ref('All')
const activeSkill = ref('All')
const expanded = ref(null)
const linkCopied = ref(null)

// Pair real techniques with their following Activation: entries
const allTechniques = computed(() => {
  const result = []
  for (const [typeSlug, entries] of Object.entries(rawTechniques)) {
    if (entries.length === 0) continue
    for (let i = 0; i < entries.length; i += 2) {
      const tech = entries[i]
      const act = entries[i + 1]
      if (tech.name !== 'Activation:') {
        result.push({
          ...tech,
          typeSlug,
          activation: act?.activation || '',
          opportunities: (act?.opportunities || []).filter(o => o !== '---')
        })
      }
    }
  }
  return result
})

// Available types (non-empty)
const types = computed(() => {
  return Object.keys(rawTechniques)
    .filter(slug => rawTechniques[slug].length > 0)
    .map(slug => ({ slug, name: TYPE_NAMES[slug] || slug }))
})

// Count per type
const typeCounts = computed(() => {
  const counts = {}
  for (const t of allTechniques.value) {
    counts[t.typeSlug] = (counts[t.typeSlug] || 0) + 1
  }
  return counts
})

// Techniques for the active type tab
const currentTechniques = computed(() => {
  return allTechniques.value.filter(t => t.typeSlug === activeType.value)
})

// Rank filters
const rankFilters = [
  { label: 'All', value: 'All' },
  { label: 'Rank 1', value: '1' },
  { label: 'Rank 2', value: '2' },
  { label: 'Rank 3', value: '3' }
]

const approachFilters = computed(() => {
  const set = new Set()
  currentTechniques.value.forEach(t => {
    if (t.approach && t.approach !== '—') {
      t.approach.split(/,\s*/).forEach(a => set.add(a))
    }
  })
  return [{ label: 'All', value: 'All' }, ...[...set].sort().map(a => ({ label: a, value: a }))]
})

const skillFilters = computed(() => {
  const set = new Set()
  currentTechniques.value.forEach(t => {
    if (t.skill && t.skill !== '—') {
      t.skill.split(/,\s*/).forEach(s => set.add(s))
    }
  })
  return [{ label: 'All', value: 'All' }, ...[...set].sort().map(s => ({ label: s, value: s }))]
})

// Check if a technique id exists in the current type
function hasTechnique(id) {
  return currentTechniques.value.some(t => t.id === id)
}

// Filtered + sorted techniques
const filtered = computed(() => {
  let results = currentTechniques.value

  // Rank filter
  if (activeRank.value !== 'All') {
    results = results.filter(t => t.rank === parseInt(activeRank.value))
  }

  // Approach filter
  if (activeApproach.value !== 'All') {
    results = results.filter(t =>
      t.approach && t.approach.split(/,\s*/).includes(activeApproach.value)
    )
  }

  // Skill filter
  if (activeSkill.value !== 'All') {
    results = results.filter(t =>
      t.skill && t.skill.split(/,\s*/).includes(activeSkill.value)
    )
  }

  // Search
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(t =>
      t.name.toLowerCase().includes(q) ||
      (t.flavor && t.flavor.toLowerCase().includes(q)) ||
      (t.approach && t.approach.toLowerCase().includes(q)) ||
      (t.skill && t.skill.toLowerCase().includes(q))
    )
  }

  // Sort
  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'rank') {
    results = [...results].sort((a, b) => {
      if (a.rank !== b.rank) return a.rank - b.rank
      return a.name.localeCompare(b.name)
    })
  }

  return results
})

// Toggle expand
function toggleTechnique(id) {
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
  const url = window.location.origin + window.location.pathname + '#/techniques#' + id
  navigator.clipboard.writeText(url).then(() => {
    linkCopied.value = id
    setTimeout(() => { linkCopied.value = null }, 2000)
  })
}

// Restore expanded from hash on mount
onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash) {
    // Find which type contains this technique id
    for (const [slug, entries] of Object.entries(rawTechniques)) {
      if (entries.length === 0) continue
      for (let i = 0; i < entries.length; i += 2) {
        const tech = entries[i]
        if (tech.id === hash && tech.name !== 'Activation:') {
          activeType.value = slug
          break
        }
      }
    }
    expanded.value = hash
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

// Watch hash changes
watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && hasTechnique(id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})

// Reset approach/skill filters when switching type tabs
watch(activeType, () => {
  activeApproach.value = 'All'
  activeSkill.value = 'All'
})
</script>