import React from "react";
import { View, Text } from "react-native";
import { useUser } from "../../../contexts/UserContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProfileContent from "../../../components/ProfileContent";

export default function ProfilePage() {
  const params = useLocalSearchParams();

  return <ProfileContent userId={params.userId} />;
}
