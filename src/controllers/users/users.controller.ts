import { Request, Response } from "express";
import User from "../../models/users/users.model";

export const create = async (req: Request, resp: Response) => {
  console.log(req.body);
  try {
    const { full_name, email_id, password } = req.body;
    //check if user is already present
    const userExist = await User.findOne({ email_id });
    console.log(userExist);

    if (userExist) {
      return resp.status(400).json({ message: "User already exists!" });
    }

    //create user
    const user = new User({
      full_name,
      email_id,
      password,
      permission: ["dashboard", "books_management"],
      access: ["borrow", "return"],
      borrowed_book_id: [],
    });

    // Save the user to database
    await user.save();

    resp
      .status(201)
      .json({ data: user, message: "User created successfully!" });
  } catch (error) {
    resp.status(500).json({ message: "Server Error" });
  }
};

export const getAllUsers = async (req: Request, resp: Response) => {
  try {
    const users = await User.find().select("-password");
    resp.status(200).json({ data: users });
  } catch (error) {
    resp.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      resp.status(404).json({ message: "User not foound!" });
    }
    resp.json(user);
  } catch (error) {
    resp.status(500).json({ message: "Sever Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email_id, password } = req.body;

    // Find user
    const user = await User.findOne({ email_id });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      user: {
        id: user._id,
        full_name: user.full_name,
        email_id: user.email_id,
        permission: user.permission,
        access: user.access,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Remove password from update data if it exists
    delete updateData.password;

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
