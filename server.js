// import dns from "dns";

// // MUST be at the top, before mongoose / db connect
// dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const usersRoute = await import("./routes/usersRoute.js");
app.use("/api/users", usersRoute.default);

const transactionsRoute = await import("./routes/transactionsRoute.js");
app.use("/api/transactions", transactionsRoute.default);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "client", "build")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`NodeJS server started at port ${port}`);
});
