import React from "react";
import Styles from "./sidebar.module.css";
import { Link } from "react-router-dom";
import Registration from "../../pages/Registeration/page";
import { useLogin } from "../../hooks/useLogin";
const Sidebar = () => {
  const {logout} = useLogin();
  return (
    //sidbar
    <aside className={Styles.sidebar}>
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to={"/"} className="active">
            Home
          </Link>
        </li>
        <li>
          <Link to={"/registeration"}>Register new Member</Link>
        </li>
        <li>
          <Link to={"/members"} className="active">
            members
          </Link>
        </li>
        <li>
          <Link to={"/payments"}>payments</Link>
        </li>
        <li>
          <a href="#" onClick={logout}>Logout</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
