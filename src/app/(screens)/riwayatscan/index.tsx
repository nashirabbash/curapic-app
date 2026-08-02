import RiwayatScanLayout from "@/components/screens/RiwayatScan";
import { Stack } from "expo-router";

export default function RiwayatScan() {
  return (
    <>
      <Stack.Title style={{ textAlign: "center" }}>Riwayat Scan</Stack.Title>
      <RiwayatScanLayout />
    </>
  );
}
