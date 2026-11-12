// services/mockApi.js
// Mock API Service untuk simulasi pengambilan data asinkron (Level 10)
import portfolioData from '../data/portfolio.json';
import academicData from '../data/academicScore.json';

/**
 * Simulasi fetch portofolio secara asinkron dengan latency jaringan
 * @param {boolean} shouldFail - simulasi jika koneksi error
 * @returns {Promise<Array>}
 */
export async function fetchPortfolioProjects(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Gagal memuat data portofolio dari server.'));
      } else {
        resolve([...portfolioData]);
      }
    }, 600); // Latensi 600ms
  });
}

/**
 * Simulasi fetch data nilai akademik
 * @returns {Promise<Object>}
 */
export async function fetchAcademicScore() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...academicData });
    }, 500);
  });
}
