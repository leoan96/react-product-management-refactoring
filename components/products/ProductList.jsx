import React from "react";
import Link from "next/link";

const ProductList = ({ products }) => {
  return (
    <div>
      <div>
        <p>List of All Products</p>
        <ul>
          {products.map((product) => (
            <li key={product.product_code}>
              <Link href={`/products/details/${product.product_code}`}>
                <a>{product.product_name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
