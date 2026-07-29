const companyService = require("./service");

const getAll = async (req, res) => {
  try {
    const companies = await companyService.getAll();
    return res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await companyService.getById(id);
    return res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const newCompany = await companyService.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: newCompany,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await companyService.update(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: updatedCompany,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await companyService.remove(id);
    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
