import React, { useState } from "react";
import Link from "next/link";
import { Table, Tag, Space, Button } from "antd";
import { productTypeFilter } from "../../constants";

const ProductList = ({ products }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const changeHandler = (pagination, filters, sorter) => {
    console.log("changeHandler filters: ", filters);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const setNameSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "product_name",
    });
  };

  const clearFilters = () => {
    setFilteredInfo(null);
  };

  const clearAll = () => {
    setFilteredInfo(null);
    setSortedInfo(null);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "productName",
      render: (text, record) => (
        <Link href={`/products/details/${record.product_code}`}>{text}</Link>
      ),
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
      key: "productType",
      dataIndex: "product_type",
      filters: productTypeFilter,
      filteredValue: filteredInfo?.productType || null,
      onFilter: (value, record) => record.product_type.includes(value),
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
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={setNameSort}>Sort By Product Name</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={products}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default ProductList;
