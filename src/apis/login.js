import axios from "axios";
const login = async (username, password) => {
  try {
    const response = await axios.post("https://server-hwdi.onrender.com//configuration/users/login", {
      username,
      password,
    });

    const token = response.data.token;
    if (!token) return;
    localStorage.setItem("authToken", token);
    console.log("login successful: ", response.data);

    return token;
  } catch (err) {
    return err;
  }
};


export default login;