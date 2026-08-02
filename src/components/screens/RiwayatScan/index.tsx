import Badge from "@/components/ui/Badge";
import { Divider } from "@/components/ui/Divider";
import Text from "@/components/ui/Text";
import { useTheme } from "@/hooks/use-theme";
import ChevronRightIcon from "@expo/material-symbols/chevron_right.xml";
import { Column, Host, Icon, Row, ScrollView, Spacer } from "@expo/ui";
import { Box } from "@expo/ui/jetpack-compose";
import { background, size } from "@expo/ui/jetpack-compose/modifiers";
import { router } from "expo-router";

// placeholder data — ganti dengan data dari store saat sudah ada
const scanHistory = [
  { id: 1, bodyPart: "Lengan Kanan", date: "22 Maret 2026, 22:29" },
  { id: 2, bodyPart: "Lengan Kanan", date: "22 Maret 2026, 22:29" },
  { id: 3, bodyPart: "Lengan Kanan", date: "22 Maret 2026, 22:29" },
  { id: 4, bodyPart: "Lengan Kanan", date: "22 Maret 2026, 22:29" },
  { id: 5, bodyPart: "Lengan Kanan", date: "22 Maret 2026, 22:29" },
  { id: 6, bodyPart: "Lengan Kanan", date: "22 Maret 2026, 22:29" },
];

export default function RiwayatScanLayout() {
  const theme = useTheme();
  return (
    <Host useViewportSizeMeasurement style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: theme.background, paddingHorizontal: 16 }}
      >
        <Column>
          {scanHistory.map((item, index) => (
            <Column key={item.id}>
              {index > 0 && <Divider color={theme.separators.vibrant} />}
              <Row
                style={{ paddingVertical: 14 }}
                spacing={18}
                alignment="center"
              >
                {/* thumbnail hasil scan */}
                <Box
                  modifiers={[
                    size(77, 77),
                    background(theme.fillsVibrant.primary),
                  ]}
                />
                <Column spacing={8}>
                  <Text variant="headline" weight="semibold">
                    {item.bodyPart}
                  </Text>
                  <Badge label="Positive" />
                  <Text variant="subheadline">{item.date}</Text>
                </Column>
                <Spacer flexible />
                <Icon
                  name={Icon.select({
                    ios: "chevron.right",
                    android: ChevronRightIcon,
                  })}
                  size={17}
                  color={theme.labels.tertiary}
                  onPress={() => router.push("/(screens)/scandetail")}
                />
              </Row>
            </Column>
          ))}
        </Column>
      </ScrollView>
    </Host>
  );
}
