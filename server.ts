import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db";
import cors from "cors";
import userRoutes from "./src/routes/users/user.routes";
import bookRoutes from "./src/routes/books/books.routes";

dotenv.config();
const app = express();

//db connection
connectDB();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books/", bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on the port ", PORT);
});
