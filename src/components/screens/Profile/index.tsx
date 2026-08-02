import Text from "@/components/ui/Text";
import { useTheme } from "@/hooks/use-theme";
import { Column, FieldGroup, Icon, Row, Spacer } from "@expo/ui";
import { Box, Host } from "@expo/ui/jetpack-compose";
import {
  background,
  fillMaxWidth,
  padding,
  paddingAll,
  size,
} from "@expo/ui/jetpack-compose/modifiers";
import { useRouter } from "expo-router";

export default function ProfileScreenLayout() {
  const router = useRouter();
  const theme = useTheme();
  const CHEVRON = Icon.select({
    ios: "chevron.right",
    android: require("@expo/material-symbols/chevron_right.xml"),
  });

  const History = Icon.select({
    ios: "clock",
    android: require("@expo/material-symbols/history_2.xml"),
  });

  const Logout = Icon.select({
    ios: "arrow.right.square",
    android: require("@expo/material-symbols/logout.xml"),
  });

  const menuItems = [
    {
      id: "history",
      label: "Riwayat Scan",
      icon: History,
      onPress: () => router.push("/(screens)/riwayatscan"),
    },
    {
      id: "logout",
      label: "Log out",
      icon: Logout,
      onPress: () => console.log("logout"),
    },
  ];

  return (
    <Host useViewportSizeMeasurement style={{ flex: 1 }}>
      <Column modifiers={[fillMaxWidth()]}>
        <Row modifiers={[fillMaxWidth(), paddingAll(16)]} alignment="center">
          <Row
            modifiers={[fillMaxWidth(), padding(16, 0, 16, 0)]}
            alignment="center"
          >
            <Box modifiers={[size(72, 72), background("red")]} />
            <Spacer size={14} />
            <Column>
              <Text>Fullname</Text>
              <Text variant="subheadline">Email</Text>
            </Column>
          </Row>
        </Row>
        <FieldGroup style={{ backgroundColor: theme.background }}>
          <FieldGroup.Section>
            {menuItems.map((item) => (
              <Row key={item.id} alignment="center" onPress={item.onPress}>
                <Row alignment="center">
                  <Icon name={item.icon} />
                  <Spacer size={8} />
                  <Text>{item.label}</Text>
                </Row>
                <Spacer flexible />
                <Icon name={CHEVRON} size={24} />
              </Row>
            ))}
          </FieldGroup.Section>
        </FieldGroup>
      </Column>
    </Host>
  );
}
