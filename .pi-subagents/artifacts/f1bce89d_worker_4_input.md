# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Create file src/components/character-builder/DisciplineSlots.vue

Vue 3 `<script setup>`. Import useCharacterBuilder and DRAG_TYPES from @/composables/useCharacterBuilder.js.

5 discipline slots (slot1-slot5). Each is a drop target:
- @dragover.prevent -> add drag-over class
- @dragleave -> remove
- @drop.prevent.stop -> parse JSON from dataTransfer, if dragType === DRAG_TYPES.DISCIPLINE and slot is empty, call setDiscipline(slotKey, data)

Empty slot: builder-discipline-slot empty CSS, text 'Drop discipline here'.
Filled slot:
- Discipline name with × remove button (removeDiscipline(slotKey))
- Meta: 'Rank X · Y XP'
- Tech drop zone within slot: accepts DRAG_TYPES.TECHNIQUE, calls addTechniqueToSlot(slotKey, data)
- Each technique: name + × remove (removeTechniqueFromSlot(slotKey, tech.id))
- Perk name (if perkId exists): builder-discipline-perk class
- Capstone name (if capstoneId exists): builder-discipline-capstone class

CSS classes: builder-discipline-slot, builder-discipline-slot.empty, builder-discipline-slot.drag-over, builder-discipline-name, builder-discipline-meta, builder-discipline-tech, builder-discipline-perk, builder-discipline-capstone, builder-drop-zone, builder-item-remove.

Composable API: character (character.system.disciplines[slotKey]), setDiscipline, removeDiscipline, addTechniqueToSlot, removeTechniqueFromSlot, DRAG_TYPES.

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