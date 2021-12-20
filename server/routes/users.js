import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersBySearch,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getUsersBySearch);
router.get("/id/:id", getUser);
router.get("/:page", getUsers);
router.post("/", auth, createUser);
router.patch("/:id", auth, updateUser);
router.delete("/id/:id", auth, deleteUser);

export default router;
