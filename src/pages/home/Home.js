import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h1>Bonjour {user?.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
