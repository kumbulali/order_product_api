import config from "../config/config";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["authorization"];

  let jwtPayload;

  try {
    const bearerToken = token.slice(7);
    jwtPayload = <any>jwt.verify(bearerToken, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).json({
      success: 0,
      message: "Unauthorized user.",
    });
    return;
  }

  const { id, email } = jwtPayload;
  const newToken = jwt.sign({ id, email }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);

  next();
};
