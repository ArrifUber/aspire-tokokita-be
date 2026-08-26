/**
 * User DTOs (Data Transfer Objects)
 */

const CreateUserRequest = (data) => ({
  name: data.name,
  email: data.email,
  password: data.password,
  companyId: data.companyId || null,
  role: data.role || 'CASHIER',
});

const UpdateUserRequest = (data) => ({
  name: data.name,
  email: data.email,
  password: data.password,
  companyId: data.companyId,
  role: data.role || 'CASHIER',
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
