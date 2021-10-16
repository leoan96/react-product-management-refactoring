import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthContext } from "../../context/context";
import Loading from "../Loading";
import MainNavigation from "./MainNavigation";

const Layout = ({ children, asPath }) => {
  const authContext = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!router.isReady) return;
      if (
        (!authContext.user || !authContext.token) &&
        !authContext.isFetchingUser
      ) {
        router.push("/");
      }
    };
    checkAuth();
  }, [router.isReady, router, authContext]);

  return authContext.user && !authContext.isFetchingUser ? (
    <header style={{ maxWidth: "90%", margin: "0 auto" }}>
      <MainNavigation />
      {children}
    </header>
  ) : (
    <div
      style={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Loading text="Loading" />
    </div>
  );
};

export default Layout;
