import { createContext, useReducer } from "react";
export const memberContext = createContext();
const MembersContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET":
        return action.payload;
      case "create":
        return [...state, action.payload];
      case "remove":
        return state.filter((member) => member !== action.payload);
      case "update":
        return state.map((member) =>
          member._id === action.payload._id
            ? Object.assign(member, action.payload)
            : member
        );
      case "reset":
        return null;
      default:
        return;
    }
  };
  const [state, dispatch] = useReducer(reducer, null);
  return (
    <memberContext.Provider value={{ state, dispatch }}>
      {children}
    </memberContext.Provider>
  );
};

export default MembersContextProvider;
