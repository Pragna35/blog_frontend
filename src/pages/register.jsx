import { Link, useNavigate } from "react-router";
import "../styles/login.css";
import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  // console.log(inputs);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://blog-backend-icsf.onrender.com/api/auth/register",
        inputs
      );
      navigate("/login");
      // console.log(res);
      setInputs({
        username: "",
        password: "",
        email: "",
      });
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="login_div">
      <h1 className="login_heading">Register</h1>
      <form className="login_form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={inputs.username}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={inputs.password}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={inputs.email}
          required
          onChange={handleChange}
        />

        <button type="submit" className="login_btn">
          register
        </button>
        {err && <p className="err_msg">{err}</p>}
        <span>
          Do you have an account? <Link to="/login">login</Link>
        </span>
      </form>
    </div>
  );
};
export default RegisterPage;
