import {
  Pressable,
  Image,
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { useSpotifyAuth } from "../utils";
import { useEffect } from "react";
import { Themes } from "../assets/Themes";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default function Page() {
  const { token, getSpotifyAuth } = useSpotifyAuth();
  useEffect(() => {
    if (token) {
      global.token = token;
      router.replace({ pathname: `/tabs` });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <MyStatusBar barStyle="light-content" />
      <Text style={styles.title}>Welcome to Retune!</Text>
      <Pressable onPress={() => getSpotifyAuth()} style={styles.button}>
        <Image
          source={require("../assets/spotify-logo-copy.png")}
          style={{ width: 15, aspectRatio: 1, marginRight: 5 }}
        />
        <Text style={{ color: "white" }}>CONNECT WITH SPOTIFY</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    borderRadius: 20,
    margin: 15,
  },
  title: {
    color: Themes.colors.text,
    fontSize: 25,
  },
});
