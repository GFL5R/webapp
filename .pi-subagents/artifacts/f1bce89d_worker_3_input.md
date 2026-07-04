# Task for worker

[Read from: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/context.md, /home/jgarland/Documents/Development/GFL5R Workspace/webapp/plan.md]

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Create file src/components/character-builder/SkillEditor.vue

Vue 3 `<script setup>`. Import useCharacterBuilder from @/composables/useCharacterBuilder.js.

Display 23 skills grouped by category (read-only display):
- Combat: blades, exotic_weapons, explosives, firearms, hand_to_hand, tactics
- Fieldcraft: conditioning, resolve, crafting, insight, stealth, survival
- Technical: computers, mechanics, medicine, piloting, science, subterfuge
- Social: arts, command, culture, deception, negotiation, performance

Skill name: convert snake_case to Title Case (hand_to_hand -> Hand to Hand).
Show base rank (character.system.skills[id]) and free rank (character.system.skills_free[id]).
Total = base + free. Show '-' when both are 0, show number when > 0.

CSS: builder-skill-group (group header), builder-skill-row, builder-skill-name, builder-skill-rank.

Composable API: character, SKILL_IDS.

---
Update progress at: /home/jgarland/Documents/Development/GFL5R Workspace/webapp/.pi-subagents/artifacts/progress/f1bce89d/progress.md

## Acceptance Contract
Acceptance level: attested
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Return concrete findings with file paths and severity when applicable

Required evidence: review-findings, residual-risks

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