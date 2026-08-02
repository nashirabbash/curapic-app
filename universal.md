---
title: "Universal"
description: "Cross-platform components for building shared UIs across Android, iOS, and web with @expo/ui."
source_url: "https://docs.expo.dev/versions/latest/sdk/ui/universal.md"
scraped_at: "2026-07-15T08:32:26.323905"
---

---
title: Universal
description: Cross-platform components for building shared UIs across Android, iOS, and web with @expo/ui.
sourceCodeUrl: 'https://github.com/expo/expo/tree/sdk-57/packages/expo-ui'
packageName: '@expo/ui'
platforms: ['android', 'ios', 'web', 'expo-go']
---



This documentation is available as Markdown for AI agents and LLMs. See the [full Markdown index](/llms.txt) or append .md to any documentation URL.

# Universal

Cross-platform components for building shared UIs across Android, iOS, and web with @expo/ui.
Android, iOS, Web, Included in Expo Go

The universal components in `@expo/ui` are a single-API layer over the platform-native UI toolkits. On Android, they delegate to [`@expo/ui/jetpack-compose`](/versions/latest/sdk/ui/jetpack-compose.md). On iOS, they delegate to [`@expo/ui/swift-ui`](/versions/latest/sdk/ui/swift-ui.md). On web, they're JS implementations using `react-dom` or `react-native-web` and are picked per component to suit the control.

## Installation

```sh
# npm
npx expo install @expo/ui

# yarn
yarn expo install @expo/ui

# pnpm
pnpm expo install @expo/ui

# bun
bun expo install @expo/ui
```

If you are installing this in an [existing React Native app](/bare/overview.md), make sure to [install `expo`](/bare/installing-expo-modules.md) in your project.

## Usage

Universal components must still be wrapped in a [`Host`](/versions/latest/sdk/ui/universal/host.md), but you import everything, including `Host`, from the package root. The universal `Host` dispatches to the platform-native host on Android and iOS, so there's no need to reach for [`@expo/ui/swift-ui`](/versions/latest/sdk/ui/swift-ui.md) or [`@expo/ui/jetpack-compose`](/versions/latest/sdk/ui/jetpack-compose.md) directly.

```tsx
import { Host, Column, Button, Text } from '@expo/ui';

export default function Example() {
  return (
    <Host style={{ flex: 1 }}>
      <Column spacing={12} alignment="center">
        <Text>Hello, world!</Text>
        <Button label="Press me" onPress={() => alert('Pressed')} />
      </Column>
    </Host>
  );
}
```

## Components

-   **Container:** [`Host`](/versions/latest/sdk/ui/universal/host.md) — the required root for every universal subtree.
-   **Layout:** [`Column`](/versions/latest/sdk/ui/universal/column.md), [`Row`](/versions/latest/sdk/ui/universal/row.md), [`Spacer`](/versions/latest/sdk/ui/universal/spacer.md), [`ScrollView`](/versions/latest/sdk/ui/universal/scrollview.md).
-   **Display:** [`Text`](/versions/latest/sdk/ui/universal/text.md), [`Icon`](/versions/latest/sdk/ui/universal/icon.md).
-   **Controls:** [`Button`](/versions/latest/sdk/ui/universal/button.md), [`Switch`](/versions/latest/sdk/ui/universal/switch.md), [`Checkbox`](/versions/latest/sdk/ui/universal/checkbox.md), [`Slider`](/versions/latest/sdk/ui/universal/slider.md), [`TextInput`](/versions/latest/sdk/ui/universal/textinput.md), [`Picker`](/versions/latest/sdk/ui/universal/picker.md).
-   **Disclosure and presentation:** [`BottomSheet`](/versions/latest/sdk/ui/universal/bottomsheet.md), [`Collapsible`](/versions/latest/sdk/ui/universal/collapsible.md).
-   **Collections and forms:** [`List`](/versions/latest/sdk/ui/universal/list.md) (with `ListItem`), [`FieldGroup`](/versions/latest/sdk/ui/universal/fieldgroup.md).

## When to use this versus `swift-ui` / `jetpack-compose`

-   Reach for **universal** components when you want one component tree that runs unmodified on Android, iOS, and web. The platform-native look and feel is preserved on Android and iOS because the components delegate to Jetpack Compose/SwiftUI under the hood.
-   Reach for **[`@expo/ui/swift-ui`](/versions/latest/sdk/ui/swift-ui.md)** or **[`@expo/ui/jetpack-compose`](/versions/latest/sdk/ui/jetpack-compose.md)** directly when you need platform-specific controls, modifiers, or behavior that the universal API doesn't surface.
