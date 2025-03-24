import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    fine: { type: String },
    book_name: { type: String, require: true },
    author: { type: String, require: true },
    available: { type: Boolean, require: true },
    borrower_id: { type: String },
    borrowed_time: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Books", booksSchema);
