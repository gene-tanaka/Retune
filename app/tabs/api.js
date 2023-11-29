import supabase from "../../supabase";

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.from("Users").select("*");
    if (error) throw error;
    const formattedData = data.map(user => ({
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      description: user.description,
      // Note: followingUserIds and followedUserIds need to be fetched or computed separately
      followingUserIds: [], // Placeholder array, you'll need to populate this based on your data relationships
      followedUserIds: []  // Placeholder array, you'll need to populate this based on your data relationships
    }));
    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user) => {
  try {
    const { data, error } = await supabase.from("Users").insert([user]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const updateUser = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .update(updates)
      .match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = async (id) => {
  try {
    const { data, error } = await supabase.from("Users").delete().match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getFollowerList = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('UserFollowers')
      .select('Users(id, username, first_name, last_name, description)')
      .eq('followee_id', userId);

    if (error) throw error;
    return data ? data.map(item => item.Users) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFollowingList = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('UserFollowers')
      .select('Users(id, username, first_name, last_name, description)')
      .eq('follower_id', userId);

    if (error) throw error;
    return data ? data.map(item => item.Users) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const followUser = async (followerId, followeeId) => {
  try {
    const { data, error } = await supabase
      .from('UserFollowers')
      .insert([
        { followerId, followeeId }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const unfollowUser = async (followerId, followeeId) => {
  try {
    const { data, error } = await supabase
      .from('UserFollowers')
      .delete()
      .match({ followerId, followeeId });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};
