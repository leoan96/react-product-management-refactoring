import React, { createContext, useReducer, useEffect } from "react";
import authConstants from ".";
import { authReducer, initialState } from "./auth-reducer";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    try {
      const user = localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser")).user
        : "";
      const token = localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser")).auth_token
        : "";
      if (user && token) {
        dispatch({ type: authConstants.SET_USER, payload: { user } });
        dispatch({ type: authConstants.SET_TOKEN, payload: { token } });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const context = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    errorMessage: state.errorMessage,
    dispatch,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
