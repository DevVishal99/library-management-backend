import { Request, Response } from "express";
import Book from "../../models/books/books.model";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { book_name, author } = req.body;
    const bookPresent = await Book.findOne({ book_name });

    if (bookPresent) {
      return res.status(400).json({ message: "Book already present!" });
    }

    const book = new Book({
      book_name,
      author,
      available: true,
      borrowed_time: "",
      borrower_id: "",
      fine: "",
    });
    console.log(book);

    await book.save();
    res.status(201).json({ message: "Book added", data: book });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const book = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Book updated successfully", data: book });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
