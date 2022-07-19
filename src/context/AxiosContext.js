import { createContext, useEffect, useReducer } from "react";
import AxiosReducer from "./AxiosReducer";

const INITIAL_STATE = {
  axios: axios.create(),
  isFetching: false,
  error: false,
};

export const AxiosContext = createContext(INITIAL_STATE);

export const AxiosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AxiosReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
