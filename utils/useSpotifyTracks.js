import { useState, useEffect } from "react";
import getEnv from "./env";

import { getMyTopTracks, getAlbumTracks, getTracksByQuery } from "./apiOptions";

const { ALBUM_ID } = getEnv();

const useSpotifyTracks = (query, token, setTracks) => {
  useEffect(() => {
    if (token !== null) {
      if (query === "") {
        getMyTopTracks(token).then((retrieved) => {
          setTracks(retrieved);
        });
      } else {
        getTracksByQuery(query, token).then((retrieved) =>
          setTracks(retrieved)
        );
      }
    }
  }, [token, query]);
};

export default useSpotifyTracks;
