import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";
import GoogleLoginButton from "./GoogleLoginButton";
import "../login.css";

function Login() {
  const [loginInfo, setLogInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLogInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are require");
    }

    try {
      const url = "http://localhost:8080/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();

      const { success, message, jwtToken, name, role, error,id } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("userId",id)
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log("ROHIT result", result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="loginContainer">
      <div>
        <div className="container">
          <h1 className="loginHeading">Login</h1>
          <form className="formLogin" onSubmit={handleLogin}>
            <div className="loginDiv">
              <label className="labelLogin" htmlFor="email">
                Email
              </label>
              <input
                value={loginInfo.email}
                onChange={handleChange}
                type="text"
                className="inputLogin"
                name="email"
                placeholder="Enter your emai..."
              ></input>
            </div>
            <div className="loginDiv">
              <label className="labelLogin" htmlFor="password">
                Password
              </label>
              <input
                value={loginInfo.password}
                onChange={handleChange}
                type="password"
                className="inputLogin"
                name="password"
                placeholder="Enter your password..."
              ></input>
            </div>
            <button className="loginButton" type="submit">
              Login
            </button>
            <span>
              Don't have account ? <Link to={"/signup"}>SignUp</Link>
            </span>
            {/* <button className="loginButton" >
              Login with Google
            </button> */}
            <GoogleLoginButton />
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
