import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { UserProvider } from "../contexts/UserContext";

export default function HomeLayout() {
  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "black",
            overflow: "hidden",
            position: "absolute",
            borderTopColor: "black",
          },
          tabBarTitleStyle: {
            color: "white",
          },
          headerShadowVisible: false,
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="feed"
          options={{
            title: "Explore",
            tabBarLabel: "Explore",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="flash-sharp" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="posting"
          options={{
            title: "Post",
            tabBarLabel: "Post",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="add-circle-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person-circle-outline" size={30} color={color} />
            ),
          }}
        />
      </Tabs>
    </UserProvider>
  );
}
