import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./src/routes/router.js";
import config from "./src/config/config.js";
import { connect } from "./src/database/connect.js";

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.use(router);

connect(config.mongoUri)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
