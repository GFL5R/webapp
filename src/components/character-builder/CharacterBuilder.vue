<template>
  <!-- Builder toggle tab (always visible) -->
  <BuilderToggle />

  <!-- Main builder panel -->
  <div class="builder-panel" :class="{ closed: !isOpen }">
    <!-- Header -->
    <div class="builder-header">
      <span class="builder-header-title">CHARACTER BUILDER</span>
      <button class="builder-header-close" @click="close" title="Close">&times;</button>
    </div>

    <!-- Scrollable body — all sections in one flow -->
    <div class="builder-body">

      <!-- ======= SETUP ======= -->
      <div class="builder-section">
        <div class="builder-section-title">Character Type</div>
        <div class="builder-identity-type">
          <button class="builder-type-btn" :class="{ active: isHuman }" @click="selectType('human')">Human Commander</button>
          <button class="builder-type-btn" :class="{ active: !isHuman }" @click="selectType('t-doll')">T-Doll</button>
        </div>
      </div>

      <div class="builder-section">
        <div class="builder-section-title">Approaches</div>
        <ApproachEditor />
      </div>

      <div class="builder-section">
        <div class="builder-section-title">Skills</div>
        <SkillEditor />
      </div>

      <!-- ======= PART I: ORIGIN ======= -->
      <SectionDivider label="PART I: ORIGIN" />

      <template v-if="isHuman">
        <div class="builder-section">
          <h2 class="builder-q-heading">Q1: Where are you from?</h2>
          <p class="builder-flavor">Select your nationality and briefly describe your childhood.</p>
          <div class="builder-identity-row">
            <label>Nationality</label>
            <select :value="character.system.identity.nationality" @change="onNationalityChange($event.target.value)">
              <option value="">-- Select --</option>
              <option v-for="n in NATIONALITIES" :key="n.key" :value="n.key">{{ n.label }}</option>
            </select>
            <span class="builder-gear-hint" v-if="nationalityGear">Gear: {{ nationalityGear }}</span>
          </div>
          <div class="builder-identity-row">
            <label class="builder-narrative-label">Childhood</label>
            <textarea :value="tq.step1Narrative" @input="builder.setTwelveQNarrative('step1Narrative', $event.target.value)" placeholder="Briefly describe your childhood..." rows="2"></textarea>
          </div>

          <h2 class="builder-q-heading">Q2: What kind of job did you have before this one?</h2>
          <p class="builder-flavor">Select your background. Grants one approach, one skill, and starting gear.</p>
          <div class="builder-identity-row">
            <label>Background</label>
            <select :value="character.system.identity.background" @change="onBackgroundChange($event.target.value)">
              <option value="">-- Select --</option>
              <option v-for="b in BACKGROUNDS" :key="b.key" :value="b.key">{{ b.label }}</option>
            </select>
            <span class="builder-gear-hint" v-if="backgroundGear">Gear: {{ backgroundGear }}</span>
          </div>
          <div class="builder-identity-row">
            <label class="builder-narrative-label">Professional History</label>
            <textarea :value="tq.step2Narrative" @input="builder.setTwelveQNarrative('step2Narrative', $event.target.value)" placeholder="Briefly describe your professional history..." rows="2"></textarea>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="builder-section">
          <h2 class="builder-q-heading">Q1: Who made you, and what is your model number?</h2>
          <p class="builder-flavor">Select your frame. Sets your starting approaches and skills.</p>
          <div class="builder-identity-row">
            <label>Frame</label>
            <select :value="character.system.identity.frame" @change="onFrameChange($event.target.value)">
              <option value="">-- Select --</option>
              <option v-for="f in FRAMES" :key="f.key" :value="f.key">{{ f.model }} ({{ f.manufacturer }})</option>
            </select>
          </div>
          <div class="builder-identity-row">
            <label>Manufacturer / Model</label>
            <input type="text" :value="character.system.identity.manufacturer + ' — ' + character.system.identity.model" readonly class="readonly" />
          </div>
          <div class="builder-identity-row">
            <label class="builder-narrative-label">Awakening</label>
            <textarea :value="tq.step1Narrative" @input="builder.setTwelveQNarrative('step1Narrative', $event.target.value)" placeholder="Describe your first awakening..." rows="2"></textarea>
          </div>

          <h2 class="builder-q-heading">Q2: What modifications set you apart?</h2>
          <p class="builder-flavor">Spend up to 60,000 credits on upgrade modules.</p>

          <!-- Modules drop zone -->
          <div class="builder-section-title" style="margin-bottom:4px">Modules</div>
          <div class="builder-drop-zone" :class="{ 'drag-over': moduleDragOver, 'empty': modules.length === 0 }"
            @dragover.prevent="moduleDragOver = true"
            @dragleave="moduleDragOver = false"
            @drop.prevent.stop="onModuleDrop">
            <template v-if="modules.length === 0">Drag modules here</template>
            <div v-for="m in modules" :key="m._id || m.name" class="builder-item">
              <span class="builder-item-name">{{ m.name }}</span>
              <button class="builder-item-remove" @click.stop="builder.removeItem(m._id || m.name)" title="Remove">&times;</button>
            </div>
          </div>

          <div class="builder-identity-row">
            <label class="builder-narrative-label">Upgrade History</label>
            <textarea :value="tq.step2Narrative" @input="builder.setTwelveQNarrative('step2Narrative', $event.target.value)" placeholder="Describe your upgrade history..." rows="2"></textarea>
          </div>
        </div>
      </template>

      <!-- ======= PART II: TRAINING ======= -->
      <SectionDivider label="PART II: TRAINING" />

      <div class="builder-section">
        <h2 class="builder-q-heading">Q3: {{ isHuman ? 'Who taught you the trade?' : 'What weapon were you imprinted with?' }}</h2>
        <p class="builder-flavor">{{ isHuman ? 'Select a discipline and one starting technique.' : 'Select a weapon discipline. Spend 16 XP on skills and rank 1 techniques.' }}</p>

        <!-- Discipline drop zone -->
        <div class="builder-section-title" style="margin-bottom:4px">Discipline</div>
        <div class="builder-discipline-slot" :class="{ empty: !slot.disciplineId, 'drag-over': discDragOver }"
          @dragover.prevent="discDragOver = true"
          @dragleave="discDragOver = false"
          @drop.prevent.stop="onDiscDrop">
          <template v-if="!slot.disciplineId">
            {{ isTDoll ? 'Drop a weapon discipline here' : 'Drop a discipline here' }}
          </template>
          <template v-else>
            <div class="builder-discipline-name">
              <span>{{ slot.disciplineId }}</span>
              <span class="remove" @click.stop="builder.removeDiscipline('slot1')" title="Remove">&times;</span>
            </div>
            <div class="builder-discipline-meta">
              <span>Rank {{ slot.currentRank }}</span>
              <span>{{ slot.xpSpent }} XP</span>
            </div>
            <div v-if="weaponGrantText" class="builder-discipline-weapon">{{ weaponGrantText }}</div>
            <div v-if="perkName" class="builder-discipline-perk">{{ perkName }}</div>
            <div v-if="capstoneName" class="builder-discipline-capstone">{{ capstoneName }}</div>
          </template>
        </div>

        <!-- Techniques drop zone -->
        <div v-if="slot.disciplineId" style="margin-top:8px">
          <div class="builder-section-title" style="margin-bottom:4px">
            Techniques
            <span v-if="isTDoll" style="font-size:0.6rem;opacity:0.7">(3 XP each)</span>
          </div>
          <div class="builder-drop-zone" :class="{ 'drag-over': techDragOver, 'empty': slot.techniquesLearned.length === 0 }"
            @dragover.prevent="techDragOver = true"
            @dragleave="techDragOver = false"
            @drop.prevent.stop="onTechDrop">
            <template v-if="slot.techniquesLearned.length === 0">Drop techniques here</template>
            <div v-for="tech in slot.techniquesLearned" :key="tech.id" class="builder-item">
              <span class="builder-item-name">{{ tech.name }}</span>
              <button class="builder-item-remove" @click.stop="builder.removeTechniqueFromSlot('slot1', tech.id)" title="Remove">&times;</button>
            </div>
          </div>
        </div>

        <!-- T-Doll: Skill XP grid -->
        <div v-if="isTDoll && slot.disciplineId && discData" style="margin-top:8px">
          <div class="builder-section-title" style="margin-bottom:4px">
            Discipline Skills
            <span style="font-size:0.6rem;opacity:0.7">(cost = new rank &times; 2 XP)</span>
          </div>
          <div class="builder-skill-xp-grid">
            <div v-for="sk in disciplineSkillList" :key="sk" class="builder-skill-xp-row">
              <span class="builder-skill-xp-name">{{ formatSkill(sk) }}</span>
              <span class="builder-skill-xp-rank">Rank {{ totalRank(sk) }}</span>
              <span class="builder-skill-xp-cost">
                <template v-if="canAffordSkillXP(sk)">+{{ nextRankCost(sk) }} XP</template>
              </span>
              <button class="builder-skill-xp-btn" @click="incrementSkill(sk)" :disabled="!canAffordSkillXP(sk)">+</button>
            </div>
          </div>
          <div class="builder-xp-remaining">XP remaining: <strong>{{ tDollXPRemaining }}</strong> / 16</div>
        </div>

        <div class="builder-identity-row">
          <label class="builder-narrative-label">{{ isHuman ? 'Mentor' : 'Weapon Imprint' }}</label>
          <textarea :value="tq.step3Narrative" @input="builder.setTwelveQNarrative('step3Narrative', $event.target.value)"
            :placeholder="isHuman ? 'Describe your mentor...' : 'Describe your relationship with your weapon...'" rows="2"></textarea>
        </div>
      </div>

      <!-- ======= PART III: TRAITS ======= -->
      <SectionDivider label="PART III: TRAITS" />

      <div class="builder-section">
        <h2 class="builder-q-heading">Q4: Why do you fight?</h2>
        <div class="builder-identity-row">
          <label class="builder-narrative-label">Reason to Fight</label>
          <textarea :value="tq.step4Narrative" @input="builder.setTwelveQNarrative('step4Narrative', $event.target.value)" placeholder="Why do you fight?" rows="2"></textarea>
        </div>
        <div class="builder-identity-row">
          <label>Bonus Skill (+1)</label>
          <select :value="tq.q4BonusSkill" @change="onQ4SkillChange($event.target.value)">
            <option value="none">-- None --</option>
            <option v-for="s in SKILL_IDS" :key="s" :value="s">{{ formatSkill(s) }}</option>
          </select>
        </div>

        <h2 class="builder-q-heading">Q5: Why would you stop?</h2>
        <div class="builder-identity-row">
          <label class="builder-narrative-label">Exit Condition</label>
          <textarea :value="tq.step5Narrative" @input="builder.setTwelveQNarrative('step5Narrative', $event.target.value)" placeholder="What would make you stop?" rows="2"></textarea>
        </div>
        <div class="builder-identity-row">
          <label>Bonus Approach (+1)</label>
          <select :value="tq.q5BonusApproach" @change="onQ5ApproachChange($event.target.value)">
            <option value="none">-- None --</option>
            <option v-for="a in APPROACH_IDS" :key="a" :value="a">{{ capitalize(a) }}</option>
          </select>
        </div>

        <h2 class="builder-q-heading">Q6: {{ isHuman ? 'What are Dolls?' : 'What are Humans?' }}</h2>
        <div class="builder-identity-row">
          <label class="builder-narrative-label">{{ isHuman ? 'What are they to you?' : 'What are they to you?' }}</label>
          <textarea :value="tq.step6Narrative" @input="builder.setTwelveQNarrative('step6Narrative', $event.target.value)"
            :placeholder="isHuman ? 'What are they to you?' : 'What are humans to you?'" rows="2"></textarea>
        </div>
        <div class="builder-identity-row">
          <label>{{ isHuman ? 'View of Dolls' : 'Relationship' }}</label>
          <select :value="character.system.social.view_of_dolls" @change="builder.setSocial('view_of_dolls', $event.target.value)">
            <option value="favor">{{ isHuman ? 'Person — +5 Humanity' : 'Positive — +5 Humanity' }}</option>
            <option value="tools">{{ isHuman ? 'Object — +1 Skill' : 'Negative — +1 Skill' }}</option>
          </select>
        </div>

        <h2 class="builder-q-heading">Q7: {{ isHuman ? 'How did you make your name?' : 'What is your greatest achievement?' }}</h2>
        <div class="builder-section-title" style="margin-bottom:4px">Advantage</div>
        <div class="builder-drop-zone" :class="{ 'drag-over': advDragOver, 'empty': advantages.length === 0 }"
          @dragover.prevent="advDragOver = true"
          @dragleave="advDragOver = false"
          @drop.prevent.stop="onPeculiarityDrop('advantage', $event)">
          <template v-if="advantages.length === 0">Drag an advantage here</template>
          <div v-for="a in advantages" :key="a._id || a.name" class="builder-item">
            <span class="builder-item-name">{{ a.name }}</span>
            <button class="builder-item-remove" @click.stop="builder.removePeculiarity(a._id || a.name)" title="Remove">&times;</button>
          </div>
        </div>
        <div class="builder-identity-row">
          <label class="builder-narrative-label">{{ isHuman ? 'Defining Moment' : 'Achievement' }}</label>
          <textarea :value="tq.step7Narrative" @input="builder.setTwelveQNarrative('step7Narrative', $event.target.value)"
            :placeholder="isHuman ? 'Describe your defining moment...' : 'Describe this achievement...'" rows="2"></textarea>
        </div>
      </div>

      <!-- ======= PART IV: WORLDVIEW ======= -->
      <SectionDivider label="PART IV: WORLDVIEW" />

      <div class="builder-section">
        <h2 class="builder-q-heading">Q8: {{ isHuman ? 'What holds you back?' : 'What is your malfunction?' }}</h2>
        <div class="builder-section-title" style="margin-bottom:4px">Disadvantage</div>
        <div class="builder-drop-zone" :class="{ 'drag-over': disDragOver, 'empty': disadvantages.length === 0 }"
          @dragover.prevent="disDragOver = true"
          @dragleave="disDragOver = false"
          @drop.prevent.stop="onPeculiarityDrop('disadvantage', $event)">
          <template v-if="disadvantages.length === 0">Drag a disadvantage here</template>
          <div v-for="d in disadvantages" :key="d._id || d.name" class="builder-item">
            <span class="builder-item-name">{{ d.name }}</span>
            <button class="builder-item-remove" @click.stop="builder.removePeculiarity(d._id || d.name)" title="Remove">&times;</button>
          </div>
        </div>
        <div class="builder-identity-row">
          <label class="builder-narrative-label">{{ isHuman ? 'Flaw' : 'Malfunction' }}</label>
          <textarea :value="tq.step8Narrative" @input="builder.setTwelveQNarrative('step8Narrative', $event.target.value)"
            :placeholder="isHuman ? 'Describe your flaw...' : 'Describe your malfunction...'" rows="2"></textarea>
        </div>

        <h2 class="builder-q-heading">Q9: {{ isHuman ? 'What gets you through the day?' : 'What makes you different?' }}</h2>
        <div class="builder-section-title" style="margin-bottom:4px">Passion</div>
        <div class="builder-drop-zone" :class="{ 'drag-over': passDragOver, 'empty': passions.length === 0 }"
          @dragover.prevent="passDragOver = true"
          @dragleave="passDragOver = false"
          @drop.prevent.stop="onPeculiarityDrop('passion', $event)">
          <template v-if="passions.length === 0">Drag a passion here</template>
          <div v-for="p in passions" :key="p._id || p.name" class="builder-item">
            <span class="builder-item-name">{{ p.name }}</span>
            <button class="builder-item-remove" @click.stop="builder.removePeculiarity(p._id || p.name)" title="Remove">&times;</button>
          </div>
        </div>
        <div class="builder-identity-row">
          <label class="builder-narrative-label">{{ isHuman ? 'Passion' : 'Quirk' }}</label>
          <textarea :value="tq.step9Narrative" @input="builder.setTwelveQNarrative('step9Narrative', $event.target.value)"
            :placeholder="isHuman ? 'What gets you through the day?' : 'What makes you different?'" rows="2"></textarea>
        </div>

        <h2 class="builder-q-heading">Q10: {{ isHuman ? 'What keeps you up at night?' : 'What are you most afraid of?' }}</h2>
        <div class="builder-section-title" style="margin-bottom:4px">Anxiety</div>
        <div class="builder-drop-zone" :class="{ 'drag-over': anxDragOver, 'empty': anxieties.length === 0 }"
          @dragover.prevent="anxDragOver = true"
          @dragleave="anxDragOver = false"
          @drop.prevent.stop="onPeculiarityDrop('anxiety', $event)">
          <template v-if="anxieties.length === 0">Drag an anxiety here</template>
          <div v-for="a in anxieties" :key="a._id || a.name" class="builder-item">
            <span class="builder-item-name">{{ a.name }}</span>
            <button class="builder-item-remove" @click.stop="builder.removePeculiarity(a._id || a.name)" title="Remove">&times;</button>
          </div>
        </div>
        <div class="builder-identity-row">
          <label class="builder-narrative-label">Fear</label>
          <textarea :value="tq.step10Narrative" @input="builder.setTwelveQNarrative('step10Narrative', $event.target.value)"
            :placeholder="isHuman ? 'What keeps you up at night?' : 'What are you most afraid of?'" rows="2"></textarea>
        </div>
      </div>

      <!-- ======= PART V: IDENTITY ======= -->
      <SectionDivider label="PART V: IDENTITY" />

      <div class="builder-section">
        <h2 class="builder-q-heading">Q11: What is your name{{ isHuman ? ', and what does it mean' : ', and how did you get it' }}?</h2>
        <div class="builder-identity-row">
          <label>Name</label>
          <input type="text" :value="character.name" @input="character.name = $event.target.value" placeholder="Your name" />
        </div>
        <div class="builder-identity-row" v-if="isHuman">
          <label>Name Meaning</label>
          <textarea :value="character.system.narrative.name_meaning" @input="character.system.narrative.name_meaning = $event.target.value" placeholder="What does your name mean?" rows="2"></textarea>
        </div>
        <div class="builder-identity-row" v-if="!isHuman">
          <label>Name Origin</label>
          <select :value="character.system.identity.name_origin" @change="builder.setIdentity('name_origin', $event.target.value)">
            <option value="human">Human Name (+5 Humanity)</option>
            <option value="callsign">Callsign / Nickname (+5 Fame)</option>
            <option value="weapon">Weapon Designation (+1 Firearms, −5 Humanity)</option>
            <option value="weird">Weird Name (−5 Fame)</option>
          </select>
        </div>

        <h2 class="builder-q-heading">Q12: How does your story end?</h2>
        <div class="builder-identity-row">
          <label>Story End</label>
          <textarea :value="character.system.narrative.story_end" @input="character.system.narrative.story_end = $event.target.value" placeholder="How does your story end?" rows="2"></textarea>
        </div>
      </div>

      <!-- ======= EQUIPMENT ======= -->
      <SectionDivider label="EQUIPMENT" />

      <div class="builder-section">
        <EquipmentPanel />
      </div>

      <!-- ======= EXPORT ======= -->
      <div class="builder-section" style="text-align:center;padding-top:8px;border-top:1px solid var(--line)">
        <div style="font-size:0.65rem;color:var(--ink-faint);margin-bottom:6px">{{ charName }}</div>
        <button class="builder-export-btn" @click="onExport">Export Foundry JSON</button>
        <button class="builder-reset-btn" @click="onReset">Reset Character</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCharacterBuilder, DRAG_TYPES } from '@/composables/useCharacterBuilder.js'
import BuilderToggle from './BuilderToggle.vue'
import ApproachEditor from './ApproachEditor.vue'
import SkillEditor from './SkillEditor.vue'
import EquipmentPanel from './EquipmentPanel.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import { NATIONALITIES, BACKGROUNDS, FRAMES } from './character-data.js'
import disciplines from '@/data/disciplines.js'

const builder = useCharacterBuilder()
const { character, SKILL_IDS, APPROACH_IDS, isOpen, close } = builder
const tq = builder.getTwelveQ()

const isHuman = computed(() => character.system.identity.characterType === 'human')
const isTDoll = computed(() => character.system.identity.characterType === 't-doll')

// ---- Drag state ----
const moduleDragOver = ref(false)
const discDragOver = ref(false)
const techDragOver = ref(false)
const advDragOver = ref(false)
const disDragOver = ref(false)
const passDragOver = ref(false)
const anxDragOver = ref(false)

// ---- Skill formatting ----
function formatSkill(id) {
  return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// ---- Gear display ----
const nationalityGear = computed(() => {
  const nat = NATIONALITIES.find(n => n.key === character.system.identity.nationality)
  return nat?.gear || ''
})
const backgroundGear = computed(() => {
  const bg = BACKGROUNDS.find(b => b.key === character.system.identity.background)
  return bg?.gear || ''
})

// ---- Discipline slot ----
const slot = computed(() => character.system.disciplines.slot1)
const disciplineMap = computed(() => {
  const map = {}
  for (const d of disciplines) map[d.title] = d
  return map
})
const discData = computed(() => disciplineMap.value[slot.value.disciplineId] || null)
const perkName = computed(() => discData.value?.perk?.title || '')
const capstoneName = computed(() => discData.value?.capstone?.title || '')
const CATEGORY_NAMES = { HG: 'Handguns', SMG: 'Submachine Guns', SG: 'Shotguns', AR: 'Assault Rifles', BR: 'Battle Rifles', RF: 'Sniper Rifles', MG: 'Machine Guns', BLD: 'Blades', KNF: 'Knives', SHD: 'Shields', BOW: 'Bows' }
const weaponGrantText = computed(() => {
  if (!slot.value.disciplineId) return ''
  const grant = builder.getDisciplineWeaponGrant(slot.value.disciplineId)
  if (!grant) return ''
  const cat = CATEGORY_NAMES[grant.category] || grant.category
  return `Weapon: ${cat} \u2264 ${grant.maxPrice} cr`
})

// ---- T-Doll skill XP ----
const disciplineSkillList = computed(() => {
  if (!discData.value?.skills) return []
  return discData.value.skills.slice(0, 2).map(s => s.toLowerCase().replace(/\s+/g, '_'))
})
function totalRank(skillId) {
  return (character.system.skills[skillId] || 0) + (character.system.skills_free[skillId] || 0)
}
function nextRankCost(skillId) {
  return (totalRank(skillId) + 1) * 2
}
function tDollXPTotal() {
  let skillXP = 0
  for (const sk of disciplineSkillList.value) {
    const rank = character.system.skills[sk] || 0
    for (let r = 1; r <= rank; r++) skillXP += r * 2
  }
  return skillXP + (slot.value.techniquesLearned?.length || 0) * 3
}
const tDollXPRemaining = computed(() => Math.max(0, 16 - tDollXPTotal()))
function canAffordSkillXP(skillId) {
  return tDollXPRemaining.value >= nextRankCost(skillId)
}
function incrementSkill(skillId) {
  if (!canAffordSkillXP(skillId)) return
  builder.setSkill(skillId, (character.system.skills[skillId] || 0) + 1)
  builder.updateXP()
}

// ---- Peculiarities ----
const advantages = computed(() => builder.getPeculiaritiesByType('advantage'))
const disadvantages = computed(() => builder.getPeculiaritiesByType('disadvantage'))
const passions = computed(() => builder.getPeculiaritiesByType('passion'))
const anxieties = computed(() => builder.getPeculiaritiesByType('anxiety'))

// ---- Modules ----
const modules = computed(() => builder.getItemsByType('module'))

// ---- Character type ----
function selectType(type) { builder.setCharacterType(type) }

// ---- Human: Nationality & Background ----
function applyHumanBonuses() {
  const natKey = character.system.identity.nationality
  const bgKey = character.system.identity.background
  const approaches = { power: 1, precision: 1, swiftness: 1, resilience: 1, fortune: 1 }
  const nation = NATIONALITIES.find(n => n.key === natKey)
  if (nation) nation.approaches.forEach(a => { if (approaches[a] !== undefined) approaches[a] += 1 })
  const bg = BACKGROUNDS.find(b => b.key === bgKey)
  if (bg && approaches[bg.approach] !== undefined) approaches[bg.approach] += 1
  const tq2 = builder.getTwelveQ()
  if (tq2.q5BonusApproach && tq2.q5BonusApproach !== 'none') {
    if (approaches[tq2.q5BonusApproach] !== undefined) approaches[tq2.q5BonusApproach] += 1
  }
  builder.setAllApproaches(approaches)
  const freeSkills = bg ? [bg.skill] : []
  if (tq2.q4BonusSkill && tq2.q4BonusSkill !== 'none' && !freeSkills.includes(tq2.q4BonusSkill)) freeSkills.push(tq2.q4BonusSkill)
  builder.setFreeSkills(freeSkills)
}

function onNationalityChange(value) { builder.setIdentity('nationality', value); builder.applyNationalityGear(value); applyHumanBonuses() }
function onBackgroundChange(value) { builder.setIdentity('background', value); builder.applyBackgroundGear(value); applyHumanBonuses() }

// ---- Q4/Q5 bonus handlers ----
function onQ4SkillChange(value) { builder.clearQ4BonusSkill(); builder.setQ4BonusSkill(value) }
function onQ5ApproachChange(value) {
  builder.setQ5BonusApproach(value)
  if (isHuman.value) { applyHumanBonuses() }
  else { const fk = character.system.identity.frame; if (fk) onFrameChange(fk) }
}

// ---- T-Doll: Frame ----
function onFrameChange(value) {
  builder.setIdentity('frame', value)
  const frame = FRAMES.find(f => f.key === value)
  if (frame) {
    let approaches = { ...frame.approaches }
    const tq2 = builder.getTwelveQ()
    if (tq2.q5BonusApproach && tq2.q5BonusApproach !== 'none') {
      if (approaches[tq2.q5BonusApproach] !== undefined) approaches[tq2.q5BonusApproach] += 1
    }
    builder.setAllApproaches(approaches)
    const freeSkills = [...frame.skills]
    if (tq2.q4BonusSkill && tq2.q4BonusSkill !== 'none' && !freeSkills.includes(tq2.q4BonusSkill)) freeSkills.push(tq2.q4BonusSkill)
    builder.setFreeSkills(freeSkills)
    builder.setIdentity('manufacturer', frame.manufacturer)
    builder.setIdentity('model', frame.model)
  } else { builder.setIdentity('manufacturer', ''); builder.setIdentity('model', '') }
}

// ---- Drop handlers ----
const WEAPON_DISCIPLINE_TITLES = ['Knives', 'Swords', 'Pistols', 'Submachine Guns', 'Shotguns', 'Assault Rifles', 'Battle Rifles', 'Snipers', 'Machine Guns']

function onDiscDrop(event) {
  discDragOver.value = false
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)
    if (dragType !== DRAG_TYPES.DISCIPLINE) return
    if (isTDoll.value && !WEAPON_DISCIPLINE_TITLES.includes(data.title)) return
    builder.setDiscipline('slot1', data)
  } catch { /* ignore */ }
}

function onTechDrop(event) {
  techDragOver.value = false
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)
    if (dragType !== DRAG_TYPES.TECHNIQUE) return
    builder.addTechniqueToSlot('slot1', data)
  } catch { /* ignore */ }
}

function onModuleDrop(event) {
  moduleDragOver.value = false
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)
    if (dragType !== DRAG_TYPES.MODULE) return
    builder.addItem('module', data)
  } catch { /* ignore */ }
}

const PECULIARITY_DRAG_MAP = { advantage: DRAG_TYPES.ADVANTAGE, disadvantage: DRAG_TYPES.DISADVANTAGE, passion: DRAG_TYPES.PASSION, anxiety: DRAG_TYPES.ANXIETY }

function onPeculiarityDrop(narrativeType, event) {
  advDragOver.value = disDragOver.value = passDragOver.value = anxDragOver.value = false
  try {
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return
    const { dragType, data } = JSON.parse(raw)
    if (dragType !== PECULIARITY_DRAG_MAP[narrativeType]) return
    builder.addPeculiarity(narrativeType, data)
  } catch { /* ignore */ }
}

// ---- Export ----
const charName = computed(() => character.name || 'Unnamed Character')
function onExport() { builder.downloadJSON() }
function onReset() {
  if (window.confirm('Reset character? This cannot be undone.')) builder.reset()
}
</script>

<style scoped>
.builder-flavor {
  font-size: 0.68rem;
  color: var(--ink-faint);
  margin: 2px 0 8px;
  line-height: 1.4;
}
.builder-q-heading {
  color: var(--amber);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 14px 0 2px;
  border-top: 1px solid var(--line);
  padding-top: 10px;
}
.builder-q-heading:first-child {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}
.builder-skill-xp-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.builder-skill-xp-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.65rem;
}
.builder-skill-xp-name {
  flex: 1;
  color: var(--text-primary);
}
.builder-skill-xp-rank {
  color: var(--ink-faint);
  font-family: var(--font-mono);
  min-width: 40px;
  text-align: right;
}
.builder-skill-xp-cost {
  color: var(--amber);
  font-family: var(--font-mono);
  min-width: 50px;
  text-align: right;
  font-size: 0.6rem;
}
.builder-skill-xp-btn {
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  color: var(--cyan);
  width: 22px;
  height: 22px;
  font-size: 0.7rem;
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.builder-skill-xp-btn:hover:not(:disabled) {
  border-color: var(--cyan);
  color: #fff;
}
.builder-skill-xp-btn:disabled {
  opacity: 0.3;
  cursor: default;
}
.builder-xp-remaining {
  font-size: 0.68rem;
  color: var(--ink-faint);
  margin-top: 8px;
  text-align: right;
}
.builder-xp-remaining strong {
  color: var(--amber);
}
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
