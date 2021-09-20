import React, { useContext } from "react";
import ProductList from "../../components/products/ProductList";
import { ProductContext } from "../../components/store/ProductContext";
// import { enviroment } from "../../constants";

const AdminPage = ({}) => {
  const productContext = useContext(ProductContext);

  return (
    <div>
      <h1>Admin Page</h1>
      <ProductList products={productContext.products} />
    </div>
  );
};

export default AdminPage;

// export async function getServerSideProps(context) {
//   const response = await fetch(enviroment.PRODUCT_SERVICE.baseUrl);
//   const products = await response.json();

//   return {
//     props: { products }, // will be passed to the page component as props
//   };
// }
