import { useNavigate } from "react-router-dom";
import { checkMe, setLogin } from "../../utils/fetch";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email") || "";
    const password = formData.get("password") || "";

    if (email && password) {
      try {
        const user = await setLogin(email.toString(), password.toString());
        if (user) {
          console.log("Login succeeded", user);
          navigate("/");
        } else {
          setError("Login failed");
        }
      } catch (error) {
        setError("Login failed with error: " + error);
      }
    } else {
      setError("Email and password are required");
    }
  };

  useEffect(() => {
    checkMe().then((response: any) => {
      if (response) {
        navigate("/");
      } else {
        localStorage.removeItem("token");
      }
    });
  }, []);

  return (
    <div className="login">
      <div className="login-container">
        <p className="login-title">IT-incubator</p>
        <p className="login-form-title">Sign In</p>
        <form className="login-form" onSubmit={handleSubmit} >
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />

          <button className="login-button" type="submit">Login</button>
        </form>
        <p className="login-question">Don't have an account?</p>
        <a className="login-link" href="/register">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
