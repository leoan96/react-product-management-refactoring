import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/dist/client/router";

import styles from "./LoginForm.module.scss";
import { useAuthContext } from "../../context/context";
import authConstants from "../../context/auth";
import Loading from "../Loading";

const LoginForm = () => {
  const router = useRouter();
  const authContext = useAuthContext();
  const [loading, setIsloading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!router.isReady) return;
      if (
        (authContext.user || authContext.token) &&
        !authContext.isFetchingUser
      ) {
        router.push("/admin");
      }
    };
    checkAuth();
  }, [router.isReady, router, authContext]);

  const validateAccount = (username, password) => {
    return username === "lizard" && password === "123" ? true : false;
  };

  const onFinishHandler = (values) => {
    setIsloading(true);
    authContext.dispatch({ type: authConstants.REQUEST_LOGIN });
    const { username, password } = values;
    if (username && password && validateAccount(username, password)) {
      const dataObject = {
        user: "John Doe",
        auth_token: "1i39rhf92be",
      };
      localStorage.setItem("currentUser", JSON.stringify(dataObject));
      authContext.dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: dataObject,
      });
      setIsloading(false);
      router.push("/admin");
      return;
    }
    authContext.dispatch({ type: authConstants.LOGIN_ERROR });
    setIsloading(false);
    console.log("Wrong credentials!");
  };

  const onFinishFailedHandler = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return !authContext.user && !authContext.isFetchingUser ? (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishHandler}
      onFinishFailed={onFinishFailedHandler}
      autoComplete="off"
      style={styles.form}
    >
      <Form.Item
        label="Username"
        name="username"
        className={styles.login_label}
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
          {
            message: "Wrong username!",
          },
        ]}
      >
        <Input className={styles.login_input} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        className={styles.login_label}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password className={styles.login_input} />
      </Form.Item>

      <Form.Item>
        <Button
          className={styles.btn_style}
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Loading />
  );
};

export default LoginForm;
