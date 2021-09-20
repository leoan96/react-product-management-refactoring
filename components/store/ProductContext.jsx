import React, { useState, useEffect, createContext } from "react";
import { enviroment } from "../../constants";

export const ProductContext = createContext({
  products: [],
  totalProducts: 0,
});

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(enviroment.PRODUCT_SERVICE.baseUrl);
      const products = await response.json();
      setProducts(products);
    };
    getProducts();
  }, []);

  const context = {
    products,
    totalProducts: products.length,
  };

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;

// export async function getServerSideProps(context) {
//   const response = await fetch(enviroment.PRODUCT_SERVICE.baseUrl);
//   const products = await response.json();
//   console.log("getServerSideProps: ", products);

//   return {
//     props: { products },
//   };
// }
