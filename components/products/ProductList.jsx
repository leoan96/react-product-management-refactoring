import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  return (
    <div>
      <div>
        <p>List of All Products</p>
        <ul>
          {products.map((product) => (
            <ProductItem key={product.product_code} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
