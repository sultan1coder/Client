import { useState } from "react";
import { post } from "../apis/registeration";

export const useRegisteration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const postMember = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(data);
      const response = await post(data);
      setError(null);
      return response;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return { postMember, isLoading, error };
};
