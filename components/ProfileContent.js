import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import SongPreview from './SongPreview';
import { Themes } from '../assets/Themes';

const ProfileContent = ({ profile, posts, followers, following, favoriteSong, router, uri_prefix, styles }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{"@" + profile.username}</Text>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.topSection}>
          <View style={styles.profileLeft}>
            <TouchableOpacity style={styles.profilePicContainer}>
              {profile.profilePic ? (
                <Image
                  source={{ uri: uri_prefix + profile.profilePic }}
                  style={styles.profilePic}
                />
              ) : (
                <Text style={styles.addPhotoText}>Add Photo</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{posts.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{followers.length}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{following.length}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.name}>
            {profile.firstName + " " + profile.lastName}
          </Text>
          <Text style={styles.bio}>{profile.description}</Text>
        </View>
      </View>
      <View style={styles.favSongContainer}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: 10,
            fontSize: 20,
          }}
        >
          Current Favorite Song:
        </Text>
        {!favoriteSong ? (
          <TouchableOpacity
            style={styles.songContainer}
            onPress={() =>
              router.push({
                pathname: "/tabs/profile/addSong",
              })
            }
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              ⊕ Add a favorite song!
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <SongPreview
              user={profile.username}
              preview={favoriteSong.preview}
              title={favoriteSong.title}
              artist={favoriteSong.artist}
              duration={favoriteSong.duration}
            />
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: Themes.colors.buttons,
                padding: 8,
                borderRadius: 20,
              }}
              onPress={() =>
                router.push({
                  pathname: "/tabs/profile/addSong",
                })
              }
            >
              <Text style={{ color: "white" }}>Change Song</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.postHeader}>
        <Text style={styles.headerText}>My Posts</Text>
      </View>
      <View>
        {posts &&
          posts.map((post) => (
            <MyPost
              key={post.id}
              post={post}
              username={profile.username}
              profilePic={profile.profilePic}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default ProfileContent;
