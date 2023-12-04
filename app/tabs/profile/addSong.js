import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSpotifyTracks, millisToMinutesAndSeconds } from "../../../utils";
import { Themes } from "../../../assets/Themes";
import { updateUser } from "../../api";
import { useUser } from "../../../contexts/UserContext";
import Song from "../../../components/Song";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const { loggedInUserId } = useUser();
  const params = useLocalSearchParams();
  const type = params.type;
  const router = useRouter();
  useSpotifyTracks(query, token, setTracks);

  const handleItemPress = async (item) => {
    let artists = item.songArtists
      .map((item) => item.name)
      .join([(separator = ", ")]);
    let title = item.songTitle.replaceAll(")", " ").replaceAll("(", "- ");
    let album = item.albumName.replaceAll(")", " ").replaceAll("(", "- ");
    const song = JSON.stringify({
      image: params.image,
      albumURL: item?.imageUrl,
      title: title,
      artist: artists,
      name: album,
      duration: millisToMinutesAndSeconds(item?.duration),
      preview: item?.previewUrl,
      type: type,
    });
    await updateUser(loggedInUserId, { favoriteSong: song });
    router.push({
      pathname: "/tabs/profile/",
      params: { song },
    });
  };

  const renderSong = ({ item }) => {
    if (item !== null) {
      let artists = item.songArtists
        .map((item) => item.name)
        .join([(separator = ", ")]);
      return (
        <Song
          albumURL={item.imageUrl}
          title={item.songTitle}
          artist={artists}
          name={item.albumName}
          duration={millisToMinutesAndSeconds(item.duration)}
          onPress={() => {
            handleItemPress(item);
          }}
        />
      );
    }
  };

  function updateSearchQuery(text) {
    setSearch(text);
    setQuery(text.replace(/ /g, "+"));
  }

  return (
    <ImageBackground
      source={require("../../../assets/wavy.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <SafeAreaView>
        <Text style={styles.text}>
          {"\n"}Choose a song to display on your profile!{"\n"}
          Browse your top songs or search for one:
        </Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          <TextInput
            style={[styles.searchBar, { color: Themes.colors.text }]}
            placeholder="Search"
            placeholderTextColor={Themes.colors.secondary}
            value={search}
            onChangeText={updateSearchQuery}
          />
        </ScrollView>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tracks}
          renderItem={renderSong}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  searchBar: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: Themes.colors.containers,
    borderRadius: 25,
    justifyContent: "flex-start",
    width: windowWidth * 0.9,
    height: windowHeight * 0.04,
    padding: 10,
    marginBottom: 20,
  },
  searchButton: {
    width: 50,
    borderRadius: 40,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
