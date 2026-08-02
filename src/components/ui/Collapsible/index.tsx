import { Collapsible, Column } from "@expo/ui";
import { useState } from "react";
import Text from "../Text";
import data from "./collapsibleData.json";

export default function CollapsibleContent() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <Column spacing={18}>
      {data.map((item) => (
        <Collapsible
          key={item.id}
          label={item.title}
          isOpen={openId === item.id}
          onOpenChange={(open) => setOpenId(open ? item.id : null)}
        >
          <Text textStyle={{ fontSize: 14 }}>{item.desc}</Text>
        </Collapsible>
      ))}
    </Column>
  );
}
