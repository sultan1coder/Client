import { useState, useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogin } from "../../hooks/useLogin";
import Form from "../../comps/form/form";
const Login = () => {
  const { login, isLoading, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [off, setOff] = useState(false);
  const formRef = useRef();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username.trim().length == 0 || password.trim().length === 0)
      alert("Please Enter all the required spaces");
    else {
      await login(username, password);
    }
  };
  return (
    <>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        off={off}
        setOff={setOff}
        formRef={formRef}
        handleLogin={handleLogin}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default Login;
