<template>
  <header class="top-bar">
    <router-link to="/" class="top-bar-logo">
      GFL<span>5R</span>
    </router-link>
    <div class="top-bar-right">
      <div class="top-bar-status" :class="statusClass" :title="statusTooltip" @click="handleStatusClick">
        <span class="status-dot"></span>
        {{ statusLabel }}
      </div>
      <button
        class="top-bar-builder-btn"
        :class="{ active: isOpen }"
        @click="toggle"
        :title="isOpen ? 'Hide Builder' : 'Character Builder'"
      >
        {{ isOpen ? '×' : 'CHAR' }}
      </button>
      <input
        type="text"
        class="top-bar-search"
        placeholder="SEARCH…"
        v-model="query"
        @keydown.enter="doSearch"
      />
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'

const router = useRouter()
const query = ref('')
const { isOpen, toggle } = useCharacterBuilder()

const buildId = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : null
const freshness = ref('checking') // 'checking' | 'current' | 'stale' | 'offline'

const statusLabel = computed(() => {
  switch (freshness.value) {
    case 'checking': return 'CHECKING...'
    case 'current':   return 'SECURE LINK'
    case 'stale':     return 'UPDATE AVAILABLE'
    case 'offline':   return 'OFFLINE'
    default:          return 'SECURE LINK'
  }
})

const statusClass = computed(() => `status-${freshness.value}`)

const statusTooltip = computed(() => {
  switch (freshness.value) {
    case 'checking': return 'Checking for updates...'
    case 'current':  return buildId ? `Build ${buildId} — up to date` : 'Up to date'
    case 'stale':    return 'A newer version is available. Click to reload.'
    case 'offline':  return 'Unable to check for updates'
    default:         return ''
  }
})

function handleStatusClick() {
  if (freshness.value === 'stale') {
    window.location.reload()
  }
}

onMounted(async () => {
  if (!buildId || import.meta.env.DEV) {
    // Dev mode or build ID not injected — assume current
    freshness.value = 'current'
    return
  }

  try {
    const resp = await fetch(`/version.json?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

    const data = await resp.json()
    freshness.value = data.buildId === buildId ? 'current' : 'stale'
  } catch {
    freshness.value = 'offline'
  }
})

function doSearch() {
  const q = query.value.trim()
  if (!q) return
  router.push({ path: '/search', query: { q } })
}
</script>
