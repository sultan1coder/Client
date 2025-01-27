import React from "react";
import Sidebar from "./comps/sidebar/sidebar";
import "./index.css";
import { useAuthContext } from "./hooks/useAuthContext";
const Layout = ({ children }) => {
  const { user } = useAuthContext();
  return (
    <div className="dashboard">
      {user && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
