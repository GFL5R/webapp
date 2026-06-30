<template>
  <template v-for="(part, i) in parts" :key="i">
    <DiceSymbol v-if="part.type === 'symbol'" :name="part.name" size="small" />
    <span v-else>{{ part.value }}</span>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import DiceSymbol from '@/components/data/DiceSymbol.vue'

const props = defineProps({
  text: { type: String, required: true }
})

const SYMBOL_MAP = {
  op: 'Opportunity',
  su: 'Success',
  st: 'Strife',
  ex: 'Explosion'
}

const parts = computed(() => {
  const raw = props.text
  const tokens = []
  // Match any dice shortcode: (op), (su), (st), (ex) with optional +
  const regex = /\((op|su|st|ex)\)\+?/g
  let last = 0
  let match
  while ((match = regex.exec(raw)) !== null) {
    if (match.index > last) {
      tokens.push({ type: 'text', value: raw.slice(last, match.index) })
    }
    tokens.push({ type: 'symbol', name: SYMBOL_MAP[match[1]] })
    last = regex.lastIndex
  }
  if (last < raw.length) {
    tokens.push({ type: 'text', value: raw.slice(last) })
  }
  return tokens.length ? tokens : [{ type: 'text', value: raw }]
})
</script>
