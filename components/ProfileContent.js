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
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  getFollowingList,
  getFollowerList,
  getPostsByUserId,
  getUsersByIds,
} from "../app/api";
import SongPreview from "./SongPreview";
import { Themes } from "../assets/Themes";
import Post from "./Post";
import { useUser } from "../contexts/UserContext";
import { renderInitials } from "../app/tabs/helpers";

const windowWidth = Dimensions.get("window").width;

// const MyPost = ({ post, username, profilePic }) => {
//   return (
//     <Post
// key={post.id}
// user={"@" + username}
// image={post.imageUrl}
// caption={post.caption}
// preview={post.preview}
// title={post.title}
// artist={post.artist}
// duration={post.duration}
// timestamp={post.timestamp}
// profile={profilePic}
//     />
//   );
// };

const ProfileContent = ({ userId, handleBack }) => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState(null);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [favoriteSong, setFavoriteSong] = useState(null);
  const router = useRouter();
  const { loggedInUserId } = useUser();
  const params = useLocalSearchParams();

  const uri_prefix =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/";

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const profileData = await getUsersByIds([userId]);
        setProfile(profileData[0]);
        setFavoriteSong(JSON.parse(profileData[0].favoriteSong));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (profile === null) {
      fetchProfile();
    }
  }, [userId, profile]);

  useEffect(() => {
    // Fetch posts, followers, and following data
    const fetchData = async () => {
      try {
        const [fetchedPosts, fetchFollowing, fetchFollowers] = await Promise.all([
          getPostsByUserId(userId),
          getFollowingList(userId),
          getFollowerList(userId),
        ]);

        // Sort and set posts
        const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sortedPosts);

        setFollowing(fetchFollowing);
        setFollowers(fetchFollowers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (posts === null || following === null || followers === null) {
      fetchData();
    }
  }, [userId, posts, following, followers]);

  if (!profile) {
    return (
      <View>
        <Text>Nothing available</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {handleBack && (
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={{ color: "white", fontSize: 18 }}>Back</Text>
        </TouchableOpacity>
      )}
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
              ) : loggedInUserId == userId ? (
                <Text style={styles.addPhotoText}>Add Photo</Text>
              ) : (
                  <Text style={styles.addPhotoText}>
                    {renderInitials(
                      profile.firstName,
                      profile.lastName
                    )}
                  </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{posts ? posts.length : 0}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{posts ? posts.length : 0}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{posts ? posts.length : 0}</Text>
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
        {!favoriteSong ? loggedInUserId == userId ? (
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
            <Text style={{ color: "white", fontSize: 16 }}>
              Not yet added.
            </Text>
          </View>
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
        {posts?.map((post) => (
          <Post
            key={post.id}
            user={"@" + profile.username}
            imageUrl={post.imageUrl}
            caption={post.caption}
            preview={post.preview}
            title={post.title}
            artist={post.artist}
            duration={post.duration}
            timestamp={post.timestamp}
            profile={profile.profilePic}
          />
        ))}
      </View>
    </ScrollView>
  );
};

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


export default ProfileContent;
