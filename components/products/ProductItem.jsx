import React from "react";
import Link from "next/link";

const ProductItem = ({ product }) => {
  return (
    <li key={product.product_code}>
      <Link href={`/products/details/${product.product_code}`}>
        <a>{product.product_name}</a>
      </Link>
    </li>
  );
};

export default ProductItem;
