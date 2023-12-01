import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { getFollowingListIDs, getPostsByUserIds, getUsersByIds } from "../api";
import Post from "../../components/Post";

const MyPost = ({ data, usernames }) => {
  const post = data.item;
  return (
    <Post
      key={post.id}
      user={"@" + usernames[post.userId].username}
      image={post.imageUrl}
      caption={post.caption}
      preview={post.preview}
      title={post.title}
      artist={post.artist}
      duration={post.duration}
      timestamp={post.timestamp}
      profile={usernames[post.userId].profile}
    />
  );
};

export default function Page() {
  const { loggedInUserId } = useUser();
  const [following, setFollowing] = useState([loggedInUserId]);
  const [posts, setPosts] = useState([]);
  const [usernames, setUsernames] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFollowing = async () => {
    try {
      const followingIds = await getFollowingListIDs(loggedInUserId);
      setFollowing((current) => current.concat([...followingIds]));
      if (following.length > 0) {
        const users = await getUsersByIds(following);
        const usernameMap = users.reduce((acc, user) => {
          acc[user.id] = { username: user.username, profile: user.profilePic };
          return acc;
        }, {});
        setUsernames(usernameMap);

        const fetchedPosts = await getPostsByUserIds(following);
        const sortedPosts = fetchedPosts.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setPosts(sortedPosts);
      }
    } catch (error) {
      console.error("Error loading posts: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowing();

    const intervalId = setInterval(fetchFollowing, 3000); // Poll every 2 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
