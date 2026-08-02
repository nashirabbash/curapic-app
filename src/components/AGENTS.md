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

Use this folder to keep shared UI pieces and screen templates centralized instead of duplicating them across the app.
