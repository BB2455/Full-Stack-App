import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
