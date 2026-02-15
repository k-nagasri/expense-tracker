import express from "express";
import transactionModel from "../models/Transaction.js";
const router = express.Router();
router.post("/add-transaction", async function (req, res) {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res
      .status(201)
      .json({ message: "Transaction added successfully", newTransaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/edit-transaction", async function (req, res) {
  try {
    await transactionModel.findByIdAndUpdate(
      req.body.transactionId,
      req.body.payload,
    );

    res.status(200).json({
      message: "Transaction updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/delete-transaction", async function (req, res) {
  try {
    await transactionModel.findByIdAndDelete(req.body.transactionId);

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-transactions", async function (req, res) {
  try {
    const { userId, frequency, type, startDate, endDate } = req.query;

    let filter = { userId };
    if (type && type !== "all") {
      filter.type = type;
    }
    if (frequency && frequency === "all") {
      //
    } else if (frequency !== "custom") {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - Number(frequency));

      filter.date = {
        $gt: pastDate,
      };
    } else if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate + "T00:00:00.000Z"),
        $lte: new Date(endDate + "T23:59:59.999Z"),
      };
    }

    const transactions = await transactionModel.find(filter).sort({ date: -1 });

    res.json({ transactions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
