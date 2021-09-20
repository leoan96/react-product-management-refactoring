import React, { useRef, useState } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import FormModal from "../form/FormModal";
import { enviroment } from "../../constants";
import CustomHead from "../CustomHead";

const AddProduct = () => {
  const form = useRef();

  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleOk() {
    setIsModalVisible(false);
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

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
    }
  }

  return (
    <div>
      <CustomHead title="Add Product" />
      <FormModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        title="Message"
        message="Successfully Added Product"
      />
      <Form
        {...layout}
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
        {/* <Form.Item name="publish" valuePropName="checked" noStyle>
        <Checkbox>Published</Checkbox>
      </Form.Item> */}
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
