import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:page", getUsers);
router.get("/id/:id", getUser);
router.post("/", auth, createUser);
router.patch("/:id", auth, updateUser);
router.delete("/id/:id", auth, deleteUser);

export default router;
