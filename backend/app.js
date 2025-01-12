const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./config/connectDatabase");

dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

const product = require("./routes/product");
const order = require("./routes/order");

connectDatabase();

app.use(express.json());
app.use(cors());
app.use("/api/v1", product);
app.use("/api/v1", order);

app.listen(process.env.PORT, () => {
  console.log(
    `Server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
