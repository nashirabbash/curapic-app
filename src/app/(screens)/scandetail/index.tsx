import ScanDetailScreenLayout from "@/components/screens/ScanDetail";
import { Stack } from "expo-router";

export default function ScanDetail() {
  return (
    <>
      <Stack.Title style={{ textAlign: "center" }}>Scan Detail</Stack.Title>
      <ScanDetailScreenLayout />
    </>
  );
}
