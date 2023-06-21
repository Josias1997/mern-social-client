import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = (event) => {
    event.preventDefault();
    if (password == confirmPassword) {
      axios
        .post("http://localhost:5500/api/auth/register", {
          username: username,
          password: password,
          email: email,
        })
        .then(({ data }) => {
          alert(data.message);
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
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={signUp}>Sign Up</button>
    </form>
  );
};

export default Register;
