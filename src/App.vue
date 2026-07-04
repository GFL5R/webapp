<template>
  <div id="app-shell">
    <!-- Ambient background layers -->
    <div class="bg-grid"></div>
    <div class="bg-scanlines"></div>
    <div class="bg-vignette"></div>
    <div id="butterfly-field" v-if="showButterflies"></div>

    <!-- WIP Modal -->
    <WipModal v-if="showWip" @close="dismissWip" />

    <!-- Top bar -->
    <TopBar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <!-- Sidebar -->
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Character Builder (right panel) -->
    <CharacterBuilder />

    <!-- Loading overlay -->
    <LoadingOverlay :visible="loading" text="INITIALIZING…" />

    <!-- Content area -->
    <main class="content-area" :class="{ 'builder-open': isBuilderOpen }">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import TopBar from '@/components/layout/TopBar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import LoadingOverlay from '@/components/layout/LoadingOverlay.vue'
import WipModal from '@/components/modals/WipModal.vue'
import CharacterBuilder from '@/components/character-builder/CharacterBuilder.vue'
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'

const { isOpen: isBuilderOpen } = useCharacterBuilder()

const route = useRoute()
const sidebarOpen = ref(false)
const showButterflies = ref(false)
const loading = ref(true)

// WIP modal — shown on first visit, dismissed via localStorage
const WIP_STORAGE_KEY = 'gfl5r-wip-dismissed'
const showWip = ref(!localStorage.getItem(WIP_STORAGE_KEY))

function dismissWip() {
  showWip.value = false
  localStorage.setItem(WIP_STORAGE_KEY, '1')
}

function onKeydown(e) {
  if (e.key === 'Escape' && showWip.value) {
    dismissWip()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// Show butterflies only on home page
watch(() => route.path, (path) => {
  showButterflies.value = path === '/' || path === ''
  sidebarOpen.value = false // close sidebar on nav
}, { immediate: true })

// Loading overlay — show for at least 300ms so it doesn't flash
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>
