import { getSession } from "next-auth/client";
import React from "react";
import AddProduct from "../../components/products/AddProduct";

const AddProductPage = () => {
  return (
    <div>
      <div className="container">
        <h1>Add Product Page</h1>
        <AddProduct />
      </div>
    </div>
  );
};

export default AddProductPage;

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
