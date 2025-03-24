import express, { RequestHandler } from "express";
import { createBook, getBooks, updateBook } from "../../controllers/books/books.controller";
import { deleteUser } from "../../controllers/users/users.controller";

const router = express.Router();

router.post("/create", createBook as RequestHandler);
router.get("/", getBooks);
router.put("/:id",updateBook as RequestHandler);
router.delete("/:id",deleteUser as RequestHandler)



export default router;