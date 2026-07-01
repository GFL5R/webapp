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
    <div class="sidebar-body">
      <ul class="sidebar-links" v-if="links.length">
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
      <div class="sidebar-subsection" v-for="(sub, i) in subSections" :key="sub.label">
        <div
          class="sidebar-subsection-header"
          :class="{ open: subOpen[i] }"
          @click="toggleSub(i)"
        >
          {{ sub.label }}
          <span class="chevron">▸</span>
        </div>
        <ul class="sidebar-sublinks">
          <li v-for="link in sub.links" :key="link.to">
            <router-link
              :to="link.to"
              class="sidebar-link sub"
              active-class="router-link-active"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  links: { type: Array, default: () => [] },
  subSections: { type: Array, default: () => [] },
  defaultOpen: { type: Boolean, default: false }
})

const isOpen = ref(props.defaultOpen)

const subOpen = ref(props.subSections.map(sub => sub.defaultOpen ?? false))

function toggleSub(index) {
  subOpen.value[index] = !subOpen.value[index]
}
</script>
