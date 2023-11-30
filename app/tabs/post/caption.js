import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Themes } from "../../../assets/Themes";
import { Audio } from "expo-av";
import { uploadImage, createPost } from "../../api";
import { useUser } from "../../../contexts/UserContext";

const windowWidth = Dimensions.get("window").width;

export default function Page() {
  const params = useLocalSearchParams();
  const { loggedInUserId } = useUser();
  const preview = params.preview;
  const image = params.image;
  const type = params.type;
  const [caption, setCaption] = useState("");
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
    <ImageBackground
      source={require("../../../assets/wavy.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text style={styles.text}>Write a caption to complete your post!</Text>
        <Image source={{ uri: params.image }} style={styles.image} />
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
                <AntDesign
                  name="play"
                  size={25}
                  color={Themes.colors.buttons}
                />
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
              }}
              numberOfLines={1}
            >
              {params.title}
            </Text>
            <Text
              style={{
                color: Themes.colors.secondary,
              }}
              numberOfLines={1}
            >
              {params.artist}
            </Text>
          </View>

          <Text
            style={{
              color: Themes.colors.text,
              marginLeft: 25,
            }}
            numberOfLines={1}
          >
            {params.duration}
          </Text>
        </View>

        <View style={styles.caption}>
          <TextInput
            style={{ color: Themes.colors.text }}
            placeholder="Your caption here..."
            placeholderTextColor={Themes.colors.secondary}
            value={caption}
            multiline={true}
            onChangeText={(text) => {
              setCaption(text);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const filepath = await uploadImage(image, type);
            const post = {
              user_id: loggedInUserId,
              caption: caption,
              image_url: filepath,
              preview: params.preview,
              title: params.title,
              artist: params.artist,
              duration: params.duration,
            };
            createPost(post);
            router.push({
              pathname: "tabs/",
            });
          }}
        >
          <Text style={styles.text}>Post!</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

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
    justifyContent: "space-around",
    alignItems: "center",
    width: windowWidth * 0.7,
    height: windowWidth * 0.12,
    padding: 8,
  },
  image: {
    flexDirection: "column",
    backgroundColor: Themes.colors.containers,
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
    fontSize: 16,
  },

  caption: {
    backgroundColor: Themes.colors.containers,
    flexDirection: "row",
    borderRadius: 25,
    padding: 15,
    width: windowWidth * 0.7,
    height: windowWidth * 0.2,
    margin: 15,
  },
  button: {
    flexDirection: "column",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    width: windowWidth * 0.3,
    height: windowWidth * 0.07,
    margin: 40,
    backgroundColor: Themes.colors.buttons,
  },
});
