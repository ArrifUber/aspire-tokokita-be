const service = require('./service')

const getAll = async (req, res) => {
  try {
    const data = await service.getAll();

    return res.status(200).json({
      success: true,
      data: data,
    }) 
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    })
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const vendorCreate = await service.create(data);
    return res.status(200).json({
      success: true,
      message: "Data successfully created!",
      data: vendorCreate
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    })
  }
}

// const edit = (req, res) => {
//   const { id } = req.params;
//   return res.status(200).json({
//     success: true,
//     message: `Handler untuk edit supplier dengan id ${id}`
//   });
// }

// const detail = (req, res) => {
//   const { id } = req.params;
//   return res.status(200).json({
//     success: true,
//     message: `Handler untuk melihat detail vendor dengan id ${id}`
//   });
// }

// const remove = (req, res) => {
//   const { id } = req.params;
//   return res.status(200).json({
//     success: true,
//     message: `Handler untuk menghapus vendor dengan id ${id}`
//   });
// }

module.exports = {
  getAll,
  create,
  // edit,
  // detail,
  // remove
};
