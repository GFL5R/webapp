<template>
  <div
    class="builder-toggle"
    :class="{ open: isOpen }"
    @click="toggle"
    title="Character Builder"
  >
    {{ isOpen ? 'CLOSE' : 'BUILD' }}
  </div>
</template>

<script setup>
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'

const { isOpen, toggle } = useCharacterBuilder()
</script>
