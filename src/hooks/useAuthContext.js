import { useContext } from "react";
import { authContext } from "../context/authContext";

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw Error("you cannot read outside the provider");
  }
  return context;
};
