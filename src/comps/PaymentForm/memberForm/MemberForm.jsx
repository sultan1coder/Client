import React, { useEffect, useReducer, useState } from "react";
import Styles from "./style.module.css";
import { useParams } from "react-router-dom";
import { useMembersContext } from "../../../hooks/useMembers";
import { format } from "date-fns";
import { post } from "../../../apis/payment";
import { useAuthContext } from "../../../hooks/useAuthContext";
const MemberForm = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "amount":
        if (isNaN(action.payload)) return state;
        return { ...state, amount: action.payload };
      case "discount":
        if (isNaN(action.payload)) return state;
        return { ...state, discount: action.payload };
      case "expiredDate":
        return { ...state, expiredDate: action.payload };
      case "type":
        return { ...state, type: action.payload };
      case "reset":
        return {
          amount: "",
          discount: "",
          type: "",
          expiredDate: "",
        };
    }
  };
  const { id } = useParams();
  const { user } = useAuthContext();
  const { state, dispatch } = useMembersContext();
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formState, formDispatch] = useReducer(reducer, {
    amount: "",
    discount: "",
    method: "zaad-cash",
    type: "membership",
    expiredDate: (() => new Date().setDate(new Date().getDate() + 30))(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [data, err] = await post({
      ...formState,
      discount: isNaN(formState?.discount)
        ? parseFloat(formState?.discount)
        : 0,
      createdBy: user.id,
      updatedBy: user.id,
      member: member._id,
    });
    if (data) {
      dispatch({
        type: "update",
        payload: { ...member, latestPayment: data },
      });
      formDispatch({ type: "reset" });
    } else setError(err);
  };
  const inputHandler = (e) => {
    const type = e.target.name;
    const payload = e.target.value;
    formDispatch({ type, payload });
    console.log(type, payload);
  };
  useEffect(() => {
    setMember(state.filter((m) => m._id === id)[0]);
    console.log(formState.expiredDate);
    return;
  }, []);
  return (
    <div className={Styles.container}>
      {error && <div> {error.message}</div>}
      {new Date(member?.latestPayment?.expiredDate) > Date.now() ? (
        <div className={Styles.error}>
          This Member has still a valid subscription till{" "}
          {new Date(member?.latestPayment?.expiredDate).toDateString()}
        </div>
      ) : (
        <form
          className={`${Styles.form} ${
            Date(member?.latestPayment?.expiredDate) > Date.now()
              ? Styles.disabled
              : ""
          }`}
        >
          <input
            name="amount"
            type="text"
            placeholder="amount"
            onChange={inputHandler}
            value={formState?.amount}
          />
          <input
            name="discount"
            type="text"
            placeholder="discount"
            value={formState?.discount}
            onChange={inputHandler}
          />
          <span>
            <label>expiration Date</label>
            <input
              name="expiredDate"
              type="date"
              value={
                formState?.expiredDate &&
                format(formState?.expiredDate, "yyyy-MM-dd")
              }
              readOnly
            />
          </span>
          <select
            name="method"
            value={formState?.method}
            onChange={inputHandler}
          >
            <option value="zaad-dollar">Zaad dollar</option>
            <option value="zaad-cash">Zaad Cash</option>
            <option value="edahab-dollar">Edahab Dollar</option>
            <option value="edahab-cash">E-dahab Cash</option>
            <option value="dollar">Dollar</option>
            <option value="cash">Cash</option>
            <option value="others">Others</option>
          </select>
          <select name="type" value={formState?.type} onChange={inputHandler}>
            <option value="oneTime">One time</option>
            <option value="membership">membership</option>
          </select>
          <div className={Styles.buttons}>
            <button className={Styles.btn} onClick={handleSubmit}>
              Pay
            </button>
            <button className={`${Styles.btn} ${Styles.red}`}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};
// "zaad dollar",
// "e-dahab dollar",
// "zaad cash",
// "e-dahab cash",
// "dollar",
// "cash",
// "others",

export default MemberForm;
