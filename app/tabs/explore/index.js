import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import styles from "../../../styles";
import { useUser } from "../../../contexts/UserContext";
import { Themes } from "../../../assets/Themes";
import { getAllUsers, getFollowingList, followUser } from "../../api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SongPreview from "../../../components/SongPreview";

const windowWidth = Dimensions.get("window").width;

export default function Page() {
  const {
    loggedInUserId,
    loggedInFollowingProfiles,
    setLoggedInFollowingProfiles,
  } = useUser();
  const router = useRouter();
  const [exploreUserIndex, setExploreUserIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State to control Modal visibility

  const uri =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/";

  const fetchFollowingUsers = async () => {
    const response = await getFollowingList(loggedInUserId);
    setLoggedInFollowingProfiles(response);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setAllUsers(response);
    };
    fetchUsers();
    fetchFollowingUsers();
  }, []);

  const exploreUsers = allUsers.filter((user) => {
    // Exclude the current user
    if (user.id === loggedInUserId) {
      return false;
    }
    // Check if the user is already being followed
    const isFollowing = loggedInFollowingProfiles?.some((followingUser) => {
      return followingUser.id === user.id;
    });

    // Include the user in exploreUsers if not already being followed
    return !isFollowing;
  });

  const handlePass = () => {
    setExploreUserIndex(exploreUserIndex + 1);
  };

  const handleFollow = async () => {
    await followUser(loggedInUserId, exploreUsers[exploreUserIndex].id);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setExploreUserIndex(exploreUserIndex + 1);
    setModalVisible(false);
  };

  const handleViewSearchedUserProfile = (userId) => {
    router.push({
      pathname: "tabs/explore/exploreUser",
      params: { userId: userId },
    });
    handleCloseModal();
  };

  const viewProfile = (userId) => {
    router.push({
      pathname: "tabs/explore/exploreUser",
      params: { userId: userId },
    });
  };

  const handleRefresh = () => {
    fetchFollowingUsers();
    setExploreUserIndex(0);
  };

  const filteredUsers = allUsers.filter((user) => {
    const fullName = `${user.firstName || ""} ${
      user.lastName || ""
    }`.toLowerCase();
    const username = user.username ? user.username.toLowerCase() : "";
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      username.includes(searchQuery.toLowerCase())
    );
  });

  const renderInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const favoriteSong = exploreUsers[exploreUserIndex]
    ? JSON.parse(exploreUsers[exploreUserIndex].favoriteSong)
    : null;

  const renderBody = () => {
    return (
      <ImageBackground
        source={require("../../../assets/wavy.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <TextInput
          style={[styles.searchBar, { color: "white" }]}
          placeholder="Search by name or username"
          placeholderTextColor={Themes.colors.secondary}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        {searchQuery ? (
          <ScrollView style={styles.userList}>
            {filteredUsers.map((user) => (
              <TouchableOpacity
                key={user.id}
                onPress={() => {
                  handleViewSearchedUserProfile(user.id);
                }}
                style={{ marginBottom: 5 }}
              >
                <View
                  key={user.id}
                  style={[
                    {
                      alignItems: "center",
                      backgroundColor: "black",
                      flexDirection: "row",
                      padding: 10,
                      borderRadius: 15,
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={styles.searchListCardText}>
                      {user.username}
                    </Text>
                    <Text style={styles.searchListCardText}>
                      {user.firstName} {user.lastName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : exploreUserIndex < exploreUsers.length ? (
          <View>
            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                viewProfile(exploreUsers[exploreUserIndex].id);
              }}
            >
              <View style={[styles.exploreCard, { marginBottom: 10 }]}>
                <Text style={styles.username}>
                  @{exploreUsers[exploreUserIndex].username}
                </Text>
                <Text style={styles.about}>
                  About {exploreUsers[exploreUserIndex].firstName}{" "}
                  {exploreUsers[exploreUserIndex].lastName}
                </Text>
                <View>
                  {exploreUsers[exploreUserIndex] ? (
                    <Image
                      style={styles.profilePic}
                      source={{
                        uri: uri + exploreUsers[exploreUserIndex].profilePic,
                      }}
                    />
                  ) : null}
                </View>
                <Text style={styles.description}>
                  {exploreUsers[exploreUserIndex].description}
                </Text>
              </View>
            </TouchableOpacity>
            {favoriteSong && (
              <SongPreview
                user={exploreUsers[exploreUserIndex].username}
                preview={favoriteSong.preview}
                title={favoriteSong.title}
                artist={favoriteSong.artist}
                duration={favoriteSong.duration}
              />
            )}

            <View style={[styles.buttonContainer, { marginTop: 20 }]}>
              <TouchableOpacity style={styles.button} onPress={handlePass}>
                <Text style={{ color: "white", fontSize: 18 }}>Pass</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleFollow}>
                <Text style={{ color: "white", fontSize: 18 }}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
            </Text>
            <View style={styles.exploreCard}>
              <Text style={{ color: "white" }}>
                No new users at the moment! Please try again later or refresh.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleRefresh}>
                <Text style={{ color: "white" }}>Refresh</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
              <View
                style={[
                  styles.modalHeader,
                  {
                    margin: 5,
                    flexDirection: "row",
                    position: "absolute",
                    justifyContent: "flex-end",
                    width: windowWidth * 0.8,
                  },
                ]}
              >
                <TouchableOpacity onPress={handleCloseModal} style={{}}>
                  <Ionicons name="close-circle" size={35} color="red" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalText}>
                Followed user @{exploreUsers[exploreUserIndex]?.username}!
              </Text>

              <View>
                <TouchableOpacity
                  style={[styles.button, { width: 120 }]}
                  // onPress={handleViewProfileFromModal}
                  onPress={() =>
                    handleViewSearchedUserProfile(
                      exploreUsers[exploreUserIndex].id
                    )
                  }
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                    }}
                  >
                    View Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    );
  };
  return renderBody();
}
