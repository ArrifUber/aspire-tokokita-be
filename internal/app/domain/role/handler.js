/**
 * Role Handler
 */

const roleService = require("./service");

const getAll = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    return res.status(200).json({ success: true, data: roles });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    return res.status(200).json({ success: true, data: role });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    return res.status(201).json({ success: true, message: "Role created", data: role });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Role updated", data: role });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await roleService.deleteRole(req.params.id);
    return res.status(200).json({ success: true, message: "Role deleted" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
