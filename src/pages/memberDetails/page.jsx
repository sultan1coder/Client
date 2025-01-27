import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDistance, formatDate, format } from "date-fns";
import { useMembersContext } from "../../hooks/useMembers";
import Styles from "./style.module.css";
const MemberDetails = () => {
  const { id } = useParams();
  const { state } = useMembersContext();
  const [member, setMember] = useState(null);
  const [err, setError] = useState(null);
  const getMember = async () => {
    console.log(state);
    if (state) return setMember(state.filter((m) => m._id === id)[0]);
    try {
      const response = await axios.get("https://server-hwdi.onrender.com/members/" + id);
      const data = response.data;
      setMember(data);
    } catch (err) {
      setError(err);
    }
  };
  const changingdate = (e) => formatDistance(Date.now(), new Date(e),{addSuffix:true});
  useEffect(() => {
    getMember();
  }, []);
  console.log(member);
  return (
    <div className={Styles.container}>
      {err ? (
        <h1>errror</h1>
      ) : (
        <>
          <h1 className={Styles.header}>Member</h1>
          <div className={Styles.memberDetails}>
            <h1>
              Fullname:{" "}
              <span>
                {member?.firstName} {member?.middleName} {member?.lastName}
              </span>
            </h1>
            <h1>
              Shift:
              <span>{member?.shift}</span>
            </h1>
            <h1>
              Gender:
              <span>{member?.gender}</span>
            </h1>
            <h1>
              Latest Payment Expires at: 
              <span>
                {member?.latestPayment
                  ? format(member.latestPayment.expiredDate, "dd/MM/yyyy")
                  : "not paid"}
              </span>
            </h1>
            <h1>
              Registered: 
              <span>{member && changingdate(member?.createdAt)}</span>
            </h1>
          </div>
          <Link to={"/payments/"+member?._id} className={Styles.btn}>
                Pay
          </Link>
        </>
      )}
    </div>
  );
};

export default MemberDetails;
