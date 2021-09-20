import "../styles/globals.css";
import "antd/dist/antd.css";
import { useRouter } from "next/dist/client/router";

import Layout from "../components/layout/Layout";
import ProductContextProvider from "../components/store/ProductContext";

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();

  if (asPath === "/") {
    return <Component {...pageProps} />;
  }

  return (
    <ProductContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductContextProvider>
  );
}

export default MyApp;
