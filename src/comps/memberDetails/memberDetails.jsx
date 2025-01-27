import React from "react";
import { Link } from "react-router-dom";

const MemberDetails = ({ member,index }) => {
  return (
    <li
      className={`border border-b-0 p-2 text-2xl odd:bg-slate-400 odd:text-white last-of-type:border-b `}
      key={member._id}
    >
      <Link to={`/members/${member._id}`}>
        <span className="inline-block me-5">{index + 1}</span>
        {member.firstName} {member.middleName} {member.lastName}
      </Link>
    </li>
  );
};

export default MemberDetails;
