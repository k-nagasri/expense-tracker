import { Form, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { FiEyeOff, FiEye } from "react-icons/fi";

import "../resources/authentication.css";

import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(true);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", values);
      message.success("Registration successful");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Registration failed");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("expense-tracker-user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="container">
        <div className="row justify-content-center align-items-center w-100 h-100">
          <div className="col-md-7">
            <div className="lottie">
              <dotlottie-wc
                src="https://lottie.host/005905ba-6af4-4d75-94be-1bc9d2212d40/WeQ3HKpDIT.lottie"
                background="transparent"
                autoplay
                loop
              ></dotlottie-wc>
            </div>
          </div>
          <div className="col-md-5 auth-form">
            <Form layout="vertical" onFinish={onFinish}>
              <h1>EXPENSE TRACKER - REGISTER</h1>
              <hr />
              <Form.Item label="Name" name="name">
                <input type="text" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <input type="email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <div className="password-wrapper">
                  <input type={showPassword ? "text" : "password"} />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </Form.Item>
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/login">Already have an account? Login</Link>
                <button className="primary" type="submit">
                  REGISTER
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
