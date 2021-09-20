import React from "react";
import Link from "next/link";
import { Table, Tag, Space } from "antd";
import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "productName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "productCode",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "datepicker",
    },
    {
      title: "Type",
      key: "productTupe",
      dataIndex: "product_type",
      render: (tag) => (
        <>
          <Tag color="blue" key={tag}>
            {tag.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link href={`/products/details/${record.product_code}`}>Edit</Link>
          <Link href="#">Delete</Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div>
        <p>List of All Products</p>
        {/* <ul>
          {products.map((product) => (
            <ProductItem key={product.product_code} product={product} />
          ))}
        </ul> */}
        <Table columns={columns} dataSource={products} />
      </div>
    </div>
  );
};

export default ProductList;
