# Panduan Alur Sistem (Presentation Guide)

Dokumen ini menjelaskan alur kerja fitur-fitur utama di aplikasi *backend* kita, yang bertujuan untuk membantu pemahaman alur data dari sisi pengguna (Frontend) hingga pemrosesan di sistem (Backend).

## Pola Dasar (Standard Flow)
Secara umum, setiap fitur mengikuti pola **Handler-Service-Repository**:
1.  **Request (Frontend)**: Pengguna mengirimkan permintaan melalui aplikasi.
2.  **Validasi (Middleware & DTO)**: Sistem mengecek autentikasi (token login) dan memastikan format data valid.
3.  **Proses (Service Layer)**: Logika bisnis dijalankan (misalnya: cek stok, hitung transaksi).
4.  **Akses Data (Repository Layer)**: Interaksi dengan database (Simpan/Ambil/Update data).
5.  **Response (Frontend)**: Hasil diproses kembali dan dikirim ke UI sebagai JSON.

---

## Detail Per Fitur

### 1. Pengelolaan Produk (Product)
*   **Alur:** Tambah/edit data barang & stok.
*   **Pengecekan:** Validasi *login*, validasi format input (nama, jumlah).
*   **Proses:** Cek keberadaan barang, update data, catat riwayat perubahan stok.
*   **Hasil:** Data produk terbaru atau konfirmasi stok.

### 2. Percakapan Chatbot (Chatbot)
*   **Alur:** Interaksi tanya-jawab dengan AI.
*   **Pengecekan:** Riwayat percakapan (konteks).
*   **Proses:** Ambil memori, susun prompt, AI memproses, simpan riwayat di database.
*   **Hasil:** Jawaban AI secara *real-time*.

### 3. Transaksi (Transaction)
*   **Alur:** Pencatatan jual-beli.
*   **Pengecekan:** Ketersediaan stok (tidak boleh minus).
*   **Proses:** Kurangi stok di database, catat detail transaksi.
*   **Hasil:** Konfirmasi sukses atau error stok tidak cukup.

### 4. Pengguna (User)
*   **Alur:** Login, register, update profil.
*   **Pengecekan:** Validasi *credential* (username/password), format input.
*   **Proses:** Update database, berikan kunci akses (token).
*   **Hasil:** Profil user atau token sesi.

### 5. Kategori (Category)
*   **Alur:** Pengelompokan barang.
*   **Pengecekan:** Keunikan nama kategori.
*   **Proses:** Update struktur kategori di database.
*   **Hasil:** Daftar kategori terbaru.

### 6. Laporan (Report)
*   **Alur:** Ringkasan aktivitas (penjualan/stok).
*   **Pengecekan:** Validasi rentang tanggal.
*   **Proses:** Agregasi data transaksi/stok sesuai periode.
*   **Hasil:** Ringkasan data untuk grafik/tabel UI.
