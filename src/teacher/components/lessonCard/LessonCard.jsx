import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import {
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";

import "./index.css";
import { formatImgUrl } from "../../../utils/formatImgUrl";
const LessonCard = (props) => {
  const navigate = useNavigate();
  let courseId = props.cart._id;
  const items = [
    {
      label: (
        <Link to={"/teacher/course/" + courseId}>
          <EyeOutlined /> kursni ko'rish
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to={"/teacher/update/kurs/" + courseId}>
          <EditOutlined /> kursni yangilash
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link to={"/teacher/statistic/" + courseId}>
          <BarChartOutlined /> kursni statistikasi
        </Link>
      ),
      key: "2",
    },
  ];
  return (
    <div className="">
      <div className="main-cart">
        <img
          onClick={() => {
            navigate("/teacher/course/" + courseId);
          }}
          src={formatImgUrl(props.cart.obloshka)}
          alt=""
        />
        <div className="cart__content">
          <div
            onClick={() => {
              navigate("/teacher/course/" + courseId);
            }}
            className="cart__content_info"
          >
            <h3>{props.cart.Kursname}</h3>
            <p>{props.cart.Kursdesc}</p>
          </div>
          <Dropdown
            className="position_icon"
            menu={{ items }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MoreOutlined style={{ fontSize: "22px", color: "#fff" }} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
