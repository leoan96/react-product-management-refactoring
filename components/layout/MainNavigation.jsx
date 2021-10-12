import {
  AppleOutlined,
  BarcodeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Col, Menu, Row } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import authConstants from "../../context/auth";
import { useAuthContext } from "../../context/context";
import styles from "./MainNavigation.module.scss";

const MainNavigation = () => {
  const [current, setCurrent] = useState("products");
  const authContext = useAuthContext();

  const menuClickHandler = (e) => {
    console.log("selectedKeys: ", e.key);
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    localStorage.removeItem("currentUser");
    authContext.dispatch({ type: authConstants.LOGOUT });
  };

  return (
    <div>
      <div className={styles.header}>
        <Menu
          onClick={menuClickHandler}
          selectedKeys={[current]}
          mode="horizontal"
          style={{
            width: "100%",
          }}
        >
          <Menu.Item
            key="products"
            icon={<AppleOutlined />}
            style={{ marginLeft: "-20px" }}
          >
            <Link href="/admin">
              <a>Products</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="add_product" icon={<BarcodeOutlined />}>
            <Link href="/products/add-product">
              <a>Add Product</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={logoutHandler}
            style={{
              marginLeft: "auto",
            }}
          >
            <Button onClick={logoutHandler}>Logout</Button>
          </Menu.Item>
        </Menu>
      </div>
      <div style={{ marginBottom: "60px" }}></div>
    </div>
  );
};

export default MainNavigation;
