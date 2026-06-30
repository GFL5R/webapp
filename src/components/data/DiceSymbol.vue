<template>
  <img
    v-if="src"
    :src="src"
    :alt="name"
    class="dice-symbol-img"
    :class="sizeClass"
  />
  <span v-else class="dice-symbol-text">{{ name }}</span>
</template>

<script setup>
import { computed } from 'vue'
import SuccessSvg from '@/assets/images/Success.svg'
import OpportunitySvg from '@/assets/images/Opportunity.svg'
import StrifeSvg from '@/assets/images/Strife.svg'
import ExplosionSvg from '@/assets/images/Explosion.svg'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'inline' } // 'inline' | 'small' | 'large'
})

const symbolMap = {
  Success: SuccessSvg,
  Opportunity: OpportunitySvg,
  Strife: StrifeSvg,
  Explosion: ExplosionSvg
}

const src = computed(() => symbolMap[props.name] || null)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'large': return 'dice-symbol-lg'
    case 'small': return 'dice-symbol-sm'
    default: return 'dice-symbol-inline'
  }
})
</script>

<style scoped>
.dice-symbol-img {
  vertical-align: middle;
  position: relative;
  top: -1px;
}
.dice-symbol-inline {
  width: 18px;
  height: 18px;
}
.dice-symbol-sm {
  width: 14px;
  height: 14px;
}
.dice-symbol-lg {
  width: 28px;
  height: 28px;
}
.dice-symbol-text {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--cyan-dim);
}
</style>
