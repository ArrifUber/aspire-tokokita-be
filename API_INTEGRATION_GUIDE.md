# Panduan Integrasi Backend (API Integration Guide)

Dokumen ini berisi panduan untuk mengintegrasikan frontend Next.js dengan API backend yang tersedia.

## Konfigurasi Umum

- **Base URL:** Pastikan Anda mengonfigurasi `NEXT_PUBLIC_API_URL` di file `.env` frontend Anda.
- **Autentikasi:** Semua endpoint (kecuali mungkin auth) memerlukan header `Authorization` dengan format `Bearer <token>`.

```javascript
// Contoh header untuk request
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};
```

---

## 1. Modul Kategori (`/categories`)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/categories` | Mengambil semua kategori |
| `POST` | `/categories` | Membuat kategori baru |
| `GET` | `/categories/:id` | Detail kategori |
| `PUT` | `/categories/:id` | Update kategori |
| `DELETE` | `/categories/:id` | Hapus kategori |

**Payload (POST/PUT):**
```json
{
  "name": "Nama Kategori",
  "description": "Deskripsi opsional"
}
```

---

## 2. Modul Produk (`/products`)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/products` | Semua produk |
| `GET` | `/products/stock` | Daftar stok |
| `PATCH` | `/products/stock` | Update stok bulk |
| `POST` | `/products` | Tambah produk |

**Payload Create Product:**
```json
{
  "code": "P001",
  "name": "Produk A",
  "description": "...",
  "categoryId": "...",
  "buyPrice": 10000,
  "sellPrice": 15000,
  "stock": 50
}
```

---

## 3. Modul Transaksi (`/transactions`)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/transactions` | Riwayat transaksi |
| `POST` | `/transactions` | Buat transaksi baru |

**Payload Create Transaction:**
```json
{
  "userId": "...",
  "customerName": "Customer A",
  "totalPrice": 30000,
  "detail": {
    "totalCapital": 20000,
    "totalProfit": 10000,
    "paymentAmount": 30000,
    "changeAmount": 0,
    "paymentMethod": "CASH",
    "products": [
      { "productId": "...", "quantity": 2 }
    ]
  }
}
```

---

## 4. Modul Laporan (`/reports`)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/reports/sales` | Laporan penjualan |
| `GET` | `/reports/analytics` | Data analitik |
| `GET` | `/reports/expenses` | Laporan pengeluaran |
| `GET` | `/reports/profit` | Laporan profit |

---

## Catatan Tambahan
Jika Anda menemukan error `401` atau `403`, pastikan JWT token masih valid dan dikirimkan dengan benar di header.
