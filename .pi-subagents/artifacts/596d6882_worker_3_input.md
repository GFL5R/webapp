# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Add drag-source behavior to CARD COMPONENTS. Read each file first, then edit.

REFERENCE: Look at src/components/cards/DisciplineCard.vue — it already has the canonical drag-source implementation. COPY its pattern.

Files to edit:

1. **src/components/cards/TechniqueCard.vue**
   - Add import: `import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'`
   - Add `draggable="true" @dragstart="onDragStart"` on the root .card div
   - Add onDragStart function. TechniqueCard uses a slot for technique data, so check what props are available. You may need to look at how TechniqueTypePage.vue passes data to TechniqueCard. If technique metadata isn't available as a prop, the drag data should at minimum include { name, type } from the card. The dragType should be DRAG_TYPES.TECHNIQUE.
   - Read TechniqueTypePage.vue (src/views/techniques/TechniqueTypePage.vue) to understand how TechniqueCard is invoked and what data flows through it.

2. **src/components/cards/ModuleCard.vue**
   - Add import: `import { DRAG_TYPES } from '@/composables/useCharacterBuilder.js'`
   - Add `draggable="true" @dragstart="onDragStart"` on the root .card div
   - onDragStart builds { dragType: DRAG_TYPES.MODULE, id: props.title, data: { title: props.title, description: props.description, ... } }
   - Set as JSON on event.dataTransfer, effectAllowed = 'copy'

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