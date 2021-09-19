import React from "react";
import MainNavigation from "./MainNavigation";

const Layout = ({ children }) => {
  return (
    <header>
      <MainNavigation />
      {children}
    </header>
  );
};

export default Layout;
