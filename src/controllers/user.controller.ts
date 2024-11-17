import { Request, Response } from "express";
import UserService from "../services/user.service";

const register = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { userData } = req.body;
    const user = await UserService.register(
      userData.name,
      userData.company,
      userData.email,
      userData.password
    );
    res.status(201).send(user);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await UserService.login(email, password);
    res.send({ user, token });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(req.body.user.id);
    res.send(user);
  } catch (err: any) {
    res.status(404).send(err.message);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.send(users);
  } catch (err: any) {
    res.status(404).send(err.message);
  }
};

const checkIsMaster = async (req: Request, res: Response) => {
  try {
    const id = req.body.user.id;
    const isMaster = await UserService.checkIsMaster(id);
    res.send(isMaster);
  } catch (err: any) {
    res
      .status(404)
      .send("You are not authorized to perform this action. Only masters can.");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.send("User deleted successfully.");
  } catch (err: any) {
    res.status(404).send(err.message);
  }
};

export default {
  register,
  login,
  getUser,
  getAllUsers,
  checkIsMaster,
  deleteUser,
};
