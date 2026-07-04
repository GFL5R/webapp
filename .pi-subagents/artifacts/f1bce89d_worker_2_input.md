# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Create file src/components/character-builder/ApproachEditor.vue

Vue 3 `<script setup>`. Import useCharacterBuilder from @/composables/useCharacterBuilder.js.

Display 5 approaches: Power, Precision, Swiftness, Resilience, Fortune.
Each row: approach name (capitalized), [-] button, value, [+] button.
CSS: builder-approach-row, builder-approach-name, builder-approach-stepper, builder-approach-value, builder-approach-btn.
[-] disabled when value is 1. Calls incrementApproach(id) / decrementApproach(id).

Show approach limit warning: if any approach > derived.approachLimit, show text 'Exceeds limit'.

Derived attributes in a 2×2 grid:
- Endurance: derived.endurance
- Composure: derived.composure  
- Focus: derived.focus
- Vigilance: derived.vigilance
- Fortune Max: derived.fortunePointsMax
CSS: builder-derived, builder-derived-item, builder-derived-label, builder-derived-value.

Composable API: character, APPROACH_IDS, incrementApproach, decrementApproach, derived (computed with endurance/composure/focus/vigilance/approachLimit/fortunePointsMax).

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