import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { IsEmail, validate } from "class-validator";
import config from "../config/config";
import { dataSource } from "../config/dataSource";
import { User } from "../entities/user.entity";
import UserService from "../services/user.service";
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
class AuthController {
  static login = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        success: 0,
        message: "There are some missing fields.",
      });
    } else {
      if (!validateEmail(email)) {
        return res.status(400).json({
          success: 0,
          message: "Invalid email address.",
        });
      }
    }

    const userRepository = dataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      return res.status(401).json({
        success: 0,
        message: "Email and password does not match.",
      });
    }

    if (!user!.checkIfUnencryptedPasswordIsValid(password)) {
      return res.status(401).json({
        success: 0,
        message: "Password and email adress does not match.",
      });
    }

    const token = jwt.sign(
      { id: user!.id, email: user!.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ success: 1, token: token });
  };

  static register = async (req: Request, res: Response) => {
    let { email, password, passwordAgain } = req.body;
    if (!(email && password && passwordAgain)) {
      return res.status(400).json({
        success: 0,
        message: "There are some missing fields.",
      });
    } else if (!validateEmail(email)) {
      return res.status(400).json({
        success: 0,
        message: "Invalid email address.",
      });
    } else if (password !== passwordAgain) {
      return res.status(400).json({
        success: 0,
        message: "Passwords do not match.",
      });
    }
    try {
      UserService.createUser(req.body, (err: any, results: any) => {
        if (err != null) {
          if (err.code == 23505) {
            return res.status(400).json({
              success: 0,
              message: "This email is already exists.",
            });
          }
          if (err.code == 23502) {
            return res.status(400).json({
              success: 0,
              message: `${err.column} field can not be empty.`,
            });
          }
          if (err.code == "ECONNREFUSED") {
            return res.status(500).json({
              success: 0,
              message: "Database connection error occured.",
            });
          }
          return res.status(500).json({
            success: 0,
            message: err.message,
          });
        }
        const user: User = results;
        if (!user!.checkIfUnencryptedPasswordIsValid(password)) {
          return res.status(401).json({
            success: 0,
            message: "Unauthorized user.",
          });
        }

        const token = jwt.sign(
          { id: user!.id, email: user!.email },
          config.jwtSecret,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          success: 1,
          data: token,
        });
      });
    } catch (error) {
      return res.status(401).json({
        success: 0,
        message: "Unauthroized user.",
      });
    }
  };

  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.id;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      return res.status(400).json({
        success: 0,
        message: "There are some missing fields.",
      });
    }

    const userRepository = dataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id: id } });
    } catch (id) {
      return res.status(401).json({
        success: 0,
        message: "Unable to find user with that credentials.",
      });
    }

    if (!user!.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      return res.status(401).json({
        success: 0,
        message: "Old password is invalid.",
      });
    }

    user!.password = newPassword;
    const errors = await validate(user!);
    if (errors.length > 0) {
      return res.status(400).json({
        success: 0,
        message: errors,
      });
    }
    user!.hashPassword();
    userRepository.save(user!);

    return res.status(202).json({
      success: 1,
      message: "Password successfully updated.",
    });
  };
}
export default AuthController;
