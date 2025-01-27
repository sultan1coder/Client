import React, { useEffect, useState } from "react";
import { getAllMembers } from "../../apis/member";
import { Link } from "react-router-dom";
import Styles from "./style.module.css";
import MemberDetails from "../../comps/memberList/memberList";
import { useMembersContext } from "../../hooks/useMembers";
const Page = () => {
  const { state, dispatch } = useMembersContext();
  const [searchText, setSearchText] = useState("");
  const [shift, setShift] = useState("any");
  const [gender, setGender] = useState("any");
  const [payment, setPaymet] = useState("any");
  const [filtered, setFiltered] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const filteredResponse = (s) => {
    if (!s) return;
    return s.filter((m) =>
      (shift !== "any"
        ? m.shift.toLowerCase() === shift.toLowerCase()
        : true) &&
      (gender !== "any"
        ? m.gender.toLowerCase() === gender.toLowerCase()
        : true) &&
      payment !== "any"
        ? payment === "paid"? new Date(m?.latestPayment?.expiredDate) > Date.now():!(new Date(m?.latestPayment?.expiredDate) > Date.now())
        : true
    );
  };
  const getMembers = async () => {
    setIsLoading(true);
    if (!state) {
      const { data, err } = await getAllMembers();
      if (err) return setError(err);
      dispatch({ type: "SET", payload: data });
      return setIsLoading(false);
    }
    setFiltered(filteredResponse(state));
    setIsLoading(false);
  };
  const handlingSearch = () => {
    if (searchText.trim().length === 0)
      return setFiltered(filteredResponse(state));
    const regex = new RegExp(
      `^${searchText.replace(/\s+/g, "").toLowerCase()}`
    );
    setFiltered(filteredResponse(state));
    setFiltered((s) => {
      // console.log(searchText.trim().toLowerCase());
      return filteredResponse(state).filter((m) => {
        const fullName = `${m.firstName}${m.middleName}${m.lastName}`;
        // console.log(regex.test(m.firstName));
        return regex.test(fullName.trim().toLowerCase());
      });
    });
  };
  useEffect(() => {
    getMembers();
    return;
  }, [state]);
  useEffect(() => {
    setFiltered(filteredResponse(state));
    return;
  }, [shift, gender, payment]);
  return (
    <div className={Styles.container}>
      <h1 className="text-2xl text-white bg-slate-700 p-5 text-center">
        Members
      </h1>
      <section className={Styles.searching}>
        <input
          type="text"
          placeholder="search"
          className="p-2 m-2 rounded-xl border w-2/3 outline-none focus:border-blue-400"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={(e) => handlingSearch()}
        />
        <select
          className={Styles.select}
          value={shift}
          onChange={(e) => {
            setShift(e.target.value);
          }}
        >
          <option value="any">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
        <select
          className={Styles.select}
          value={payment}
          onChange={(e) => {
            setPaymet(e.target.value);
          }}
        >
          <option value="any">All</option>
          <option value="paid">Paid</option>
          <option value="notPaid">Not Paid</option>
        </select>
        <select
          className={Styles.select}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="any">All genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </section>
      <section className={Styles.members}>
        {isLoading ? (
          <h1>Loading</h1>
        ) : filtered?.length > 0 ? (
          <ul className={Styles.memberList}>
            <h2 className="mb-4 text-xl border-b pb-3 capitalize font-semibold text-slate-700">
              total: {filtered?.length}
            </h2>
            {filtered.map((member) => (
              <MemberDetails
                dispatch={dispatch}
                key={member._id}
                member={member}
              />
            ))}
          </ul>
        ) : (
          <h2>there is no members. search again</h2>
        )}
      </section>
    </div>
  );
};

export default Page;
