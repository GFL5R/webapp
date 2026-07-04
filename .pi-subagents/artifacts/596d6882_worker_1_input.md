# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Create file src/components/character-builder/ExportPanel.vue

Vue 3 `<script setup>`. Import useCharacterBuilder from @/composables/useCharacterBuilder.js.

Display:
- Character name: character.name (if empty, show 'Unnamed Character')
- Total XP: character.system.advancement.xp_total
- Discipline count: number of slots with disciplineId !== null
- 'Export Foundry JSON' button: calls downloadJSON()
- 'Reset Character' button: calls window.confirm('Reset character? This cannot be undone.') then calls reset()

CSS classes: builder-section, builder-section-title, builder-export-btn, builder-reset-btn.

Composable API: character, downloadJSON(), reset().

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