# GFL5R Field Manual - Project Guidelines

## Project Overview

A static web application serving as a digital reference manual for the GFL5R tabletop RPG system (Girls FrontLine/Legend of The 5 Rings). Military sci-fi setting with character creation, combat rules, equipment databases, and lore.

**Tech Stack:** Vanilla JavaScript SPA, HTML5, CSS3, Python 3.12 (FastAPI for dev server), custom `.djson` data format.

## Build and Run

```bash
# Development (hot reload, dynamic .djson parsing)
.venv/bin/python server.py
# App runs at http://127.0.0.1:8000
```

**Never run `build.py` locally.** It is only used by the GitHub Actions build workflow to produce static `.json` files for the container image. `server.py` already dynamically parses `.djson` files and serves them as JSON.

## Architecture

**Data Pipeline:**
- **Development:** `server.py` dynamically parses `.djson` files on request
- **CI/CD:** GitHub Actions runs `build.py` to pre-transpile `.json` for the container image (Nginx)

**Key Components:**
- `js/app.js` - SPA logic (routing, data loading, search)
- `data/*.djson` - Game data (weapons, techniques, advantages)
- `data/techniques/*.djson` - Merged into single `techniques.json`
- `pages/*.html` - Static rulebook content fragments

## Conventions

**Data Files (.djson):**
- Use `docstring-json` format (allows comments, multiline strings, trailing commas)
- Include `flavor` (lore) and `description` (HTML-formatted rules)
- Shortcodes like `(op)`, `(su)`, `(st)`, `(ex)` become dice icon `<img>` tags

**JavaScript:**
- IIFE pattern for encapsulation
- Page navigation via `HTML_PAGES` and `PAGE_ORDER` constants
- Data loaded from `DATA_FILES` mapping

**HTML Pages:**
- Kebab-case filenames: `making-a-check.html`
- Full HTML fragments (not templates)

## Pitfalls

- **Never run `build.py` locally** - it's only for the GitHub Actions workflow
- **Sync shortcode changes** - `server.py` and `build.py` both implement shortcode replacement
- **Duplicate technique names** silently overwrite when merged
- **GFL5R** does not stand for "Girls Frontline 5th Ring". It is a portmanteau of Girls Frontline (GFL) and Legend of the 5 Rings (L5R). The L in both names is combined to form GFL5R. Do not form a backronym from the name.

## Writing Style Guidelines

- **Contrastive Writing** - Do not contrast GFL5R with L5R, the writing should stand alone without needing to reference L5R. The only thing you should contrast with is previous writing in the same page, never requiring external knowledge to parse the writing.
   - Not good: "Unlike the feudal society of Rokugan in L5R, the world of GFL5R is a sci-fi post apocalyptic Earth with mail service."
   - Better: "The world of GFL5R is a sci-fi post apocalyptic Earth with mail service."

- **Roboticisms of T-Dolls** - T-dolls are combat androids, yes, but relying too heavily on this fact (such as describing them as glitching, clipping or malfunctioning when stressed) results in poor writing. T-Dolls are characters first and foremost, and have similar stress responses to humans. Quirky, sure, but still emotionally relatable. CM901 recluses herself when stressed, but her voice doesn't suddenly become static. HK416 becomes more aggressive, but doesn't start glitching.
   - Not good: "When stressed, CM901's voice becomes static and choppy, with erratic motions."
   - Better: "When stressed, CM901 becomes reclusive and withdrawn, avoiding contact with others and retreating to quiet spaces to be alone with her thoughts."

- **The Em Dash** - Do not use the em dash (—) in GFL5R writing. In modern day, the em dash has become a watermark of "sloppy" writing, and many readers are instantly turned off by it. Use a comma, semicolon, period, (or if you need to interject a thought, parentheses) instead.
   - Not good: "In the world of GFL5R, T-dolls are combat androids—artificial beings designed for warfare—but they have complex personalities and emotions that make them more than just machines."
   - Better: "In the world of GFL5R, T-dolls are combat androids (artificial beings designed for warfare) but more importantly, they have complex personalities and emotions that make them more than just machines."

- **Ditch the Preamble** - Avoid using the "not x, but y" or the modified "not only x, but also y" constructions. Similar to the em dash, most readers have become conditioned to associate this construction with "sloppy" writing, and it can be a major turn off. Just say "y", ditch the preamble. Examples:
   - Not good: "GFL5R is not just a rules reference, but also a lore compendium."
   - Not good: "GFL5R isn't a video game, it's a tabletop RPG system."
   - Better: "GFL5R is a rules reference and lore compendium."

- **The Rule of Three** - This can take different forms, from "adjective, adjective, adjective" to "short phrase, short phrase, and short phrase". This is often used to make superficial analysis sound more profound and deeper than it truly is. If the sentence can do without it, do without it. Try to find a single comprehensive adjective or phrase that captures the meaning of the sentence, rather than relying on a list of three adjectives or phrases. Examples:
   - Not good: "GFL5R is a complete, intricate, and multifaceted system."
   - Better: "GFL5R is a complex system."

- **Bolding** - The only things that should be bold are key words that the reader is being introduced to for the first time, or section headers used to organize the document. This signals that the reader needs to understand this concept in order to understand the rest of the writing. The exception to this is callouts that the reader needs to do something more than just read, such as <strong>TN 4 check</strong> or <strong>spend 1 fortune point</strong>. In general, avoid bolding unless it is one of these things, to preserve the signal of bolding and prevent it from being diluted by overuse.
   - Not good: "Make a <strong>TN 4 check</strong> to see if you can <strong>avoid the trap</strong> and <strong>escape unscathed</strong>."
   - Better: "Make a <strong>TN 4 check</strong> to see if you can avoid the trap and escape unscathed."

- **Emoji** - Do not use emoji in GFL5R writing. Emoji are a visual language that can be interpreted in many different ways, and can easily be misinterpreted by readers. They also have a tendency to make writing look less serious and more casual, which is not the tone we want for GFL5R. If you want to convey an emotion or tone, try to do so through your word choice and sentence structure instead of relying on emoji.
   - Not good: "🚀 GFL5R is a fun and exciting game that will keep you on the edge of your seat!"
   - Better: "GFL5R is a fun and exciting game that will keep you on the edge of your seat!"

- **Direction** - Every word on the page needs to be furthering a concept, from flavortext to mechanical descriptions. Avoid filler text that doesn't add anything to the reader's understanding. In flavortext, this can be a little looser, such as having a character ask a question that then gets answered, but if it's an entry about cinnamon rolls, don't suddenly start talking about hot dogs.
   - Not good: in an entry about the "Food" Passion: <em>M4A1 stares up at the sky. "You ever wonder how many stars are up there? Do you think there's other life out there? I wonder if they have cinnamon rolls too."</em>
   - Better: in an entry about the "Food" Passion: <em>On a mission, M4A1 brings the squad to a halt. "Hold on, I think I smell something. Is that... cinnamon rolls?"</em>

*Note: M4A1 doesn't actually have a passion for food, but the fandom jokes about M4A1 ~~being~~ a cinnamon roll, so this is just an example of how to write direction in flavortext.*

- **Hedging** - When writing a hard rule, state it directly. Don't soften it with "perhaps," "it's worth noting," "arguably," "could potentially," or "it's important to remember." The reader needs to know that a rule is a rule. However, when presenting a player with an option or a strategic choice, hedging is appropriate, because you can't guarantee outcomes. The distinction: if the game mechanics require it, be definitive. If the player is choosing between options with uncertain outcomes, reflect that uncertainty honestly.
   - Not good (for a rule): "It's worth noting that getting shot without armor could potentially result in HP loss."
   - Better (for a rule): "Getting shot without armor results in HP loss."
   - Not good (for a choice): "Extra armor will save your life."
   - Better (for a choice): "Extra armor could save your life in a firefight."

# Mechanical Consistency
- **Existing Rules** - When creating a technique that requires a specific approach or skill, search pages/approaches-and-derived-attributes.html and pages/skills.html, respectively, for the actual list of approaches and skills, as well as their uses. Ensure that the proper approach or skill is used, and that the technique's description is consistent with how that approach or skill is used in the rules. Never assume that something does or does not exist; search first.
- **The Wiki** - The wiki/ folder contains many key story beats from GFL, and INDEX.md contains a guide on where to find specific information. Like mechanics, don't assume lore, search for it. If you can't find it, ask the user.