import supabase from "../supabase";
import _ from "lodash";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

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
      .from("UserFollowers")
      .select(
        "Users!UserFollowers_follower_id_fkey(id, username, first_name, last_name, description, profile_pic)"
      )
      .eq("followee_id", userId);

    if (error) throw error;
    return data ? data.map((item) => keysToCamel(item.Users)) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFollowingList = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("UserFollowers")
      .select(
        "Users!UserFollowers_followee_id_fkey(id, username, first_name, last_name, description, profile_pic)"
      )
      .eq("follower_id", userId);

    if (error) throw error;
    return data ? data.map((item) => keysToCamel(item.Users)) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFollowingListIDs = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("UserFollowers")
      .select("followee_id")
      .eq("follower_id", userId);

    if (error) throw error;
    return data ? data.map((item) => item.followee_id) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUsersByIds = async (userIds) => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .in("id", userIds);

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

export const getUsernamesByIds = async (userIds) => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select("id, username")
      .in("id", userIds);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createUser = async (user) => {
  try {
    const snakeCaseUser = keysToSnake(user);
    const { data, error } = await supabase
      .from("Users")
      .insert([snakeCaseUser]);
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.log(error);
  }
};

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
};

export const deleteUser = async (id) => {
  try {
    const { data, error } = await supabase.from("Users").delete().match({ id });
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (followerId, followeeId) => {
  try {
    const { data, error } = await supabase
      .from("UserFollowers")
      .insert([{ follower_id: followerId, followee_id: followeeId }]);

    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
  }
};

export const unfollowUser = async (followerId, followeeId) => {
  try {
    const { data, error } = await supabase
      .from("UserFollowers")
      .delete()
      .match({ follower_id: followerId, followee_id: followeeId });

    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
  }
};

// Single user (Possible unnecessary)
export const getPostsByUserId = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Multiple users
export const getPostsByUserIds = async (userIds) => {
  try {
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .in("user_id", userIds);

    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const { data, error } = await supabase
      .from("Comments")
      .select(
        `
        *,
        Users (
          username,
          profile_pic
        )
      `
      )
      .eq("post_id", postId);

    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const createPost = async (post) => {
  try {
    const snakeCasePost = keysToSnake(post);
    const { data, error } = await supabase
      .from("Posts")
      .insert([snakeCasePost]);
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const { data, error } = await supabase
      .from("Posts")
      .delete()
      .match({ id: postId });
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
  }
};

export const createComment = async (comment) => {
  try {
    const snakeCaseComment = keysToSnake(comment);
    const { data, error } = await supabase
      .from("Comments")
      .insert([snakeCaseComment]);
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const { data, error } = await supabase
      .from("Comments")
      .delete()
      .match({ id: commentId });
    if (error) throw error;
    return keysToCamel(data);
  } catch (error) {
    console.error(error);
  }
};

export const uploadImage = async (filename, type) => {
  const base64 = await FileSystem.readAsStringAsync(filename, {
    encoding: "base64",
  });
  const filePath = `images/${new Date().getTime()}.${
    type === "image" ? "png" : "mp4"
  }`;
  const contentType = type === "image" ? "image/png" : "video/mp4";
  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, decode(base64), {
      contentType,
    });
  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
  return filePath;
};

export const retrieveImage = async (filename) => {
  try {
    const { data, error } = await supabase.storage
      .from("images")
      .getPublicUrl(filename);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
