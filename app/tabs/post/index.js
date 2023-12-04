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
import { router } from "expo-router";
import { useState, useEffect } from "react";
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
  let shown = null;
  if (!image) {
    shown = (
      <Text style={{ color: Themes.colors.secondary, fontSize: 20 }}>
        ⇧ Upload image
      </Text>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/wavy.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <TouchableOpacity onPress={pickImage} style={styles.subContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {shown}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const params = { image: image, type: type };
          setImage(null);
          setType(null);
          router.push({
            pathname: "/tabs/post/search",
            params: params,
          });
        }}
      >
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>

      <Pressable
        onPress={() => setImage(null)}
        style={{ position: "absolute", left: 350, top: 130 }}
      >
        {image ? <Ionicons name="close-circle" size={40} color="red" /> : null}
      </Pressable>
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
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
  },
  image: {
    flexDirection: "column",
    backgroundColor: Themes.colors.containers,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
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
    width: windowWidth * 0.4,
    height: windowWidth * 0.1,
    margin: 10,
    backgroundColor: "black",
  },
});
