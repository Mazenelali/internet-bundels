// Example Express route using the product DAL
import Express from "express";
import {
    removeAdmin,
    addAdmin,
    updateAdmin,
    loginAdmin,
    getAllAdmins,
    getAdminById,
} from "../controllers/Admin.js";
// import { allowRoles, verifyToken } from "../middleware/adminPermission.js";
import { tryCatch } from "../utils/functions.js";

const router = Express.Router();

router.get("/admin", tryCatch(getAllAdmins));

router.get("/admin/:id", tryCatch(getAdminById));

router.post("/create-admin", tryCatch(addAdmin));

router.post("/remove-admin/:id", tryCatch(removeAdmin));

router.post("/modify-admin/:id", tryCatch(updateAdmin))

router.post("/login", loginAdmin);

export default router;
