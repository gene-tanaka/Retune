import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Pressable,
  Button,
  Image,
  TextInput,
  ScrollView,
  Touchable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Themes } from "../assets/Themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Audio } from "expo-av";
import { useState } from "react";
import SongPreview from "../components/SongPreview";

const windowWidth = Dimensions.get("window").width;

const Post = ({ user, image, caption, preview, title, artist, duration }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable>
        <View style={styles.userContainer}>
          <Text style={[styles.text, { fontSize: 18 }]}>{user}</Text>
        </View>
      </Pressable>
      <Image source={{ uri: image }} style={styles.image} />
      <SongPreview
        user={user}
        preview={preview}
        title={title}
        artist={artist}
        duration={duration}
      />
      <View style={styles.caption}>
        <Text style={styles.text}>{caption}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    backgroundColor: Themes.colors.containers,
    flexDirection: "row",
    borderRadius: 25,
    padding: 8,
    justifyContent: "center",
  },
  image: {
    flexDirection: "column",
    backgroundColor: "#343436",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    margin: 15,
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
  },
  text: {
    color: "white",
  },
  caption: {
    backgroundColor: Themes.colors.containers,
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    padding: 15,
    width: windowWidth * 0.7,
    height: windowWidth * 0.2,
    margin: 15,
  },
  button: {
    flexDirection: "column",
    backgroundColor: "#343436",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    width: windowWidth * 0.3,
    height: windowWidth * 0.07,
    margin: 45,
    backgroundColor: Themes.colors.buttons,
  },
});
