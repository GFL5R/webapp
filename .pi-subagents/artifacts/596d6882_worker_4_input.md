# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Add drag-source behavior to DATABASE PAGES. Read each file first, then edit.

REFERENCE: Look at src/views/WeaponsCompendiumPage.vue — it already has the canonical db-item drag-source implementation. COPY its pattern exactly for each page, just changing the DRAG_TYPE and the item variable name.

Pattern for each file:
1. Add import: `import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'`
2. Add `draggable="true" @dragstart="onDragStart($event, item)"` on each .db-item div
3. Add onDragStart(event, item) function that builds { dragType: DRAG_TYPES.X, id: item.id, data: item }

Files to edit (6 of them):

1. **src/views/ArmorPage.vue** — DRAG_TYPES.ARMOR, item is the armor object
2. **src/views/ItemsPage.vue** — DRAG_TYPES.ITEM, item is the item object
3. **src/views/ModulesPage.vue** — DRAG_TYPES.MODULE, item is the module object
4. **src/views/PerksPage.vue** — DRAG_TYPES.PERK, item is the perk object
5. **src/views/CapstonesPage.vue** — DRAG_TYPES.CAPSTONE, item is the capstone object
6. **src/views/PassionsPage.vue** — DRAG_TYPES.PASSION, item is the passion object (array items)

For each: look at how WeaponsCompendiumPage.vue does it (draggable + @dragstart on .db-item, import, onDragStart function). Just change the DRAG_TYPE and the variable name used in the template (w -> armor/item/mod etc). Read each file to find the right variable name.

---
Update progress at: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/.pi-subagents/artifacts/progress/596d6882/progress.md

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