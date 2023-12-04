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
import { useState } from "react";
import { Themes } from "../assets/Themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import SongPreview from "../components/SongPreview";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const Post = ({
  user,
  imageUrl,
  caption,
  preview,
  title,
  artist,
  duration,
  timestamp,
  profile,
}) => {
  const uri =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/" +
    imageUrl;

  const profile_uri =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/" +
    profile;

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };
  const [liked, setLiked] = useState("white");

  function likeImage() {
    if (liked === "white") {
      setLiked("red");
    } else {
      setLiked("white");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "black",
          paddingTop: 5,
          borderRadius: 27,
        }}
      >
        <View style={styles.userContainer}>
          <View style={styles.userSubContainer}>
            <Image
              source={{ uri: profile_uri }}
              style={styles.profilePicture}
            />
            <Button titleStyle={{ fontSize: 18 }} color="white" title={user} />
          </View>
        </View>
        <Image source={{ uri: uri }} style={styles.image} />
        <SongPreview
          user={user}
          preview={preview}
          title={title}
          artist={artist}
          duration={duration}
        />
        <View style={styles.commentBar}>
          <TouchableOpacity onPress={() => likeImage()}>
            <FontAwesome name="heart" size={25} color={liked} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="comment"
              size={25}
              color="white"
              style={{ marginLeft: 15, paddingBottom: 3 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.caption}>
          <Text numberOfLines={2} style={styles.text}>
            {caption}
          </Text>
        </View>
        <View style={{ marginLeft: -60, marginBottom: 5 }}>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              marginLeft: 60,
            }}
          >
            {"Posted on " +
              formatDate(timestamp) +
              ", " +
              formatTime(timestamp)}
          </Text>
        </View>
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
    marginBottom: 10,
  },
  commentBar: {
    // backgroundColor: Themes.colors.containers,
    backgroundColor: "black",
    flexDirection: "row",
    width: windowWidth * 0.27,
    borderRadius: 25,
    padding: 10,
    marginTop: 5,
    marginLeft: -245,
    alignItems: "center",
    justifyContent: "center",
  },
  userContainer: {
    // backgroundColor: Themes.colors.containers,
    backgroundColor: "black",
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
    padding: 1,
  },
  image: {
    flexDirection: "column",
    backgroundColor: "#343436",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    margin: 5,
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
    // backgroundColor: "black",
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    padding: 15,
    width: windowWidth * 0.9,
    height: windowWidth * 0.2,
    margin: 5,
  },
});
