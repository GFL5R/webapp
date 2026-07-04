# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Add drag-source behavior to PECULIARITY DATABASE PAGES. Read each file first, then edit.

REFERENCE: Look at src/views/WeaponsCompendiumPage.vue — it already has the canonical db-item drag-source implementation.

Files to edit (3 of them):

1. **src/views/AdvantagesPage.vue** — DRAG_TYPES.ADVANTAGE
2. **src/views/DisadvantagesPage.vue** — DRAG_TYPES.DISADVANTAGE
3. **src/views/AnxietiesPage.vue** — DRAG_TYPES.ANXIETY

For each file:
- Add import: `import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'`
- Add `draggable="true" @dragstart="onDragStart($event, item)"` on .db-item elements
- Add onDragStart(event, item) { dragType: DRAG_TYPES.X, id: item.id, data: item }

Read each file to understand the item variable name used in v-for. The peculiarity pages use arrays (not objects from entries), so the pattern may differ slightly from WeaponsCompendiumPage.

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