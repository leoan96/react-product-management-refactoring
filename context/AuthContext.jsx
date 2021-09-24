import React, { createContext, useContext } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const context = {
    user: {},
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
