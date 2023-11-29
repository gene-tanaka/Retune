import supabase from "../../supabase";

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.from("Users").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user: any) => {
  try {
    const { data, error } = await supabase.from("Users").insert([user]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const updateUser = async (id: string, updates: any) => {
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

export const deleteUser = async (id: string) => {
  try {
    const { data, error } = await supabase.from("Users").delete().match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getFollowerList = async (userId: string) => {
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

export const getFollowingList = async (userId: string) => {
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

export const followUser = async (followerId: string, followeeId: string) => {
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

export const unfollowUser = async (followerId: string, followeeId: string) => {
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
