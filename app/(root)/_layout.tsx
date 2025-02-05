import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function Layout() {

  return (
    <Stack>
      <StatusBar style="light" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="find-ride" options={{ headerShown: false }} />
      {/* <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
      <Stack.Screen name="book-ride" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
