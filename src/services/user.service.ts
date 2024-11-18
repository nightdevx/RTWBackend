import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return user;
};

const login = async (email: string, password: string) => {
  if (
    email === process.env.MASTER_ADMIN_EMAIL &&
    password === process.env.MASTER_ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ id: "master" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return {
      user: { username: "Master Admin" },
      token,
    };
  }
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
  return { user, token };
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const deleteUser = async (id: string) => {
  await User.findByIdAndDelete(id);
};

const checkIsMaster = async (id: string) => {
  if (id === "master") {
    return true;
  }
  return false;
};

export default {
  register,
  login,
  getUserById,
  getAllUsers,
  checkIsMaster,
  deleteUser,
};
