import express from "express";
import cors from "cors";

import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

export default app;
