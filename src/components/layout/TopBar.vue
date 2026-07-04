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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'

const router = useRouter()
const query = ref('')
const { isOpen, toggle } = useCharacterBuilder()

function doSearch() {
  const q = query.value.trim()
  if (!q) return
  router.push({ path: '/search', query: { q } })
}
</script>
