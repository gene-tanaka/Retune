import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = useState(1);
  const [loggedInFollowingProfiles, setLoggedInFollowingProfiles] =
    useState(null);
  const [loggedInFollowerProfiles, setLoggedInFollowerProfiles] =
    useState(null);
  const [posted, setPosted] = useState(false);

  return (
    <UserContext.Provider
      value={{
        posted,
        setPosted,
        loggedInUserId,
        setLoggedInUserId,
        loggedInFollowerProfiles,
        setLoggedInFollowerProfiles,
        loggedInFollowingProfiles,
        setLoggedInFollowingProfiles,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
