import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import styles from "../../../styles";
import { getFollowerList } from "../../api";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ShowFollowers() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const followers = JSON.parse(params.data);
  const uri =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/";

  const handleViewSearchedUserProfile = (userId) => {
    router.push({
      pathname: "tabs/profile/showProfile",
      params: { userId: userId },
    });
  };

  return (
    <ImageBackground
      source={require("../../../assets/wavy.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.userList}>
        {followers &&
          followers.map((user) => (
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
                <Image
                  source={{
                    uri: uri + user.profilePic,
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    marginRight: 10,
                  }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.searchListCardText}>
                    @{user.username}
                  </Text>
                  <Text style={styles.searchListCardText}>
                    {user.firstName} {user.lastName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </ImageBackground>
  );
}
