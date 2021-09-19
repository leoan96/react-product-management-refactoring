import React from "react";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/dist/client/router";

import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const router = useRouter();

  const validateAccount = (username, password) => {
    return username === "lizard" && password === "123" ? true : false;
  };

  const onFinishHandler = (values) => {
    const { username, password } = values;
    if (username && password && validateAccount(username, password)) {
      console.log("Success:", values);
      router.push("/admin");
    }
    console.log("Wrong credentials!");
  };

  const onFinishFailedHandler = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
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
            type: "enum",
            enum: ["lizard"],
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

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      ></Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 7,
          span: 16,
        }}
      >
        <Button className={styles.btn_style} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
