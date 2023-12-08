import {
  View,
  Text,
  Flatlist,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { getCommentsByPostId, createComment } from "../../api";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Themes } from "../../../assets/Themes";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../../contexts/UserContext";
import styles from "../../../styles";

const formatDate = (dateString) => {
  const options = { month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (dateString) => {
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return new Date(dateString).toLocaleTimeString(undefined, options);
};

const Comment = ({ uri, body, timestamp, username, profile_pic }) => {
  const date = formatDate(timestamp) + ", " + formatTime(timestamp);

  return (
    <View style={localStyles.commentContainer}>
      <Image
        source={{
          uri: uri + profile_pic,
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 50,
          marginRight: 10,
        }}
      />
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            width: 280,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              styles.searchListCardText,
              { fontSize: 12, marginBottom: 5 },
            ]}
          >
            @{username}
          </Text>
          <Text
            style={[
              styles.searchListCardText,
              { fontSize: 12, marginBottom: 3 },
            ]}
          >
            {date}
          </Text>
        </View>
        <Text style={styles.searchListCardText}>{body}</Text>
      </View>
    </View>
  );
};

export default function CommentPage() {
  const uri =
    "https://gvtvaagnqoeqzniftwsh.supabase.co/storage/v1/object/public/images/";
  const params = useLocalSearchParams();
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [updateComments, setUpdateComments] = useState(false);
  const { loggedInUserId } = useUser();
  const postId = params.postId;

  useEffect(() => {
    const fetchComments = async () => {
      const fetched = await getCommentsByPostId(postId);
      const sortedComments = fetched.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setComments(sortedComments);
      setUpdateComments(false);
    };
    if (updateComments === true || comments === null) {
      fetchComments();
    }
  }, [updateComments, comments]);

  const handlePostComment = async () => {
    const toPost = {
      userId: loggedInUserId,
      body: commentText,
      postId: postId,
    };
    await createComment(toPost);
    setCommentText("");
    setUpdateComments(true);
  };

  return (
    <ImageBackground
      source={require("../../../assets/wavy.png")}
      resizeMode="cover"
      style={localStyles.container}
    >
      <ScrollView
        contentContainerStyle={localStyles.scrollview}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={{ flex: 15 }}>
          {!comments || comments.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                No comments yet
              </Text>
            </View>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                uri={uri}
                body={comment.body}
                timestamp={comment.timestamp}
                username={comment.users.username}
                profile_pic={comment.users.profile_pic}
              />
            ))
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={localStyles.input}>
            <TextInput
              style={{ color: "white" }}
              placeholder="Your comment here..."
              placeholderTextColor={Themes.colors.secondary}
              value={commentText}
              multiline={true}
              onChangeText={(text) => {
                setCommentText(text);
              }}
            />
          </View>
          <TouchableOpacity onPress={handlePostComment}>
            <Ionicons
              name="arrow-up-circle"
              size={40}
              color={Themes.colors.buttons}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  commentContainer: {
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row",
    padding: 10,
    borderRadius: 15,
    marginBottom: 5,
  },
  scrollview: {
    flex: 1,
    padding: 20,
    marginBottom: 65,
  },
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#232324",
  },
  input: {
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Themes.colors.secondary,
    padding: 10,
    width: 325,
    marginRight: 5,
    justifyContent: "center",
  },
});
