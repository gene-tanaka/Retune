import { Platform } from "react-native";

// ***** TODO: Fill in your constants here ***** //
const CLIENT_ID = "730ac9bb974c4bf991381c0d29159974";
const REDIRECT_URI = "exp://10.128.132.186:8081";
const ALBUM_ID = "7LF4N7lvyDhrPBuCJ1rplJ?si=IB5VToVzQY6zDLukDU_6ew";
// ********************************************* //

const redirectUri = (uri) => {
  if (!uri) {
    const err = new Error(
      "No redirect URI provided.\nPlease provide a redirect URI in env.js.\n You can find the file in utils/env.js."
    );
    console.error(err);
    alert(err);
  }
  return Platform.OS === "web" ? "http://localhost:19006/" : uri;
};

const ENV = {
  CLIENT_ID: CLIENT_ID,
  SCOPES: [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "streaming",
    "user-read-email",
    "user-read-private",
  ],
  REDIRECT_URI: redirectUri(REDIRECT_URI),
  ALBUM_ID: ALBUM_ID,
  SPOTIFY_API: {
    // Endpoints for auth & token flow
    DISCOVERY: {
      authorizationEndpoint: "https://accounts.spotify.com/authorize",
      tokenEndpoint: "https://accounts.spotify.com/api/token",
    },
    //** Get top tracks **/
    TOP_TRACKS_API: "https://api.spotify.com/v1/me/top/tracks",
    // ** Get search query ** //
    SEARCH_TRACKS_BY_QUERY_API: (query) =>
      "https://api.spotify.com/v1/search/?q=" + query + "&type=track",
    // ** Get user info ** //
    // USER_INFO: "https://api.spotify.com/v1/me",
    // // ** Get user playlists ** //
    // USER_PLAYLISTS: (user_id) =>
    //   "https://api.spotify.com/v1/users/" + user_id + "/playlists",
  },
};

const getEnv = () => ENV;
export default getEnv;
