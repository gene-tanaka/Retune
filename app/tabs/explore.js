import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  Modal,
} from "react-native";
import styles from "../../styles";
import { useUser } from "../../contexts/UserContext";
import { Themes } from "../../assets/Themes";
import { getAllUsers, getFollowingList, followUser } from "../api";
import ProfileContent from "../../components/ProfileContent";
import { renderInitials } from "./helpers";

export default function Page() {
  const { loggedInUserId } = useUser();
  const [exploreUserIndex, setExploreUserIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [viewingProfile, setViewingProfile] = useState(false); // State to control whether to view the profile or not
  const [currentUserId, setCurrentUserId] = useState(null); // State to store the current user id

  const [modalVisible, setModalVisible] = useState(false); // State to control Modal visibility


  const fetchFollowingUsers = async () => {
    const response = await getFollowingList(loggedInUserId);
    setFollowingUsers(response);
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
    const isFollowing = followingUsers.some(followingUser => {
      return followingUser.id === user.id
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
  }

  const handleCloseModal = () => {
    setExploreUserIndex(exploreUserIndex + 1);
    setModalVisible(false);
  };

  const handleViewProfileFromModal = () => {
    setViewingProfile(true);
    setCurrentUserId(exploreUsers[exploreUserIndex].id);
    handleCloseModal();
  };

  const handleViewSearchedUserProfile = (userId) => {
    setViewingProfile(true);
    setCurrentUserId(userId);
  }

  const handleRefresh = () => {
    fetchFollowingUsers();
    setExploreUserIndex(0);
  };

  const handleBack = () => {
    setViewingProfile(false);
    setCurrentUserId(null);
  }

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

  const renderBody = () => {
    if (viewingProfile && currentUserId) {
      return (
        <ProfileContent userId={currentUserId} handleBack={handleBack} />
      )
    } else {
      return (
        <ImageBackground
          source={require("../../assets/wavy.png")}
          resizeMode="cover"
          style={styles.background}
        >
          <TextInput
            style={styles.searchBar}
            placeholder="Search by name or username"
            placeholderTextColor={Themes.colors.secondary}
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />

          {searchQuery ? (
            <ScrollView style={styles.userList}>
              {filteredUsers.map((user) => (
                <TouchableOpacity key={user.id} onPress={() => handleViewSearchedUserProfile(user.id)}>
                  <View key={user.id} style={styles.searchListCard}>
                    <Text style={styles.searchListCardText}>{user.username}</Text>
                    <Text style={styles.searchListCardText}>
                      {user.firstName} {user.lastName}
                    </Text>
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
                {"\n"}
                {"\n"}
              </Text>
              <TouchableOpacity onPress={() => handleViewSearchedUserProfile(exploreUsers[exploreUserIndex].id)}>
                <View style={styles.exploreCard}>
                  <Text style={styles.username}>
                    @{exploreUsers[exploreUserIndex].username}
                  </Text>
                  <Text style={styles.about}>
                    About {exploreUsers[exploreUserIndex].firstName}{" "}
                    {exploreUsers[exploreUserIndex].lastName}
                  </Text>
                  <View style={styles.profilePic}>
                    <Text style={styles.initials}>
                      {renderInitials(
                        exploreUsers[exploreUserIndex].firstName,
                        exploreUsers[exploreUserIndex].lastName
                      )}
                    </Text>
                  </View>
                  <Text style={styles.description}>
                    {exploreUsers[exploreUserIndex].description}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePass}>
                  <Text style={{ color: "white", fontSize: 18 }}>Pass</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleFollow}>
                  <Text style={{ color: "white", fontSize: 18 }}>Follow</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.exploreCard}>
                <Text>
                  No new users at the moment! Please try again later or refresh.
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleRefresh}>
                  <Text>Refresh</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={handleCloseModal}>
                    <Text>X</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalText}>
                  Added user {exploreUsers[exploreUserIndex - 1]?.username}!
                </Text>

                <View style={styles.modalFooter}>
                  <TouchableOpacity style={styles.button} onPress={handleViewProfileFromModal}>
                    <Text style={{ color: "white", fontSize: 12 }}>View Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      )
    }
  }
  return renderBody();
}
