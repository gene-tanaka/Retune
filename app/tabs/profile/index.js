import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Song from "../../../components/Song";
import Post from "../../../components/Post";
import { Themes } from "../../../assets/Themes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "../../../contexts/UserContext";
import SongPreview from "../../../components/SongPreview";

import {
  getFollowingList,
  getFollowerList,
  getPostsByUserId,
  getUsersByIds,
} from "../../api";

const MyPost = ({ post, username, profilePic }) => {
  return (
    <Post
      key={post.id}
      user={"@" + username}
      image={post.imageUrl}
      caption={post.caption}
      preview={post.preview}
      title={post.title}
      artist={post.artist}
      duration={post.duration}
      timestamp={post.timestamp}
      profile={profilePic}
    />
  );
};
const windowWidth = Dimensions.get("window").width;

export default function ProfilePage() {
  const { loggedInUserId } = useUser();
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [favoriteSong, setFavoriteSong] = useState(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  const uri_prefix =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/";

  const fetchInfo = async () => {
    const profile = await getUsersByIds([loggedInUserId]);
    setProfile(profile[0]);
    const fetchFollowing = await getFollowingList(loggedInUserId);
    const fetchFollowers = await getFollowerList(loggedInUserId);
    setFollowing(fetchFollowing);
    setFollowers(fetchFollowers);
    const fetchedPosts = await getPostsByUserId(loggedInUserId);
    const sortedPosts = fetchedPosts.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    setPosts(sortedPosts);
    setFavoriteSong(JSON.parse(profile[0].favoriteSong));
  };
  useEffect(() => {
    fetchInfo();
  }, [params]);
  console.log(profile);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{"@" + profile.username}</Text>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.topSection}>
          <View style={styles.profileLeft}>
            <TouchableOpacity style={styles.profilePicContainer}>
              {profile.profilePic ? (
                <Image
                  source={{ uri: uri_prefix + profile.profilePic }}
                  style={styles.profilePic}
                />
              ) : (
                <Text style={styles.addPhotoText}>Add Photo</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{posts.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{followers.length}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{following.length}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.name}>
            {profile.firstName + " " + profile.lastName}
          </Text>
          <Text style={styles.bio}>{profile.description}</Text>
        </View>
      </View>
      <View style={styles.favSongContainer}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: 10,
            fontSize: 20,
          }}
        >
          Current Favorite Song:
        </Text>
        {!favoriteSong ? (
          <TouchableOpacity
            style={styles.songContainer}
            onPress={() =>
              router.push({
                pathname: "/tabs/profile/addSong",
              })
            }
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              ⊕ Add a favorite song!
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <SongPreview
              user={profile.username}
              preview={favoriteSong.preview}
              title={favoriteSong.title}
              artist={favoriteSong.artist}
              duration={favoriteSong.duration}
            />
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: Themes.colors.buttons,
                padding: 8,
                borderRadius: 20,
              }}
              onPress={() =>
                router.push({
                  pathname: "/tabs/profile/addSong",
                })
              }
            >
              <Text style={{ color: "white" }}>Change Song</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.postHeader}>
        <Text style={styles.headerText}>My Posts</Text>
      </View>
      <View>
        {posts &&
          posts.map((post) => (
            <MyPost
              key={post.id}
              post={post}
              username={profile.username}
              profilePic={profile.profilePic}
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232324",
    paddingTop: 5,
  },
  favSongContainer: {
    backgroundColor: "black",
    padding: 15,
    paddingBottom: 5,
    marginHorizontal: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  songContainer: {
    // backgroundColor: Themes.colors.containers,
    backgroundColor: "black",
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "space-evenly",
    padding: 8,
    alignItems: "center",
    width: windowWidth * 0.93,
    height: windowWidth * 0.12,
    marginLeft: 12,
    marginBottom: 12,
  },
  postHeader: {
    borderTopWidth: 2,
    borderTopColor: Themes.colors.secondary,
    // borderTopColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "#000",
    padding: 15,
    marginHorizontal: 10,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 10,
  },
  usernameContainer: {
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.secondary,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileLeft: {
    alignItems: "center",
    marginRight: 20,
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profilePic: {
    width: "100%",
    height: "100%",
  },
  addPhotoText: {
    color: "#fff",
    fontSize: 18,
  },
  username: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stat: {
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 0,
  },
  statNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#fff",
    fontSize: 14,
  },
  bottomSection: {
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 5,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  bio: {
    color: "#fff",
    fontSize: 15,
    marginTop: 5,
  },
  // Add styles for Song component if needed
});