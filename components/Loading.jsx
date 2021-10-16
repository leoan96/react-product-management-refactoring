import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = ({ text }) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        color: "#FCEA25",
        fontSize: "7rem",
        // position: "absolute",
        // top: "50%",
        // left: `calc(50% - 20px)`,
      }}
      spin
    />
  );

  return (
    <div>
      <Spin indicator={antIcon} />
      {text?.length > 0 ? (
        <div
          style={
            {
              // color: "grey",
              // fontSize: 18,
              // position: "absolute",
              // top: "60%",
              // left: `calc(50vw - 95px)`,
            }
          }
        >
          {text}
        </div>
      ) : null}
    </div>
  );
};

export default Loading;
