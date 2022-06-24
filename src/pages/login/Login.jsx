import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { isFetching, dispatch } = useContext(AuthContext);

  const loginHandler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Network</h3>
          <span className="loginDesc">Connect with friends</span>
        </div>
        <div className="loginRight">
          <form onSubmit={loginHandler}>
            <div className="loginBox">
              <input
                placeholder="Email"
                type="email"
                className="loginInput"
                ref={email}
                required
              />
              <input
                placeholder="Password"
                type="password"
                className="loginInput"
                required
                // minLength="6"
                ref={password}
              />
              <button className="loginButton">
                {isFetching ? (
                  <CircularProgress size="15px" color="secondary" />
                ) : (
                  "Log in"
                )}
              </button>
              <span className="loginForgot">Forgot password?</span>
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress size="15px" color="inherit" />
                ) : (
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Create a new account
                  </Link>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
