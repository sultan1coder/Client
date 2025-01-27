import axios from "axios";

export async function getAllMembers() {
  try {
    const response = await axios.get("https://server-hwdi.onrender.com/members");
    return { data: response.data };
  } catch (err) {
    return { err };
  }
}
