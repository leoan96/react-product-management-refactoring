import { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import FormModal from "../form/FormModal";
import moment from "moment";
import { useRouter } from "next/router";
import { enviroment } from "../../constants";

const EditProduct = (props) => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [datePicker, setDatePicker] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function getProductDetails() {
      if (!router.isReady) return;
      try {
        const response = await fetch(
          `${enviroment.PRODUCT_SERVICE.baseUrl}/${router.query.product_code}`
        );
        const products = await response.json();

        setProductCode(products.product_code);
        setProductName(products.product_name);
        setProductType(products.product_type);
        setDatePicker(products.date);
      } catch (err) {
        console.log(err);
      }
    }
    getProductDetails();
  }, [router.isReady, router.query.product_code]);

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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const finishHandler = async (values) => {
    const { product_code, product_name, product_type } = values;
    const updateProduct = {
      product_code,
      product_name,
      product_type,
      date: values.datePicker?.format("YYYY-MM-DD"),
    };

    try {
      await fetch(productDetailServiceUrl, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProduct),
      });
      setIsModalVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <FormModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        title="Message"
        message="Successfully Edited Product"
      />
      <Form
        {...layout}
        name="Editm"
        onFinish={finishHandler}
        validateMessages={validateMessages}
        fields={[
          { name: "product_name", value: productName },
          { name: "product_code", value: productCode },
          { name: "product_type", value: productType },
          // { name: "datePicker", value: datePicker },
        ]}
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
          <DatePicker
          // defaultValue={moment(datePicker ? datePicker : "2021-09-29")}
          />
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
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Edit Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
