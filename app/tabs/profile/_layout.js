import { Stack } from "expo-router";
import { Themes } from "../../../assets/Themes";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: Themes.colors.tab },
          headerTitleStyle: { color: "white" },
        }}
      />
      <Stack.Screen
        name="addSong"
        options={{
          title: "Choose Favorite Song",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#848487",
        }}
      />
      <Stack.Screen
        name="showFollowers"
        options={{
          title: "Followers",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#848487",
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
        name="showFollowing"
        options={{
          title: "Following",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#848487",
        }}
      />
      <Stack.Screen
        name="showProfile"
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
