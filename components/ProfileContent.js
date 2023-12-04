import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "../contexts/UserContext";
import {
  getFollowingList,
  getFollowerList,
  getPostsByUserId,
  getUsersByIds,
  followUser,
  getFollowingListIDs,
  unfollowUser,
} from "../app/api";
import SongPreview from "./SongPreview";
import { Themes } from "../assets/Themes";
import Post from "./Post";

const ProfileContent = ({ userId, handleBack }) => {
  const { loggedInUserId } = useUser();
  const params = useLocalSearchParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState(null);
  const [following, setFollowing] = useState(null);
  const [loggedInFollowing, setLoggedInFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [favoriteSong, setFavoriteSong] = useState(null);
  const [followingBool, setFollowingBool] = useState(false);
  const [loggedInFollowingProfiles, setLoggedInFollowingProfiles] =
    useState(null);
  const [loggedInFollowerProfiles, setLoggedInFollowerProfiles] =
    useState(null);

  const router = useRouter();

  useEffect(() => {
    const favoriteSong = () => {
      const song = JSON.parse(params.song);
      setFavoriteSong(song);
    };
    if (params.song) {
      favoriteSong();
    }
  }, [params.song]);

  const uri_prefix =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/";

  const handleFollow = async () => {
    await followUser(loggedInUserId, userId);
  };

  const handleUnfollow = async () => {
    await unfollowUser(loggedInUserId, userId);
  };

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
        const [
          fetchedPosts,
          fetchFollowing,
          fetchFollowers,
          fetchLoggedInFollowing,
          fetchLoggedInFollowingProfiles,
          fetchLoggedInFollowerProfiles,
        ] = await Promise.all([
          getPostsByUserId(userId),
          getFollowingList(userId),
          getFollowerList(userId),
          getFollowingListIDs(loggedInUserId),
          getFollowingList(loggedInUserId),
          getFollowerList(loggedInUserId),
        ]);

        // Sort and set posts
        const sortedPosts = fetchedPosts.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setPosts(sortedPosts);
        setFollowing(fetchFollowing);
        setFollowers(fetchFollowers);
        setLoggedInFollowing(fetchLoggedInFollowing);
        if (fetchLoggedInFollowing.includes(Number(userId))) {
          setFollowingBool(true);
        }
        setLoggedInFollowingProfiles(fetchLoggedInFollowingProfiles);
        setLoggedInFollowerProfiles(fetchLoggedInFollowerProfiles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (
      posts === null ||
      following === null ||
      followers === null ||
      loggedInFollowing === null
    ) {
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
    <ImageBackground
      source={require("../assets/wavy.png")}
      resizeMode="cover"
      style={styles.container}
    >
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
                ) : (
                  <Text style={styles.addPhotoText}>Add Photo</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>
                  {posts ? posts.length : 0}
                </Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <TouchableOpacity
                style={styles.stat}
                onPress={() => {
                  loggedInUserId === userId
                    ? router.push({
                        pathname: "/tabs/profile/showFollowers",
                        params: {
                          data: JSON.stringify(loggedInFollowerProfiles),
                        },
                      })
                    : null;
                }}
              >
                <Text style={styles.statNumber}>
                  {followers ? followers.length : 0}
                </Text>
                <Text style={styles.statLabel}>Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.stat}
                onPress={() => {
                  loggedInUserId === userId
                    ? router.push({
                        pathname: "/tabs/profile/showFollowing",
                        params: {
                          data: JSON.stringify(loggedInFollowingProfiles),
                        },
                      })
                    : null;
                }}
              >
                <Text style={styles.statNumber}>
                  {following ? following.length : 0}
                </Text>
                <Text style={styles.statLabel}>Following</Text>
              </TouchableOpacity>
            </View>
          </View>

          {loggedInUserId === userId ? null : loggedInFollowing &&
            followingBool === true ? (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                alignItems: "center",
                width: 100,
                padding: 5,
                marginTop: 10,
                borderRadius: 20,
                borderWeight: 2,
                borderColor: "red",
              }}
              onPress={() => {
                handleUnfollow();
                setFollowingBool(false);
              }}
            >
              <Text style={{ color: "black" }}>⊖ Unfollow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                alignItems: "center",
                width: 100,
                padding: 5,
                marginTop: 10,
                borderRadius: 20,
              }}
              onPress={() => {
                handleFollow();
                setFollowingBool(true);
              }}
            >
              <Text style={{ color: "white" }}>⊕ Follow</Text>
            </TouchableOpacity>
          )}

          <View style={styles.bottomSection}>
            <Text style={styles.name}>
              {profile.firstName + " " + profile.lastName}
            </Text>
            <Text style={styles.bio}>{profile.description}</Text>
          </View>
        </View>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Current Favorite Song
        </Text>
        <View style={styles.favSongContainer}>
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
            <View
              style={{
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <SongPreview
                user={profile.username}
                preview={favoriteSong.preview}
                title={favoriteSong.title}
                artist={favoriteSong.artist}
                duration={favoriteSong.duration}
              />
              {loggedInUserId === userId ? (
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
              ) : null}
            </View>
          )}
        </View>

        <View style={styles.postHeader}>
          <Text style={styles.headerText}>Posts</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  favSongContainer: {
    paddingTop: 15,
    paddingBottom: 5,
    marginHorizontal: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  songContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "space-evenly",
    padding: 8,
    alignItems: "center",
    marginLeft: 12,
  },
  postHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "#000",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 30,
    marginBottom: 40,
  },
  usernameContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 10,
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
    fontSize: 24,
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
