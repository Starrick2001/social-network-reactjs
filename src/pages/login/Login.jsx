import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

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
              <button className="loginButton">Log in</button>
              <span className="loginForgot">Forgot password?</span>
              <button className="loginRegisterButton">
                Create a new account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
