# How to Use L5R Technique Clusters

This guide explains how to use the cluster analysis when creating GFL5R techniques.

---

## What the Clusters Mean

The clusters identify groups of L5R techniques that are **mechanically or thematically similar**. They are not identical. Two techniques in the same cluster might:

- Use the same element (Water, Fire, Earth, Air, Void)
- Share similar action types (Attack, Support, Scheme, Movement)
- Have overlapping opportunity spend patterns
- Target similar game mechanics (conditions, movement, damage)
- Share thematic keywords (stealth, mounted combat, healing)

**The clusters are a warning, not a prescription.** They tell you "these techniques are related" - you still need to read each one to understand the differences.

---

## The "Danger Zone" Concept

Clusters represent **danger zones** for GFL5R analogue creation. When multiple L5R techniques cluster together, creating separate GFL5R analogues for each risks:

1. **Mechanical overlap** - Two GFL5R techniques doing essentially the same thing
2. **Bloat** - Unnecessary technique proliferation that makes the system harder to learn
3. **Player confusion** - "Which technique should I take for X?"

---

## How to Use Clusters When Creating GFL5R Techniques

### Step 1: Check if Your L5R Source is in a Cluster

Before creating a GFL5R analogue for an L5R technique, check `techniques-l5r-clusters.md`:

- If the technique is **unclustered** (in the noise), proceed normally
- If the technique is **in a cluster**, proceed to Step 2

### Step 2: Read All Techniques in the Cluster

Read the summaries in `techniques-unmatched-l5r.md` for all techniques in the cluster. Ask:

- What mechanics do they share?
- What mechanics are unique to each?
- Are the differences meaningful for GFL5R gameplay?

### Step 3: Decide on Consolidation

**Consolidate when:**
- The techniques differ only in L5R-specific elements (rings, elements, opportunities)
- The core mechanic is identical (e.g., "remove condition X when making check Y")
- The differences don't translate meaningfully to GFL5R

**Keep separate when:**
- The techniques have distinct tactical applications
- Each technique supports a different playstyle
- The mechanics are genuinely different even if thematically related

### Step 4: Document Your Decision

When creating a GFL5R technique that covers multiple L5R sources, note this in `techniques-analogue-review.md`:

```markdown
## Quick Draw
**GFL5R:** [description]
**L5R Sources:**
- [Iaijutsu Cut: Crossing Blade](link) - First strike from draw
- [Iaijutsu Cut: Rising Blade](link) - Upward slash from draw
- [Iaijutsu Cut: Reverse Draw](link) - Defensive draw
- [Iaijutsu Cut: Sword and Sheath](link) - Sheath as weapon

**Consolidation rationale:** All four techniques share the same core mechanic (draw and strike in one motion). GFL5R consolidates into one technique with opportunity spends for different effects.
```

---

## Cluster Size Interpretation

| Cluster Size | Interpretation |
|--------------|----------------|
| 2-4 techniques | Tight cluster. High similarity. Strong consolidation candidate. |
| 5-10 techniques | Moderate cluster. Shared theme with mechanical variation. Consider partial consolidation. |
| 11+ techniques | Large cluster. Broad thematic grouping. Techniques likely distinct enough to keep separate. |

**Cluster 8 (Water Element, 17 techniques)** is a good example of a large cluster. All techniques share the Water element theme, but they span combat, healing, movement, and social manipulation. Consolidating all 17 into one technique would lose too much granularity.

---

## When to Ignore Clusters

Clusters are a tool, not a rule. Ignore them when:

1. **The L5R technique is unique** - Some techniques have no close analogues even within their cluster
2. **GFL5R needs granularity** - If GFL5R's combat system needs more distinction than L5R provides
3. **Setting demands it** - Some L5R techniques don't translate (invocations, kiho) and need complete reimagining

---

## The High-Similarity Pairs

The cluster analysis also identifies **high-similarity pairs** (≥0.95 cosine similarity). These are techniques that are nearly identical mechanically.

**These are the highest danger zones.** If two techniques have 0.95+ similarity, strongly consider:

- Creating one GFL5R technique that covers both
- Merging their mechanics into a single technique with options
- Only adapting one if the other doesn't fit GFL5R's setting

---

## Summary

| What Clusters Are | What Clusters Aren't |
|-------------------|----------------------|
| Groups of similar techniques | Identical techniques |
| Warning signs for overlap | Prescriptive rules |
| Starting points for analysis | Final answers |
| Tools for consolidation decisions | Reasons to skip analysis |

**The clusters tell you where to look. They don't tell you what to do.**