<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Modules</h1>

    <p>T-Doll modules are aftermarket hardware and software packages that enhance a frame's capabilities. From Approach Augmentations that boost core stats to specialized EW suites and experimental Remolding Units, modules allow operators to customize their T-Doll for any mission profile.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search modules…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
        <option value="cost">By Cost</option>
        <option value="type">By Type</option>
      </select>
    </div>

    <FilterBar v-model="activeType" :filters="typeFilters" />

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ modules.length }} modules</p>

    <!-- Modules grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="m in filtered"
        :key="m.id"
        :id="m.id"
        class="db-item"
        :class="{ expanded: expanded === m.id }"
        @click="toggleModule(m.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ m.name }}</span>
          <span class="db-item-types">
            <span class="db-type-tag">{{ m.type }}</span>
            <span class="db-type-tag">Cost: {{ m.cost }} cr</span>
            <span v-if="m.approach" class="db-type-tag">{{ m.approach }}</span>
            <span v-if="m.skill" class="db-type-tag">{{ m.skill }}</span>
          </span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === m.id">
          <div class="db-item-flavor" v-if="m.flavor" v-html="m.flavor"></div>

          <div class="tech-meta">
            <span class="tech-tag approach">{{ m.type }}</span>
            <span class="tech-tag rank">Cost: {{ m.cost }} cr</span>
            <span v-if="m.approach" class="tech-tag skill">{{ m.approach }}</span>
            <span v-if="m.skill" class="tech-tag skill">{{ m.skill }}</span>
          </div>

          <div class="db-item-description" v-if="m.description" v-html="m.description"></div>

          <button class="db-copy-link" @click.stop="copyLink(m.id)">
            {{ linkCopied === m.id ? '✓ Copied!' : '🔗 Copy Link' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No modules match your filters.</p>
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
import rawModules from '@/data/modules.json'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Modules' }
]

const prev = { to: '/items', label: 'Items' }
const next = { to: '/perks', label: 'Perks' }

const modules = Object.entries(rawModules).map(([name, data]) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  ...data
}))

const search = ref('')
const sortBy = ref('name')
const activeType = ref('All')
const expanded = ref(null)
const linkCopied = ref(null)

const allTypes = [...new Set(modules.map(m => m.type))].sort()

const typeFilters = [
  { label: 'All', value: 'All' },
  ...allTypes.map(t => ({ label: t, value: t }))
]

const filtered = computed(() => {
  let results = modules

  if (activeType.value !== 'All') {
    results = results.filter(m => m.type === activeType.value)
  }

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(m =>
      m.name.toLowerCase().includes(q) ||
      (m.flavor && m.flavor.toLowerCase().includes(q)) ||
      (m.description && m.description.toLowerCase().includes(q)) ||
      m.type.toLowerCase().includes(q) ||
      (m.approach && m.approach.toLowerCase().includes(q)) ||
      (m.skill && m.skill.toLowerCase().includes(q))
    )
  }

  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'cost') {
    results = [...results].sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name))
  } else if (sortBy.value === 'type') {
    results = [...results].sort((a, b) =>
      a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
    )
  }

  return results
})

function toggleModule(id) {
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

function hasModule(id) {
  return modules.some(m => m.id === id)
}

onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash && hasModule(hash)) {
    expanded.value = hash
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && hasModule(id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>