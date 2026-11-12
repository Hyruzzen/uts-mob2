# Personal CV & Academic Score App (UTS Pemrograman Mobile 2)

Aplikasi mobile digital CV mahasiswa sekaligus dashboard monitoring nilai akademik (**My Score**) yang dibangun menggunakan **React Native**, **Expo Framework**, **JavaScript & JSX**, dan **Expo Router** untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah **Pemrograman Mobile 2** di **Universitas Ma'soem**.

---

## 👤 Identitas Mahasiswa & Akademik

* **Nama Lengkap**: Muhammad Ajam Jamaludin
* **NIM**: 242505032
* **Program Studi / Kampus**: Universitas Ma'soem
* **Mata Kuliah**: Pemrograman Mobile 2
* **Dosen Pengampu**: Iin, M.Kom.
* **Bidang Minat**: Web Developer & Mobile Developer
* **Current Score**: **89 (Grade A)**
* **Learning Points**: **12,375 LP**
* **Learning Progress**: Attendance (100%), Practice (87%), Quest (95%), Challenge (100%)

---

## 🚀 Fitur & Pemenuhan Challenge (Level 1 s/d Level 10)

Aplikasi ini mengimplementasikan seluruh tingkatan tantangan secara kumulatif:

| Level | Fitur & Tantangan | Implementasi Teknis |
| :--- | :--- | :--- |
| **Level 1** | Identitas Mahasiswa | Menampilkan Nama Lengkap, NIM, dan Foto Profil lokal membulat (*circular avatar*). |
| **Level 2** | Personal Introduction | Menampilkan bidang profesi, judul profil, universitas, dan bio lengkap mahasiswa. |
| **Level 3** | Layout & Styling | Memanfaatkan Flexbox responsif, StyleSheet modular, palet warna *Editorial Luxury Dark & Crimson Red*, serta rounded corners. |
| **Level 4** | Interactive CV | Formulir kontak interaktif (Nama, Email, Pesan), event handling, validasi regex email dan input kosong, serta feedback notifikasi sukses. |
| **Level 5** | Separation of UI and Data | Seluruh data dipisahkan secara murni dari komponen antarmuka. Komponen bersifat *reusable* dan menerima data dinamis melalui Props. |
| **Level 6** | Local JSON Data | Menyimpan dan membaca data dari 5 file JSON mandiri (`profile.json`, `skills.json`, `portfolio.json`, `experience.json`, `academicScore.json`). |
| **Level 7** | Dynamic Content | Bar keahlian dinamis dengan persentase penguasaan, galeri portofolio bernomor merah (*01, 02, 03*), filter kategori (*All, Mobile, Web*), search bar pencarian proyek, timeline riwayat pendidikan & pengalaman, serta section hobi. |
| **Level 8** | My Score Dashboard | Dashboard akademik komprehensif menampilkan identitas perkuliahan, Dosen (*Iin, M.Kom.*), Hero Card Skor (89 - Grade A), Learning Points (12,375 LP), dan visualisasi *progress bar* dinamis (*Attendance 100%, Practice 87%, Quest 95%, Challenge 100%*). |
| **Level 9** | Professional Navigation | **Expo Router** dengan sistem **Bottom Tab Navigation** (Home, About, Skills, Portfolio, My Score, Contact) dan ikon serasi dari `@expo/vector-icons`. |
| **Level 10** | Industry Standards | Arsitektur modular, penanganan *Empty State* pada pencarian portofolio, *Loading state*, validasi form kokoh, **Fitur Generate & Download CV PDF**, dan **persistensi tema (Light/Dark Mode) menggunakan AsyncStorage**. |

---

## 📂 Struktur Direktori Proyek

```text
uts-mobile2/
├── app/                        # Rute Halaman Expo Router (File-based Routing)
│   ├── _layout.jsx             # Root Layout & Bottom Tab Navigator
│   ├── index.jsx               # Tab 1: Home (Grand Portal & Hero Full Layer)
│   ├── about.jsx               # Tab 2: About & Experience Timeline
│   ├── skills.jsx              # Tab 3: Dynamic Skills Mastery
│   ├── portfolio.jsx           # Tab 4: Portfolio Gallery, Search & Filter
│   ├── my-score.jsx            # Tab 5: Academic Score Dashboard (Level 8 Focus)
│   └── contact.jsx             # Tab 6: Interactive Contact Form
│
├── components/                 # Komponen UI Modular & Reusable
│   ├── TopHeader.jsx           # Header atas seragam dengan Theme Switcher
│   ├── EditorialHero.jsx       # Hero Section Full Layer Background & Circular Avatar
│   ├── SelectedProjects.jsx    # Showcase kartu proyek bernomor 01, 02, 03
│   ├── EducationSkillsSection.jsx # Ringkasan pendidikan & tag keahlian
│   ├── AcademicProcessTimeline.jsx # Visualisasi capaian belajar format timeline
│   ├── QuoteCard.jsx           # Kartu kutipan merah marun mewah & tanda tangan
│   ├── ProfileCard.jsx         # Kartu identitas profil (Level 1–3 & 5)
│   ├── HobbySection.jsx        # Komponen chips hobi dinamis (.map())
│   ├── DownloadCVButton.jsx    # Tombol interaktif generate & download CV PDF
│   └── ContactForm.jsx         # Formulir kontak lengkap dengan validasi
│
├── utils/                      # Utilitas & Business Logic
│   ├── validation.js           # Fungsi validasi murni & evaluasi nilai
│   └── pdfGenerator.js         # Generator dokumen CV PDF & print service
│
├── data/                       # Sumber Data Lokal JSON (Level 6)
│   ├── profile.json            # Data identitas diri, bio, kontak, universitas
│   ├── academicScore.json      # Data nilai UTS, dosen, LP, dan persentase capaian
│   ├── skills.json             # Data keterampilan teknis terkelompok
│   ├── portfolio.json          # Data katalog proyek mobile & web
│   └── experience.json         # Data riwayat pendidikan & kegiatan organisasi
│
├── constants/
│   └── Colors.js               # Token palet warna Dark (Carbon & Crimson) & Light mode
│
├── context/
│   └── ThemeContext.js         # Pengelola tema global dengan AsyncStorage
│
├── assets/
│   └── images/
│       ├── profile.png         # Foto profil mahasiswa
│       └── hero-bg.jpg         # Background 3D Hexagon Crimson Glow
│
├── app.json                    # Konfigurasi aplikasi Expo
├── package.json                # Dependensi dan script NPM
└── README.md                   # Dokumentasi teknis proyek
```

---

## 🛠️ Cara Menjalankan Aplikasi

### 1. Prasyarat
* Telah terinstal **Node.js** (versi 18 ke atas) dan **npm**.
* Smartphone Android dengan aplikasi **Expo Go** terinstal (dapat diunduh gratis di Google Play Store).

### 2. Menjalankan Server Development (Metro Bundler)
Buka terminal VS Code di folder proyek ini (`d:\uts-mobile2`), lalu jalankan perintah:

```powershell
# Menjalankan server Expo
npx expo start
```

### 3. Menguji pada Smartphone Android via Expo Go
1. Pastikan smartphone Android dan laptop/komputer Anda berada dalam **satu jaringan Wi-Fi yang sama**.
2. Buka aplikasi **Expo Go** di smartphone Anda.
3. Pilih opsi **"Scan QR code"** dan arahkan kamera ke barcode yang muncul di terminal VS Code atau di browser.
4. Aplikasi akan otomatis melakukan bundling dan berjalan langsung secara native di smartphone Anda.

### 4. Menguji pada Web Browser
Jika ingin membuka langsung di browser komputer:
```powershell
npx expo start --web
```
Atau tekan huruf **`w`** pada terminal saat server Expo sedang aktif. Browser akan otomatis membuka alamat **`http://localhost:8081`**.

---

## 🎯 Panduan Demonstrasi di Depan Dosen

Saat mempresentasikan aplikasi ini di hadapan dosen pengampu (**Bapak Iin, M.Kom.**), berikut adalah poin-poin kunci yang dapat Anda tunjukkan:

1. **Demonstrasi Halaman Home**:
   * Tunjukkan efek latar belakang sarang lebah (*hexagon 3D red glow*) yang membentang penuh dan responsif.
   * Tunjukkan foto profil berbentuk lingkaran dengan aura ring merah menyala dan badge identitas NIM: **242505032**.
   * Tekan tombol **🌙 DARK / ☀️ LIGHT** di pojok kanan atas untuk menunjukkan transisi tema secara langsung.
2. **Demonstrasi Tab Navigation (Level 9)**:
   * Tekan bilah navigasi bawah (*Bottom Tabs*) untuk berpindah dengan lancar antarhalaman: **Home**, **About**, **Skills**, **Portfolio**, **My Score**, dan **Contact**.
3. **Demonstrasi Dashboard My Score (Level 8 — Bagian Utama UTS)**:
   * Buka tab **My Score**.
   * Jelaskan bahwa nama mata kuliah (*Pemrograman Mobile 2*), nama dosen (*Iin, M.Kom.*), nilai (**89**), predikat (**Grade A**), Learning Points (**12,375 LP**), dan progress bar (*Attendance 100%, Practice 87%, Quest 95%, Challenge 100%*) semuanya dimuat langsung dari file **`academicScore.json`**.
4. **Demonstrasi Portofolio & Live Search (Level 7 & 10)**:
   * Buka tab **Portfolio**.
   * Ketik kata kunci di kolom pencarian, misalnya `"React"`, lalu perhatikan bagaimana daftar proyek tersaring secara *real-time*.
   * Coba ketik kata kunci yang tidak ada (misalnya `"Python"`), dan tunjukkan tampilan **Empty State** yang ramah pengguna.
5. **Demonstrasi Contact Form & Validasi (Level 4)**:
   * Buka tab **Contact**.
   * Klik tombol *"Kirim Pesan"* tanpa mengisi form untuk membuktikan bahwa validasi *input kosong* dan *format email regex* berjalan dengan benar.
   * Isi data dengan benar, kirimkan, dan tunjukkan notifikasi sukses berwarna hijau yang muncul.
6. **Demonstrasi AsyncStorage (Level 10)**:
   * Ubah tema menjadi Light Mode, kemudian muat ulang (*refresh*) aplikasi. Tunjukkan kepada dosen bahwa tema yang dipilih tidak hilang berkat penyimpanan lokal **AsyncStorage**.

---

**© 2024 Muhammad Ajam Jamaludin — Universitas Ma'soem**
