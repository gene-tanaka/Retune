import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Pressable,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Link, Stack, useGlobalSearchParams, router } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Themes } from "../../../assets/Themes";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!result.canceled) {
      const response = result.assets[0];
      setImage(response.uri);
      setType(response.type);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/wavy.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <TouchableOpacity onPress={pickImage} style={styles.upload}>
        <Text style={{ color: "white", fontSize: 15 }}>⊕ Upload image</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <View
        style={{ position: "absolute", paddingLeft: 270, paddingBottom: 325 }}
      >
        <Pressable onPress={() => setImage(null)}>
          {image ? (
            <Ionicons name="close-circle-outline" size={30} color="red" />
          ) : null}
        </Pressable>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/tabs/post/search",
            params: { image: image, type: type },
          })
        }
      >
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: Themes.colors.background,
  },
  subContainer: {
    flexDirection: "column",
    backgroundColor: Themes.colors.containers,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
  },
  image: {
    flexDirection: "column",
    backgroundColor: Themes.colors.containers,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    position: "absolute",
  },
  text: {
    color: "white",
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
  upload: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    width: windowWidth * 0.5,
    height: windowWidth * 0.07,
    margin: 10,
    backgroundColor: Themes.colors.containers,
  },
});
