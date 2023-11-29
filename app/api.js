import supabase from "../supabase";
import _ from 'lodash';

const keysToCamel = (object) => {
  if (_.isArray(object)) {
    return object.map((v) => keysToCamel(v));
  } else if (_.isObject(object)) {
    return _.mapKeys(object, (v, k) => _.camelCase(k));
  }
  return object;
};

const keysToSnake = (object) => {
  if (_.isArray(object)) {
    return object.map((v) => keysToSnake(v));
  } else if (_.isObject(object)) {
    return _.mapKeys(object, (v, k) => _.snakeCase(k));
  }
  return object;
};

export const getFollowerList = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('UserFollowers')
      .select('Users!UserFollowers_followee_id_fkey(id, username, first_name, last_name, description)')
      .eq('followee_id', userId);

    if (error) throw error;
    return data ? data.map(item => keysToCamel(item.Users)) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFollowingList = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('UserFollowers')
      .select('Users!UserFollowers_follower_id_fkey(id, username, first_name, last_name, description)')
      .eq('follower_id', userId);

    if (error) throw error;
    return data ? data.map(item => keysToCamel(item.Users)) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUsersByIds = async (userIds) => {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .in('id', userIds);

    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.from("Users").select("*");
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user) => {
  try {
    const snakeCaseUser = keysToSnake(user);
    const { data, error } = await supabase.from("Users").insert([snakeCaseUser]);
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.log(error);
  }
}

export const updateUser = async (id, updates) => {
  try {
    const snakeCaseUpdates = keysToSnake(updates);
    const { data, error } = await supabase
      .from("Users")
      .update(snakeCaseUpdates)
      .match({ id });
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = async (id) => {
  try {
    const { data, error } = await supabase.from("Users").delete().match({ id });
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.log(error);
  }
}

export const followUser = async (followerId, followeeId) => {
  try {
    const { data, error } = await supabase
      .from('UserFollowers')
      .insert([
        { follower_id: followerId, followee_id: followeeId }
      ]);

    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
  }
};

export const unfollowUser = async (followerId, followeeId) => {
  try {
    const { data, error } = await supabase
      .from('UserFollowers')
      .delete()
      .match({ follower_id: followerId, followee_id: followeeId });

    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
  }
};
