const repository = require("./repository");
const { CreateCompanyRequest, UpdateCompanyRequest } = require("./dto");

const getAll = async () => {
  return await repository.getAll();
};

const getById = async (id) => {
  const company = await repository.getById(id);
  if (!company) throw { statusCode: 404, message: "Company not found" };
  return company;
};

const create = async (data) => {
  const payload = CreateCompanyRequest(data);
  return await repository.create(payload);
};

const update = async (id, data) => {
  const payload = UpdateCompanyRequest(data);
  return await repository.update(id, payload);
};

const remove = async (id) => {
  return await repository.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
