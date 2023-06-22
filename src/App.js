import "./App.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
