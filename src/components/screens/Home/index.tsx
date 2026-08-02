import CollapsibleContent from "@/components/ui/Collapsible";
import RecentlyScanCard from "@/components/ui/RecentlyScanCard";
import { Column, Host } from "@expo/ui";
import { fillMaxSize } from "@expo/ui/jetpack-compose/modifiers";

export default function Home() {
  return (
    <Host style={{ flex: 1 }}>
      <Column
        modifiers={[fillMaxSize()]}
        alignment="center"
        style={{ padding: 16 }}
        spacing={28}
      >
        <RecentlyScanCard />
        <CollapsibleContent />
      </Column>
    </Host>
  );
}
