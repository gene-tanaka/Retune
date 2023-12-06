import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Themes } from "../assets/Themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Audio } from "expo-av";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

const SongPreview = ({ preview, title, artist, duration }) => {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playColor = preview ? Themes.colors.buttons : "gray";
  //   console.log(preview);

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
    <View style={styles.songContainer}>
      <TouchableOpacity onPress={handlePlayPause}>
        {isPlaying ? (
          <AntDesign
            name="pausecircle"
            size={30}
            color={Themes.colors.buttons}
          />
        ) : (
          <TouchableOpacity onPress={play}>
            <AntDesign name="play" size={30} color={playColor} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          width: windowWidth * 0.6,
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            color: Themes.colors.text,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={{
            color: Themes.colors.secondary,
          }}
          numberOfLines={1}
        >
          {artist}
        </Text>
      </View>
      <Text
        style={{
          color: Themes.colors.text,
        }}
        numberOfLines={1}
      >
        {duration}
      </Text>
    </View>
  );
};

export default SongPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  songContainer: {
    // backgroundColor: Themes.colors.containers,
    backgroundColor: "black",
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: windowWidth * 0.9,
    height: windowWidth * 0.12,
  },
});
