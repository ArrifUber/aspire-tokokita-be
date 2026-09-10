/**
 * Ini adalah layer repository untuk model menuju database
 */

const prisma = require("../../../pkg/prisma");

const getAll = async () => {
  return await prisma.vendor.findMany();
}

const getById = async (id) => {
  return await prisma.vendor.findUnique({ where: { id }});
}

const create = async (data) => {
  return await prisma.vendor.create({ data });
}

const edit = async (id, data) => {
  return await prisma.vendor.update({
    where: id,
    data: data
  });
}


module.exports = {
  getAll,
  create,
  getById
}


