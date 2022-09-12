"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getUserByUsername = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const dataSource_1 = require("../config/dataSource");
const User_1 = require("../entities/User");
function createUser(data, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var user = new User_1.User();
            user.username = data.username;
            user.password = data.password;
            user.email = data.email;
            //user.role = data.role | undefined;
            yield dataSource_1.dataSource.manager.save(user);
            return callBack(null, user);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.createUser = createUser;
function getAllUsers(callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User_1.User.find();
            return callBack(null, users);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(id, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOneBy({ user_id: id });
            return callBack(null, user);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.getUserById = getUserById;
function getUserByUsername(username, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOneBy({ username: username });
            return callBack(null, user);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.getUserByUsername = getUserByUsername;
function getUserByEmail(email, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOneBy({ email: email });
            return callBack(null, user);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.getUserByEmail = getUserByEmail;
function updateUser(id, data, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield dataSource_1.dataSource
                .createQueryBuilder()
                .update(User_1.User)
                .set({
                username: data.username,
                email: data.email,
                password: data.password,
            })
                .where("user_id = :user_id", { user_id: id })
                .execute();
            return callBack(null, user);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(id, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dataSource_1.dataSource
                .createQueryBuilder()
                .delete()
                .from(User_1.User)
                .where("user_id = :user_id", { user_id: id })
                .execute();
            return callBack(null);
        }
        catch (error) {
            console.log(error);
            callBack(error);
        }
    });
}
exports.deleteUser = deleteUser;
