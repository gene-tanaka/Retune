import supabase from "../../supabase";

export const fetchUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};
