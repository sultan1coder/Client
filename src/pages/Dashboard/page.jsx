import React, { useEffect, useState } from "react";
import Style from "./style.module.css";
import { useMembersContext } from "../../hooks/useMembers";
import { getAllMembers } from "../../apis/member";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
const Page = () => {
  const { user } = useAuthContext();
  const { state, dispatch } = useMembersContext();
  const [err, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getMembers = async () => {
    if (state) return;
    setIsLoading(true);
    const { data, err } = await getAllMembers();
    if (err) {
      console.log(err);
      setIsLoading(false);
      return setError(err);
    }
    dispatch({ type: "SET", payload: data });
    setIsLoading(false);
  };
  useEffect(() => {
    getMembers();
  }, []);
  return (
    <div className={Style.container}>
      {/* <!-- Main Content --> */}
      {isLoading ? (
        <h2>Loading resources</h2>
      ) : err ? (
        <h2>there is an error</h2>
      ) : (
        <main className={Style.mainContent}>
          {/* <!-- Header --> */}
          <header className={Style.header}>
            <h1>Welcome to {user.username}</h1>
            <div className={Style.userInfo}>
              <img src="pngwing.com (29).png" alt="" />
              <span>John Doe</span>
            </div>
          </header>

          {/* <!-- Analytics Section --> */}
          <section className={Style.analytics}>
            <div className={Style.card}>
              <Link to={"/members"}>
                <h3>Total Members</h3>
                <p>{state?.length}</p>
              </Link>
            </div>
            <div className={Style.card}>
              <h3>New Messages</h3>
              <p>45</p>
            </div>
            <div className={Style.card}>
              <h3>Tasks Completed</h3>
              <p>76%</p>
            </div>
            <div className={Style.card}>
              <h3>Pending Orders</h3>
              <p>32</p>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Page;
