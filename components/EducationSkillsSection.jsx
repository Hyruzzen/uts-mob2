// components/EducationSkillsSection.jsx
// Bagian "EDUCATION & SKILLS" bergaya editorial modern (sesuai referensi gambar)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function EducationSkillsSection({
  education = [],
  skillsData = [],
  isDark = true,
}) {
  const theme = isDark ? Colors.dark : Colors.light;

  // Mengumpulkan semua skill menjadi flat array untuk chip/badge
  const allSkills = skillsData.flatMap((cat) => cat.skills.map((s) => s.name));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <Text style={[styles.mainHeader, { color: theme.textPrimary }]}>
        EDUCATION & SKILLS
      </Text>

      {/* SUB-HEADER: EDUCATION */}
      <Text style={[styles.subHeader, { color: theme.primary }]}>
        EDUCATION
      </Text>

      <View style={styles.eduList}>
        {education.map((item, idx) => (
          <View key={item.id || idx} style={styles.eduItem}>
            <View style={styles.eduTopRow}>
              <Text style={[styles.eduTitle, { color: theme.textPrimary }]}>
                {item.institution}
              </Text>
              <Text style={[styles.eduPeriod, { color: theme.primary }]}>
                {item.period}
              </Text>
            </View>
            <Text style={[styles.eduMajor, { color: theme.textSecondary }]}>
              {item.major}
            </Text>
            <Text style={[styles.eduDesc, { color: theme.textMuted }]}>
              {item.description}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* SUB-HEADER: SKILLS */}
      <Text style={[styles.subHeader, { color: theme.primary }]}>
        SKILLS & TECHNOLOGIES
      </Text>

      <View style={styles.skillChipsContainer}>
        {allSkills.map((skillName, index) => (
          <View
            key={`skill-${index}`}
            style={[
              styles.skillTag,
              {
                backgroundColor: theme.surfaceSecondary,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.skillTagText, { color: theme.textPrimary }]}>
              {skillName.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    marginVertical: 10,
  },
  mainHeader: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  eduList: {
    gap: 14,
  },
  eduItem: {
    width: '100%',
  },
  eduTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  eduTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  eduPeriod: {
    fontSize: 11,
    fontWeight: '700',
  },
  eduMajor: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  eduDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 18,
  },
  skillChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
  },
  skillTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
