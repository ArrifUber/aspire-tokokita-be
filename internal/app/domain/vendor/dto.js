const CreateVendorRequest = (data) => {
  if (!data.name) throw { statusCode: 400, message: "Vendor name is required" };
  return {
    id: data.id,
    name: data.name,
    picName: data.picName,
    picPhone: data.picPhone,
    rekening: data.rekening,
    noRekening: data.noRekening,
    jumlahProduk: data.jumlahProduk,
    isActive: true,
  };
};

const CreateVendorResponse = (data) => {
  return {
    id: data.id,
    name: data.name,
    picName: data.picName,
    picPhone: data.picPhone,
    rekening: data.rekening,
    noRekening: data.noRekening,
    jumlahProduk: data.jumlahProduk,
    isActive: true,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};

module.exports = {
  CreateVendorRequest,
  CreateVendorResponse
}