# Dokumentasi Integrasi API Transaction

Dokumen ini berisi panduan mapping API untuk modul **Transaction**. Semua endpoint memerlukan `Authorization` header dengan JWT token.

## Ringkasan Endpoint

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/transactions` | Mengambil daftar semua transaksi |
| `GET` | `/transactions/:id` | Mengambil detail transaksi berdasarkan ID |
| `POST` | `/transactions` | Membuat transaksi baru |
| `PUT` | `/transactions/:id` | Mengupdate data transaksi |
| `DELETE` | `/transactions/:id` | Menghapus transaksi |

---

## Detail Endpoint

### 1. GET `/transactions`
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": [ /* Array of Transaction Objects */ ]
    }
    ```

### 2. GET `/transactions/:id`
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": { /* Transaction Object */ }
    }
    ```

### 3. POST `/transactions`
*   **Request Body (JSON):**
    ```json
    {
      "userId": "string",
      "companyId": "string" (optional),
      "customerName": "string" (optional),
      "totalPrice": 100000.0,
      "status": "PENDING",
      "detail": {
        "totalCapital": 50000.0,
        "totalProfit": 50000.0,
        "discount": 0.0,
        "paymentAmount": 100000.0,
        "changeAmount": 0.0,
        "paymentMethod": "CASH",
        "products": [
          { "productId": "string", "quantity": 1 }
        ]
      }
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "success": true,
      "message": "Transaction created successfully",
      "data": { /* Created Transaction Object */ }
    }
    ```

### 4. PUT `/transactions/:id`
*   **Request Body (JSON):**
    ```json
    {
      "userId": "string",
      "companyId": "string",
      "customerName": "string",
      "totalPrice": 100000.0,
      "status": "COMPLETED"
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "message": "Transaction updated successfully",
      "data": { /* Updated Transaction Object */ }
    }
    ```

### 5. DELETE `/transactions/:id`
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "message": "Transaction deleted successfully"
    }
    ```

---

## Catatan Penting
*   **Error Handling:** Semua error mengembalikan status code HTTP yang sesuai (400, 401, 404, 500) dengan format:
    ```json
    {
      "success": false,
      "message": "Error message description"
    }
    ```
*   **Data Integrity:** Pada saat `POST` transaksi, harga produk tidak dikirim dari FE melainkan diambil dari database berdasarkan `productId` di backend untuk menjamin integritas harga.
