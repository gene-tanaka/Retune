import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { getAllUsers } from "../api";
import Post from "../../components/Post";
import {
  Link,
  useLocalSearchParams,
  useGlobalSearchParams,
  router,
} from "expo-router";

export default function Page() {
  const { loggedInUserId } = useUser();
  const [exploreUserIndex, setExploreUserIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  function makePost(post) {
    let user = "@" + post.user;
    let image = post.image;
    let caption = post.caption;
    let preview = post.preview;
    let title = post.title;
    let artist = post.artist;
    let duration = post.duration;
    return (
      <Post
        user={user}
        image={image}
        caption={caption}
        preview={preview}
        title={title}
        artist={artist}
        duration={duration}
      />
    );
  }

  const postInfo = [
    {
      user: "collin",
      image: require("../../assets/icon.png"),
      caption: "testing",
      preview: null,
      title: "My song",
      artist: "my artist",
      duration: 1200,
    },
  ];

  let showPosts = [];
  for (let post of postInfo) {
    showPosts.push(makePost(post));
  }
  console.log(showPosts);

  return <ScrollView style={styles.container}>{showPosts}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    padding: 24,
    backgroundColor: "#232324",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 36,
    color: "white",
  },
});
