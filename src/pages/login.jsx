import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import "../styles/login.css";
import { AuthContext } from "../../context/authContext";

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // console.log(inputs);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");

      setInputs({
        username: "",
        password: "",
      });
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return (
    <div className="login_div">
      <h1 className="login_heading">Login</h1>
      <form className="login_form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit" className="login_btn">
          Login
        </button>
        {err && <p className="err_msg">{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">register</Link>
        </span>
      </form>
    </div>
  );
};
export default LoginPage;
