/**
 * Role DTOs
 */

const RoleResponse = (role) => ({
  id: role.id,
  name: role.name,
});

module.exports = {
  RoleResponse,
};
