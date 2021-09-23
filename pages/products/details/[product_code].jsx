import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import React from "react";
import EditProduct from "../../../components/products/EditProduct";

const ProductDetailsPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Details Page</h1>
      <EditProduct productCode={query.product_code} />
    </div>
  );
};

export default ProductDetailsPage;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
};
