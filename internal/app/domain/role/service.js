/**
 * Role Service
 */

const roleRepository = require("./repository");
const { RoleResponse } = require("./dto");

const getAllRoles = async () => {
  const roles = await roleRepository.findAll();
  return roles.map((role) => RoleResponse(role));
};

const getRoleById = async (id) => {
  const role = await roleRepository.findById(id);
  if (!role) {
    const error = new Error("Role not found");
    error.statusCode = 404;
    throw error;
  }
  return RoleResponse(role);
};

const createRole = async (data) => {
  return await roleRepository.create(data);
};

const updateRole = async (id, data) => {
  const role = await roleRepository.findById(id);
  if (!role) {
    const error = new Error("Role not found");
    error.statusCode = 404;
    throw error;
  }
  return await roleRepository.update(id, data);
};

const deleteRole = async (id) => {
  const role = await roleRepository.findById(id);
  if (!role) {
    const error = new Error("Role not found");
    error.statusCode = 404;
    throw error;
  }
  return await roleRepository.remove(id);
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
