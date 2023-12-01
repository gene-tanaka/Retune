import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
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
import ProfileContent from "../../../components/ProfileContent";

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
  }, []);

  if (!profile) {
    return (
      <View>
        <Text>Nothing available</Text>
      </View>
    );
  }
  // const testing = posts.map((post) => (
  //   <Post
  //     key={post.id}
  //     user={"@" + profile.username}
  //     caption={post.caption}
  //     preview={post.preview}
  //     title={post.title}
  //     artist={post.artist}
  //     duration={post.duration}
  //     timestamp={post.timestamp}
  //     profile={profile.profilePic}
  //   />
  // ));
  // console.log(testing);

  return (
    <ProfileContent
      profile={profile}
      posts={posts}
      followers={followers}
      following={following}
      favoriteSong={favoriteSong}
      router={router}
      uri_prefix={uri_prefix}
    />
  );
}
