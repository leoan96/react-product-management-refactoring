import React from "react";
import ProductList from "../../components/products/ProductList";
import { enviroment } from "../../constants";
import CustomHead from "../../components/CustomHead";

const AdminPage = ({ products }) => {
  return (
    <div>
      <CustomHead title="Products" />
      <h1>Admin Page</h1>
      <ProductList products={products} />
    </div>
  );
};

export default AdminPage;

export async function getServerSideProps(context) {
  const response = await fetch(enviroment.PRODUCT_SERVICE.baseUrl);
  const products = await response.json();

  return {
    props: { products }, // will be passed to the page component as props
  };
}
