import React from "react";
import { Progress } from "antd";
import "../resources/analytics.css";

function Analytics({ transactions }) {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (t) => t.type === "income",
  ).length;
  const totalExpenseTransactions = transactions.filter(
    (t) => t.type === "expense",
  ).length;
  const totalIncomeTransactionsPercentage =
    totalTransactions > 0
      ? (totalIncomeTransactions / totalTransactions) * 100
      : 0;
  const totalExpenseTransactionsPercentage =
    totalTransactions > 0
      ? (totalExpenseTransactions / totalTransactions) * 100
      : 0;

  const totalIncomeAmount = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenseAmount = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalAmount = totalIncomeAmount + totalExpenseAmount;
  const totalIncomeAmountPercentage =
    totalAmount > 0 ? (totalIncomeAmount / totalAmount) * 100 : 0;
  const totalExpenseAmountPercentage =
    totalAmount > 0 ? (totalExpenseAmount / totalAmount) * 100 : 0;

  const categories = [
    "bills",
    "education",
    "entertainment",
    "food",
    "freelance",
    "health",
    "Investment",
    "salary",
    "shopping",
    "tax",
    "transportation",
    "travel",
    "other",
  ];
  const getCategoryDataByType = (type) => {
    return categories
      .map((category) => {
        const totalCategoryAmount = transactions
          .filter((t) => t.category === category && t.type === type)
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          category,
          totalCategoryAmount,
        };
      })
      .filter((item) => item.totalCategoryAmount > 0);
  };

  const incomeCategoryData = getCategoryDataByType("income");
  const expenseCategoryData = getCategoryDataByType("expense");

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4">
          <div className="transactions-count">
            <h4>Total Transactions: {totalTransactions}</h4>
            <hr />
            <h5>Income Transactions: {totalIncomeTransactions}</h5>
            <h5>Expense Transactions: {totalExpenseTransactions} </h5>
            <div className="progress-bars d-flex justify-content-around">
              <Progress
                type="circle"
                size={115}
                strokeColor="#2fcd44"
                percent={Number(totalIncomeTransactionsPercentage.toFixed(2))}
              />
              <Progress
                type="circle"
                size={115}
                strokeColor="#ff4d4f"
                percent={Number(totalExpenseTransactionsPercentage.toFixed(2))}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="transactions-count ">
            <h4>Total turnover: {totalAmount}</h4>
            <hr />
            <h5>Income : {totalIncomeAmount}</h5>
            <h5>Expense : {totalExpenseAmount}</h5>
            <div className="progress-bars d-flex justify-content-around">
              <Progress
                type="circle"
                size={115}
                strokeColor="#2fcd44"
                percent={Number(totalIncomeAmountPercentage.toFixed(2))}
              />
              <Progress
                type="circle"
                size={115}
                strokeColor="#ff4d4f"
                percent={Number(totalExpenseAmountPercentage.toFixed(2))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <div className="income-category-analysis">
            <h4>Income-Category Wise</h4>
            {incomeCategoryData.length === 0 ? (
              <p>No income transactions found.</p>
            ) : (
              incomeCategoryData.map((data) => (
                <div key={data.category} className="category-card">
                  <h5>{data.category}</h5>
                  <Progress
                    strokeColor="#2fcd44"
                    percent={Number(
                      (
                        (data.totalCategoryAmount / totalIncomeAmount) *
                        100
                      ).toFixed(2),
                    )}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="expense-category-analysis">
            <h4>Expense-Category Wise</h4>
            {expenseCategoryData.length === 0 ? (
              <p>No expense transactions found.</p>
            ) : (
              expenseCategoryData.map((data) => (
                <div key={data.category} className="category-card">
                  <h5>{data.category}</h5>
                  <Progress
                    strokeColor="#ff4d4f"
                    percent={Number(
                      (
                        (data.totalCategoryAmount / totalExpenseAmount) *
                        100
                      ).toFixed(2),
                    )}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
