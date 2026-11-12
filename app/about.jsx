// app/about.jsx
// Halaman About & Experience Timeline (Level 9)
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import TopHeader from '../components/TopHeader';
import QuoteCard from '../components/QuoteCard';
import HobbySection from '../components/HobbySection';
import DownloadCVButton from '../components/DownloadCVButton';

import profileData from '../data/profile.json';
import experienceData from '../data/experience.json';

export default function AboutScreen() {
  const { theme, isDarkMode } = useAppTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <TopHeader title="ABOUT ME" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bio Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.sectionSubtitle, { color: theme.primary }]}>
            PERSONAL INTRODUCTION
          </Text>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            {profileData.name}
          </Text>

          <View style={[styles.nimBadge, { backgroundColor: theme.surfaceSecondary, borderColor: theme.border }]}>
            <Text style={[styles.nimText, { color: theme.textSecondary }]}>
              NIM: <Text style={{ color: theme.primary, fontWeight: '800' }}>{profileData.nim}</Text>
            </Text>
          </View>

          <Text style={[styles.bioBody, { color: theme.textSecondary }]}>
            {profileData.bio}
          </Text>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Universitas:</Text>
            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>{profileData.university}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Lokasi:</Text>
            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>{profileData.contact.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Email:</Text>
            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>{profileData.contact.email}</Text>
          </View>

          <View style={{ marginTop: 16 }}>
            <DownloadCVButton isDark={isDarkMode} />
          </View>
        </View>

        {/* Education Timeline */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.sectionSubtitle, { color: theme.primary }]}>
            RIWAYAT PENDIDIKAN
          </Text>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Education History
          </Text>

          <View style={styles.timelineList}>
            {experienceData.education.map((edu, idx) => (
              <View key={edu.id || idx} style={styles.timelineItem}>
                <View style={styles.indicatorCol}>
                  <View style={[styles.circleDot, { borderColor: theme.primary, backgroundColor: theme.surfaceSecondary }]} />
                  {idx !== experienceData.education.length - 1 && (
                    <View style={[styles.line, { backgroundColor: theme.border }]} />
                  )}
                </View>
                <View style={styles.itemContent}>
                  <View style={styles.itemHeader}>
                    <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>{edu.institution}</Text>
                    <Text style={[styles.itemPeriod, { color: theme.primary }]}>{edu.period}</Text>
                  </View>
                  <Text style={[styles.itemMajor, { color: theme.textSecondary }]}>{edu.major}</Text>
                  <Text style={[styles.itemDesc, { color: theme.textMuted }]}>{edu.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Experience Timeline */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.sectionSubtitle, { color: theme.primary }]}>
            PENGALAMAN & ORGANISASI
          </Text>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Experience & Projects
          </Text>

          <View style={styles.timelineList}>
            {experienceData.experience.map((exp, idx) => (
              <View key={exp.id || idx} style={styles.timelineItem}>
                <View style={styles.indicatorCol}>
                  <View style={[styles.circleDot, { borderColor: theme.primary, backgroundColor: theme.surfaceSecondary }]} />
                  {idx !== experienceData.experience.length - 1 && (
                    <View style={[styles.line, { backgroundColor: theme.border }]} />
                  )}
                </View>
                <View style={styles.itemContent}>
                  <View style={styles.itemHeader}>
                    <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>{exp.role}</Text>
                    <Text style={[styles.itemPeriod, { color: theme.primary }]}>{exp.period}</Text>
                  </View>
                  <Text style={[styles.itemMajor, { color: theme.textSecondary }]}>{exp.organization}</Text>
                  <Text style={[styles.itemDesc, { color: theme.textMuted }]}>{exp.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Hobbies Section */}
        <HobbySection hobbies={profileData.hobbies} isDark={isDarkMode} />

        {/* Crimson Quote Card */}
        <QuoteCard
          author={profileData.name}
          quote="Good code is not just how it looks, but how it works, performs, and scales."
        />
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
  card: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  nimBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 12,
  },
  nimText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bioBody: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  timelineList: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 70,
  },
  indicatorCol: {
    alignItems: 'center',
    width: 28,
    marginRight: 12,
  },
  circleDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    marginTop: 4,
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  itemContent: {
    flex: 1,
    paddingBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  itemPeriod: {
    fontSize: 11,
    fontWeight: '700',
  },
  itemMajor: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
});
