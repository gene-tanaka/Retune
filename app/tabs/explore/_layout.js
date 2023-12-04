import { Stack } from "expo-router";
import { Themes } from "../../../assets/Themes";

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Explore",
          headerStyle: { backgroundColor: Themes.colors.tab },
          headerTitleStyle: { color: "white" },
        }}
      />
      <Stack.Screen
        name="exploreUser"
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
