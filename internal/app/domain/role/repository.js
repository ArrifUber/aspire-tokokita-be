/**
 * Role Repository
 */

const prisma = require("../../../pkg/prisma");

const findAll = async () => {
  return await prisma.role.findMany();
};

const findById = async (id) => {
  return await prisma.role.findUnique({
    where: { id },
  });
};

const create = async (data) => {
  return await prisma.role.create({
    data,
  });
};

const update = async (id, data) => {
  return await prisma.role.update({
    where: { id },
    data,
  });
};

const remove = async (id) => {
  return await prisma.role.delete({
    where: { id },
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
