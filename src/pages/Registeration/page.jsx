import React, { useEffect, useReducer } from "react";
import Styles from "./style.module.css";
import { useRegisteration } from "../../hooks/useRegisteration";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useMembersContext } from "../../hooks/useMembers";

const Registration = () => {
  const { user } = useAuthContext();
  const { state, dispatch } = useMembersContext();
  const { postMember, isLoading, error } = useRegisteration();
  const reducerFunction = (formState, action) => {
    switch (action.type) {
      case "firstName":
        return { ...formState, firstName: action.payload };
      case "middleName":
        return { ...formState, middleName: action.payload };
      case "lastName":
        return { ...formState, lastName: action.payload };
      case "address":
        return { ...formState, address: action.payload };
      case "phone":
        return { ...formState, phone: action.payload };
      case "weight":
        return { ...formState, weight: action.payload };
      case "middleScale":
        return { ...formState, middleScale: action.payload };
      case "gender":
        return { ...formState, gender: action.payload };
      case "shift":
        return { ...formState, shift: action.payload };
      case "reset":
        return {
          shift: "Evening",
          gender: "male",
          firstName: "",
          middleName: "",
          lastName: "",
          middleScale: "",
          weight: "",
          phone: "",
          address: "",
        };
    }
  };
  const inputHandler = (e) => {
    const type = e.target.name;
    const payload = e.target.value;
    formDispatch({ type, payload });
    console.log(type, payload);
  };
  const [formState, formDispatch] = useReducer(reducerFunction, {
    shift: "Evening",
    gender: "male",
    firstName: "",
    middleName: "",
    lastName: "",
    middleScale: "",
    weight: "",
    phone: "",
    address: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    const newMember = await postMember({
      ...formState,
      createdby: user.id,
      updatedby: user.id,
    });
    if (error) return console.log(error);
    dispatch({
      type: "create",
      payload: { ...newMember },
    });

    formDispatch({ type: "reset" });
  };
  return (
    <div className="text-sm h-full registeration flex-1">
      <h1 className={Styles.header}> Registration Form </h1>
      {error && <div>{error.message}</div>}
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <form>
          <div className={Styles.container}>
            <section>
              <div className={Styles.text}>
                <div>
                  <label htmlFor="id">Member ID</label>
                  <br />
                  <input
                    type="number"
                    id="number"
                    name="number"
                    placeholder="Enter ID"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">First Name</label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formState?.firstName}
                    onChange={inputHandler}
                  />
                </div>
                <div>
                  <label htmlFor="name">Middle Name</label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="middleName"
                    value={formState?.middleName}
                    onChange={inputHandler}
                    required
                    placeholder="Enter middle name"
                  />
                </div>
                <div>
                  <label htmlFor="name">Last Name</label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="lastName"
                    required
                    value={formState?.lastName}
                    onChange={inputHandler}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className={Styles.text2}>
                <div>
                  <label htmlFor="address">Address</label>
                  <br />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formState?.address}
                    onChange={inputHandler}
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <br />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formState?.phone}
                    onChange={inputHandler}
                    placeholder="Enter phone"
                  />
                </div>
                <div>
                  <label htmlFor="weight">Weight</label>
                  <br />
                  <input
                    type="weight"
                    id="weight"
                    name="weight"
                    required
                    value={formState?.weight}
                    onChange={inputHandler}
                    placeholder="Enter weight"
                  />
                </div>
                <div>
                  <label htmlFor="scale">Middle Scale</label>
                  <br />
                  <input
                    type="scale"
                    id="middle scale"
                    name="middleScale"
                    value={formState?.middleScale}
                    onChange={inputHandler}
                    required
                    placeholder="Enter scale"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className={Styles.sawir}>
                <label htmlFor="profilePicture">Image:</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  required
                />
                <div id="selectedImage"></div>
              </div>
              <div className={Styles.text4}>
                <div className="shift">
                  <label htmlFor="name">Shift:</label>
                  <br />
                  <select
                    onChange={inputHandler}
                    name="shift"
                    value={formState?.shift}
                  >
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Afternoon">Afternoon</option>
                  </select>
                </div>
                <div className="gender">
                  <div>
                    <label>Gender:</label>
                    <select
                      onChange={inputHandler}
                      name="gender"
                      value={formState?.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className={Styles.btns}>
            <button type="submit" onClick={handleSubmit} disabled={isLoading}>
              Save
            </button>
            {/* <button type="submit">Update</button> */}
            <button type="reset" name="reset" onClick={inputHandler}>
              Clear
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Registration;
