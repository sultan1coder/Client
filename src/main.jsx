import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import MembersContextProvider from "./context/membersContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <MembersContextProvider>
      <StrictMode>
        <Router>
          <App />
        </Router>
      </StrictMode>
    </MembersContextProvider>
  </AuthContextProvider>
);
