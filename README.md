# UwU
### UYU with User

## About
UwU merupakan sebuah sistem manajemen maintenance dan fasilitas hostel bernama UYU (hostel atau tempat penginapan). UwU dirancang dalam bentuk perangkat lunak berbasis web yang berfungsi mengelola dan memonitoring hal-hal terkait maintenance dan fasilitas hostel. Perangkat lunak ini ditujukan mempermudah kerja admin dalam mengelola keluhan pelanggan dan kinerja staf kebersihan secara lebih efektif. Terdapat dua jenis user pada perangkat lunak ini, yaitu admin dan staf kebersihan. Admin dapat mengelola manajemen akun staf, seperti menambah atau menghapus akun staf.

Namun, admin tidak memiliki akses untuk melihat kredensial staf, seperti password. Admin dapat memberikan tugas kepada staf melalui sistem, tugas ini kemudian dapat dilihat dari tampilan staf. Staf kebersihan akan selalu stand by dan siap dilimpahi tugas oleh admin selama tidak sedang mengerjakan tugas lain--bahkan, tidak menutup kemungkinan seorang staf memiliki lebih dari satu staf dengan urutan antrean khusus. Oleh karena itu, terdapat sistem queue (antrean) pada perangkat lunak ini untuk memudahkan admin mendistribusikan tugas maintenance.

Untuk setiap maintenance, staf dapat memberikan pembaruan status pengerjaan. Ketika staf menerima tugas dengan mengklik 'Accept' pada tampilan staf, admin dapat mengetahui pembaruan ini dengan status 'In progress'. Setelah selesai mengerjakan tugas, staf dapat kembali memperbarui status dengan mengklik 'Finish' setelah mengirim laporan pengerjaan. Dari tampilan admin, admin dapat memantau seluruh laporan yang masuk setelah melakukan maintenance.

Secara singkat, selain melakukan login dan logout, berikut fungsionalitas yang bisa dilakukan melalui UwU.

**Admin**
- [x] Mengelola akun staf kebersihan (menambahkan, mengedit, dan menghapus)
- [x] Menambahkan tugas maintenance baru dan mendistribusikannya kepada staf kebersihan
- [x] Memperbarui status kamar berdasarkan keperluan dilakukannya maintenance
- [x] Melihat status pengerjaan maintenance staf kebersihan
- [x] Melihat laporan maintenance staf kebersihan

**Staf Kebersihan**
- [x] Melihat daftar maintenance yang ditugaskan
- [x] Memperbarui status pengerjaan maintenance
- [x] Membuat laporan maintenance

## How to Run
Berikut tahapan yang harus dilakukan agar dapat menjalankan program ini. Sebagai catatan, pastikan seluruh folder dan file pada repository ini (IF3152-2023-K02-G15-UWU) telah di-clone dengan sempurna pada komputer pengguna. Selain itu, pengguna dapat melewati tahap persiapan apabila telah memenuhi seluruh persyaratan yang dibutuhkan.

**Persiapan**
1. Pastikan perangkat terhubung ke internet dengan sinyal dan koneksi stabil
2. Install Node.js melalui situs resmi [Node.js](https://nodejs.org)
3. Install Git (opsional) melalui situs resmi [Git Installer](https://git-scm.com) 

**Menjalankan Program**
1. Buka terminal pada perangkat
2. Pastikan pengguna berada pada path yang tepat ('../IF3152-2023-K02-G15-UWU')
3. Ketik command berikut pada terminal

```
   npm install
```

   Tunggu hingga instalasi selesai dan berhasil dilakukan

4. Ketik command berikut pada terminal

```
   npm install cookie-parser
```

   Tunggu hingga instalasi selesai dan berhasil dilakukan

5. Ketik command berikut pada terminal

```
   npx prisma generate
```

   Tunggu hingga proses selesai

6. Ketik command berikut pada terminal

```
   npm run dev
```

7. Buka browser, lalu ketikkan sintaks ini pada URL box

```
   localhost/index
```

8. Lakukan login dan ikuti flow UwU
Akun Admin
Username: admin
Password: password

## Use Case
Berikut daftar use case UwU
Sebagai catatan:
* UC = Use Case
* PJ = Penanggung Jawab

| Kode UC |       Nama Use Case      |  NIM PJ  |     Nama PJ     |
|---------|--------------------------|----------|-----------------|
|   UC01  | Login Register           | 18221152 | Raditya Azka    |
|   UC02  | Admin Manage Staff       | 18221142 | Yasmin Arum S.  |
|   UC03  | Admin Manage Maintenance | 18221126 | Karunia Mega L. |
|   UC04  | Staff List Maintenance   | 18221152 | Raditya Azka    |
|   UC05  | Staff Manage Maintenance | 18221134 | M. Rafi Haidar  |
|   UC06  | Manage Report            | 18221134 | M. Rafi Haidar  |

## Use Case Screen
1. UC01 - Login Register
   -> Memberikan otorisasi kepada pengguna mengakses fungsionalitas tertentu dengan mendaftarkan akun dan memasuki sistem
   ![Implementasi UC Login Register](./doc/LandingPage%20-%20Tampilan%20awal.png)

2. UC02 - Admin Manage Staff
   -> Admin mampu mengelola akun staf kebersihan (menambah, mengedit, dan menghapus)
   ![Implementasi UC Admin Manage Staff](./doc/ListStaff%20-%20Tampilan%20awal,%20terdapat%20beberapa%20daftar%20staff.png)

3. UC03 - Admin Manage Maintenance
   -> Admin dapat mengelola maintenance, mencakup memperbarui status kamar sekaligus menambahkan tugas maintenance baru kepada staf kebersihan tertentu
   ![Implementasi UC Admin Manage Maintenance](./doc/LlistMaintenance%20-%20Tampilan%20awal,%20terdapat%20beberapa%20task.png)

4. UC04 - Staff List Maintenance
   -> Staf dapat melihat daftar tugas maintenance yang ditugaskan kepadanya
   ![Implementasi UC Staff List Maintenance](./doc/HomeScreenStaff%20-%20Tampilan%20awal,%20terdapat%20beberapa%20maintenance%20task,%20belum%20ada%20laporan%20dikirim.png)

5. UC05 - Staff Manage Maintenance
   -> Staf dapat mengelola tugas maintenance yang ditugaskan kepadanya dengan memperbarui status pengerjaan secara berkala
   ![Implementasi UC Staff Manage Maintenance](./doc/HomeScreenStaff%20-%20Daftar%20maintenance%20berkurang%20karena%20sudah%20dinyatakan%20selesai%20('finish').png)

6. UC06 - Manage Report
   -> Staf dapat membuat laporan pengerjaan tugas maintenance, sedangkan admin dapat melihat daftar seluruh laporan yang telah dibuat dan dikirim ke dlaam sistem
   ![Implementasi UC Manage Report - POV Admin](./doc/ListReport%20-%20Tampilan%20awal,%20terdapat%20beberapa%20report%20dari%20maintenance%20task%20staff.png)

   ![Implementasi UC Manage Report - POV Staf](./doc/HomeScreenStaff%20-%20Menulis%20laporan%20setelah%20menyelesaikan%20maintenance%20task.png)

## Database
Database yang digunakan dalam UwU menerapkan skema relational database, mencakup 4 tabel yang ditampilkan dalam skema berikut.

![Skema Relasional Database UwU](./doc/Skema%20Relasional%20Database%20UwU.jpg)

Dari gambar tersebut, diperoleh pula keterangan nama tabel disertai atribut-atribut setiap tabel dan tipenya. Secara lebih detail, berikut penjelasan lebih lanjut setiap tabel

1. Tabel **Report**

   -> Tabel ini menyimpan data-data terkait laporan yang dibuat staf setelah pengerjaan tugas maintenance. Tak hanya menyimpan masukan staf, tabel ini juga menyimpan informasi waktu dibuatnya laporan dan status laporan (dihapus atau tidak)

   -> Secara lebih lengkap, berikut atribut dalam tabel Report
      |     Atribut     |    Tipe   |                           Keterangan                          |
      |-----------------|-----------|---------------------------------------------------------------|
      | id              | int       | Primary Key, di-generate otomatis secara inkremen             |
      | created_at      | timestamp | Di-generate otomatis                                          |
      | maintenance_id  | int       | Foreign Key, merujuk pada atribut 'id' pada tabel Maintenance |
      | description     | text      | Mengambil input user                                          |
      | further_action  | text      | Mengambil input user                                          |
      | is_deleted      | bool      | Default value berupa false                                    |

   -> Dengan demikian, terdapat ketergantungan antara tabel ini dengan tabel lain, yaitu tabel Maintenance

2. Tabel **Maintenance**

   -> Tabel ini menyimpan informasi maintenance yang dibuat dan ditugaskan admin kepada staf kebersihan tertentu, serta status pengerjaannya yang diperbarui berkala oleh staf kebersihan

   -> Secara lebih lengkap, berikut atribut dalam tabel Report
      |     Atribut     |    Tipe   |                           Keterangan                          |
      |-----------------|-----------|---------------------------------------------------------------|
      | id              | int       | Primary Key, di-generate otomatis secara inkremen             |
      | room_id         | int       | Foreign Key, merujuk pada atribut 'id' pada tabel Room        |   
      | staff_id        | int       | Foreign Key, merujuk pada atribut 'id' pada tabel Staff       |
      | status          | text      | Terbatas pada 3 kondisi                                       |
      | description     | text      | Dapat berupa kalimat panjang                                  |

   -> Sebagai catatan, 3 kondisi yang dimaksud pada atribut 'status' meliputi 'pending', in_progress', dan 'finished'

   -> Atribut 'status' hanya memungkinkan menampilkan 1 kondisi (mewakili progress maintenance)

   -> Dengan demikian, terdapat 2 ketergantungan tabel ini, yaitu terhadap tabel Room dan tabel Staff

3. Tabel **Room**

   -> Tabel ini menyimpan informasi ruangan yang dimiliki Hostel UYU, mencakup ID ruangan dan status ruangan: apakah perlu dilakukan maintenance atau tidak (aman)

   -> Secara lebih lengkap, berikut atribut dalam tabel Report
      |     Atribut     |    Tipe   |                           Keterangan                          |
      |-----------------|-----------|---------------------------------------------------------------|
      | id              | int       | Primary Key, terbatas dalam rentang 1-20                      |
      | is_flagged      | bool      | Default value: false; menunjukkan perlu/tidaknya perbaikan    |

   -> Tidak ada ketergantungan pada tabel ini terhadap tabel lain   

4. Tabel **Staff**

   -> Tabel ini menyimpan segala data terkait staf kebersihan, serta status dihapus atau tidaknya akun staf kebersihan tersebut
   minim 1
   
   -> Secara lebih lengkap, berikut atribut dalam tabel Report
      |     Atribut     |    Tipe   |                           Keterangan                          |
      |-----------------|-----------|---------------------------------------------------------------|
      | id              | int       | Primary Key, di-generate otomatis secara inkremen             |
      | username        | text      | Bersifat unik                                                 |
      | password        | text      | Dirahasiakan dan dienkripsi, disimpan dalam bentuk hash       |
      | role            | text      | Terdiri atas admin dan user                                   |
      | nik             | text      | Bersifat unik                                                 |
      | name            | text      | Berupa string                                                 |
      | address         | text      | Berupa string                                                 |
      | email           | text      | Bersifat unik                                                 |
      | phone           | text      | Bersifat unik                                                 |
      | is_deleted      | bool      | Default value: false                                          |
   
   -> Tidak ada ketergantungan pada tabel ini terhadap tabel lain