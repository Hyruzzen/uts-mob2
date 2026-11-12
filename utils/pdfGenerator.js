// utils/pdfGenerator.js
// Utilitas Pembuatan & Pengunduhan Dokumen CV format PDF (Kompatibel Expo Go & Web)
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

import profileData from '../data/profile.json';
import academicData from '../data/academicScore.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import portfolioData from '../data/portfolio.json';

/**
 * Menghasilkan template HTML yang siap dikonversi ke PDF
 */
export function buildCVHtml() {
  const rolesText = Array.isArray(profileData.roles)
    ? profileData.roles.join(' & ')
    : profileData.roles;

  const skillsHtml = skillsData
    .map(
      (cat) => `
      <div style="margin-bottom: 12px;">
        <div style="font-weight: 700; font-size: 13px; color: #DC2626; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
          ${cat.category}
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${cat.skills
            .map(
              (s) => `
            <span style="background: #F3F4F6; border: 1px solid #E5E7EB; border-radius: 4px; padding: 4px 10px; font-size: 11px; font-weight: 600; color: #1F2937;">
              ${s.name} (${s.level}%)
            </span>
          `
            )
            .join('')}
        </div>
      </div>
    `
    )
    .join('');

  const educationHtml = experienceData.education
    .map(
      (edu) => `
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: #111827;">
          <span>${edu.institution}</span>
          <span style="color: #DC2626; font-size: 12px;">${edu.period}</span>
        </div>
        <div style="font-size: 12px; color: #4B5563; font-weight: 600; margin-top: 2px;">${edu.major}</div>
        <div style="font-size: 11px; color: #6B7280; margin-top: 3px;">${edu.description}</div>
      </div>
    `
    )
    .join('');

  const experienceHtml = experienceData.experience
    .map(
      (exp) => `
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: #111827;">
          <span>${exp.role}</span>
          <span style="color: #DC2626; font-size: 12px;">${exp.period}</span>
        </div>
        <div style="font-size: 12px; color: #4B5563; font-weight: 600; margin-top: 2px;">${exp.organization}</div>
        <div style="font-size: 11px; color: #6B7280; margin-top: 3px;">${exp.description}</div>
      </div>
    `
    )
    .join('');

  const projectsHtml = portfolioData
    .slice(0, 3)
    .map(
      (p, idx) => `
      <div style="margin-bottom: 10px; padding: 8px; border-left: 3px solid #DC2626; background: #FAFAFA;">
        <div style="font-weight: 700; font-size: 12px; color: #111827;">
          0${idx + 1}. ${p.title} <span style="font-size: 10px; color: #DC2626; font-weight: 800; text-transform: uppercase;">[${p.category}]</span>
        </div>
        <div style="font-size: 11px; color: #4B5563; margin-top: 3px;">${p.description}</div>
        <div style="font-size: 10px; color: #9CA3AF; margin-top: 4px; font-weight: 600;">
          Teknologi: ${p.tech.join(', ')}
        </div>
      </div>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>CV - ${profileData.name}</title>
      <style>
        @page { size: A4; margin: 16mm 14mm; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1F2937;
          background: #FFFFFF;
          margin: 0;
          padding: 0;
          font-size: 12px;
          line-height: 1.5;
        }
        .header {
          border-bottom: 3px solid #DC2626;
          padding-bottom: 14px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .name {
          font-size: 24px;
          font-weight: 900;
          color: #111827;
          letter-spacing: 0.5px;
          margin: 0 0 4px 0;
        }
        .role {
          font-size: 13px;
          font-weight: 800;
          color: #DC2626;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .nim {
          display: inline-block;
          background: #111827;
          color: #FFFFFF;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
        }
        .contact-info {
          text-align: right;
          font-size: 11px;
          color: #4B5563;
          line-height: 1.6;
        }
        .section-title {
          font-size: 13px;
          font-weight: 900;
          color: #111827;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-bottom: 1px solid #E5E7EB;
          padding-bottom: 4px;
          margin-top: 14px;
          margin-bottom: 10px;
        }
        .academic-box {
          background: #09090B;
          color: #FFFFFF;
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .grid-2 {
          display: flex;
          gap: 20px;
        }
        .col { flex: 1; }
      </style>
    </head>
    <body>
      <!-- HEADER -->
      <div class="header">
        <div>
          <h1 class="name">${profileData.name}</h1>
          <div class="role">${rolesText}</div>
          <div class="nim">NIM: ${profileData.nim} • ${profileData.university}</div>
        </div>
        <div class="contact-info">
          <div>📧 ${profileData.contact.email}</div>
          <div>📞 ${profileData.contact.phone}</div>
          <div>📍 ${profileData.contact.location}</div>
          <div>🌐 github.com/ajamjamaludin</div>
        </div>
      </div>

      <!-- ABOUT SUMMARY -->
      <div>
        <div class="section-title">Ringkasan Profil</div>
        <p style="margin: 0; color: #4B5563; font-size: 12px; line-height: 1.6;">
          ${profileData.bio}
        </p>
      </div>

      <!-- ACADEMIC DASHBOARD UTS (MY SCORE HIGHLIGHT) -->
      <div class="section-title">Informasi Akademik (UTS Pemrograman Mobile 2)</div>
      <div class="academic-box">
        <div>
          <div style="font-size: 11px; color: #EF4444; font-weight: 800; letter-spacing: 0.8px;">
            ${academicData.course.name.toUpperCase()}
          </div>
          <div style="font-size: 13px; font-weight: 700; margin-top: 2px;">
            Dosen Pengampu: ${academicData.course.lecturer}
          </div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 26px; font-weight: 900; color: #EF4444; line-height: 1;">
            ${academicData.currentScore.score}
          </div>
          <div style="font-size: 10px; font-weight: 800; color: #10B981; margin-top: 2px;">
            GRADE ${academicData.currentScore.grade}
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 18px; font-weight: 900; color: #8B5CF6;">
            ${academicData.learningPoints.total.toLocaleString()} ${academicData.learningPoints.unit}
          </div>
          <div style="font-size: 10px; color: #9CA3AF;">
            Attendance: 100% | Practice: 87%
          </div>
        </div>
      </div>

      <!-- 2 COLUMNS: EDUCATION & SKILLS -->
      <div class="grid-2">
        <div class="col">
          <div class="section-title">Riwayat Pendidikan</div>
          ${educationHtml}

          <div class="section-title" style="margin-top: 14px;">Pengalaman & Proyek</div>
          ${experienceHtml}
        </div>

        <div class="col">
          <div class="section-title">Keahlian Teknis</div>
          ${skillsHtml}

          <div class="section-title" style="margin-top: 14px;">Selected Projects</div>
          ${projectsHtml}
        </div>
      </div>

      <!-- FOOTER -->
      <div style="margin-top: 20px; padding-top: 8px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 10px; color: #9CA3AF;">
        CV Dokumen Resmi Mahasiswa • ${profileData.name} (${profileData.nim}) • Universitas Ma'soem 2024
      </div>
    </body>
    </html>
  `;
}

/**
 * Fungsi utama untuk men-download atau mencetak CV PDF
 * Mendukung Expo Go (Android & iOS) dan Web Browser
 */
export async function downloadCvPdf() {
  const html = buildCVHtml();

  if (Platform.OS === 'web') {
    // Pada Browser: Langsung membuka jendela cetak/Simpan sebagai PDF bawaan browser
    await Print.printAsync({ html });
    return { success: true, mode: 'web-print' };
  } else {
    // Pada Mobile (Android / iOS via Expo Go):
    // 1. Generate file PDF fisik
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    // 2. Buka dialog sistem untuk Simpan/Bagikan file PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
        dialogTitle: `Download CV ${profileData.name}`,
      });
      return { success: true, uri, mode: 'mobile-share' };
    } else {
      await Print.printAsync({ uri });
      return { success: true, uri, mode: 'mobile-print' };
    }
  }
}
