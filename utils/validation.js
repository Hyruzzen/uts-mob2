// utils/validation.js
// Modul Utilitas Validasi & Logika Bisnis (Level 10 - Industry Standard)

/**
 * Validasi format email menggunakan Regular Expression standar RFC 5322 ringkas
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validasi seluruh field pada Contact Form
 * @param {Object} fields - { name, email, message }
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validateContactForm({ name = '', email = '', message = '' }) {
  const errors = {};

  // Validasi Nama
  if (!name.trim()) {
    errors.name = 'Nama lengkap wajib diisi!';
  } else if (name.trim().length < 3) {
    errors.name = 'Nama minimal 3 karakter!';
  }

  // Validasi Email
  if (!email.trim()) {
    errors.email = 'Alamat email wajib diisi!';
  } else if (!isValidEmail(email)) {
    errors.email = 'Format email tidak valid (contoh: user@mail.com)!';
  }

  // Validasi Pesan
  if (!message.trim()) {
    errors.message = 'Pesan wajib diisi!';
  } else if (message.trim().length < 10) {
    errors.message = 'Pesan terlalu singkat (minimal 10 karakter)!';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Pemetaan Skor Angka ke Nilai Huruf (Grade) Akademik
 * @param {number} score
 * @returns {{ grade: string, status: string }}
 */
export function evaluateGrade(score) {
  if (typeof score !== 'number' || isNaN(score)) {
    return { grade: 'E', status: 'Tidak Valid' };
  }

  if (score >= 85) return { grade: 'A', status: 'Sangat Baik' };
  if (score >= 75) return { grade: 'B', status: 'Baik' };
  if (score >= 65) return { grade: 'C', status: 'Cukup' };
  if (score >= 50) return { grade: 'D', status: 'Kurang' };
  return { grade: 'E', status: 'Gagal' };
}
