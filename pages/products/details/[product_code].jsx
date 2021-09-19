import { useRouter } from "next/dist/client/router";
import React from "react";

const ProductDetailsPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Details Page</h1>
      <p>Product Code: {query.product_code}</p>
      {/* <EditProduct productCode={router.query.product_code} /> */}
    </div>
  );
};

export default ProductDetailsPage;
