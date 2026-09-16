/**
 * Settlement DTOs (Data Transfer Objects)
 */

const CreateSettlementRequest = (data) => ({
  vendorId: data.vendorId,
  periodStart: data.periodStart,
  periodEnd: data.periodEnd,
});

const SettlementPreviewResponse = (data) => ({
  vendor: {
    id: data.vendor.id,
    name: data.vendor.name,
    picName: data.vendor.picName,
    picPhone: data.vendor.picPhone,
    rekening: data.vendor.rekening,
    noRekening: data.vendor.noRekening,
  },
  periodStart: data.periodStart,
  periodEnd: data.periodEnd,
  totalSales: data.totalSales,
  totalCommission: data.totalCommission,
  totalPayout: data.totalPayout,
  items: data.boughtProducts.map((bp) => ({
    id: bp.id,
    productId: bp.productId,
    code: bp.code,
    name: bp.name,
    sellPrice: bp.sellPrice,
    commissionPercent: bp.commissionPercent,
    quantity: bp.quantity,
    subtotal: bp.subtotal,
  })),
});

const SettlementResponse = (settlement) => ({
  id: settlement.id,
  vendorId: settlement.vendorId,
  periodStart: settlement.periodStart,
  periodEnd: settlement.periodEnd,
  totalSales: settlement.totalSales,
  totalCommission: settlement.totalCommission,
  totalPayout: settlement.totalPayout,
  status: settlement.status,
  paidAt: settlement.paidAt,
  createdAt: settlement.createdAt,
  updatedAt: settlement.updatedAt,
  vendor: settlement.vendor
    ? {
        id: settlement.vendor.id,
        name: settlement.vendor.name,
        picName: settlement.vendor.picName,
        picPhone: settlement.vendor.picPhone,
        rekening: settlement.vendor.rekening,
        noRekening: settlement.vendor.noRekening,
      }
    : undefined,
  items: settlement.boughtProducts
    ? settlement.boughtProducts.map((bp) => ({
        id: bp.id,
        productId: bp.productId,
        code: bp.code,
        name: bp.name,
        sellPrice: bp.sellPrice,
        commissionPercent: bp.commissionPercent,
        quantity: bp.quantity,
        subtotal: bp.subtotal,
      }))
    : [],
});

const VendorAttentionResponse = (data) => ({
  vendorId: data.vendorId,
  vendorName: data.vendorName,
  unprocessedAmount: data.unprocessedAmount,
  unpaidAmount: data.unpaidAmount,
  unpaidSettlementCount: data.unpaidSettlementCount,
});

module.exports = {
  CreateSettlementRequest,
  SettlementPreviewResponse,
  SettlementResponse,
  VendorAttentionResponse
};