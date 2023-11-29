import supabase from "../../supabase";

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user: any) => {
  try {
    const { data, error } = await supabase.from("users").insert([user]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const updateUser = async (id: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from("users")
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
    const { data, error } = await supabase.from("users").delete().match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
}
