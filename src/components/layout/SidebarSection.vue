<template>
  <div class="sidebar-section">
    <div
      class="sidebar-section-header"
      :class="{ open: isOpen }"
      @click="isOpen = !isOpen"
    >
      {{ label }}
      <span class="chevron">▸</span>
    </div>
    <ul class="sidebar-links">
      <li v-for="link in links" :key="link.to">
        <router-link
          :to="link.to"
          class="sidebar-link"
          active-class="router-link-active"
        >
          {{ link.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  links: { type: Array, required: true },
  defaultOpen: { type: Boolean, default: false }
})

const isOpen = ref(props.defaultOpen)
</script>
