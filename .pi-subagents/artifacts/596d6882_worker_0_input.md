# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Create file src/components/character-builder/PeculiarityPanel.vue

This is a drop-zone panel for peculiarities. COPY THE PATTERN from the reference implementation at src/components/character-builder/EquipmentPanel.vue (read it first). The pattern is:
1. Define sections[] with { dragType, itemType/narrativeType, title, emptyText }
2. Each section: title + drop zone with @dragover/@dragleave/@drop
3. onDrop parses JSON, checks dragType, calls the add method
4. Items displayed from getter, each with remove button

Differences from EquipmentPanel:
- Sections use DRAG_TYPES.ADVANTAGE, .DISADVANTAGE, .PASSION, .ANXIETY (import DRAG_TYPES from composable)
- Instead of getItemsByType, use builder.getPeculiaritiesByType(narrativeType)
- Instead of addItem, use builder.addPeculiarity(narrativeType, data)
- narrativeType values: 'advantage', 'disadvantage', 'passion', 'anxiety'
- Instead of removeItem, use builder.removePeculiarity(itemId)
- Each section title: 'Advantages', 'Disadvantages', 'Passions', 'Anxieties'
- Empty text: 'Drag advantages here' etc.

Import: `import { useCharacterBuilder, DRAG_TYPES } from '@/composables/useCharacterBuilder.js'`
Use `<script setup>`. Same CSS classes as EquipmentPanel (builder-section, builder-section-title, builder-drop-zone, builder-item, builder-item-name, builder-item-remove).

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