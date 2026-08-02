import type { SFSymbol } from "sf-symbols-typescript";

import photoTipsData from "@/components/screens/Scan/tipsfotoData.json";
import Text from "@/components/ui/Text";
import { useTheme } from "@/hooks/use-theme";
import PhotoCameraIcon from "@expo/material-symbols/photo_camera.xml";
import PhotoLibraryIcon from "@expo/material-symbols/photo_library.xml";
import { Column, FieldGroup, Host, Icon, Row, Spacer } from "@expo/ui";
import { Button, OutlinedButton } from "@expo/ui/jetpack-compose";
import {
  border,
  clip,
  fillMaxWidth,
  height,
  padding,
  Shapes,
  weight,
} from "@expo/ui/jetpack-compose/modifiers";

const photoButtons = [
  {
    label: "FOTO",
    iosIcon: "camera" as SFSymbol,
    androidIcon: PhotoCameraIcon,
  },
  {
    label: "GALERI",
    iosIcon: "photo" as SFSymbol,
    androidIcon: PhotoLibraryIcon,
  },
];

export default function ScanScreenLayout() {
  const theme = useTheme();
  return (
    <Host useViewportSizeMeasurement style={{ flex: 1 }}>
      <Column modifiers={[fillMaxWidth()]} style={{}}>
        {/* foto placeholder */}
        <Column style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Row
            modifiers={[
              fillMaxWidth(),
              height(200),
              border(1, "white"),
              clip(Shapes.RoundedCorner(8)),
            ]}
            alignment="center"
          >
            <Column alignment="center" spacing={8} modifiers={[fillMaxWidth()]}>
              <Icon
                name={Icon.select({
                  ios: "camera",
                  android: PhotoCameraIcon,
                })}
                size={32}
                color={theme.textSecondary}
              />
              <Text textStyle={{ fontSize: 14 }} color={theme.textSecondary}>
                Ambil foto atau pilih dari galeri
              </Text>
            </Column>
          </Row>
        </Column>
        {/* Tips Foto yang Baik */}
        <FieldGroup style={{ backgroundColor: theme.background }}>
          <FieldGroup.Section title="Tips Foto yang Baik">
            {photoTipsData.map((item) => (
              <Text key={item.id}>{item.desc}</Text>
            ))}
          </FieldGroup.Section>
        </FieldGroup>
        {/* button Foto dan button Galeri */}
        <Row modifiers={[fillMaxWidth(), padding(16, 0, 16, 0)]} spacing={14}>
          {photoButtons.map(({ label, iosIcon, androidIcon }) => (
            <OutlinedButton key={label} modifiers={[weight(1), height(48)]}>
              <Icon
                name={Icon.select({ ios: iosIcon, android: androidIcon })}
                size={24}
                color={theme.text}
              />
              <Spacer size={8} />
              <Text>{label}</Text>
            </OutlinedButton>
          ))}
        </Row>
        <Spacer size={14} />
        <Button
          modifiers={[fillMaxWidth(), height(48), padding(16, 0, 16, 0)]}
          colors={{ containerColor: theme.primary }}
        >
          <Text
            variant="body"
            textStyle={{ letterSpacing: 2 }}
            weight="semibold"
            color={theme.labels.primary}
          >
            SCAN
          </Text>
        </Button>
      </Column>
    </Host>
  );
}
