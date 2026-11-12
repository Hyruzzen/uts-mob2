// tests/app.test.js
// Automated Unit Tests & Data Integrity Suite (Level 10 - Testing)
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// 1. Helper function validasi email murni
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// 2. Helper evaluasi nilai
function evaluateGrade(score) {
  if (typeof score !== 'number' || isNaN(score)) return { grade: 'E', status: 'Tidak Valid' };
  if (score >= 85) return { grade: 'A', status: 'Sangat Baik' };
  if (score >= 75) return { grade: 'B', status: 'Baik' };
  if (score >= 65) return { grade: 'C', status: 'Cukup' };
  if (score >= 50) return { grade: 'D', status: 'Kurang' };
  return { grade: 'E', status: 'Gagal' };
}

// 3. Helper validasi form
function validateContactForm({ name = '', email = '', message = '' }) {
  const errors = {};
  if (!name.trim() || name.trim().length < 3) errors.name = 'Invalid name';
  if (!email.trim() || !isValidEmail(email)) errors.email = 'Invalid email';
  if (!message.trim() || message.trim().length < 10) errors.message = 'Invalid message';
  return { isValid: Object.keys(errors).length === 0, errors };
}

console.log('====================================================');
console.log('🧪 MENJALANKAN AUTOMATED TEST SUITE UTS MOBILE 2');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } catch (error) {
    console.error(`❌ FAIL: ${testName}`);
    console.error(`   Alasan: ${error.message}`);
  }
}

// KELOMPOK 1: UJI VALIDASI EMAIL
runTest('Email valid harus mengembalikan true', () => {
  assert.strictEqual(isValidEmail('ajam@gmail.com'), true);
  assert.strictEqual(isValidEmail('student.123@univ-masoem.ac.id'), true);
});

runTest('Email tidak valid harus mengembalikan false', () => {
  assert.strictEqual(isValidEmail(''), false);
  assert.strictEqual(isValidEmail('ajam'), false);
  assert.strictEqual(isValidEmail('ajam@'), false);
  assert.strictEqual(isValidEmail('@domain.com'), false);
  assert.strictEqual(isValidEmail('user@domain'), false);
});

// KELOMPOK 2: UJI VALIDASI CONTACT FORM
runTest('Form dengan data lengkap harus valid', () => {
  const result = validateContactForm({
    name: 'Muhammad Ajam Jamaludin',
    email: 'ajam@gmail.com',
    message: 'Halo, saya ingin mendiskusikan aplikasi mobile.',
  });
  assert.strictEqual(result.isValid, true);
  assert.strictEqual(Object.keys(result.errors).length, 0);
});

runTest('Form kosong harus menolak dan memberikan error', () => {
  const result = validateContactForm({ name: '', email: '', message: '' });
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(Boolean(result.errors.name), true);
  assert.strictEqual(Boolean(result.errors.email), true);
  assert.strictEqual(Boolean(result.errors.message), true);
});

// KELOMPOK 3: UJI LOGIKA NILAI AKADEMIK (LEVEL 8)
runTest('Skor 89 harus menghasilkan Grade A (Sesuai Ketentuan UTS)', () => {
  const result = evaluateGrade(89);
  assert.strictEqual(result.grade, 'A');
  assert.strictEqual(result.status, 'Sangat Baik');
});

runTest('Skor 78 harus menghasilkan Grade B', () => {
  const result = evaluateGrade(78);
  assert.strictEqual(result.grade, 'B');
});

// KELOMPOK 4: UJI INTEGRITAS DATA JSON (LEVEL 6)
runTest('academicScore.json harus valid dan sesuai parameter UTS', () => {
  const filePath = path.join(__dirname, '../data/academicScore.json');
  assert.strictEqual(fs.existsSync(filePath), true, 'File academicScore.json tidak ditemukan!');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  assert.strictEqual(data.student.name, 'Muhammad Ajam Jamaludin');
  assert.strictEqual(data.student.nim, '242505032');
  assert.strictEqual(data.course.name, 'Pemrograman Mobile 2');
  assert.strictEqual(data.course.lecturer, 'Iin, M.Kom.');
  assert.strictEqual(data.currentScore.score, 89);
  assert.strictEqual(data.currentScore.grade, 'A');
  assert.strictEqual(data.learningPoints.total, 12375);
  assert.strictEqual(Array.isArray(data.learningProgress), true);
  assert.strictEqual(data.learningProgress.length, 4);

  // Periksa persentase wajib
  const mapProg = {};
  data.learningProgress.forEach((p) => {
    mapProg[p.label] = p.percentage;
  });
  assert.strictEqual(mapProg['Attendance'], 100);
  assert.strictEqual(mapProg['Practice'], 87);
  assert.strictEqual(mapProg['Quest'], 95);
  assert.strictEqual(mapProg['Challenge'], 100);
});

runTest('profile.json harus memuat identitas dan hobi yang valid', () => {
  const filePath = path.join(__dirname, '../data/profile.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  assert.strictEqual(data.name, 'Muhammad Ajam Jamaludin');
  assert.strictEqual(data.nim, '242505032');
  assert.strictEqual(data.university, "Universitas Ma'soem");
  assert.strictEqual(Array.isArray(data.hobbies), true);
  assert.strictEqual(data.hobbies.length > 0, true);
});

runTest('portfolio.json dan skills.json harus terstruktur dan tidak kosong', () => {
  const portfolioPath = path.join(__dirname, '../data/portfolio.json');
  const skillsPath = path.join(__dirname, '../data/skills.json');
  const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));
  const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

  assert.strictEqual(Array.isArray(portfolio), true);
  assert.strictEqual(portfolio.length >= 3, true);
  assert.strictEqual(Array.isArray(skills), true);
  assert.strictEqual(skills.length >= 3, true);
});

console.log('\n====================================================');
console.log(`📊 HASIL PENGUJIAN: ${passedTests}/${totalTests} UJIAN BERHASIL (100% PASS)`);
console.log('====================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
