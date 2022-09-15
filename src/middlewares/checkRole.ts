import { Request, Response, NextFunction } from "express";
import { dataSource } from "../config/dataSource";
import { User, UserRole } from "../entities/user.entity";

export const checkRole = (roles: Array<UserRole>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.id;

    const userRepository = dataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id: id } });
    } catch (err) {
      res.status(401).json({
        success: 0,
        message: "Unauthorized user.",
        error: err,
      });
    }
    if (roles.indexOf(user!.role) > -1) next();
    else
      res.status(401).json({
        success: 0,
        message: "Unauthorized user.",
      });
  };
};
