import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const BE = process.env.REACT_APP_BACKEND_SERVER;
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const reenterpassword = useRef();
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (reenterpassword.current.value !== password.current.value) {
      reenterpassword.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post(BE + "auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Network</h3>
          <span className="loginDesc">Connect with friends</span>
        </div>
        <div className="loginRight">
          <form onSubmit={signUpHandler}>
            <div className="loginBox">
              <input
                required
                placeholder="Username"
                ref={username}
                className="loginInput"
              />
              <input
                required
                placeholder="Email"
                type="email"
                ref={email}
                className="loginInput"
              />
              <input
                required
                ref={password}
                placeholder="Password"
                type="password"
                className="loginInput"
              />
              <input
                required
                ref={reenterpassword}
                placeholder="Re-enter Password"
                type="password"
                className="loginInput"
              />
              <button type="submit" className="loginButton">
                Sign up
              </button>
                <button className="loginRegisterButton">
              <Link to="/login" style={{textDecoration:"none", color:"white"}}>
                  Log into Account
              </Link>
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
