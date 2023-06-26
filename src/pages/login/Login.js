import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user || localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const signIn = (event) => {
    event.preventDefault();
    axiosInstance
      .post("/auth/login", { email, password })
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
      <div>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={signIn}>Sign In</button>
      </div>
      <div>
        <Link to={"/register"}>Register</Link>
      </div>
    </form>
  );
};

export default Login;
