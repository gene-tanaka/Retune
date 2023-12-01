import React from "react";
import { useUser } from "../../../contexts/UserContext";
import ProfileContent from "../../../components/ProfileContent";

export default function ProfilePage() {
  const { loggedInUserId } = useUser();

  return (
    <ProfileContent
      userId={loggedInUserId}
    />
  );
}
