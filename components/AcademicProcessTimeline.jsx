// components/AcademicProcessTimeline.jsx
// Visualisasi "Academic Process & Progress" bergaya Work Process Timeline (sesuai referensi gambar)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function AcademicProcessTimeline({ progressData = [], isDark = true }) {
  const theme = isDark ? Colors.dark : Colors.light;

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
        ACADEMIC PROCESS (MY SCORE)
      </Text>
      <Text style={[styles.subText, { color: theme.textSecondary }]}>
        Mata Kuliah: Pemrograman Mobile 2 • Dosen: Iin, M.Kom.
      </Text>

      <View style={styles.timelineList}>
        {progressData.map((item, index) => {
          const stepNumber = String(index + 1).padStart(2, '0');
          const isLast = index === progressData.length - 1;

          return (
            <View key={item.id || index} style={styles.timelineItem}>
              {/* Left Column: Number + Vertical Line */}
              <View style={styles.indicatorCol}>
                <View
                  style={[
                    styles.circleNode,
                    {
                      borderColor: theme.primary,
                      backgroundColor: theme.surfaceSecondary,
                    },
                  ]}
                >
                  <Text style={[styles.nodeNumber, { color: theme.primary }]}>
                    {stepNumber}
                  </Text>
                </View>
                {!isLast && (
                  <View
                    style={[styles.verticalLine, { backgroundColor: theme.border }]}
                  />
                )}
              </View>

              {/* Right Column: Title, Percentage, Progress Bar, Description */}
              <View style={styles.contentCol}>
                <View style={styles.titleRow}>
                  <Text style={[styles.stepTitle, { color: theme.textPrimary }]}>
                    {item.label.toUpperCase()}
                  </Text>
                  <Text style={[styles.percentageText, { color: item.color || theme.primary }]}>
                    {item.percentage}%
                  </Text>
                </View>

                {/* Dynamic Progress Bar */}
                <View
                  style={[
                    styles.progressTrack,
                    { backgroundColor: theme.surfaceSecondary },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${item.percentage}%`,
                        backgroundColor: item.color || theme.primary,
                      },
                    ]}
                  />
                </View>

                <Text style={[styles.stepDesc, { color: theme.textSecondary }]}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        })}
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
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    marginBottom: 20,
  },
  timelineList: {
    width: '100%',
  },
  timelineItem: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 76,
  },
  indicatorCol: {
    alignItems: 'center',
    width: 38,
    marginRight: 14,
  },
  circleNode: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  nodeNumber: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  contentCol: {
    flex: 1,
    paddingBottom: 22,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '900',
  },
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  stepDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
});
