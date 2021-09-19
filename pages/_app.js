import "../styles/globals.css";
import "antd/dist/antd.css";
import { useRouter } from "next/dist/client/router";

import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();

  if (asPath === "/") {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
