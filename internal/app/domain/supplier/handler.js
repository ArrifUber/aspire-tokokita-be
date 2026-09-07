const getAll = (req, res) => {
  const { something } = req.body;

  return res.status(200).json({
    success: true,
    message: "untuk get all supplier",
  })
};

const create = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Handler untuk create supplier"
  });
}

const edit = (req, res) => {
  const { id } = req.params;
  return res.status(200).json({
    success: true,
    message: `Handler untuk edit supplier dengan id ${id}`
  });
}

const detail = (req, res) => {
  const { id } = req.params;
  return res.status(200).json({
    success: true,
    message: `Handler untuk melihat detail supplier dengan id ${id}`
  });
}

const remove = (req, res) => {
  const { id } = req.params;
  return res.status(200).json({
    success: true,
    message: `Handler untuk menghapus supplier dengan id ${id}`
  });
}

module.exports = {
  getAll,
  create,
  edit,
  detail,
  remove
};
