const connectDB = require("./connectMongo.js");
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/auth", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Listening on port ${PORT}`);
});
