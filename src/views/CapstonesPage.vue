<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Capstones</h1>

    <p>Capstones are the ultimate expression of mastery in a Discipline. Available only after completing rank 3 in a discipline, each capstone represents a legendary ability that few operators ever achieve.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search capstones…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
      </select>
    </div>

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ capstones.length }} capstones</p>

    <!-- Capstone grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="c in filtered"
        :key="c.id"
        :id="c.id"
        class="db-item"
        :class="{ expanded: expanded === c.id }"
        @click="toggleCapstone(c.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ c.name }}</span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === c.id">
          <div class="db-item-flavor" v-if="c.flavor">
            <em>{{ c.flavor }}</em>
          </div>
          <div class="db-item-description" v-if="c.description" v-html="c.description"></div>
          <button class="db-copy-link" @click.stop="copyLink(c.id)">
            {{ linkCopied === c.id ? '✓ Copied!' : '🔗 Copy Link' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No capstones match your search.</p>
    </div>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import PageNav from '@/components/layout/PageNav.vue'
import rawCapstones from '@/data/capstones.json'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Capstones' }
]

const prev = { to: '/perks', label: 'Perks' }
const next = { to: '/attribution', label: 'Attribution' }

// Normalize object to array with id
const capstones = Object.entries(rawCapstones).map(([name, data]) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  ...data
}))

// State
const search = ref('')
const sortBy = ref('name')
const expanded = ref(null)
const linkCopied = ref(null)

const filtered = computed(() => {
  let results = capstones

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.flavor && c.flavor.toLowerCase().includes(q)) ||
      (c.description && c.description.toLowerCase().includes(q))
    )
  }

  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  }

  return results
})

function toggleCapstone(id) {
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

function hasCapstone(id) {
  return capstones.some(c => c.id === id)
}

onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash && hasCapstone(hash)) {
    expanded.value = hash
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && hasCapstone(id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>
