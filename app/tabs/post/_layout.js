import { StyleSheet, Text, View, ImageBackground } from "react-native";

import { Link, Stack } from "expo-router";
import { Themes } from "../../../assets/Themes";

export default function PostLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Image",
          headerShown: true,
          headerStyle: { backgroundColor: Themes.colors.tab },
          headerTitleStyle: { color: "white" },
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: "Song",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#848487",
        }}
      />
      <Stack.Screen
        name="caption"
        options={{
          title: "Caption",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#848487",
        }}
      />
      <Stack.Screen
        name="final"
        options={{
          title: "Successfully Posted!",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#848487",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
