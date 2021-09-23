import { getSession } from "next-auth/client";
import ProductList from "../../components/products/ProductList";
import Error from "next/error";
import { enviroment } from "../../constants";

const AdminPage = ({ errorCode, products }) => {
  if (errorCode === 500) {
    return (
      <Error
        statusCode={errorCode}
        title="Failed to connect to database"
      ></Error>
    );
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <ProductList products={products} />
    </div>
  );
};

export default AdminPage;

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let products = [];
  let errorCode = 500;

  try {
    const response = await fetch(enviroment.PRODUCT_SERVICE.baseUrl);
    errorCode = response.ok ? 200 : +response.statusText;
    if (errorCode !== 200) {
      res.statusCode = errorCode;
    }
    products = await response.json();
  } catch (err) {
    console.log(err);
    res.statusCode = errorCode;
    console.log(res.statusCode);
  }

  return {
    props: { errorCode, session, products }, // will be passed to the page component as props
  };
};
