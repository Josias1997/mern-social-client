import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/api/auth/login", { email, password })
      .then(({ data }) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };
  return (
    <form>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
    </form>
  );
};

export default Login;
