/**
 * User DTOs (Data Transfer Objects)
 */

const CreateUserRequest = (data) => ({
  name: data.name,
  email: data.email,
  password: data.password,
  companyId: data.companyId || null,
  roleId: data.roleId || null,
});

const UpdateUserRequest = (data) => ({
  name: data.name,
  email: data.email,
  password: data.password,
  companyId: data.companyId,
  roleId: data.roleId,
});

const UserResponse = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  companyId: user.companyId,
  role: user.role ? user.role.name : null,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

module.exports = {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
};
