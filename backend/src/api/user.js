// Example Express route using the product DAL
import Express from "express";
import {
    removeUser,
    addUser,
    updateUser,
    loginUser,
    getAllUsers,
    getUserById,
} from "../controllers/user.js";
// import { allowRoles, verifyToken } from "../middleware/userPermission.js";
import { tryCatch } from "../utils/functions.js";

const router = Express.Router();

router.get("/user", tryCatch(getAllUsers));

router.get("/user/:id", tryCatch(getUserById));

router.post("/create-user", tryCatch(addUser));

router.post("/remove-user/:id", tryCatch(removeUser));

router.post("/modify-user/:id", tryCatch(updateUser))

router.post("/login", loginUser);

export default router;
