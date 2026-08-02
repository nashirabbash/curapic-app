import ProfileScreenLayout from "@/components/screens/Profile";
import { Stack } from "expo-router";

export default function ProfileScreen() {
  return (
    <>
      <Stack.Title>Profile</Stack.Title>
      <ProfileScreenLayout />
    </>
  );
}
