import "../styles/Login.css";
import Signup from "./Signup";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [forceRender, setforceRender] = useState(false);
  const navigate = useNavigate();
  const switchScreen = () => {
    setVisibility(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fetchMethods = {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await fetch("http://170.187.188.89/login", fetchMethods);
    if (result.status == 200) {
      localStorage.setItem("user", email);
      localStorage.setItem("isAuthenticated", true);
      navigate("/movies");
      window.location.reload(true);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="background">
      <div className="modal">
        <h2>MOVIE GALAXY</h2>
        <div className="user-input">
          {visibility ? (
            <form className="input-container" onSubmit={handleSubmit}>
              <div className="email-input">
                <label>Email:</label>
                <input
                  className="inputVal"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="password-input">
                <label>Password:</label>
                <input
                  className="inputVal"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="btn">
                <button className="log" onClick={switchScreen}>
                  Sign up
                </button>
                <button className="log" type="submit">
                  Login
                </button>
              </div>
            </form>
          ) : (
            <Signup changeVisibility={setVisibility} />
          )}
        </div>
      </div>
    </div>
  );
}
