import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import config from "../config/config";
import { dataSource } from "../config/dataSource";
import { User } from "../entities/user.entity";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if email and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = dataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      res.status(401).json({
        success: 0,
        message: error,
      });
    }

    //Check if encrypted password match
    if (!user!.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).json({
        success: 0,
        message: "Unauthorized user.",
      });
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { id: user!.id, email: user!.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.id;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = dataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user!.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user!.password = newPassword;
    const errors = await validate(user!);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user!.hashPassword();
    userRepository.save(user!);

    res.status(204).send();
  };
}
export default AuthController;
