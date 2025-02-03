import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function Layout() {

  return (
    <Stack>
      <StatusBar style="light" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
