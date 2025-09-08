// require("dotenv").config();
// const connectDB = require("./connectMongo.js");
// const cors = require("cors");
// const express = require("express");
// const app = express();
// const PORT = 3000;
// const userRoutes = require("./routes/authRoute.js");
// const jobApplicationRoutes = require("./routes/jobAppRoute.js");
// const cookieParser = require("cookie-parser");

// app.use(cookieParser());
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use("/auth", userRoutes);
// app.use("/job-application", jobApplicationRoutes);

// async function startServer() {
//   try {
//     await connectDB();
//     app.listen(PORT, async () => {
//       console.log(`Listening on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error(`Error while triny got connect to server --> ${error}`);
//     process.exit(1);
//   }
// }
// startServer();

require("dotenv").config();
const connectDB = require("./connectMongo.js");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/authRoute.js");
const jobApplicationRoutes = require("./routes/jobAppRoute.js");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOrigin = "https://job-tracker-khaki-seven.vercel.app";
console.log("CORS ORIGIN: ", corsOrigin);
console.log("PORT: ", PORT);

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use("/auth", userRoutes);
app.use("/job-application", jobApplicationRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to server:", error);
    process.exit(1);
  }
}

startServer();
