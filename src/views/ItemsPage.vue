<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Items</h1>

    <p>Attachments, gear, and consumables available to operators in the field. From suppressors and scopes to breaching charges and medical kits, the right equipment can turn the tide of an operation.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search items…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
        <option value="cost">By Cost</option>
      </select>
    </div>

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ items.length }} items</p>

    <!-- Items grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="item in filtered"
        :key="item.id"
        :id="item.id"
        class="db-item"
        :class="{ expanded: expanded === item.id }"
        @click="toggleItem(item.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ item.name }}</span>
          <span class="db-item-types">
            <span class="db-type-tag">Cost: {{ item.cost }} cr</span>
            <span class="db-type-tag">Rarity {{ item.rarity }}</span>
          </span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === item.id">
          <div class="db-item-flavor" v-if="item.flavor">
            <em>{{ item.flavor }}</em>
          </div>

          <div class="tech-meta">
            <span class="tech-tag approach">Cost: {{ item.cost }} cr</span>
            <span class="tech-tag rank">Rarity: {{ item.rarity }}</span>
          </div>

          <div class="db-item-description" v-if="item.description" v-html="item.description"></div>

          <button class="db-copy-link" @click.stop="copyLink(item.id)">
            {{ linkCopied === item.id ? '✓ Copied!' : '🔗 Copy Link' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No items match your search.</p>
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
import rawItems from '@/data/items.json'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Items' }
]

const prev = { to: '/armor', label: 'Armor' }
const next = { to: '/modules', label: 'Modules' }

const items = Object.entries(rawItems).map(([name, data]) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  ...data
}))

const search = ref('')
const sortBy = ref('name')
const expanded = ref(null)
const linkCopied = ref(null)

const filtered = computed(() => {
  let results = items

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.flavor && item.flavor.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q))
    )
  }

  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'cost') {
    results = [...results].sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name))
  }

  return results
})

function toggleItem(id) {
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

function hasItem(id) {
  return items.some(item => item.id === id)
}

onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash && hasItem(hash)) {
    expanded.value = hash
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && hasItem(id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>