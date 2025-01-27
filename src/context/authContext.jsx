import React, { useEffect, useReducer } from "react";

export const authContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  const authReducer = function (state, action) {
    switch (action.type) {
      case "LOGIN":
        console.log("logged In");
        return { user: action.payload };
      case "LOGOUT":
        localStorage.removeItem("user");
        return { user: null };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  console.log(`AuthContext changed`, state.user);
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("user"));
    if (!item) return;
    dispatch({ type: "LOGIN", payload: item });
  }, []);
  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};
