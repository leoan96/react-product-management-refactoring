import { useContext } from "react";
import { AuthContext } from "./auth/AuthContextProvider";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used inside AuthContextProvider");
  }
  return context;
};
