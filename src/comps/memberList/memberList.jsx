import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./style.module.css";
import axios from "axios";
const MemberList = ({ member, dispatch }) => {
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const deleteMember = async (memberId) => {
    setIsloading(true);
    try {
      const deleted = await axios.delete(
        "https://server-hwdi.onrender.com/members/" + memberId
      );
      dispatch({ type: "delete", payload: deleted.data._id });
    } catch (err) {
      setError(err);
      setIsloading(false);
    }
  };
  return (
    <li className="flex">
      <Link className="flex gap-5 capitalize" to={"/members/" + member._id}>
        {member.firstName} {member.middleName} {member.lastName}
        <span className="flex gap-4">
          <span>{member.shift}</span>
          {member.gender}
        </span>
      </Link>{" "}
      {new Date(member?.latestPayment?.expiredDate) > Date.now() ? (
        <span className={Styles.paid}>paid</span>
      ) : (
        <span className={Styles.unpaid}>unpaid</span>
      )}
    </li>
  );
};

export default MemberList;
