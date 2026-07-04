# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Edit file src/components/layout/TopBar.vue

READ THE FILE FIRST. Then add a character builder toggle button.

Add to imports: `import { useCharacterBuilder } from '@/composables/useCharacterBuilder.js'`

In the setup, add: `const { isOpen, toggle } = useCharacterBuilder()`

In the template, add a button inside .top-bar-right BEFORE the search input. Style it like the other top bar elements:
- <button class="top-bar-builder-btn" @click="toggle" :title="isOpen ? 'Hide Builder' : 'Show Builder'">
- Show icon 'CHAR' text when closed, '✕' when open (or use HTML entity &times;)
- Use inline or scoped style matching existing top bar look (small, monospace, cyan accent)

Do NOT break existing functionality. The button should be minimal and fit the top bar aesthetic.

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