# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Create TWO files:

**File 1: src/components/character-builder/character-data.js**
Export three arrays copied from Foundry/scripts/actors/character-builder-data.js:
- NATIONALITIES (key, label, approaches)
- BACKGROUNDS (key, label, approach, skill)  
- FRAMES (key, manufacturer, model, description, approaches, skills)

Read the source at /home/jgarland/Documents/Development/GFL5R Workspace/Foundry/scripts/actors/character-builder-data.js and export identical data as ES module exports.

**File 2: src/components/character-builder/IdentityEditor.vue**
Vue 3 `<script setup>`. Import useCharacterBuilder from @/composables/useCharacterBuilder.js and the three arrays from ./character-data.js.

Features:
- Character type toggle: two buttons (Human Commander / T-Doll) with CSS classes builder-identity-type, builder-type-btn, builder-type-btn.active. Calls setCharacterType('human') or setCharacterType('t-doll'). Reads character.system.identity.characterType.
- Name input: builder-identity-row with label+input, calls setIdentity('name', value)
- Age input: same pattern
- Human: nationality <select> from NATIONALITIES, background <select> from BACKGROUNDS
  - On nationality change: setAllApproaches with +1 to the two listed approaches (base 1 + bonus)
  - On background change: increment approach by 1, call addFreeSkill(skill, 1)
  - Reset approach/skill bonuses before applying (start from base 1)
- T-Doll: frame <select> from FRAMES
  - On frame change: call setAllApproaches(frame.approaches) and setFreeSkills(frame.skills)
  - Auto-fill manufacturer and model from frame

All form elements use CSS classes: builder-identity-row, builder-identity-row label, builder-identity-row input, builder-identity-row select.

Composable API: setCharacterType, setIdentity, setAllApproaches, addFreeSkill, setFreeSkills, character, APPROACH_IDS.

---
Update progress at: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/.pi-subagents/artifacts/progress/f1bce89d/progress.md

## Acceptance Contract
Acceptance level: checked
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Implement the requested change without widening scope

Required evidence: changed-files, tests-added, commands-run, residual-risks, no-staged-files

Finish with a fenced JSON block tagged `acceptance-report` in this shape:
Use empty arrays when no items apply; array fields contain strings unless object entries are shown.
```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "specific proof"
    }
  ],
  "changedFiles": [
    "src/file.ts"
  ],
  "testsAddedOrUpdated": [
    "test/file.test.ts"
  ],
  "commandsRun": [
    {
      "command": "command",
      "result": "passed",
      "summary": "short result"
    }
  ],
  "validationOutput": [
    "validation output or concise summary"
  ],
  "residualRisks": [
    "none"
  ],
  "noStagedFiles": true,
  "diffSummary": "short description of the diff",
  "reviewFindings": [
    "blocker: file.ts:12 - issue found, or no blockers"
  ],
  "manualNotes": "anything else the parent should know"
}
```