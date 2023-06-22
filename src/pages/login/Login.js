import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user || localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const signIn = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/api/auth/login", { email, password })
      .then(({ data }) => {
        console.log(data.user);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
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
