import { dataSource } from "../config/dataSource";
import { User } from "../entities/User";

const userRepository = dataSource.getRepository(User);

export async function createUser(data: User, callBack: Function) {
  try {
    var user = new User();
    user.username = data.username;
    user.password = data.password;
    user.email = data.email;
    //user.role = data.role | undefined;

    await userRepository.save(user);
    return callBack(null, user);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getAllUsers(callBack: Function) {
  try {
    const users = await User.find();
    return callBack(null, users);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getUserById(id: number, callBack: Function) {
  try {
    const user = await userRepository.findOneBy({ id: id });
    return callBack(null, user);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getUserByUsername(username: string, callBack: Function) {
  try {
    const user = await userRepository.findOneBy({ username: username });
    return callBack(null, user);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getUserByEmail(email: string, callBack: Function) {
  try {
    const user = await userRepository.findOneBy({ email: email });
    return callBack(null, user);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function updateUser(
  id: number,
  data: {
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
  },
  callBack: Function
) {
  try {
    const userToUpdate = await userRepository
      .findOneBy({ id: id })
      .then((user) => {
        if (user instanceof User) {
          if (data.username) {
            user.username = data.username;
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
}

export async function deleteUser(id: number, callBack: Function) {
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
}
