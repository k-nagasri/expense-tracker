import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import AddEditTransaction from "../components/AddEditTransaction";
import { Select, Table, message, DatePicker } from "antd";
import Spinner from "../components/Spinner";
import axios from "axios";
import moment from "moment";
import {
  AreaChartOutlined,
  DeleteOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [frequency, setFrequency] = useState("all");
  const [customDate, setCustomDate] = useState([]);

  const [type, setType] = useState("all");

  const [viewType, setViewType] = useState("table");

  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const getTransactions = async () => {
    try {
      setLoading(true);
      const userObj = JSON.parse(localStorage.getItem("expense-tracker-user"));
      const user = userObj.user;

      const response = await axios.get("/api/transactions/get-transactions", {
        params: {
          userId: user._id,
          frequency,
          type,
          ...(frequency === "custom" &&
            customDate && {
              startDate: customDate[0].format("YYYY-MM-DD"),
              endDate: customDate[1].format("YYYY-MM-DD"),
            }),
        },
      });
      setTransactions(response.data.transactions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to fetch transactions");
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await axios.post("/api/transactions/delete-transaction", {
        transactionId,
      });
      getTransactions();
      message.success("Transaction deleted successfully");
    } catch (error) {
      message.error("Failed to delete transaction");
    }
  };

  useEffect(() => {
    if (frequency !== "custom" || customDate.length === 2) {
      getTransactions();
    }
  }, [frequency, customDate, type]);

  const columns = [
    {
      key: "1",
      title: "Date",
      dataIndex: "date",
      // render: (date) => new Date(date).toLocaleDateString("en-GB"),
      render: (date) => <label>{moment(date).format("DD-MM-YYYY")}</label>,
    },

    {
      key: "2",
      title: "Type",
      dataIndex: "type",
      render: (type) => (
        <span
          style={{
            color: type === "income" ? "#16a34a" : "#dc2626",
            fontWeight: 600,
          }}
        >
          {type}
        </span>
      ),
    },
    {
      key: "3",
      title: "Amount",
      dataIndex: "amount",
    },
    {
      key: "4",
      title: "Category",
      dataIndex: "category",
    },

    {
      key: "5",
      title: "Reference",
      dataIndex: "reference",
    },
    {
      key: "6",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "7",
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined
              // className="mx-3"
              style={{ color: "red", marginLeft: 10 }}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this transaction?",
                  )
                ) {
                  deleteTransaction(record._id);
                }
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(value) => setFrequency(value)}
              // style={{ width: 150 }}
              options={[
                { value: "all", label: "All" },
                { value: "7", label: "Last 1 Week" },
                { value: "30", label: "Last 1 Month" },
                { value: "365", label: "Last 1 Year" },
                { value: "custom", label: "Custom" },
              ]}
            />

            {frequency === "custom" && (
              <RangePicker
                className="mt-1"
                value={customDate}
                onChange={(dates) => setCustomDate(dates)}
              />
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select
              value={type}
              onChange={(value) => setType(value)}
              options={[
                { value: "all", label: "All" },
                { value: "income", label: "Income" },
                { value: "expense", label: "Expense" },
              ]}
              style={{ width: 150 }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end align-items-center">
          <div className="d-flex align-items-center">
            <div className="view-switch">
              <UnorderedListOutlined
                className={
                  viewType === "table" ? "icon-style active" : "icon-style"
                }
                onClick={() => setViewType("table")}
              />
              <AreaChartOutlined
                className={`icon-style ms-2  ${viewType === "analytics" ? "active" : ""}`}
                onClick={() => setViewType("analytics")}
              />
            </div>
          </div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analytics">
        {viewType === "table" ? (
          <Table
            locale={{ emptyText: "No transactions yet" }}
            dataSource={transactions}
            columns={columns}
            className="transactions-table"
            pagination={{ pageSize: 7 }}
          />
        ) : (
          <Analytics transactions={transactions} />
        )}
      </div>
      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          getTransactions={getTransactions}
          selectedItemForEdit={selectedItemForEdit}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
