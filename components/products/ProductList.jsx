import React, { useState } from "react";
import Link from "next/link";
import { Table, Tag, Space, Button, Input } from "antd";
import { enviroment, productTypeFilter } from "../../constants";

const ProductList = ({ products }) => {
  const [allProducts, setAllProducts] = useState(products);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const changeHandler = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const setNameSort = () => {
    setSortedInfo({
      order: "ascend",
      columnKey: "productName",
    });
  };

  const clearFilters = () => {
    setFilteredInfo(null);
  };

  const clearAll = () => {
    setFilteredInfo(null);
    setSortedInfo(null);
  };

  const deleteHandler = async (product_code) => {
    try {
      await fetch(`${enviroment.PRODUCT_SERVICE.baseUrl}/${product_code}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const updatedProductList = allProducts.filter(
        (product) => product.product_code !== product_code
      );
      setAllProducts(updatedProductList);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Product",
      render: (record) => (
        <React.Fragment>
          {record.product_name}
          <br />
          {record.product_code}
          <br />
          {record.date}
          <br />
          {record.product_type}
          <br />
          <Space size="middle">
            <Link href={`/products/details/${record.product_code}`}>Edit</Link>
            <Link href="/admin">
              <a onClick={() => deleteHandler(record.product_code)}>Delete</a>
            </Link>
          </Space>
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "productName",
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      sortOrder: sortedInfo?.columnKey === "productName" && sortedInfo.order,
      responsive: ["sm"],
      render: (text, record) => (
        <Link href={`/products/details/${record.product_code}`}>{text}</Link>
      ),
    },
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "productCode",
      responsive: ["md"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "datepicker",
      sorter: (a, b) => a.date.localeCompare(b.date),
      sortOrder: sortedInfo?.columnKey === "datepicker" && sortedInfo.order,
      responsive: ["md"],
    },
    {
      title: "Type",
      key: "productType",
      dataIndex: "product_type",
      filters: productTypeFilter,
      filteredValue: filteredInfo?.productType || null,
      responsive: ["sm"],
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
      responsive: ["sm"],
      render: (text, record) => (
        <Space size="middle">
          <Link href={`/products/details/${record.product_code}`}>Edit</Link>
          <Link href="/admin">
            <a onClick={() => deleteHandler(record.product_code)}>Delete</a>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>List of All Products</h2>
      <Space style={{ marginBottom: 16, marginRight: 14 }} wrap>
        <Input
          placeholder="Search Product Name"
          value={searchValue}
          onChange={(e) => {
            const currentValue = e.target.value;
            setSearchValue(currentValue);
            const filteredData = products.filter((entry) => {
              const regex = new RegExp(`${currentValue}.*`, "gi");
              return entry.product_name.match(regex);
            });
            setAllProducts(filteredData);
          }}
        />
      </Space>
      <Space style={{ marginBottom: 16 }} wrap>
        <Button onClick={setNameSort}>Sort By Product Name</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={allProducts}
        onChange={changeHandler}
        rowKey="product_code"
      />
    </div>
  );
};

export default ProductList;
