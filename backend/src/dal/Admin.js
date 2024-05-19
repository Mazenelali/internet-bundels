import prisma from "../utils/prisma.js";

async function getAllAdmins() {
    return await prisma.admin.findMany();
}

async function getAdminById(id) {
    const adminId = parseInt(id);
    return await prisma.admin.findUnique({
        where: { _id: adminId },
    });
}

async function getAdminByEmail(email) {
    return await prisma.admin.findUnique({
        where: { email: email },
    });
}

async function createAdmin(data) {
    return await prisma.admin.create({
        data,
    });
}

async function updateAdmin(id, newData) {
    const adminId = parseInt(id);
    return await prisma.admin.update({
        where: { _id: adminId },
        data: newData,
    });
}

async function deleteAdmin(id) {
    const adminId = parseInt(id);
    return await prisma.admin.delete({
        where: { _id: adminId },
    });
}

const adminDAL = {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAdminByEmail,
};

export default adminDAL;
