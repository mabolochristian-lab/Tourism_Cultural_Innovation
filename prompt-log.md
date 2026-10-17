# Prompt Log — Marinduque Cultural & Heritage Explorer

## Task 2: Zero-Shot Prompting

**Objective:** Observe the initial, unguided AI generation. [3]

**Exact prompt:**

> Create a simple webpage that promotes local tourism and cultural heritage sites in Marinduque.

**Archived output:** `outputs/task2-zero-shot.html`. The original generated file was not saved before the page was replaced; this file is a representative reconstruction from the prompt, not a byte-for-byte historical copy. [2, 6]

**What worked:** Generated a basic HTML structure and styled headings quickly. [3]

**What needed improvement:** The page lacked detailed Marinduque-specific context, an interactive itinerary checklist, and a mobile-responsive layout. [3]

**Next action / verification:** Apply structured prompting to specify the role, requirements, technical constraints, output files, and acceptance criteria. [3, 4]

---

## Task 3: Structured Prompt Improvement

**Objective:** Apply prompt anatomy: role, task, context, constraints, expected output, and acceptance criteria. [4]

**Exact prompt:**

> Act as a senior frontend web developer. Create a responsive, single-page web prototype named "Marinduque Cultural & Heritage Explorer" for tourists and local heritage enthusiasts.
>
> Include:
> 1. A hero header introducing Marinduque's cultural identity.
> 2. An interactive filterable directory of cultural spots (category filter by Municipality: Boac, Mogpog, Gasan).
> 3. An interactive "Custom Itinerary Planner" where users can add/remove heritage spots into a saved tour checklist.
> 4. A Moriones Cultural Spotlight card with festival details.
>
> Use semantic HTML5, clean modern CSS, and vanilla JavaScript. Do not use external CSS/JS frameworks (such as Tailwind or React), backend databases, or live external API calls.
>
> Provide the necessary index.html, styles.css, and app.js code. The user interface must be fully accessible via keyboard navigation, visually clean, and fully responsive across mobile and desktop screens.

**Archived output:** The working project files `index.html`, `styles.css`, and `app.js`; `outputs/task3-structured-code.txt` is a concatenated snapshot of those files for verification. The original Task 3 bundle was not preserved as a ZIP. [2, 6]

**What worked:** The structured request produced a modular, semantic page with a responsive layout, municipality filtering, itinerary controls, and a Moriones spotlight. The itinerary uses browser-local storage rather than a backend. [4, 5]

**What needed improvement:** The first keyboard focus outline was too faint, and the dynamic itinerary needed additional review for focus handling and clear save feedback. [4, 5]

**Next action / verification:** Use few-shot examples to standardize cultural-spot objects, check the directory renderer against the agreed data shape, and perform a role-based accessibility review. [4, 5]

---

## Task 4: Few-Shot Prompting

**Objective:** Provide examples of the desired cultural-spot object format and request additional entries in the same shape.

**What worked:** The spot data was standardized to use `id`, `title`, `municipality`, `category`, and `description`, and the directory renderer was updated to display those fields. Four additional Marinduque entries were added. [5]

**Verification:** Confirmed the renderer uses the same fields as the objects, so the added entries can be filtered and added to an itinerary through the existing interactions. [5]

---

## Task 5: Role-Based Accessibility Review and Structured Analysis

**Objective:** Review the prototype for accessibility and implementation weaknesses without expanding the feature scope.

**What worked:** The review recognized the existing semantic landmarks, skip link, labelled municipality selector, keyboard-operable native controls, and spot-specific labels for add/remove controls. It also identified accessibility and reliability issues requiring follow-up. [5]

**Key findings:**

- The directory's broad `aria-live` region can cause excessive announcements when its cards are rebuilt.
- Rerendering the itinerary replaces focused controls, which can interrupt keyboard navigation.
- The save-error message can be overwritten by later success messages in add and clear handlers, potentially claiming an itinerary was saved when local storage failed.
- Several small text and focus-indicator color combinations need contrast and readability checks.

**Next action / verification:** Apply focused fixes for accurate save feedback and keyboard focus retention, then verify storage persistence and keyboard operation manually. [5]

---

## Task 6: Final Comparison Matrix

| Technique | Observation |
| :--- | :--- |
| **Zero-Shot** | Produced a quick tourism page, but the prompt did not specify Marinduque-specific depth, an itinerary feature, or mobile/accessibility requirements. |
| **Structured Prompt** | Explicitly required the four core content/features, modular HTML/CSS/JS files, vanilla JavaScript, responsive behavior, and keyboard accessibility. |
| **Few-Shot** | Specified a consistent object shape and prompted matching directory data/rendering, reducing schema mismatches. |
| **Role Assignment** | The accessibility review surfaced contrast/readability concerns, overly broad live-region announcements, and focus loss during itinerary rerenders; it also confirmed several existing keyboard and labeling strengths. |
| **Structured Analysis** | The implementation review identified misleading save-success feedback after storage errors and focus loss caused by replacing itinerary controls. It did not find a state-synchronization bug in the remove handler. |

---

**Citation note:** Citation numbers above are retained from the supplied notes. Add the corresponding source list or bibliography before publishing this log; no source details were provided here.
