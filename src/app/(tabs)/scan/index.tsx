import ScanScreenLayout from "@/components/screens/Scan/ScanScreen";
import { Stack } from "expo-router";

export default function ScanScreen() {
  return (
    <>
      <Stack.Title>Scan</Stack.Title>
      <ScanScreenLayout />
    </>
  );
}
