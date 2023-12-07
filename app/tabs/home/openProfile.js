import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProfileContent from "../../../components/ProfileContent";

export default function ProfilePage() {
  const params = useLocalSearchParams();
  return <ProfileContent userId={params.userId} />;
}
