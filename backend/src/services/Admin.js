import adminDAL from "../dal/Admin.js";

const listAllAdmins = async () => {
  return await adminDAL.getAllAdmins();
};

const findAdminById = async (id) => {
  return await adminDAL.getAdminById(id);
};

const findAdminByEmail = async (email) => {
  return await adminDAL.getAdminByEmail(email);
};

const createNewAdmin = async (adminData) => {
  return await adminDAL.createAdmin(adminData);
};

const modifyAdmin = async (id, adminData) => {
  return await adminDAL.updateAdmin(id, adminData);
};

const removeAdmin = async (id) => {
  return await adminDAL.deleteAdmin(id);
};

const adminDal = {
  listAllAdmins,
  findAdminById,
  findAdminByEmail,
  createNewAdmin,
  modifyAdmin,
  removeAdmin,
};

export default adminDal;
