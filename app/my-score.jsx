// app/my-score.jsx
// Halaman Khusus Dashboard Akademik "MY SCORE" (Level 8 - Fokus Utama UTS)
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import TopHeader from '../components/TopHeader';
import academicData from '../data/academicScore.json';
import { fetchAcademicScore } from '../services/mockApi';

export default function MyScoreScreen() {
  const { theme, isDarkMode } = useAppTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scoreDataState, setScoreDataState] = useState(academicData);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const refreshed = await fetchAcademicScore();
      setScoreDataState(refreshed);
    } catch (e) {
      console.warn('Score refresh error:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const { student, course, currentScore, learningPoints, learningProgress } =
    scoreDataState;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <TopHeader title="ACADEMIC DASHBOARD" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      >
        {/* 1. KARTU IDENTITAS AKADEMIK */}
        <View
          style={[
            styles.identityCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={[styles.subLabel, { color: theme.primary }]}>
                IDENTITAS AKADEMIK MAHASISWA
              </Text>
              <Text style={[styles.mainCourseTitle, { color: theme.textPrimary }]}>
                {course.name}
              </Text>
            </View>
            <View
              style={[
                styles.semesterPill,
                {
                  backgroundColor: theme.surfaceSecondary,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.semesterText, { color: theme.textSecondary }]}>
                {course.semester}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.metaGrid}>
            <View style={styles.metaCell}>
              <Text style={[styles.metaLabel, { color: theme.textMuted }]}>
                Nama Mahasiswa
              </Text>
              <Text style={[styles.metaVal, { color: theme.textPrimary }]}>
                {student.name}
              </Text>
            </View>

            <View style={styles.metaCell}>
              <Text style={[styles.metaLabel, { color: theme.textMuted }]}>
                NIM
              </Text>
              <Text style={[styles.metaVal, { color: theme.primary }]}>
                {student.nim}
              </Text>
            </View>

            <View style={styles.metaCell}>
              <Text style={[styles.metaLabel, { color: theme.textMuted }]}>
                Dosen Pengampu
              </Text>
              <Text style={[styles.metaVal, { color: theme.textPrimary }]}>
                {course.lecturer}
              </Text>
            </View>

            <View style={styles.metaCell}>
              <Text style={[styles.metaLabel, { color: theme.textMuted }]}>
                Institusi Kampus
              </Text>
              <Text style={[styles.metaVal, { color: theme.textSecondary }]}>
                {student.university}
              </Text>
            </View>
          </View>
        </View>

        {/* 2. DUA KARTU UTAMA: CURRENT SCORE & LEARNING POINTS */}
        <View style={styles.scoreRowContainer}>
          {/* A. KARTU CURRENT SCORE DENGAN VISUAL PENUH & GRADE BESAR */}
          <View
            style={[
              styles.heroScoreCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.scoreHeader}>
              <Text style={[styles.scoreCardTitle, { color: theme.textMuted }]}>
                CURRENT SCORE
              </Text>
              <View style={[styles.badgeGrade, { backgroundColor: currentScore.letterColor || '#10B981' }]}>
                <Text style={styles.badgeGradeText}>
                  GRADE {currentScore.grade}
                </Text>
              </View>
            </View>

            <View style={styles.bigScoreRow}>
              <Text style={[styles.hugeScoreNumber, { color: theme.primary }]}>
                {currentScore.score}
              </Text>
              <Text style={[styles.scoreMaxText, { color: theme.textMuted }]}>
                /100
              </Text>
            </View>

            <Text style={[styles.scoreStatus, { color: currentScore.letterColor || '#10B981' }]}>
              ● {currentScore.status}
            </Text>
          </View>

          {/* B. KARTU LEARNING POINTS */}
          <View
            style={[
              styles.lpCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.scoreHeader}>
              <Text style={[styles.scoreCardTitle, { color: theme.textMuted }]}>
                LEARNING POINTS
              </Text>
              <Text style={styles.trophyIcon}>🏆</Text>
            </View>

            <View style={styles.bigScoreRow}>
              <Text style={[styles.hugeLpNumber, { color: '#8B5CF6' }]}>
                {learningPoints.total.toLocaleString()}
              </Text>
              <Text style={[styles.lpUnit, { color: '#8B5CF6' }]}>
                {learningPoints.unit}
              </Text>
            </View>

            <Text style={[styles.lpRank, { color: theme.textSecondary }]}>
              {learningPoints.rank}
            </Text>
          </View>
        </View>

        {/* 3. LEARNING PROGRESS METRICS (ATTENDANCE, PRACTICE, QUEST, CHALLENGE) */}
        <View
          style={[
            styles.progressSectionCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.subLabel, { color: theme.primary }]}>
              CAPAIAN BELAJAR MAHASISWA
            </Text>
            <Text style={[styles.progressSectionTitle, { color: theme.textPrimary }]}>
              Learning Progress (100% Data JSON)
            </Text>
          </View>

          <View style={styles.progressList}>
            {learningProgress.map((item, index) => {
              const formattedNumber = String(index + 1).padStart(2, '0');

              return (
                <View key={item.id || index} style={styles.progressItem}>
                  {/* Step Number & Label */}
                  <View style={styles.progressTopRow}>
                    <View style={styles.labelWithIcon}>
                      <Text style={[styles.stepNumber, { color: item.color || theme.primary }]}>
                        {formattedNumber}.
                      </Text>
                      <Text style={[styles.progressLabel, { color: theme.textPrimary }]}>
                        {item.label}
                      </Text>
                    </View>

                    <Text style={[styles.percentageValue, { color: item.color || theme.primary }]}>
                      {item.percentage}%
                    </Text>
                  </View>

                  {/* Dynamic Progress Bar */}
                  <View
                    style={[
                      styles.track,
                      { backgroundColor: theme.surfaceSecondary },
                    ]}
                  >
                    <View
                      style={[
                        styles.bar,
                        {
                          width: `${item.percentage}%`,
                          backgroundColor: item.color || theme.primary,
                        },
                      ]}
                    />
                  </View>

                  {/* Keterangan aktivitas */}
                  <Text style={[styles.progressDesc, { color: theme.textSecondary }]}>
                    {item.description}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* 4. FOOTER NOTE UTS */}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    gap: 16,
  },
  identityCard: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
  },
  subLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  mainCourseTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  semesterPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  semesterText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 14,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  metaCell: {
    width: '46%',
    minWidth: 140,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  metaVal: {
    fontSize: 13,
    fontWeight: '700',
  },
  scoreRowContainer: {
    flexDirection: 'row',
    gap: 14,
    flexWrap: 'wrap',
  },
  heroScoreCard: {
    flex: 1,
    minWidth: 150,
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  lpCard: {
    flex: 1,
    minWidth: 150,
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreCardTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  badgeGrade: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  badgeGradeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  trophyIcon: {
    fontSize: 18,
  },
  bigScoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginVertical: 6,
  },
  hugeScoreNumber: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
  },
  scoreMaxText: {
    fontSize: 16,
    fontWeight: '700',
  },
  hugeLpNumber: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  lpUnit: {
    fontSize: 14,
    fontWeight: '800',
  },
  scoreStatus: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },
  lpRank: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },
  progressSectionCard: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 18,
  },
  progressSectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  progressList: {
    gap: 16,
  },
  progressItem: {
    width: '100%',
  },
  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '900',
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  percentageValue: {
    fontSize: 13,
    fontWeight: '900',
  },
  track: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  progressDesc: {
    fontSize: 11,
    lineHeight: 16,
  },
  utsInfoBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  utsInfoTitle: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  utsInfoDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
});
