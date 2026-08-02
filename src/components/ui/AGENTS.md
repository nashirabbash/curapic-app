This folder is the home for UI components.

General rules:

- Each component should have its own folder, for example `Button/`.
- `index.tsx` should be the main UI file for the component.
- `helper.ts` should contain supporting functions or small pieces of logic that do not belong in the UI file.
- `type.ts` should contain props definitions, types, and other helper types.

The goal is to keep each component clean, easy to find, and not mix UI code with helpers or types.
