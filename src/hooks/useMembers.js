import { useContext } from "react";
import { memberContext } from "../context/membersContext";

export const useMembersContext = () => {
  const context = useContext(memberContext);
  if (!context) {
    throw Error("you cannot read outside the provider");
  }
  return context;
};
