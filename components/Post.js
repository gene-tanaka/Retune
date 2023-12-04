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
import { useLocalSearchParams, useRouter } from "expo-router";

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
  const router = useRouter();

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
          borderRadius: 27,
          marginTop: 20,
        }}
      >
        <View style={styles.topContainer}>
          <View style={styles.userContainer}>
            <View style={styles.userSubContainer}>
              <Image
                source={{ uri: profile_uri }}
                style={styles.profilePicture}
              />
              <Button
                titleStyle={{ fontSize: 18 }}
                color="white"
                title={user}
              />
            </View>
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
        <View style={styles.captionContainer}>
          <View style={styles.caption}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => likeImage()}>
                <FontAwesome name="heart" size={25} color={liked} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 15, marginBottom: 4 }}
                onPress={() =>
                  router.push({
                    pathname: "/tabs/home/comments",
                  })
                }
              >
                <FontAwesome name="comment" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <Text numberOfLines={2} style={styles.text}>
              {caption}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: Themes.colors.secondary,
              fontSize: 15,
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              marginTop: 10,
              marginBottom: 20,
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
    borderBottomColor: "#1f1f1f",
    borderBottomWidth: 1,
  },
  commentBar: {
    // backgroundColor: Themes.colors.containers,
    backgroundColor: "black",
    flexDirection: "row",
    width: windowWidth * 0.25,
    borderRadius: 25,
    marginLeft: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  userContainer: {
    // backgroundColor: Themes.colors.containers,
    backgroundColor: "black",
    flexDirection: "row",
    borderRadius: 25,
    padding: 5,
    paddingRight: 10,
    justifyContent: "flex-start",
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
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    flexDirection: "column",
    backgroundColor: "#343436",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    margin: 10,
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
    backgroundColor: "black",
    // flexDirection: "row",
    borderRadius: 25,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    padding: 15,
    width: windowWidth * 0.9,
    height: windowWidth * 0.3,
    margin: 5,
  },
  captionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  likeContainer: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
  },
});
