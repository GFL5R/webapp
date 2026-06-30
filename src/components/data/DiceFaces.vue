<template>
  <div class="dice-faces">
    <div class="dice-col" v-for="col in columns" :key="col.name">
      <div class="dice-col-header">
        <h4 class="dice-col-title">{{ col.name }}</h4>
        <div class="dice-col-subtitle">{{ col.subtitle }}</div>
      </div>
      <ul class="dice-list">
        <li v-for="face in col.faces" :key="face.label">
          <span class="dice-marker">▸</span>
          <span class="dice-result">{{ face.label }}</span>
          <span v-if="face.symbol && face.symbol !== '—'" class="dice-symbol">
            <DiceSymbol
              v-for="sym in face.symbol.split(/,\s*/)"
              :key="sym"
              :name="sym"
              size="small"
            />
          </span>
          <span v-else-if="face.symbol === '—'" class="dice-symbol dice-symbol-blank">—</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import DiceSymbol from '@/components/data/DiceSymbol.vue'

defineProps({
  columns: { type: Array, required: true }
  // Each: { name, subtitle, faces: [{ label, symbol }] }
})
</script>

<style scoped>
.dice-faces {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin: 16px 0;
}
.dice-col {
  background: var(--panel);
  border: 1px solid var(--line);
  padding: 20px;
}
.dice-col-header {
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line-soft);
}
.dice-col-title { margin: 0; }
.dice-col-subtitle {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  color: var(--ink-faint);
  margin-top: 4px;
}
.dice-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.dice-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 0.88rem;
  color: var(--ink-dim);
}
.dice-marker { color: var(--cyan-dim); }
.dice-result { flex: 1; }
.dice-symbol {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
.dice-symbol-blank {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--cyan-dim);
}
</style>