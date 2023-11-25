import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { users } from "./constants";

export default function Page() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handlePass = () => {
      if (currentUserIndex < users.length - 1) {
          setCurrentUserIndex(currentUserIndex + 1);
      } else {
          setCurrentUserIndex(users.length);
      }
  };

  const handleRefresh = () => {
      setCurrentUserIndex(0);
  };

  return (
      <View style={styles.container}>
          {currentUserIndex < users.length ? (
              <View style={styles.main}>
                  <Text style={styles.title}>{users[currentUserIndex].userName}</Text>
                  <Text style={styles.subtitle}>{users[currentUserIndex].firstName} {users[currentUserIndex].lastName}</Text>
                  <Text>{users[currentUserIndex].description}</Text>
                  <Button onPress={handlePass} title="Pass" />
              </View>
          ) : (
              <View style={styles.main}>
                  <Text>No new users at the moment! Please try again later or refresh.</Text>
                  <Button onPress={handleRefresh} title="Refresh" />
              </View>
          )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#232324",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "white",
  },
});
