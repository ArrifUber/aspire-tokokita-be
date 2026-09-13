/**
 * Layer service untuk menangani business logic model Vendor
 */

const vendorRepository = require("./respository");
const {
  CreateVendorRequest,
  CreateVendorResponse,
  GetVendorDetailResponse,
  VendorResonse,
} = require("./dto");

const getAllVendors = async () => {
  const vendors = await vendorRepository.getAll();

  return vendors.map((data) => VendorResonse(data));
};

const getVendorById = async (id) => {
  const vendor = await vendorRepository.getById(id);
  
  // Validasi jika vendor tidak ditemukan
  if (!vendor) {
    throw { statusCode: 404, message: "Vendor not found" };
  }

  // Formatting response menggunakan DTO yang menyertakan array products
  return GetVendorDetailResponse(vendor);
};

const createVendor = async (payload) => {
  // 1. Validasi & Format request body dengan DTO
  const validatedData = CreateVendorRequest(payload);
  
  // 2. Simpan ke database via repository
  const newVendor = await vendorRepository.create(validatedData);
  
  // 3. Format response output
  return CreateVendorResponse(newVendor);
};

const updateVendor = async (id, payload) => {
  // Cek keberadaan vendor
  const existingVendor = await vendorRepository.getById(id);
  if (!existingVendor) {
    throw { statusCode: 404, message: "Vendor not found" };
  }

  const updatedVendor = await vendorRepository.edit(id, payload);
  return CreateVendorResponse(updatedVendor);
};

const deleteVendor = async (id) => {
  // Cek keberadaan vendor
  const existingVendor = await vendorRepository.getById(id);
  if (!existingVendor) {
    throw { statusCode: 404, message: "Vendor not found" };
  }

  return await vendorRepository.destroy(id);
};

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
};