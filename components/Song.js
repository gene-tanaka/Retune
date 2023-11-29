import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  View,
  Button,
} from "react-native";
import { Themes } from "../assets/Themes";
import { Link, Stack } from "expo-router/";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;

const Song = ({ albumURL, title, artist, name, duration, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: albumURL }} style={styles.image} />
      <View style={{ flexDirection: "column", width: width * 0.3 }}>
        <Text style={{ color: Themes.colors.text }} numberOfLines={1}>
          {title}
        </Text>
        <Text style={{ color: Themes.colors.secondary }} numberOfLines={1}>
          {artist}
        </Text>
      </View>

      <Text
        style={{
          width: width * 0.35,
          color: Themes.colors.text,
          paddingLeft: 9,
        }}
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text
        style={{
          width: width * 0.1,
          color: Themes.colors.text,
          padding: 3,
        }}
        numberOfLines={1}
      >
        {duration}
      </Text>
    </TouchableOpacity>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  song: {
    flexDirection: "column",
  },
});
