import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    reference: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

const transactionModel = mongoose.model("Transactions", transactionSchema);
export default transactionModel;
