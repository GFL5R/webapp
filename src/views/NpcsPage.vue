<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />
    <h1>NPCs</h1>

    <p>NPCs in GFL5R use a simplified stat block compared to player characters. Where a T-Doll or Commander has a full list of individual skills, NPCs operate with broad <strong>Skill Groups</strong> that cover entire categories of action.</p>

    <!-- Toolbar -->
    <div class="db-toolbar">
      <input
        v-model="search"
        type="text"
        class="db-search"
        placeholder="Search NPCs…"
      />
      <select v-model="sortBy" class="db-sort">
        <option value="name">Name A–Z</option>
        <option value="type">By Type</option>
      </select>
    </div>

    <FilterBar v-model="activeType" :filters="typeFilters" />

    <!-- Rating sliders -->
    <div class="npc-rating-sliders">
      <div class="npc-rating-slider">
        <label>Combat Rating <span>{{ crMin }}–{{ crMax }}</span></label>
        <div class="dual-range">
          <input type="range" v-model.number="crMin" :min="crFloor" :max="crCeil" @input="clampCR" />
          <input type="range" v-model.number="crMax" :min="crFloor" :max="crCeil" @input="clampCRMax" />
        </div>
      </div>
      <div class="npc-rating-slider">
        <label>Social Rating <span>{{ srMin }}–{{ srMax }}</span></label>
        <div class="dual-range">
          <input type="range" v-model.number="srMin" :min="srFloor" :max="srCeil" @input="clampSR" />
          <input type="range" v-model.number="srMax" :min="srFloor" :max="srCeil" @input="clampSRMax" />
        </div>
      </div>
    </div>

    <!-- Results count -->
    <p class="db-count">{{ filtered.length }} of {{ npcs.length }} NPCs</p>

    <!-- NPC grid -->
    <div class="db-grid" v-if="filtered.length">
      <div
        v-for="npc in filtered"
        :key="npc.id"
        :id="npc.id"
        class="db-item"
        :class="{ expanded: expanded === npc.id }"
        @click="toggleNpc(npc.id)"
      >
        <div class="db-item-header">
          <div>
            <span class="db-item-name">{{ npc.name }}</span>
            <span v-if="npc.type" class="db-type-tag" style="margin-left:8px">{{ npc.type }}</span>
          </div>
          <!-- Approach dots in collapsed state -->
          <div class="npc-approaches" v-if="expanded !== npc.id">
            <span
              v-for="(val, name) in npc.approaches"
              :key="name"
              class="npc-approach-dot"
              :style="{ borderColor: approachColor(name) }"
            >{{ val }}</span>
            <span class="npc-rating">CR {{ npc.combatRating }}</span>
            <span class="npc-rating npc-rating-social">SR {{ npc.socialRating }}</span>
          </div>
        </div>

        <!-- Expanded detail -->
        <div class="db-item-detail" v-if="expanded === npc.id">
          <!-- Flavor (top, no heading) -->
          <p class="npc-flavor-top" v-if="npc.flavor">{{ npc.flavor }}</p>

          <!-- Approach stat icons (colored border boxes, no heading) -->
          <div class="npc-approaches" style="margin-bottom:14px">
            <span
              v-for="(val, name) in npc.approaches"
              :key="name"
              class="npc-approach-dot"
              :style="{ borderColor: approachColor(name) }"
            >{{ val }}</span>
          </div>

          <div class="npc-detail-grid">
            <!-- Left column -->
            <div>
              <!-- Skills -->
              <div class="npc-detail-section" v-if="Object.keys(npc.skills).length">
                <h4>Skills</h4>
                <div class="npc-skill-row" v-for="(val, name) in npc.skills" :key="name">
                  <span class="npc-skill-name">{{ name }}</span>
                  <span class="npc-skill-value">{{ val }}</span>
                </div>
              </div>

              <!-- Armor & Type -->
              <div class="npc-detail-section">
                <h4>Details</h4>
                <div class="npc-skill-row">
                  <span class="npc-skill-name">Type</span>
                  <span class="npc-skill-value">{{ npc.type || '—' }}</span>
                </div>
                <div class="npc-skill-row">
                  <span class="npc-skill-name">Armor</span>
                  <span class="npc-skill-value">{{ npc.armor }}</span>
                </div>
                <div class="npc-skill-row">
                  <span class="npc-skill-name">Combat Rating</span>
                  <span class="npc-skill-value" style="color:var(--rose)">{{ npc.combatRating }}</span>
                </div>
                <div class="npc-skill-row">
                  <span class="npc-skill-name">Social Rating</span>
                  <span class="npc-skill-value" style="color:var(--amber)">{{ npc.socialRating }}</span>
                </div>
                <div class="npc-skill-row" v-if="npc.advantages">
                  <span class="npc-skill-name">Advantage</span>
                  <span class="npc-skill-value">{{ npc.advantages }}</span>
                </div>
                <div class="npc-skill-row" v-if="npc.disadvantages">
                  <span class="npc-skill-name">Disadvantage</span>
                  <span class="npc-skill-value">{{ npc.disadvantages }}</span>
                </div>
                <div class="npc-skill-row" v-if="npc.passion">
                  <span class="npc-skill-name">Passion</span>
                  <span class="npc-skill-value">{{ npc.passion }}</span>
                </div>
                <div class="npc-skill-row" v-if="npc.anxiety">
                  <span class="npc-skill-name">Anxiety</span>
                  <span class="npc-skill-value">{{ npc.anxiety }}</span>
                </div>
              </div>
            </div>

            <!-- Right column -->
            <div>
              <!-- Attacks -->
              <div class="npc-detail-section" v-if="npc.attacks.length">
                <h4>Attacks</h4>
                <div class="npc-attack-card" v-for="(atk, i) in npc.attacks" :key="i">
                  <div class="npc-attack-name">{{ atk.name }}</div>
                  <div class="npc-attack-prop" v-for="(prop, pi) in parseAttackProps(atk.description)" :key="pi">
                    <span class="npc-attack-prop-label">{{ prop.label }}</span>
                    <span class="npc-attack-prop-value">{{ prop.value }}</span>
                  </div>
                  <p style="font-size:0.82rem;color:var(--ink-dim);margin-top:6px;margin-bottom:0" v-html="atk.description"></p>
                </div>
              </div>
            </div>
          </div>

          <!-- Special Rules -->
          <div class="npc-detail-section" v-if="npc.specialRules.length">
            <h4>Special Rules</h4>
            <ul>
              <li v-for="(rule, i) in npc.specialRules" :key="i" v-html="renderMarkdownInline(rule)"></li>
            </ul>
          </div>

          <!-- Behaviors -->
          <div class="npc-detail-section" v-if="npc.behaviors">
            <h4>Behaviors</h4>
            <p v-for="(para, i) in npc.behaviors.split('\n\n')" :key="i" style="font-size:0.88rem;color:var(--ink-dim)">{{ para }}</p>
          </div>

          <!-- Background -->
          <div class="npc-detail-section" v-if="npc.background">
            <h4>Background</h4>
            <p v-for="(para, i) in npc.background.split('\n\n')" :key="i" style="font-size:0.88rem;color:var(--ink-dim)">{{ para }}</p>
          </div>

          <!-- Copy link -->
          <button class="db-copy-link" @click.stop="copyLink(npc.id)">
            {{ linkCopied === npc.id ? '✓ Copied!' : '🔗 Copy Link' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="db-empty">
      <p>No NPCs match your search.</p>
    </div>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import FilterBar from '@/components/data/FilterBar.vue'
import PageNav from '@/components/layout/PageNav.vue'
import npcs from '@/data/npcs.json'

const route = useRoute()
const router = useRouter()

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'NPCs' }
]

const prev = { to: '/crime', label: 'Crime' }
const next = { to: '/attribution', label: 'Attribution' }

// State
const search = ref('')
const sortBy = ref('name')
const activeType = ref('All')
const expanded = ref(null)
const linkCopied = ref(null)

// Derive rating bounds from data
const crAll = npcs.map(n => n.combatRating)
const srAll = npcs.map(n => n.socialRating)
const crFloor = Math.min(...crAll)
const crCeil = Math.max(...crAll)
const srFloor = Math.min(...srAll)
const srCeil = Math.max(...srAll)
const crMin = ref(crFloor)
const crMax = ref(crCeil)
const srMin = ref(srFloor)
const srMax = ref(srCeil)

// Prevent min/max crossover
function clampCR() {
  if (crMin.value > crMax.value) crMin.value = crMax.value
}
function clampCRMax() {
  if (crMax.value < crMin.value) crMax.value = crMin.value
}
function clampSR() {
  if (srMin.value > srMax.value) srMin.value = srMax.value
}
function clampSRMax() {
  if (srMax.value < srMin.value) srMax.value = srMin.value
}

// Derive all unique NPC types
const allTypes = [...new Set(npcs.map(n => n.type))].sort()

const typeFilters = [
  { label: 'All', value: 'All' },
  ...allTypes.map(t => ({ label: t, value: t }))
]

// Approach colors
const approachColors = {
  Power: 'var(--rose)',
  Precision: 'var(--amber)',
  Swiftness: '#4aa8ff',
  Resilience: 'var(--success)',
  Fortune: '#9c27b0'
}

function approachColor(name) {
  return approachColors[name] || 'var(--cyan)'
}

// Filtered + sorted
const filtered = computed(() => {
  let results = npcs

  // Type filter
  if (activeType.value !== 'All') {
    results = results.filter(n => n.type === activeType.value)
  }

  // Rating filters
  results = results.filter(n =>
    n.combatRating >= crMin.value && n.combatRating <= crMax.value &&
    n.socialRating >= srMin.value && n.socialRating <= srMax.value
  )

  // Search
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    results = results.filter(n =>
      n.name.toLowerCase().includes(q) ||
      n.type.toLowerCase().includes(q) ||
      (n.flavor && n.flavor.toLowerCase().includes(q))
    )
  }

  // Sort
  if (sortBy.value === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'type') {
    results = [...results].sort((a, b) => {
      return (a.type || '').localeCompare(b.type || '') || a.name.localeCompare(b.name)
    })
  }

  return results
})

// Parse attack description for key properties
function parseAttackProps(desc) {
  const props = []
  // Match <strong>Key + Key</strong> pattern like "<strong>Swiftness + Combat</strong>"
  const poolMatch = desc.match(/<strong>(.+?)<\/strong>/)
  if (poolMatch) {
    props.push({ label: 'Pool', value: poolMatch[1] })
  }
  // Match "at range N"
  const rangeMatch = desc.match(/at range (\d+)/)
  if (rangeMatch) {
    props.push({ label: 'Range', value: rangeMatch[1] })
  }
  // Match "Deals N Fatigue" or "N Fatigue"
  const dmgMatch = desc.match(/(?:Deals?\s+)?(\d+\s*(?:Fatigue|Collapse))/)
  if (dmgMatch) {
    props.push({ label: 'Damage', value: dmgMatch[1] })
  }
  // Match "Deadliness N"
  const deadMatch = desc.match(/Deadliness (\d+)/)
  if (deadMatch) {
    props.push({ label: 'Deadliness', value: deadMatch[1] })
  }
  return props
}

// Render bold markers in rules as HTML
function renderMarkdownInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

// Toggle expand
function toggleNpc(id) {
  if (expanded.value === id) {
    expanded.value = null
    router.replace({ hash: '' })
  } else {
    expanded.value = id
    router.replace({ hash: '#' + id })
  }
}

// Copy link to clipboard
function copyLink(id) {
  const url = window.location.origin + window.location.pathname + '#/' + route.path + '#' + id
  navigator.clipboard.writeText(url).then(() => {
    linkCopied.value = id
    setTimeout(() => { linkCopied.value = null }, 2000)
  })
}

// Restore expanded from hash on mount
onMounted(() => {
  const hash = route.hash?.replace('#', '')
  if (hash && npcs.some(n => n.id === hash)) {
    expanded.value = hash
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

// Watch hash changes
watch(() => route.hash, (hash) => {
  const id = hash?.replace('#', '')
  if (id && npcs.some(n => n.id === id)) {
    expanded.value = id
  } else if (!id) {
    expanded.value = null
  }
})
</script>
