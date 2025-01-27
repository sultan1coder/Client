import { useState } from "react";

function useGetMembers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const getMembers = async () => {
    setIsLoading(true);
    if (!state) {
      const { data, err } = await getAllMembers();
      if (err) return setError(err);
      dispatch({ type: "SET", payload: data });
      return setIsLoading(false);
    }
    setIsLoading(false);
  };
}
