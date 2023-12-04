import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import styles from "../../../styles";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ShowFollowing() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const following = JSON.parse(params.data);
  const uri =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/";

  const handleViewSearchedUserProfile = (userId) => {
    router.push({
      pathname: "tabs/profile/showProfile",
      params: { userId: userId },
    });
  };

  return (
    <ScrollView style={[styles.userList]}>
      {following &&
        following.map((user) => (
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
                  backgroundColor: "gray",
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
                <Text style={styles.searchListCardText}>@{user.username}</Text>
                <Text style={styles.searchListCardText}>
                  {user.firstName} {user.lastName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}
