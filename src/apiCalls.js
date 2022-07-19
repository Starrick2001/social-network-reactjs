import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  const BE = process.env.REACT_APP_BACKEND_SERVER;
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(BE + "auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const refreshTokenCall = async (refreshToken, dispatch) => {
  const BE = process.env.REACT_APP_BACKEND_SERVER;
  try {
    const res = await axios.post(BE + "auth/refresh", {
      refreshToken: refreshToken,
    });
    dispatch({ type: "REFRESH_TOKEN", payload: res.data });
    return res.data;
  } catch (err) {
    dispatch({ type: "REFRESH_TOKEN_FAILURE", payload: err });
  }
};
