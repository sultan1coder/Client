import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import MemberDetails from "../comps/memberDetails/memberDetails";
const Dashboard = () => {
  const { user } = useAuthContext();
  const [members, setMembers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const filterMembers = (unfilteredMembers) => {
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedSearchTerm = escapeRegex(search);
    const regex = new RegExp(`\\b${escapedSearchTerm}[a-zA-Z]*`, "g");
    if (search.trim().length === 0) {
      getAllMembers();
      console.log(search);
    }
    const filteredResponse = unfilteredMembers.filter(
      (member) =>
        regex.test(member?.firstName) ||
        regex.test(member?.middleName) ||
        regex.test(member?.lastName)
    );
    console.log(search);
    return filteredResponse;
  };
  const getAllMembers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://server-hwdi.onrender.com/members", {
        auth: `bearer ${user.token}`,
      });
      if (search.trim().length === 0) setMembers(response.data);
      else {
        setMembers(filterMembers(response.data));
      }
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllMembers();
  }, []);
  return (
    <div>
      <h1 className="text-4xl font-bold text-center scroll">Admin Dashboard</h1>

      <form>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDownCapture={(e) => {
            const filtered = filterMembers(members);
            setMembers(filtered);
          }}
          required
        />
      </form>


      {isLoading ? (
        <h2 className="mt-40 text-4xl text-center">Loading...</h2>
      ) : !members ? (
        <h1>there is no members</h1>
      ) : (
        <ul className="w-2/3 mx-auto mt-5">
          {members.map((member, index) => (
            <MemberDetails index={index} key={member._id} member={member} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
