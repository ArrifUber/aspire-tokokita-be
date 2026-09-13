const prisma = require("../../../pkg/prisma");

const getAll = async () => {
 return await prisma.vendor.findMany({
    include: {
      _count: {
        select: { products: true }, 
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getById = async (id) => {
  return await prisma.vendor.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          category: {
        select: {
          id: true,
          name: true,
        },
      },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

const create = async (data) => {
  return await prisma.vendor.create({ data });
};

const edit = async (id, data) => {
  return await prisma.vendor.update({
    where: { id },
    data: data,
  });
};

const destroy = async (id) => {
  return await prisma.vendor.delete({
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  destroy,
};