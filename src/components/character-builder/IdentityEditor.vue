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

    <!-- Name is part of Q11 below -->

    <!-- Human fields -->
    <template v-if="builder.character.system.identity.characterType === 'human'">
      <!-- Q1: Nationality + childhood narrative -->
      <div class="builder-identity-row">
        <label>Nationality (Q1)</label>
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
        <span class="builder-gear-hint" v-if="nationalityGear">Gear: {{ nationalityGear }}</span>
      </div>

      <div class="builder-identity-row">
        <label class="builder-narrative-label">Childhood (Q1)</label>
        <textarea
          :value="tq.step1Narrative"
          @input="builder.setTwelveQNarrative('step1Narrative', $event.target.value)"
          placeholder="Briefly describe your childhood..."
          rows="2"
        ></textarea>
      </div>

      <!-- Q2: Background + professional history -->
      <div class="builder-identity-row">
        <label>Background (Q2)</label>
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
        <span class="builder-gear-hint" v-if="backgroundGear">Gear: {{ backgroundGear }}</span>
      </div>

      <div class="builder-identity-row">
        <label class="builder-narrative-label">Professional History (Q2)</label>
        <textarea
          :value="tq.step2Narrative"
          @input="builder.setTwelveQNarrative('step2Narrative', $event.target.value)"
          placeholder="Briefly describe your professional history..."
          rows="2"
        ></textarea>
      </div>

      <!-- Q3: Mentor narrative -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">Mentor (Q3)</label>
        <textarea
          :value="tq.step3Narrative"
          @input="builder.setTwelveQNarrative('step3Narrative', $event.target.value)"
          placeholder="Describe your mentor..."
          rows="2"
        ></textarea>
      </div>

      <!-- Q4: Why do you fight? -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">Why do you fight? (Q4)</label>
        <textarea
          :value="tq.step4Narrative"
          @input="builder.setTwelveQNarrative('step4Narrative', $event.target.value)"
          placeholder="Why do you fight?"
          rows="2"
        ></textarea>
      </div>
      <div class="builder-identity-row">
        <label>Bonus Skill (Q4)</label>
        <select
          :value="tq.q4BonusSkill"
          @change="onQ4SkillChange($event.target.value)"
        >
          <option value="none">-- None --</option>
          <option v-for="s in SKILL_IDS" :key="s" :value="s">{{ formatSkill(s) }}</option>
        </select>
      </div>

      <!-- Q5: Why would you stop? -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">Why would you stop? (Q5)</label>
        <textarea
          :value="tq.step5Narrative"
          @input="builder.setTwelveQNarrative('step5Narrative', $event.target.value)"
          placeholder="What would make you stop?"
          rows="2"
        ></textarea>
      </div>
      <div class="builder-identity-row">
        <label>Bonus Approach (Q5)</label>
        <select
          :value="tq.q5BonusApproach"
          @change="onQ5ApproachChange($event.target.value)"
        >
          <option value="none">-- None --</option>
          <option value="power">Power</option>
          <option value="precision">Precision</option>
          <option value="swiftness">Swiftness</option>
          <option value="resilience">Resilience</option>
          <option value="fortune">Fortune</option>
        </select>
      </div>

      <!-- Q6: What are Dolls? -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">What are Dolls? (Q6)</label>
        <textarea
          :value="tq.step6Narrative"
          @input="builder.setTwelveQNarrative('step6Narrative', $event.target.value)"
          placeholder="What are they to you?"
          rows="2"
        ></textarea>
      </div>
      <div class="builder-identity-row">
        <label>View of Dolls (Q6)</label>
        <select
          :value="builder.character.system.social.view_of_dolls"
          @change="builder.setSocial('view_of_dolls', $event.target.value)"
        >
          <option value="favor">Person — +5 Humanity</option>
          <option value="tools">Object — +1 Skill</option>
        </select>
      </div>
    </template>

    <!-- T-Doll fields -->
    <template v-if="builder.character.system.identity.characterType === 't-doll'">
      <!-- Q1: Frame + awakening -->
      <div class="builder-identity-row">
        <label>Frame (Q1)</label>
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

      <div class="builder-identity-row">
        <label class="builder-narrative-label">Awakening (Q1)</label>
        <textarea
          :value="tq.step1Narrative"
          @input="builder.setTwelveQNarrative('step1Narrative', $event.target.value)"
          placeholder="Describe your first awakening..."
          rows="2"
        ></textarea>
      </div>

      <!-- Q2: Modules narrative -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">Upgrade History (Q2)</label>
        <textarea
          :value="tq.step2Narrative"
          @input="builder.setTwelveQNarrative('step2Narrative', $event.target.value)"
          placeholder="Describe your upgrade history..."
          rows="2"
        ></textarea>
      </div>

      <!-- Q3: Weapon narrative -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">Weapon Imprint (Q3)</label>
        <textarea
          :value="tq.step3Narrative"
          @input="builder.setTwelveQNarrative('step3Narrative', $event.target.value)"
          placeholder="Describe your relationship with your weapon..."
          rows="2"
        ></textarea>
      </div>

      <!-- Q4: Why do you fight? -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">Why do you fight? (Q4)</label>
        <textarea
          :value="tq.step4Narrative"
          @input="builder.setTwelveQNarrative('step4Narrative', $event.target.value)"
          placeholder="Why do you fight?"
          rows="2"
        ></textarea>
      </div>
      <div class="builder-identity-row">
        <label>Bonus Skill (Q4)</label>
        <select
          :value="tq.q4BonusSkill"
          @change="onQ4SkillChange($event.target.value)"
        >
          <option value="none">-- None --</option>
          <option v-for="s in SKILL_IDS" :key="s" :value="s">{{ formatSkill(s) }}</option>
        </select>
      </div>

      <!-- Q5: Why would you stop? -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">Why would you stop? (Q5)</label>
        <textarea
          :value="tq.step5Narrative"
          @input="builder.setTwelveQNarrative('step5Narrative', $event.target.value)"
          placeholder="What would make you stop?"
          rows="2"
        ></textarea>
      </div>
      <div class="builder-identity-row">
        <label>Bonus Approach (Q5)</label>
        <select
          :value="tq.q5BonusApproach"
          @change="onQ5ApproachChange($event.target.value)"
        >
          <option value="none">-- None --</option>
          <option value="power">Power</option>
          <option value="precision">Precision</option>
          <option value="swiftness">Swiftness</option>
          <option value="resilience">Resilience</option>
          <option value="fortune">Fortune</option>
        </select>
      </div>

      <!-- Q6: What are Humans? -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">What are Humans? (Q6)</label>
        <textarea
          :value="tq.step6Narrative"
          @input="builder.setTwelveQNarrative('step6Narrative', $event.target.value)"
          placeholder="What are humans to you?"
          rows="2"
        ></textarea>
      </div>
      <div class="builder-identity-row">
        <label>Relationship (Q6)</label>
        <select
          :value="builder.character.system.social.view_of_dolls"
          @change="builder.setSocial('view_of_dolls', $event.target.value)"
        >
          <option value="favor">Positive — +5 Humanity</option>
          <option value="tools">Negative — +1 Skill</option>
        </select>
      </div>

      <!-- Q7-Q10 narrative fields -->
      <div class="builder-identity-row">
        <label class="builder-narrative-label">Greatest Achievement (Q7)</label>
        <textarea
          :value="tq.step7Narrative"
          @input="builder.setTwelveQNarrative('step7Narrative', $event.target.value)"
          placeholder="Describe your defining moment..."
          rows="2"
        ></textarea>
      </div>

      <div class="builder-identity-row">
        <label class="builder-narrative-label">Malfunction (Q8)</label>
        <textarea
          :value="tq.step8Narrative"
          @input="builder.setTwelveQNarrative('step8Narrative', $event.target.value)"
          placeholder="What holds you back?"
          rows="2"
        ></textarea>
      </div>

      <div class="builder-identity-row">
        <label class="builder-narrative-label">Quirk (Q9)</label>
        <textarea
          :value="tq.step9Narrative"
          @input="builder.setTwelveQNarrative('step9Narrative', $event.target.value)"
          placeholder="What makes you different?"
          rows="2"
        ></textarea>
      </div>

      <div class="builder-identity-row">
        <label class="builder-narrative-label">Fear (Q10)</label>
        <textarea
          :value="tq.step10Narrative"
          @input="builder.setTwelveQNarrative('step10Narrative', $event.target.value)"
          placeholder="What are you most afraid of?"
          rows="2"
        ></textarea>
      </div>
    </template>

    <!-- Q11: Name + Meaning (human) -->
    <div class="builder-identity-row" v-if="builder.character.system.identity.characterType === 'human'">
      <label>Name (Q11)</label>
      <input
        type="text"
        :value="builder.character.name"
        @input="builder.character.name = $event.target.value"
        placeholder="Your name"
      />
    </div>
    <div class="builder-identity-row" v-if="builder.character.system.identity.characterType === 'human'">
      <label>Name Meaning (Q11)</label>
      <textarea
        :value="builder.character.system.narrative.name_meaning"
        @input="builder.character.system.narrative.name_meaning = $event.target.value"
        placeholder="What does your name mean?"
        rows="2"
      ></textarea>
    </div>

    <!-- Q11: Name + Origin (T-Doll) -->
    <div class="builder-identity-row" v-if="builder.character.system.identity.characterType === 't-doll'">
      <label>Name (Q11)</label>
      <input
        type="text"
        :value="builder.character.name"
        @input="builder.character.name = $event.target.value"
        placeholder="Your name"
      />
    </div>
    <div class="builder-identity-row" v-if="builder.character.system.identity.characterType === 't-doll'">
      <label>Name Origin (Q11)</label>
      <select
        :value="builder.character.system.identity.name_origin"
        @change="builder.setIdentity('name_origin', $event.target.value)"
      >
        <option value="human">Human Name (+5 Humanity)</option>
        <option value="callsign">Callsign / Nickname (+5 Fame)</option>
        <option value="weapon">Weapon Designation (+1 Firearms, −5 Humanity)</option>
        <option value="weird">Weird Name (−5 Fame)</option>
      </select>
    </div>

    <!-- Q12: Story End -->
    <div class="builder-identity-row">
      <label>Story End (Q12)</label>
      <textarea
        :value="builder.character.system.narrative.story_end"
        @input="builder.character.system.narrative.story_end = $event.target.value"
        placeholder="How does your story end?"
        rows="2"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'
import { NATIONALITIES, BACKGROUNDS, FRAMES } from './character-data.js'

const builder = useCharacterBuilder()
const tq = builder.getTwelveQ()
const { SKILL_IDS } = builder

// ---- Skill formatting ----
function formatSkill(id) {
  return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

// ---- Gear display helpers ----
const nationalityGear = computed(() => {
  const nat = NATIONALITIES.find(n => n.key === builder.character.system.identity.nationality)
  return nat?.gear || ''
})

const backgroundGear = computed(() => {
  const bg = BACKGROUNDS.find(b => b.key === builder.character.system.identity.background)
  return bg?.gear || ''
})

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

  // Q5 bonus approach
  const tq = builder.getTwelveQ()
  if (tq.q5BonusApproach && tq.q5BonusApproach !== 'none') {
    if (approaches[tq.q5BonusApproach] !== undefined) {
      approaches[tq.q5BonusApproach] += 1
    }
  }

  builder.setAllApproaches(approaches)

  // Free skills: background + Q4 bonus (if any)
  const freeSkills = bg ? [bg.skill] : []
  if (tq.q4BonusSkill && tq.q4BonusSkill !== 'none' && !freeSkills.includes(tq.q4BonusSkill)) {
    freeSkills.push(tq.q4BonusSkill)
  }
  builder.setFreeSkills(freeSkills)
}

function onNationalityChange(value) {
  builder.setIdentity('nationality', value)
  builder.applyNationalityGear(value)
  applyHumanBonuses()
}

function onBackgroundChange(value) {
  builder.setIdentity('background', value)
  builder.applyBackgroundGear(value)
  applyHumanBonuses()
}

// ---- Q4/Q5 bonus handlers ----
function onQ4SkillChange(value) {
  builder.clearQ4BonusSkill()
  builder.setQ4BonusSkill(value)
}

function onQ5ApproachChange(value) {
  builder.setQ5BonusApproach(value)
  if (builder.character.system.identity.characterType === 'human') {
    applyHumanBonuses()
  } else {
    // Re-apply frame to recalculate with new Q5 bonus
    const frameKey = builder.character.system.identity.frame
    if (frameKey) onFrameChange(frameKey)
  }
}

// ---- T-Doll: Frame ----
function onFrameChange(value) {
  builder.setIdentity('frame', value)
  const frame = FRAMES.find(f => f.key === value)
  if (frame) {
    let approaches = { ...frame.approaches }

    // Q5 bonus approach
    const tq = builder.getTwelveQ()
    if (tq.q5BonusApproach && tq.q5BonusApproach !== 'none') {
      if (approaches[tq.q5BonusApproach] !== undefined) {
        approaches[tq.q5BonusApproach] += 1
      }
    }

    builder.setAllApproaches(approaches)

    // Free skills: frame skills + Q4 bonus (if any)
    const freeSkills = [...frame.skills]
    if (tq.q4BonusSkill && tq.q4BonusSkill !== 'none' && !freeSkills.includes(tq.q4BonusSkill)) {
      freeSkills.push(tq.q4BonusSkill)
    }
    builder.setFreeSkills(freeSkills)
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

.builder-gear-hint {
  font-family: var(--font-mono);
  font-size: 0.54rem;
  color: var(--amber);
  margin-top: 2px;
}

.builder-narrative-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--amber);
}

textarea {
  width: 100%;
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 4px 6px;
  resize: vertical;
  border-radius: 3px;
}
</style>
