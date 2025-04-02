import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { register, login } from "../../services/api";
import "./LoginPage.css";

const LoginPage = () => {
  const { login: authLogin } = useContext(AuthContext);

  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [usernameStatus, setUsernameStatus] = useState(""); 
  const [passwordStatus, setPasswordStatus] = useState(""); 
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(""); 
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  const navigate = useNavigate();

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });

    if (name === "username") {
      setUsernameStatus(value ? "valid" : "invalid");
    }

    if (name === "password") {
      const { isValid, errors } = validatePassword(value);
      setPasswordStatus(isValid ? "valid" : "invalid");
      setPasswordErrors(errors);
    }

    if (name === "confirmPassword") {
      setConfirmPasswordStatus(value === signupData.password ? "valid" : "invalid");
      if (value !== signupData.password) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validatePassword = (password) => {
    const errors = [];
    if (!/(?=.*[a-z])/.test(password)) errors.push("At least one lowercase letter");
    if (!/(?=.*[A-Z])/.test(password)) errors.push("At least one uppercase letter");
    if (!/(?=.*\d)/.test(password)) errors.push("At least one number");
    if (!/(?=.*[@#$%^&*])/.test(password)) errors.push("At least one special character (@#$%^&*)");
    if (password.length < 8) errors.push("Minimum 8 characters");

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStatus !== "valid") {
      alert("Please ensure your password meets all requirements.");
      return;
    }

    try {
      await register(signupData.username, signupData.password);
      alert("Signup Successful");
      
      // Automatically log in the user after successful signup
      const response = await login(signupData.username, signupData.password);
      authLogin(response.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Error during signup.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginData.username, loginData.password);
      alert("Login Successful");
      authLogin(response.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Error during login.");
    }
  };

  return (
    <div className="auth-container">
      <div className="main-auth-box">
        <div className="auth-box signup-form">
          <h2>Hey there!</h2>
          <form onSubmit={handleSignupSubmit}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              className={`username ${usernameStatus}`}
              value={signupData.username}
              onChange={handleSignupChange}
              required
            />

            <label>Password:</label>
            <input
              className={`pass ${passwordStatus}`}
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
            {passwordErrors.length > 0 && (
              <ul className="pass-rules">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}

            <label style={{ color: "#F1EFEC" }}>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              className={`confirmPass ${confirmPasswordStatus}`}
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              required
            />
            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="sign-up-button">
              Sign Up
            </button>
          </form>
        </div>

        <div className="vertical-line">|</div>

        <div className="auth-box login-form">
          <h2>Welcome back!</h2>
          <form onSubmit={handleLoginSubmit}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              className="username"
              value={loginData.username}
              onChange={handleLoginChange}
              style={{ color: "grey" }}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="password"
              value={loginData.password}
              style={{ color: "grey" }}
              onChange={handleLoginChange}
              required
            />
            {/* <a href="#" className="forgot-password">
              Forgot Password?
            </a> */}

            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;