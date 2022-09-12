import { dataSource } from "../config/dataSource";
import { User } from "../entities/User";

export async function createUser(data: User, callBack: Function) {
  try {
    var user = new User();
    user.username = data.username;
    user.password = data.password;
    user.email = data.email;
    //user.role = data.role | undefined;

    await dataSource.manager.save(user);
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
    const user = await User.findOneBy({ user_id: id });
    return callBack(null, user);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getUserByUsername(username: string, callBack: Function) {
  try {
    const user = await User.findOneBy({ username: username });
    return callBack(null, user);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getUserByEmail(email: string, callBack: Function) {
  try {
    const user = await User.findOneBy({ email: email });
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
    const user = await dataSource
      .createQueryBuilder()
      .update(User)
      .set({
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .where("user_id = :user_id", { user_id: id })
      .execute();
    return callBack(null, user);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function deleteUser(id: number, callBack: Function) {
  try {
    await dataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("user_id = :user_id", { user_id: id })
      .execute();
    return callBack(null);
  } catch (error) {
    console.log(error);
    callBack(error);
  }
}
