import express, { RequestHandler } from "express";
import {
  create,
  deleteUser,
  getAllUsers,
  getUser,
  login,
  updateUser,
} from "../../controllers/users/users.controller";

const router = express.Router();

router.post("/register", create as RequestHandler);

router.get("/", getAllUsers as RequestHandler);

router.get("/:id", getUser as RequestHandler);

router.post("/login", login as RequestHandler);

router.delete("/:id", deleteUser as RequestHandler);

router.put("/:id", updateUser as RequestHandler);

export default router;
