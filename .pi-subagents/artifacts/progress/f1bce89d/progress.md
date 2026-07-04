# SkillEditor — Task Progress

## 2026-07-04
- Created `src/components/character-builder/SkillEditor.vue`
- Read-only display of 23 skills across 4 groups (Combat, Fieldcraft, Technical, Social)
- Snake_case → human-readable name (hand_to_hand → "hand to hand")
- Shows base rank + free rank separately, with `-` placeholder when total is 0
- Uses CSS classes: builder-skill-group, builder-skill-row, builder-skill-name, builder-skill-rank
- Sources data from `useCharacterBuilder().character.system.skills` and `skills_free`
- Clean build verified with `vite build`

