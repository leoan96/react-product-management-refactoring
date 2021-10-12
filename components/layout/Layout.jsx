import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useAuthContext } from "../../context/context";
import MainNavigation from "./MainNavigation";

const Layout = ({ children, asPath }) => {
  const authContext = useAuthContext();

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
    <header style={{ maxWidth: "90%", margin: "0 auto" }}>
      <MainNavigation />
      {children}
    </header>
  );
};

export default Layout;
