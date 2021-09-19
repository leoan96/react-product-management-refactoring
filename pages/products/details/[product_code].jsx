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
