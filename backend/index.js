require("dotenv").config();
const connectDB = require("./connectMongo.js");
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/authRoute.js");
const jobApplicationRoutes = require("./routes/jobAppRoute.js");

app.use(cors());
// app.use(  //COOKIES
//   cors({
//     origin: "http://localhost:5173", // your frontend
//     credentials: true, // allow cookies
//   })
// );
app.use(express.json());

app.use("/auth", userRoutes);
app.use("/job-application", jobApplicationRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Listening on port ${PORT}`);
});
