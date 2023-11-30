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
import { Themes } from "../assets/Themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import SongPreview from "../components/SongPreview";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const Post = ({ user, image, caption, preview, title, artist, duration }) => {
  const uri =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/" +
    image;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userSubContainer}>
          <Image source={{ uri: uri }} style={styles.profilePicture} />
          <Button
            style={[styles.text, { fontSize: 18 }]}
            color="white"
            title={user}
          />
        </View>
        <TouchableOpacity>
          <FontAwesome name="comment" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: uri }} style={styles.image} />
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
    padding: 5,
    paddingRight: 10,
    justifyContent: "space-between",
    width: windowWidth * 0.9,
    alignItems: "center",
    alignContent: "center",
  },
  userSubContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    flexDirection: "column",
    backgroundColor: "#343436",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    margin: 15,
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
  },
  profilePicture: {
    borderRadius: 50,
    height: 40,
    width: 40,
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
    width: windowWidth * 0.9,
    height: windowWidth * 0.2,
    margin: 15,
  },
});
