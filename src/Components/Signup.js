import "../styles/Login.css";
import React, { useRef, useState } from "react";
import bcrypt from "bcryptjs";
export default function Signup(props) {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const switchScreen = () => {
    console.log(props);
    props.changeVisibility(true);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const hashedPassword = bcrypt.hashSync(userInfo.password, 10);

    const fetchMethods = {
      method: "POST",
      body: JSON.stringify({ ...userInfo, password: hashedPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await fetch("http://170.187.188.89/addUser", fetchMethods);
    if (result.status == 200) {
      switchScreen();
    } else {
      alert("This email already exists!");
    }
    console.log(result);
  };
  return (
    <form className="input-container" onSubmit={submitHandler}>
      <div className="email-input">
        <label>First Name</label>
        <input
          className="inputVal"
          type="username"
          value={userInfo.firstname}
          onChange={(event) =>
            setUserInfo({ ...userInfo, firstName: event.target.value })
          }
          required
        />
      </div>
      <div className="email-input">
        <label>Last Name</label>
        <input
          className="inputVal"
          type="username"
          value={userInfo.lastname}
          onChange={(event) =>
            setUserInfo({ ...userInfo, lastName: event.target.value })
          }
          required
        />
      </div>
      <div className="email-input">
        <label>Email:</label>
        <input
          className="inputVal"
          type="email"
          value={userInfo.email}
          onChange={(event) =>
            setUserInfo({ ...userInfo, email: event.target.value })
          }
          required
        />
      </div>
      <div className="password-input">
        <label>Password:</label>
        <input
          className="inputVal"
          type="password"
          value={userInfo.password}
          onChange={(event) =>
            setUserInfo({ ...userInfo, password: event.target.value })
          }
          required
        />
      </div>
      <div className="btn">
        <button className="log" onClick={switchScreen}>
          Login
        </button>
        <button className="log" type="submit">
          Sign up
        </button>
      </div>
    </form>
  );
}
