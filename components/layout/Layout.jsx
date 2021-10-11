import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useAuthContext } from "../../context/context";
import MainNavigation from "./MainNavigation";

const Layout = ({ children, asPath }) => {
  const authContext = useAuthContext();
  console.log("Layout: ", asPath);
  console.log(authContext);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!router.isReady) return;
      console.log("inside useEffect: ", authContext);
      if (!authContext.user || !authContext.token) {
        console.log("executed");
        router.push("/");
      }
    };
    checkAuth();
  }, [
    router.isReady,
    router,
    authContext.user,
    authContext.token,
    authContext,
  ]);

  if (!authContext.user || !authContext.token) {
    return (
      <div>
        <p style={{ textAlign: "center" }}>Loading...</p>
      </div>
    );
  }

  return (
    <header>
      <MainNavigation />
      {children}
    </header>
  );
};

export default Layout;
