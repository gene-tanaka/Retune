import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import {
  getFollowingListIDs,
  getPostsByUserIds,
  getUsersByIds,
} from "../../api";
import Post from "../../../components/Post";
import { useLocalSearchParams, useRouter } from "expo-router";

const MyPost = ({ data, usernames }) => {
  const post = data.item;
  return (
    <Post
      key={post.id}
      postId={post.id}
      user={"@" + usernames[post.userId].username}
      imageUrl={post.imageUrl}
      caption={post.caption}
      preview={post.preview}
      title={post.title}
      artist={post.artist}
      duration={post.duration}
      timestamp={post.timestamp}
      profile={usernames[post.userId].profile}
      userId={post.userId}
    />
  );
};

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default function Page() {
  const { loggedInUserId } = useUser();
  const [following, setFollowing] = useState([loggedInUserId]);
  const [posts, setPosts] = useState(null);
  const [usernames, setUsernames] = useState(null);
  const params = useLocalSearchParams();

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
        params.success = "false";
      }
    } catch (error) {
      console.error("Error loading posts: ", error);
    }
  };

  useEffect(() => {
    if (
      posts === null ||
      usernames === null ||
      (params && params.success === "true")
    ) {
      fetchFollowing();
    }
  }, [posts, usernames, params]);

  return (
    <ImageBackground
      source={require("../../../assets/wavy.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <MyStatusBar barStyle="light-content" />
      <SafeAreaView>
        {usernames && posts && (
          <FlatList
            data={posts}
            initialNumToRender={5}
            renderItem={(data) => <MyPost data={data} usernames={usernames} />}
            contentContainerStyle={{ paddingBottom: 45 }}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
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
