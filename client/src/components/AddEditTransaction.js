import React, { useState } from "react";
import { Form, Input, Select, Modal, message } from "antd";
import axios from "axios";
import Spinner from "./Spinner";

function AddEditTransaction(props) {
  const {
    showAddEditTransactionModal,
    setShowAddEditTransactionModal,
    getTransactions,
    selectedItemForEdit,
    setSelectedItemForEdit,
  } = props;

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const userObj = JSON.parse(localStorage.getItem("expense-tracker-user"));
      const user = userObj.user;
      values.userId = user._id;

      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: { ...values },
          transactionId: selectedItemForEdit._id,
        });
        message.success("Transaction updated successfully");
        getTransactions();
      } else {
        await axios.post("/api/transactions/add-transaction", values);
        getTransactions();
        message.success("Transaction added successfully");
      }

      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);

      setLoading(false);
    } catch (error) {
      console.log(error.response?.data || error);
      message.error("Operation failed");
      setLoading(false);
    }
  };

  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add New Transaction"}
      open={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={
          selectedItemForEdit
            ? {
                ...selectedItemForEdit,
                date: selectedItemForEdit.date.split("T")[0],
              }
            : {}
        }
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select
            options={[
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select
            options={[
              { value: "bills", label: "Bills" },
              { value: "education", label: "Education" },
              { value: "entertainment", label: "Entertainment" },
              { value: "food", label: "Food" },
              { value: "freelance", label: "Freelance" },
              { value: "health", label: "Health" },
              { value: "Investment", label: "Investment" },
              { value: "salary", label: "Salary" },
              { value: "shopping", label: "Shopping" },
              { value: "tax", label: "Tax" },
              { value: "transportation", label: "Transportation" },
              { value: "travel", label: "Travel" },
              { value: "other", label: "Other" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;
