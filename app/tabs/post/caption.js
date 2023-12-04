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
import { Themes } from "../../../assets/Themes";
import SongPreview from "../../../components/SongPreview";
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
        <SongPreview
          user={params.user}
          preview={params.preview}
          title={params.title}
          artist={params.artist}
          duration={params.duration}
        />

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
            while (router.canGoBack()) {
              router.back();
            }
            router.replace("tabs/post");
            router.push({
              pathname: "tabs/",
              params: { success: "true" },
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

  image: {
    flexDirection: "column",
    backgroundColor: Themes.colors.containers,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    margin: 15,
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
  },
  text: {
    color: "white",
    fontSize: 16,
  },

  caption: {
    backgroundColor: "black",
    flexDirection: "row",
    borderRadius: 25,
    padding: 15,
    width: windowWidth * 0.9,
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
    marginBottom: 50,
    backgroundColor: Themes.colors.buttons,
  },
});
