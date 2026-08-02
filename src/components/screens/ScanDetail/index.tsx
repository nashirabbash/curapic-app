import Badge from "@/components/ui/Badge";
import Text from "@/components/ui/Text";
import recommendations from "@/constants/scan-detail-recommendations.json";
import { useTheme } from "@/hooks/use-theme";
import { Column, FieldGroup, Host, Icon, Row, Spacer } from "@expo/ui";
import { Box } from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  height,
  padding,
} from "@expo/ui/jetpack-compose/modifiers";

const metadaRows = [
  {
    icon: Icon.select({
      ios: "calendar",
      android: require("@expo/material-symbols/calendar_today.xml"),
    }),
    text: "22 Mei 2026",
  },
  {
    icon: Icon.select({
      ios: "clock",
      android: require("@expo/material-symbols/clock_loader_40.xml"),
    }),
    text: "21:29 WIB",
  },
  {
    icon: Icon.select({
      ios: "location",
      android: require("@expo/material-symbols/location_on.xml"),
    }),
    text: "Lengan Kanan",
  },
];

export default function ScanDetailScreenLayout() {
  const theme = useTheme();
  return (
    <Host useViewportSizeMeasurement style={{ flex: 1 }}>
      <Column>
        <Box modifiers={[fillMaxWidth(), height(220), padding(16, 0, 16, 0)]} />
        <Column
          modifiers={[fillMaxWidth()]}
          alignment="start"
          style={{ paddingHorizontal: 16 }}
        >
          <Text variant="headline">Hasil Analisis</Text>
          <Row modifiers={[fillMaxWidth()]} alignment="center">
            <Text textStyle={{ fontSize: 80 }} weight="semibold">
              100%
            </Text>
            <Spacer flexible />
            <Badge label="POSITIVE" />
          </Row>
        </Column>
        <Column alignment="start" style={{ paddingHorizontal: 16 }}>
          {metadaRows.map((row) => (
            <Row
              key={row.text}
              spacing={8}
              alignment="center"
              modifiers={[height(40)]}
            >
              <Icon name={row.icon} size={24} color={theme.text} />
              <Text>{row.text}</Text>
            </Row>
          ))}
        </Column>
        <FieldGroup style={{ backgroundColor: theme.background }}>
          <FieldGroup.Section title="Rekomendasi Perawatan">
            {recommendations.map((item) => (
              <Text key={item.id}>{item.text}</Text>
            ))}
          </FieldGroup.Section>
        </FieldGroup>
      </Column>
    </Host>
  );
}
