const prisma = require("../../../pkg/prisma");

const getAll = async () => {
  return await prisma.company.findMany({
    include: {
      plan: true,
      users: true,
    },
  });
};

const getById = async (id) => {
  return await prisma.company.findUnique({
    where: { id },
    include: {
      plan: true,
      users: true,
    },
  });
};

const create = async (data) => {
  return await prisma.company.create({ data });
};

const update = async (id, data) => {
  return await prisma.company.update({
    where: { id },
    data,
  });
};

const remove = async (id) => {
  return await prisma.company.delete({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
