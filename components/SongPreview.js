import { StyleSheet, Text, View, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Themes } from "../assets/Themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Audio } from "expo-av";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

const SongPreview = ({ user, preview, title, artist, duration }) => {
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
    backgroundColor: Themes.colors.containers,
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "space-evenly",
    padding: 8,
    alignItems: "center",
    width: windowWidth * 0.7,
    height: windowWidth * 0.12,
  },
});
