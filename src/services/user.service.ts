import { dataSource } from "../config/dataSource";
import { User } from "../entities/user.entity";

const userRepository = dataSource.getRepository(User);

class UserService {
  static createUser = async (data: User, callBack: Function) => {
    var user = new User();
    user.name = data.name;
    user.password = data.password;
    user.email = data.email;
    //user.role = data.role | undefined;
    try {
      const savedUser = (await userRepository.save(user)) as User;
      return callBack(null, savedUser);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static getAllUsers = async (callBack: Function) => {
    try {
      const users = await User.find();
      return callBack(null, users);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static getUserById = async (id: number, callBack: Function) => {
    try {
      const user = await userRepository.findOneBy({ id: id });
      return callBack(null, user);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static getUserByEmail = async (email: string, callBack: Function) => {
    try {
      const user = await userRepository.findOneBy({ email: email });
      return callBack(null, user);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static updateUser = async (
    id: number,
    data: {
      name: string | undefined;
      email: string | undefined;
      password: string | undefined;
    },
    callBack: Function
  ) => {
    try {
      const userToUpdate = await userRepository
        .findOneBy({ id: id })
        .then((user) => {
          if (user instanceof User) {
            if (data.name) {
              user.name = data.name;
            }
            if (data.email) {
              user.email = data.email;
            }
            if (data.password) {
              user.password = data.password;
            }
            return user;
          } else {
            return null;
          }
        });
      if (userToUpdate instanceof User) {
        await userRepository.save(userToUpdate);
        return callBack(null, userToUpdate);
      } else {
        return callBack(Error("Failed to update user."));
      }
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static deleteUser = async (id: number, callBack: Function) => {
    try {
      const userToRemove = await userRepository.findOneBy({ id: id });
      if (userToRemove instanceof User) {
        await userRepository.remove(userToRemove);
        return callBack(null, userToRemove);
      } else {
        return callBack(Error("Failed to remove user."));
      }
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  };
}

export default UserService;
