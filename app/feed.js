import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { users } from "./constants";
import styles from "./styles";

export default function Page() {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
        const userName = user.userName ? user.userName.toLowerCase() : '';
        return fullName.includes(searchQuery.toLowerCase()) || userName.includes(searchQuery.toLowerCase());
    });

    const renderInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by name or username"
                placeholderTextColor="#CCCCCC" // Light gray
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
            />
            {searchQuery ? (
                <ScrollView style={styles.userList}>
                    {filteredUsers.map(user => (
                        <View key={user.id} style={styles.userCard}>
                            <Text style={styles.userText}>{user.userName}</Text>
                            <Text style={styles.userText}>{user.firstName} {user.lastName}</Text>
                        </View>
                    ))}
                </ScrollView>
            ) : currentUserIndex < users.length ? (
                <View>
                    <View style={styles.card}>
                        <Text style={styles.username}>@{users[currentUserIndex].username}</Text>
                        <Text style={styles.about}>About {users[currentUserIndex].firstName} {users[currentUserIndex].lastName}</Text>
                        <View style={styles.profilePic}>
                            <Text style={styles.initials}>
                                {renderInitials(users[currentUserIndex].firstName, users[currentUserIndex].lastName)}
                            </Text>
                        </View>
                        <Text style={styles.description}>{users[currentUserIndex].description}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handlePass}>
                            <Text>Pass</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {}}>
                            <Text>Add Friend</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View>
                    <View style={styles.card}>
                        <Text>No new users at the moment! Please try again later or refresh.</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
                            <Text>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}
