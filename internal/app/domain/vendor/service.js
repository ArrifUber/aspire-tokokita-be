const repository = require("./respository");

const getAll = async () => {
  return await repository.getAll();
}

const create = async (data) => {
  return await repository.create(data);
}

const edit = async (id, data) => {
  return await repository.edit(id, data);
}

module.exports = { 
  getAll, 
  create
}