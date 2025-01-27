import React, { useRef, useState } from "react";
import "./form.css";
const Form = ({
  isLoading,
  error,
  handleLogin,
  off,
  setPassword,
  password,
  username,
  setUsername,
}) => {
  const formRef = useRef();
  return (
    <div className="container w-1/2 mx-auto mt-52">
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className={`login-form ${isLoading ? "disabled" : ""}`}
      >
        <h2 className="mb-3 text-center text-2xl">Login in</h2>
        <input
          type="text"
          placeholder="username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input"
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
          disabled={isLoading}
        />
        <button className="btn" disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Form;
