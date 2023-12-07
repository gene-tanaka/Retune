import { Stack } from "expo-router";
import { Themes } from "../../../assets/Themes";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerStyle: { backgroundColor: Themes.colors.tab },
          headerTitleStyle: { color: "white" },
        }}
      />
      <Stack.Screen
        name="comments"
        options={{
          title: "View Comments",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#848487",
        }}
      />
      <Stack.Screen
        name="openProfile"
        options={{
          title: "View Profile",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#848487",
        }}
      />
    </Stack>
  );
}
