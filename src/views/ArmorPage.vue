<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>Armor</h1>

    <p>Armor reduces incoming damage, but comes with weight, signature, and cost trade-offs. Choose carefully — the armor you wear defines how you approach a fight.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search armor…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
        <option value="protection">By Protection</option>
        <option value="cost">By Cost</option>
      </select>
    </div>

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ armor.length }} armor pieces</p>

    <!-- Armor grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="a in filtered"
        :key="a.id"
        :id="a.id"
        class="db-item"
        :class="{ expanded: expanded === a.id }"
        @click="toggleArmor(a.id)"
      >
        <div class="db-item-header">
          <span class="db-item-name">{{ a.name }}</span>
          <span class="db-item-types">
            <span class="db-type-tag">Protection {{ a.protection }}</span>
            <span class="db-type-tag">Weight {{ a.weight }}</span>
            <span class="db-type-tag">Rarity {{ a.rarity }}</span>
          </span>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === a.id">
          <div class="db-item-flavor" v-if="a.flavor">
            <em>{{ a.flavor }}</em>
          </div>

          <div class="tech-meta">
            <span class="tech-tag approach">Cost: {{ a.cost }} cr</span>
            <span class="tech-tag rank">Protection: {{ a.protection }}</span>
            <span class="tech-tag skill">Weight: {{ a.weight }}</span>
            <span class="tech-tag skill">Rarity: {{ a.rarity }}</span>
            <span class="tech-tag skill">Signature: {{ a.signature }}</span>
          </div>

          <div class="db-item-description" v-if="a.description" v-html="a.description"></div>

          <button class="db-copy-link" @click.stop="copyLink(a.id)">
            {{ linkCopied === a.id ? '✓ Copied!' : '🔗 Copy Link' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No armor matches your search.</p>
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
import rawArmor from '@/data/armor.json'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Armor' }
]

const prev = { to: '/weapons', label: 'Weapons' }
const next = { to: '/items', label: 'Items' }

const armor = Object.entries(rawArmor).map(([name, data]) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  ...data
}))

const search = ref('')
const sortBy = ref('name')
const expanded = ref(null)
const linkCopied = ref(null)

const filtered = computed(() => {
  let results = armor

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(a =>
      a.name.toLowerCase().includes(q) ||
      (a.flavor && a.flavor.toLowerCase().includes(q)) ||
      (a.description && a.description.toLowerCase().includes(q))
    )
  }

  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'protection') {
    results = [...results].sort((a, b) => b.protection - a.protection || a.name.localeCompare(b.name))
  } else if (sortBy.value === 'cost') {
    results = [...results].sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name))
  }

  return results
})

function toggleArmor(id) {
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

function hasArmor(id) {
  return armor.some(a => a.id === id)
}

onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash && hasArmor(hash)) {
    expanded.value = hash
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && hasArmor(id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>