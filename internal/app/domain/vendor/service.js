const repository = require("./respository");
const {   
  CreateVendorRequest,
  CreateVendorResponse 
} = require('./dto')

const getAll = async () => {
  return await repository.getAll();
}

const create = async (data) => {
  const payload = CreateVendorRequest(data);
  return await repository.create(payload);
}

// const edit = async (id, data) => {
//   return await repository.edit(id, data);
// }

module.exports = { 
  getAll, 
  create
}