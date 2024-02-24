import { useNavigate } from "react-router-dom";
import { setRegistration } from "../../utils/fetch";
import { useState } from "react";
import "./register.css";
import "../login-page/login.css";

const Registration = () => {
  const [error, setError] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email") || "";
    const password = formData.get("password") || "";

    setRegistration(email.toString(), password.toString()).then(
      (success: boolean) => {
        if (success) {
          console.log("Registration succeeded");
          navigate("/login");
        } else {
          console.log("Registration failed");
        }
      }
    );
  };
  return (
    <div className="login">
      <div className="login-container">
      <p className="login-title">IT-incubator</p>
        <p className="login-form-title">Sign Up</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <label htmlFor="password">Confirm Password</label>
          <input type="password" name="password" />

          <div className="register-buttons">
            <button className="register-cancel-button" onClick={() => navigate("/login")}>Cancel</button>
            <button className="register-button" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
