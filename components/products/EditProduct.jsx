import { useState, useEffect } from "react";
import Error from "next/error";
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
  const [error, setError] = useState(false);
  const [productCodeNotFoundError, setProductCodeNotFoundError] =
    useState(null);

  const router = useRouter();

  useEffect(() => {
    async function getProductDetails() {
      if (!router.isReady) return;
      try {
        const response = await fetch(
          `${enviroment.PRODUCT_SERVICE.baseUrl}/${router.query.product_code}`
        );
        let products = await response.text();

        if (!products) {
          setProductCodeNotFoundError(
            <Error statusCode={400} title="Wrong product code given"></Error>
          );
        }

        products = JSON.parse(products);

        setProductCode(products.product_code);
        setProductName(products.product_name);
        setProductType(products.product_type);
        setDatePicker(products.date);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    getProductDetails();
  }, [router.isReady, router.query.product_code]);

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
      await fetch(
        `${enviroment.PRODUCT_SERVICE.baseUrl}/${router.query.product_code}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateProduct),
        }
      );
      setIsModalVisible(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const productNameChangeHandler = (e) => {
    setProductName(e.target.value);
  };

  const productCodeChangeHandler = (e) => {
    setProductCode(e.target.value);
  };

  const dateChangeHandler = (date, dateString) => {
    setDatePicker(dateString);
  };

  const productTypeChangeHandler = (value, option) => {
    setProductType(value);
  };

  if (productCodeNotFoundError) {
    return productCodeNotFoundError;
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
        message="Successfully Edited Product"
      />
      <Form
        name="Editm"
        onFinish={finishHandler}
        validateMessages={validateMessages}
        fields={[
          { name: "product_name", value: productName },
          { name: "product_code", value: productCode },
          { name: "product_type", value: productType },
          { name: "datePicker", value: moment(datePicker) },
        ]}
        style={{
          maxWidth: "50%",
        }}
      >
        <Form.Item
          name="product_name"
          label="Name"
          rules={[{ required: true }]}
        >
          <Input onChange={productNameChangeHandler} />
        </Form.Item>
        <Form.Item
          name="product_code"
          label="Code"
          rules={[{ required: true }]}
        >
          <Input onChange={productCodeChangeHandler} />
        </Form.Item>
        <Form.Item
          name="datePicker"
          label="DatePicker"
          rules={[{ required: true }]}
        >
          <DatePicker onChange={dateChangeHandler} />
        </Form.Item>
        <Form.Item
          name="product_type"
          label="Type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select product type"
            allowClear
            onChange={productTypeChangeHandler}
          >
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
            Edit Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
