<template>
  <div class="builder-section">
    <div class="builder-section-title">Identity</div>

    <!-- Character Type Toggle -->
    <div class="builder-identity-type">
      <button
        class="builder-type-btn"
        :class="{ active: builder.character.system.identity.characterType === 'human' }"
        @click="selectType('human')"
      >Human Commander</button>
      <button
        class="builder-type-btn"
        :class="{ active: builder.character.system.identity.characterType === 't-doll' }"
        @click="selectType('t-doll')"
      >T-Doll</button>
    </div>

    <!-- Name -->
    <div class="builder-identity-row">
      <label>Name</label>
      <input
        type="text"
        :value="builder.character.name"
        @input="builder.character.name = $event.target.value"
        placeholder="Character name"
      />
    </div>

    <!-- Age -->
    <div class="builder-identity-row">
      <label>Age</label>
      <input
        type="text"
        :value="builder.character.system.identity.age"
        @input="builder.setIdentity('age', $event.target.value)"
        placeholder="Age"
      />
    </div>

    <!-- Human fields -->
    <template v-if="builder.character.system.identity.characterType === 'human'">
      <div class="builder-identity-row">
        <label>Nationality</label>
        <select
          :value="builder.character.system.identity.nationality"
          @change="onNationalityChange($event.target.value)"
        >
          <option value="">-- Select --</option>
          <option
            v-for="n in NATIONALITIES"
            :key="n.key"
            :value="n.key"
          >{{ n.label }}</option>
        </select>
      </div>

      <div class="builder-identity-row">
        <label>Background</label>
        <select
          :value="builder.character.system.identity.background"
          @change="onBackgroundChange($event.target.value)"
        >
          <option value="">-- Select --</option>
          <option
            v-for="b in BACKGROUNDS"
            :key="b.key"
            :value="b.key"
          >{{ b.label }}</option>
        </select>
      </div>
    </template>

    <!-- T-Doll fields -->
    <template v-if="builder.character.system.identity.characterType === 't-doll'">
      <div class="builder-identity-row">
        <label>Frame</label>
        <select
          :value="builder.character.system.identity.frame"
          @change="onFrameChange($event.target.value)"
        >
          <option value="">-- Select --</option>
          <option
            v-for="f in FRAMES"
            :key="f.key"
            :value="f.key"
          >{{ f.model }} ({{ f.manufacturer }})</option>
        </select>
      </div>

      <div class="builder-identity-row">
        <label>Manufacturer</label>
        <input
          type="text"
          :value="builder.character.system.identity.manufacturer"
          readonly
          class="readonly"
        />
      </div>

      <div class="builder-identity-row">
        <label>Model</label>
        <input
          type="text"
          :value="builder.character.system.identity.model"
          readonly
          class="readonly"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'
import { NATIONALITIES, BACKGROUNDS, FRAMES } from './character-data.js'

const builder = useCharacterBuilder()

// ---- Character type ----
function selectType(type) {
  builder.setCharacterType(type)
}

// ---- Human: Nationality & Background ----
function applyHumanBonuses() {
  const natKey = builder.character.system.identity.nationality
  const bgKey = builder.character.system.identity.background

  // Start from base 1 on all approaches
  const approaches = { power: 1, precision: 1, swiftness: 1, resilience: 1, fortune: 1 }

  // Nationality bonus
  const nation = NATIONALITIES.find(n => n.key === natKey)
  if (nation) {
    nation.approaches.forEach(a => {
      if (approaches[a] !== undefined) approaches[a] += 1
    })
  }

  // Background bonus
  const bg = BACKGROUNDS.find(b => b.key === bgKey)
  if (bg && approaches[bg.approach] !== undefined) {
    approaches[bg.approach] += 1
  }

  builder.setAllApproaches(approaches)

  // Free skill from background
  builder.setFreeSkills(bg ? [bg.skill] : [])
}

function onNationalityChange(value) {
  builder.setIdentity('nationality', value)
  applyHumanBonuses()
}

function onBackgroundChange(value) {
  builder.setIdentity('background', value)
  applyHumanBonuses()
}

// ---- T-Doll: Frame ----
function onFrameChange(value) {
  builder.setIdentity('frame', value)
  const frame = FRAMES.find(f => f.key === value)
  if (frame) {
    builder.setAllApproaches(frame.approaches)
    builder.setFreeSkills(frame.skills)
    builder.setIdentity('manufacturer', frame.manufacturer)
    builder.setIdentity('model', frame.model)
  } else {
    builder.setIdentity('manufacturer', '')
    builder.setIdentity('model', '')
  }
}
</script>

<style scoped>
input.readonly {
  opacity: 0.6;
  cursor: default;
}
</style>
