import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import { Menu, Button } from "antd";
import {
  AppleOutlined,
  BarcodeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import styles from "./MainNavigation.module.scss";

const MainNavigation = () => {
  // const [session, loading] = useSession();
  const [current, setCurrent] = useState("");

  const menuClickHandler = (e) => {
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className={styles.header}>
      <Menu
        onClick={menuClickHandler}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="products" icon={<AppleOutlined />}>
          <Link href="/admin">
            <a>Products</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="add_product" icon={<BarcodeOutlined />}>
          <Link href="/products/add-product">
            <a>Add Product</a>
          </Link>
        </Menu.Item>
        {/* {session && !loading && (
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            <Button onClick={logoutHandler}>Logout</Button>
          </Menu.Item>
        )} */}
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <Button onClick={logoutHandler}>Logout</Button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MainNavigation;
