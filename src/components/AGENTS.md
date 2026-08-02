This folder is the home for shared components.

General rules:

- `ui/` is for small, reusable UI components.
- `atom/` is for compositions of multiple small reusable UI pieces, such as a search component and similar grouped UI patterns.
- `template/` is for reusable screen templates when two or more app screens share the same UI structure.

Each of these folders contains components that should live in their own subfolder.

Inside each component subfolder, use:

- `index.tsx` for the main UI of the component.
- `helper.ts` for supporting functions or small pieces of logic that do not belong in the UI file.
- `type.ts` for props definitions, types, and other helper types.

Logic that lives next to a screen and depends on the auth service (submit login,
signup wizard, reset password, logout) uses a `*Flow.ts` file instead of
`helper.ts`, so it can be unit-tested with a mocked service without rendering
native UI (`src/components/screens/*/<name>Flow.ts`, e.g. `Login/submitLogin.ts`,
`Profile/logoutFlow.ts`).

Use this folder to keep shared UI pieces and screen templates centralized instead of duplicating them across the app.
