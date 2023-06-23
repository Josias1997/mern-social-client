import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const signUp = (event) => {
    event.preventDefault();
    if (password == confirmPassword) {
      axiosInstance
        .post("/auth/register", {
          username: username,
          password: password,
          email: email,
        })
        .then(({ data }) => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    } else {
      alert("Les mots de passe ne sont pas identiques");
    }
  };

  return (
    <form>
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
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
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={signUp}>Sign Up</button>
      </div>
      <div>
        <Link to={"/login"}>Login</Link>
      </div>
    </form>
  );
};

export default Register;
