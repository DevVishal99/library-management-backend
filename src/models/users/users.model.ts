import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    email_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permission: [{ type: String }],
    access: [{ type: String }],
    borrowed_book_id: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
