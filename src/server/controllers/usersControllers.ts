import type { NextFunction, Request, Response } from "express";
import type { Credentials, UserTokenPayload } from "../../types/types.js";
import User from "../../database/models/User.js";
import CustomError from "../../CustomError/CustomError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import environment from "../../loadEnvironments.js";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as Credentials;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new CustomError(
      "Login Error user doesn't exists",
      "credentials error",
      401
    );
    next(error);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Password incorrect",
      "Wrong credentials",
      401
    );
    next(error);
    return;
  }

  const tokenPayload: UserTokenPayload = {
    id: user._id.toString(),
    username,
  };

  const token = jwt.sign(tokenPayload, environment.jwtSecret, {
    expiresIn: "2d",
  });

  res.status(200).json({ accessToken: token });
};
