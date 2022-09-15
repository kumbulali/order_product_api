import config from "../config/config";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["authorization"];

  let jwtPayload;

  //Try to validate the token and get data
  try {
    const bearerToken = token.slice(7);
    jwtPayload = <any>jwt.verify(bearerToken, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
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

  //Call the next middleware or controller
  next();
};
