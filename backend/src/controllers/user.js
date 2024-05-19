import userService from "../services/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { makeError } from "../utils/functions.js";

async function addUser(req, res) {
    const data = req.body;
    const newUser = await userService.createNewUser(data);
    res.status(201).json({
        message: "user added successfully",
        newUser: newUser,
    });
}

async function updateUser(req, res) {
    const { id } = req.params;
    const data = req.body;



    const result = await userService.modifyUser(id, data);

    if (!result) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    res.status(200).json({
        message: "User updated successfully",
        updateUser: result,
    });
}

async function removeUser(req, res) {
    const { id } = req.params;

    if (id != null) {
        await userService.removeUser(id);
        res.status(201).json({
            message: "user removed successfully",
        });
    } else {
        res.status(500).json({
            message: "please check id of which user you want to remove",
        });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email && !password) {
        throw makeError("Please provide email and password", 400);
    }

    const user = await userService.findUserByEmail(email);

    const { id } = user;
    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email, id }, process.env.SECRET, {
            expiresIn: "1d",
        });
        return res.status(201).json({
            token: token,
            userData: user,
            message: "user logged in successfully",
        });
    }
    return res.status(500).json({
        message: "email or password WRONG !!",
    });
}

async function getAllUsers(_, res) {
    const users = await userService.listAllUsers();
    res.json(users);
}
async function getUserById(req, res) {
    const { id } = req.params;
    const users = await userService.findUserById(id);
    res.json(users);
}

export { addUser, removeUser, updateUser, loginUser, getAllUsers, getUserById };
