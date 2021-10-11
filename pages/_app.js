import "../styles/globals.css";
import "antd/dist/antd.css";
import { useRouter } from "next/dist/client/router";

import Layout from "../components/layout/Layout";
import CustomHead from "../components/CustomHead";
import AuthContextProvider from "../context/auth/AuthContextProvider";

const MyApp = ({ Component, pageProps }) => {
  const { asPath } = useRouter();
  const headTitle = headTitleManager(asPath);

  if (asPath === "/") {
    return (
      <>
        <AuthContextProvider>
          {headTitle}
          <Component {...pageProps} />
        </AuthContextProvider>
      </>
    );
  }

  return (
    <AuthContextProvider>
      <Layout asPath={asPath}>
        {headTitle}
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
};

export default MyApp;

const headTitleManager = (asPath) => {
  let head;
  switch (asPath) {
    case "/":
      head = generateCustomHead("Login");
      break;
    case "/admin":
      head = generateCustomHead("Admin Page");
      break;
    case "/products/add-product":
      head = generateCustomHead("Add Product Page");
      break;
    case asPath.match(/\/products\/details\/.*/gm) && asPath:
      head = generateCustomHead("Product Details");
      break;
    default:
      head = generateCustomHead("Admin");
      break;
  }
  return head;
};

const generateCustomHead = (title) => {
  return <CustomHead title={title} />;
};
