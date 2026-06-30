<template>
  <header class="top-bar">
    <router-link to="/" class="top-bar-logo">
      GFL<span>5R</span>
    </router-link>
    <div class="top-bar-right">
      <div class="top-bar-status">
        <span class="status-dot"></span>
        SECURE LINK
      </div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')

function doSearch() {
  const q = query.value.trim()
  if (!q) return
  router.push({ path: '/search', query: { q } })
}
</script>
