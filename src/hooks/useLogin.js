import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const login = async (username, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(
        "https://server-hwdi.onrender.com/configuration/users/login",
        {
          username,
          password,
        }
      );
    
      const user = response.data.data;
      if (!user) throw Error("there is no credentials provided");
      dispatch({ type: "LOGIN", payload: user });
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };
  const logout  = async (req,res)=>{
    try {
      dispatch({type:"LOGOUT"})
      setIsLoading(true);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }
  return { login, isLoading, error,logout };
};
