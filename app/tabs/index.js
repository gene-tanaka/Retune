import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import {
  getFollowingListIDs,
  getPostsByUserIds,
  getUsernamesByIds,
  retrieveImage,
} from "../api";
import Post from "../../components/Post";
import {
  Link,
  useLocalSearchParams,
  useGlobalSearchParams,
  router,
} from "expo-router";

const MyPost = ({ data, usernames }) => {
  const post = data.item;
  return (
    <Post
      key={post.id}
      user={"@" + usernames[post.userId]}
      image={post.imageUrl}
      caption={post.caption}
      preview={post.preview}
      title={post.title}
      artist={post.artist}
      duration={post.duration}
    />
  );
};

export default function Page() {
  const { loggedInUserId } = useUser();
  const [following, setFollowing] = useState([loggedInUserId]);
  const [posts, setPosts] = useState([]);
  const [usernames, setUsernames] = useState(null);
  const [uri, setUri] = useState("");

  useEffect(() => {
    const fetchFollowing = async () => {
      const followingIds = await getFollowingListIDs(loggedInUserId);
      setFollowing((current) => current.concat([...followingIds]));
      if (following.length > 0) {
        const users = await getUsernamesByIds(following);
        const usernameMap = users.reduce((acc, user) => {
          acc[user.id] = user.username;
          return acc;
        }, {});
        setUsernames(usernameMap);
        const fetchedPosts = await getPostsByUserIds(following);
        const sortedPosts = fetchedPosts.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setPosts(sortedPosts);
        const image = await retrieveImage();
        setUri(image.publicUrl);
      }
    };
    fetchFollowing();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={(data) => <MyPost data={data} usernames={usernames} />}
        contentContainerStyle={{ paddingBottom: 45, paddingTop: 30 }}
      />
    </SafeAreaView>
  );
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
