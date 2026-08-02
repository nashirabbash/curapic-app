import { Stack } from "expo-router";
import Home from "../../../components/screens/Home";

export default function HomeScreen() {
  return (
    <>
      <Stack.Title>Home</Stack.Title>
      <Home />
    </>
  );
}
