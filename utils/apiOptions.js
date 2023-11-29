import axios from "axios";
import getEnv from "./env";

const {
  SPOTIFY_API: {
    TOP_TRACKS_API,
    SEARCH_TRACKS_BY_QUERY_API,
    USER_INFO,
    USER_PLAYLISTS,
  },
} = getEnv();

const ERROR_ALERT = new Error(
  "Oh no! Something went wrong; probably a malformed request or a network error.\nCheck console for more details."
);

/* Pulls out the relevant data from the API response and puts it in a nicely structured object. */
const formatter = (data) =>
  data.map((val) => {
    const artists = val.artists?.map((artist) => ({ name: artist.name }));
    return {
      songTitle: val.name,
      songArtists: artists,
      albumName: val.album?.name,
      imageUrl: val.album?.images[0]?.url ?? undefined,
      duration: val.duration_ms,
      externalUrl: val.external_urls?.spotify ?? undefined,
      previewUrl: val.preview_url ?? undefined,
    };
  });

/* Fetches data from the given endpoint URL with the access token provided. */
const fetcher = async (url, token) => {
  try {
    return await axios(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/* Fetches your top tracks from the Spotify API.
 * Make sure that TOP_TRACKS_API is set correctly in env.js */
export const getMyTopTracks = async (token) => {
  try {
    let res = await fetcher(TOP_TRACKS_API, token);
    return formatter(res.data?.items);
  } catch (e) {
    console.error(e);
    alert(ERROR_ALERT);
    return null;
  }
};

/* Fetches search query from Spotify API. */
export const getTracksByQuery = async (query, token) => {
  try {
    const res = await fetcher(SEARCH_TRACKS_BY_QUERY_API(query), token);
    return formatter(res.data?.tracks?.items);
  } catch (e) {
    console.error(e);
    alert(ERROR_ALERT);
    return null;
  }
};

// /* Fetches user info from Spotify API */
// export const getUserInfo = async (token) => {
//   try {
//     const res = await fetcher(USER_INFO, token);
//     return formatter(res.data?.items);
//   } catch (e) {
//     console.error(e);
//     alert(ERROR_ALERT);
//     return null;
//   }
// };

// /* Fetches user playlists from Spotify API */
// export const getUserPlaylists = async (user_id, token) => {
//   try {
//     const res = await fetcher(USER_PLAYLISTS(user_id), token);
//     return formatter(res.data?.items);
//   } catch (e) {
//     console.error(e);
//     alert(ERROR_ALERT);
//     return null;
//   }
// };
