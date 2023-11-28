import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { Link, useLocalSearchParams, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Themes } from "../../../assets/Themes";
import Post from "../../../components/Post";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const params = useLocalSearchParams();
  const image = params.image;
  const caption = params.caption;
  const preview = params.preview;
  const title = params.title;
  const artist = params.artist;
  const duration = params.duration;

  return (
    <ImageBackground
      source={require("../../../assets/wavy.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Post
        user="@user"
        image={image}
        caption={caption}
        preview={preview}
        title={title}
        artist={artist}
        duration={duration}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContetn: "center",
  },
});
