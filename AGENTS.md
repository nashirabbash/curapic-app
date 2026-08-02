# MANDATORY: Before Writing Any Code

use Expo Ui core component

## Project Structure

```
.
├── docs/                          # Dokumentasi Expo v57 (offline reference). Baca sebelum nulis kode Expo.
├── assets/                        # Gambar, font, dan static assets lainnya.
├── scripts/                       # Utility scripts (reset-project.js untuk reset ke template awal).
└── src/
    ├── app/                       # Expo Router — semua file di sini otomatis jadi route.
    │   ├── _layout.tsx            # Root layout (provider, global wrapper).
    │   ├── (tabs)/                # Tab navigator — index, doctor, scan, profile.
    │   └── (screens)/             # Stack/modal screens di luar tab.
    │       └── (auth)/            # Auth screens: WelcomeScreen, Login, SignUp.
    │
    ├── components/
    │   ├── ui/                    # Primitive UI components (Button, TextField, BottomAction, helperText).
    │   ├── navigation/tabs/       # Tab navigation components (tab bar, icons).
    │   └── template/              # Layout templates / screen wrappers.
    │
    ├── constants/                 # Theme, warna, spacing, dan konstanta global lainnya.
    ├── hooks/                     # Custom React hooks (use-theme, use-color-scheme).
    ├── slice/                     # Redux Toolkit slices — state per fitur.
    └── store/                     # Redux store config dan setup middleware.
```

### Navigation Pattern

Project pakai **Expo Router file-based routing**:

- `(tabs)/` → tab screens, dirender dalam tab navigator
- `(screens)/` → stack screens di luar tab (modal, auth flow, dll)
- Folder dengan kurung `()` = route group, tidak muncul di URL path

These rules apply to every task in this project unless explicitly overridden.
Bias: caution over speed on non-trivial work. Use judgment on trivial tasks.

## Rule 1 — Think Before Coding

State assumptions explicitly. If uncertain, ask rather than guess.
Present multiple interpretations when ambiguity exists.
Push back when a simpler approach exists.
Stop when confused. Name what's unclear.

## Rule 2 — Simplicity First

Minimum code that solves the problem. Nothing speculative.
No features beyond what was asked. No abstractions for single-use code.
Test: would a senior engineer say this is overcomplicated? If yes, simplify.

## Rule 3 — Surgical Changes

Touch only what you must. Clean up only your own mess.
Don't "improve" adjacent code, comments, or formatting.
Don't refactor what isn't broken. Match existing style.

## Rule 4 — Goal-Driven Execution

Define success criteria. Loop until verified.
Don't follow steps. Define success and iterate.
Strong success criteria let you loop independently.

## Rule 5 — Use the model only for judgment calls

Use me for: classification, drafting, summarization, extraction.
Do NOT use me for: routing, retries, deterministic transforms.
If code can answer, code answers.

## Rule 6 — Token budgets are not advisory

Per-task: 4,000 tokens. Per-session: 30,000 tokens.
If approaching budget, summarize and start fresh.
Surface the breach. Do not silently overrun.

## Rule 7 — Surface conflicts, don't average them

If two patterns contradict, pick one (more recent / more tested).
Explain why. Flag the other for cleanup.
Don't blend conflicting patterns.

## Rule 8 — Read before you write

Before adding code, read exports, immediate callers, shared utilities.
"Looks orthogonal" is dangerous. If unsure why code is structured a way, ask.

## Rule 9 — Tests verify intent, not just behavior

Tests must encode WHY behavior matters, not just WHAT it does.
A test that can't fail when business logic changes is wrong.

## Rule 10 — Checkpoint after every significant step

Summarize what was done, what's verified, what's left.
Don't continue from a state you can't describe back.
If you lose track, stop and restate.

## Rule 11 — Match the codebase's conventions, even if you disagree

Conformance > taste inside the codebase.
If you genuinely think a convention is harmful, surface it. Don't fork silently.

## Rule 12 — Fail loud

"Completed" is wrong if anything was skipped silently.
"Tests pass" is wrong if any were skipped.
Default to surfacing uncertainty, not hiding it.

## Rule 13 — Always Apply Clean Code Principles

Apply clean code principles in every piece of code you write.

- Simplicity (KISS): Keep logic straightforward and avoid unnecessary complexity. Choose the easiest solution to understand and maintain.
- Readability: Use clear, descriptive names for variables and functions, and keep formatting and indentation consistent.
- Single Responsibility (SRP): Each function, class, or module should have one responsibility and one reason to change.
- Don't Repeat Yourself (DRY): Avoid duplication by extracting repeated logic into reusable functions or modules.
- Small Functions: Keep functions short and focused on a single task to improve clarity and testability.
- Minimal Side Effects: Avoid changing state outside a function's scope unless that behavior is intentional.
- YAGNI: Do not add functionality unless it is immediately needed. Avoid over-engineering.
- Consistency: Follow the codebase's existing conventions and style so the project stays easy to work on.

## Agent skills

### Issue tracker

[GitHub] Issues live in the repo's GitHub Issues (uses the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Domain docs

[single-context] Single `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
