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
import { getUserInfo } from "../utils";

const windowWidth = Dimensions.get("window").width;

const Post = ({ user, image, caption, preview, title, artist, duration }) => {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: preview,
        },
        {
          shouldPlay: true,
          isLooping: false,
        }
      );
      setCurrentSound(sound);
      setIsPlaying(status.isLoaded);
      await sound.playAsync();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, { fontSize: 20 }]}>{user}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.songContainer}>
        <TouchableOpacity onPress={handlePlayPause}>
          {isPlaying ? (
            <AntDesign
              name="pausecircle"
              size={25}
              color={Themes.colors.buttons}
            />
          ) : (
            <TouchableOpacity onPress={play}>
              <AntDesign name="play" size={25} color={Themes.colors.buttons} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "column",
            width: windowWidth * 0.4,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: Themes.colors.text,
              width: styles.songContainer.width * 0.4,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={{
              color: Themes.colors.secondary,
              width: styles.songContainer.width * 0.4,
            }}
            numberOfLines={1}
          >
            {artist}
          </Text>
        </View>
        <Text
          style={{
            color: Themes.colors.text,
            marginLeft: 25,
          }}
          numberOfLines={1}
        >
          {duration}
        </Text>
      </View>
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
  songContainer: {
    backgroundColor: Themes.colors.containers,
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "space-evenly",
    padding: 8,
    alignItems: "center",
    width: windowWidth * 0.7,
    height: windowWidth * 0.12,
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
