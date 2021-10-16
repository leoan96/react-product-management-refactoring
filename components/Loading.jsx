import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = ({ text }) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        color: "#fee715ff",
        fontSize: "7rem",
      }}
      spin
    />
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Spin indicator={antIcon} />
      {text?.length > 0 ? (
        <div
          style={{
            color: "#101820ff",
            fontSize: "1.5rem",
            marginTop: "20%",
          }}
        >
          {text}
        </div>
      ) : null}
    </div>
  );
};

export default Loading;
