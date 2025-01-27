import React, { useEffect, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";
import Styles from "./style.module.css";
import { Routes } from "react-router-dom";
import MemberForm from "../../comps/PaymentForm/memberForm/MemberForm";
import { useMembersContext } from "../../hooks/useMembers";
import { getAllMembers } from "../../apis/member";
const Page = () => {
  const { id } = useParams();
  const { state, dispatch } = useMembersContext();
  const [isLoading, setIsLoading] = useState(false);
  const [unpaidMembers, setUnpaidMembers] = useState(0);
  const [totalMonthAmount, setTotalMonthAmount] = useState(0);
  const [error, setError] = useState(false);
  const getMembers = async () => {
    setIsLoading(true);
    if (!state) {
      const { data, err } = await getAllMembers();
      if (err) return setError(err);
      dispatch({ type: "SET", payload: data });
      return setIsLoading(false);
    }
    setIsLoading(false);
    setUnpaidMembers(unpaidSum());
    setTotalMonthAmount(totalAmountThisMonth());
  };
  const unpaidSum = () => {
    let total = [];
    if (state)
      total = state.filter(
        (a) =>
          !a.latestPayment && !(a?.latestPayment?.expiredDate >= Date.now())
      );
    return total.length;
  };
  const totalAmountThisMonth = () => {
    let total = 0;
    if (state)
      state.forEach((m) => {
        if (m?.latestPayment) {
          total += m?.latestPayment?.amount;
        }
      });
    return total.toString();
  };
  useEffect(() => {
    getMembers();
    // console.log(state);
    // console.log(totalAmountThisMonth())
    console.log(totalMonthAmount);
    return;
  }, [state]);
  return (
    <div className={Styles.container}>
      <h1 className={Styles.header}>Payments</h1>
      {!id ? (
        <section className={Styles.main}>
          <Link to={"/payments/membership"} className={Styles.card}>
            Show Payments
          </Link>
          <button className={Styles.card}>
            total payments for this month $
            {!isLoading ? totalMonthAmount : "loading"}
          </button>
          <button className={Styles.card}>
            unpaid members{" "}
            {!error ? (isLoading ? "loading" : unpaidMembers) : "hello"}
          </button>
          <button className={Styles.card}>make one time payment</button>
          <button className={Styles.card}>make a member payment</button>
        </section>
      ) : (
        <MemberForm />
      )}
    </div>
  );
};
export default Page;
