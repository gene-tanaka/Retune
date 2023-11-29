import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import { mockUsers } from "./constants";
import styles from "../../styles";
import { useUser } from "../../contexts/UserContext";
import { Themes } from "../../assets/Themes";

export default function Page() {
  const { loggedInUserId } = useUser();
  const [exploreUserIndex, setExploreUserIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const exploreUsers = mockUsers.filter((user) => user.id !== loggedInUserId);

  const handlePass = () => {
    setExploreUserIndex(exploreUserIndex + 1);
  };

  const handleRefresh = () => {
    setExploreUserIndex(0);
  };

  const filteredUsers = exploreUsers.filter((user) => {
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

  return (
    <ImageBackground
      source={require("../../assets/wavy.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or username"
        placeholderTextColor={Themes.colors.secondary} // Light gray
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />

      {searchQuery ? (
        <ScrollView style={styles.userList}>
          {filteredUsers.map((user) => (
            <View key={user.id} style={styles.searchListCard}>
              <Text style={styles.searchListCardText}>{user.username}</Text>
              <Text style={styles.searchListCardText}>
                {user.firstName} {user.lastName}
              </Text>
            </View>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePass}>
              <Text style={{ color: "white", fontSize: 18 }}>Pass</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
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
    </ImageBackground>
  );
}
