import { useTheme } from "@/hooks/use-theme";
import { Column, Icon, Row, Spacer } from "@expo/ui";
import { Box } from "@expo/ui/jetpack-compose";
import { background, size } from "@expo/ui/jetpack-compose/modifiers";
import Badge from "../Badge";
import Text from "../Text";

export default function RecentlyScanCard() {
  const theme = useTheme();
  return (
    <Row style={{ padding: 18 }} spacing={8} alignment="center">
      {/* image placheolder 112x112 */}
      <Box modifiers={[size(100, 100), background("red")]} />
      <Spacer flexible />
      {/* label dll */}
      <Row alignment="center" spacing={6}>
        <Column spacing={8} alignment="start">
          <Text variant="title3" weight="semibold">
            Scan Terakhir
          </Text>
          <Text>22 Maret 2026</Text>
          <Text>Probabilitas kurap:</Text>
          <Row alignment="center">
            <Text textStyle={{ fontSize: 40 }} weight="semibold">
              100%
            </Text>
            <Spacer size={8} />
            <Badge label="Positive" />
          </Row>
        </Column>
        <Icon
          name={Icon.select({
            ios: "chevron.right",
            android: import("@expo/material-symbols/chevron_right.xml"),
          })}
          size={32}
          color={theme.grays.gray}
        />
      </Row>
    </Row>
  );
}
