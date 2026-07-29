const CreateCompanyRequest = (data) => {
  if (!data.name) throw { statusCode: 400, message: "Company name is required" };
  return {
    name: data.name,
    planId: data.planId || null,
  };
};

const UpdateCompanyRequest = (data) => {
  return {
    name: data.name,
    planId: data.planId,
  };
};

module.exports = {
  CreateCompanyRequest,
  UpdateCompanyRequest,
};
