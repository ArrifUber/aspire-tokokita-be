const CreateVendorRequest = (data) => {
  if (!data.name) throw { statusCode: 400, message: "Vendor name is required" };
  return {
    id: data.id,
    name: data.name,
    picName: data.picName,
    picPhone: data.picPhone,
    rekening: data.rekening,
    noRekening: data.noRekening,
    isActive: true,
  };
};

const VendorResonse = (data) => {
  return {
    id: data.id,
    name: data.name,
    picName: data.picName,
    picPhone: data.picPhone,
    rekening: data.rekening,
    noRekening: data.noRekening,
    jumlahProduk: data._count?.products ?? data.jumlahProduk ?? 0,
    isActive: true,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
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
    jumlahProduk: 0,
    isActive: true,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

const GetVendorDetailResponse = (data) => {
  return {
    id: data.id,
    name: data.name,
    picName: data.picName,
    picPhone: data.picPhone,
    rekening: data.rekening,
    noRekening: data.noRekening,
    jumlahProduk: Array.isArray(data.products) ? data.products.length : 0,
    isActive: data.isActive,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    products: Array.isArray(data.products)
      ? data.products.map((product) => ({
          id: product.id,
          name: product.name,
          sellPrice: product.sellPrice,
          stock: product.stock,
          commissionPercent: product.commissionPercent,
          isActive: product.isActive,
          image: product.image || null,
          category: product.category,
          minimumStock: product.minimumStock
        }))
      : [],
  };
};

module.exports = {
  CreateVendorRequest,
  CreateVendorResponse,
  GetVendorDetailResponse,
  VendorResonse,
};
