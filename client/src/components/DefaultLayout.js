import React from "react";
import "../resources/default-layout.css";
import { Button, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";

function DefaultLayout(props) {
  const jsonObj = JSON.parse(localStorage.getItem("expense-tracker-user"));
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <li
          onClick={() => {
            localStorage.removeItem("expense-tracker-user");
            navigate("/login");
          }}
        >
          Logout
        </li>
      ),
    },
  ];
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Expense Tracker</h1>
        </div>
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <button className="user-pill">{jsonObj.user.name}</button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
