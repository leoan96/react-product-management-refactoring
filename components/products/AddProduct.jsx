import React, { useRef, useState } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import FormModal from "../form/FormModal";
import { enviroment } from "../../constants";

const AddProduct = () => {
  const form = useRef();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState(false);

  function handleOk() {
    setIsModalVisible(false);
  }

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  async function finishHandler(values) {
    const { product_code, product_name, product_type } = values;
    const newProduct = {
      product_code,
      product_name,
      product_type,
      date: values.datePicker?.format("YYYY-MM-DD"),
    };

    try {
      await fetch(enviroment.PRODUCT_SERVICE.baseUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      form.current.resetFields();
      setIsModalVisible(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  if (error) {
    return (
      <div>
        <p>Unable to connect to server. Please try again later</p>
      </div>
    );
  }

  return (
    <div>
      <FormModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        title="Message"
        message="Successfully Added Product"
      />
      <Form
        style={{
          maxWidth: "40%",
        }}
        ref={form}
        name="addProductForm"
        onFinish={finishHandler}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="product_name"
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="product_code"
          label="Code"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="datePicker"
          label="DatePicker"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="product_type"
          label="Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select product type" allowClear>
            <Select.Option value="apparel">Apparel</Select.Option>
            <Select.Option value="sporting">Sporting</Select.Option>
            <Select.Option value="health">Health</Select.Option>
            <Select.Option value="electronic">Electronic</Select.Option>
            <Select.Option value="outdoor">Outdoor</Select.Option>
            <Select.Option value="food">Food</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ "border-radius": "10px" }}
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
