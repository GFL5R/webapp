<template>
  <div>
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.label"
        class="tab-btn"
        :class="{ active: activeTab === slotName(tab) }"
        @click="activeTab = slotName(tab)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-panel">
      <slot :name="activeTab" :tab="activeTab">
        <!-- Fallback: show named slot matching active tab -->
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: { type: Array, required: true } // [{ label: 'Tab 1', name?: 'tab1' }, ...]
})

function slotName(tab) {
  return tab.name || tab.label
}

const activeTab = ref(slotName(props.tabs[0]))
</script>
