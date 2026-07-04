<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Perks</h1>

    <p>Perks are special abilities unlocked through Disciplines. Each perk represents a unique talent or technique your character has mastered, granting distinct advantages in specific situations.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search perks…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
      </select>
    </div>

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ perks.length }} perks</p>

    <!-- Perk grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="p in filtered"
        :key="p.id"
        :id="p.id"
        class="db-item"
        :class="{ expanded: expanded === p.id }"
        draggable="true"
        @dragstart="onDragStart($event, p)"
        @click="togglePerk(p.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ p.name }}</span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === p.id">
          <div class="db-item-flavor" v-if="p.flavor">
            <em>{{ p.flavor }}</em>
          </div>
          <div class="db-item-description" v-if="p.description" v-html="p.description"></div>
          <button class="db-copy-link" @click.stop="copyLink(p.id)">
            {{ linkCopied === p.id ? '✓ Copied!' : '🔗 Copy Link' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No perks match your search.</p>
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
import rawPerks from '@/data/perks.json'
import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Perks' }
]

const prev = { to: '/modules', label: 'Modules' }
const next = { to: '/capstones', label: 'Capstones' }

// Normalize object to array with id
const perks = Object.entries(rawPerks).map(([name, data]) => ({
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
  let results = perks

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.flavor && p.flavor.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    )
  }

  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  }

  return results
})

function onDragStart(event, item) {
  const dragData = {
    dragType: DRAG_TYPES.PERK,
    id: item.id,
    data: item,
  }
  event.dataTransfer.setData('application/json', JSON.stringify(dragData))
  event.dataTransfer.effectAllowed = 'copy'
}

function togglePerk(id) {
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

function hasPerk(id) {
  return perks.some(p => p.id === id)
}

onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash && hasPerk(hash)) {
    expanded.value = hash
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && hasPerk(id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>