import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

const masterAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded !== "string" && decoded.id !== "master") return res.status(401).send("Access denied");
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

export { authMiddleware, masterAuthMiddleware };
