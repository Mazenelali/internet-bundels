import AdminService from "../services/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { makeError } from "../utils/functions.js";

async function addAdmin(req, res) {
    const data = req.body;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = { ...data, password: hashedPassword };
    const newAdmin = await AdminService.createNewAdmin(admin);
    res.status(201).json({
        message: "Admin added successfully",
        newAdmin: newAdmin,
    });
}

async function updateAdmin(req, res) {
    const { id } = req.params;
    const { email, password, role } = req.body;

    if (!id || !email || !password || !role) {
        return res.status(400).json({
            message: "Please provide all required fields",
        });
    }

    if (!password) {
        return res.status(400).json({
            message: "The passwords do not match",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedAdmin = {
        email,
        role,
        password: hashedPassword,
    };

    const result = await AdminService.modifyAdmin(id, updatedAdmin);

    if (!result) {
        return res.status(404).json({
            message: "Admin not found",
        });
    }

    res.status(200).json({
        message: "Admin updated successfully",
        updateAdmin: result,
    });
}

async function removeAdmin(req, res) {
    const { id } = req.params;

    if (id != null) {
        await AdminService.removeAdmin(id);
        res.status(201).json({
            message: "Admin removed successfully",
        });
    } else {
        res.status(500).json({
            message: "please check id of which Admin you want to remove",
        });
    }
}

async function loginAdmin(req, res) {
    const { email, password } = req.body;

    if (!email && !password) {
        throw makeError("Please provide email and password", 400);
    }

    const Admin = await AdminService.findAdminByEmail(email);

    const { id } = Admin;
    if (bcrypt.compareSync(password, Admin.password)) {
        const token = jwt.sign({ email, id }, process.env.SECRET, {
            expiresIn: "1d",
        });
        return res.status(201).json({
            token: token,
            AdminData: Admin,
            message: "Admin logged in successfully",
        });
    }
    return res.status(500).json({
        message: "email or password WRONG !!",
    });
}

async function getAllAdmins(_, res) {
    const Admins = await AdminService.listAllAdmins();
    res.json(Admins);
}
async function getAdminById(req, res) {
    const { id } = req.params;
    const Admins = await AdminService.findAdminById(id);
    res.json(Admins);
}

export {
    addAdmin,
    removeAdmin,
    updateAdmin,
    loginAdmin,
    getAllAdmins,
    getAdminById,
};
