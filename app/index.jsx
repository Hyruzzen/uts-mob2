// app/index.jsx
// Home Screen - Grand Portal & Profil Utama (Level 1–9)
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import { useRouter } from 'expo-router';

// Komponen Reusable
import EditorialHero from '../components/EditorialHero';
import SelectedProjects from '../components/SelectedProjects';
import EducationSkillsSection from '../components/EducationSkillsSection';
import AcademicProcessTimeline from '../components/AcademicProcessTimeline';
import QuoteCard from '../components/QuoteCard';

// Data JSON Lokal
import profileData from '../data/profile.json';
import academicData from '../data/academicScore.json';
import skillsData from '../data/skills.json';
import portfolioData from '../data/portfolio.json';
import experienceData from '../data/experience.json';

export default function HomeScreen() {
  const { theme, isDarkMode, toggleTheme } = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Modern Top Minimal Bar with Theme Toggle */}
      <View
        style={[
          styles.topHeader,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <View style={styles.brandContainer}>
          <Text style={[styles.brandText, { color: theme.textPrimary }]}>
            PERSONAL CV & SCORE
          </Text>
        </View>

        {/* Theme Switcher Toggle (Terhubung ke AsyncStorage) */}
        <TouchableOpacity
          style={[
            styles.themePill,
            {
              backgroundColor: theme.surfaceSecondary,
              borderColor: theme.border,
            },
          ]}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Text style={[styles.themePillText, { color: theme.textPrimary }]}>
            {isDarkMode ? '🌙 DARK' : '☀️ LIGHT'}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. HERO SECTION (FULL LAYER BG & RESPONSIF) */}
          <EditorialHero
            profile={profileData}
            scoreData={academicData}
            isDark={isDarkMode}
          />

          {/* Quick Navigation Cards Banner */}
          <View style={styles.quickNavRow}>
            <TouchableOpacity
              style={[
                styles.quickNavCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.primary,
                },
              ]}
              onPress={() => router.push('/my-score')}
              activeOpacity={0.8}
            >
              <Text style={styles.quickNavIcon}>📊</Text>
              <View>
                <Text
                  style={[styles.quickNavTitle, { color: theme.textPrimary }]}
                >
                  Buka Rapor UTS (My Score)
                </Text>
                <Text
                  style={[styles.quickNavSub, { color: theme.textSecondary }]}
                >
                  Nilai 89 (Grade A) • 12,375 LP
                </Text>
              </View>
              <Text style={[styles.arrowRight, { color: theme.primary }]}>
                →
              </Text>
            </TouchableOpacity>
          </View>

          {/* 2. SELECTED PROJECTS (01, 02, 03) */}
          <SelectedProjects projects={portfolioData} isDark={isDarkMode} />

          {/* 3. EDUCATION & SKILLS SECTION */}
          <EducationSkillsSection
            education={experienceData.education}
            skillsData={skillsData}
            isDark={isDarkMode}
          />

          {/* 4. ACADEMIC PROCESS TIMELINE (LEVEL 8 MY SCORE) */}
          <AcademicProcessTimeline
            progressData={academicData.learningProgress}
            isDark={isDarkMode}
          />

          {/* 5. EDITORIAL QUOTE CARD */}
          <QuoteCard
            author="Muhammad Ajam Jamaludin"
            quote="Good design and clean code is not just how it looks, but how it works, performs, and scales."
          />

          {/* Footer Copyright */}
          <View style={[styles.footer, { borderTopColor: theme.border }]}>
            <Text style={[styles.footerText, { color: theme.textMuted }]}>
              © 2026 Muhammad Ajam Jamaludin • NIM: 242505032
            </Text>
            <Text style={[styles.footerSub, { color: theme.textMuted }]}>
              Universitas Ma'soem • UTS Pemrograman Mobile 2
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandDot: {
    fontSize: 14,
    fontWeight: '900',
  },
  brandText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  themePill: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  themePillText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  quickNavRow: {
    width: '100%',
    marginVertical: 10,
  },
  quickNavCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 14,
  },
  quickNavIcon: {
    fontSize: 24,
  },
  quickNavTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  quickNavSub: {
    fontSize: 12,
    marginTop: 2,
  },
  arrowRight: {
    marginLeft: 'auto',
    fontSize: 18,
    fontWeight: '900',
  },
  footer: {
    width: '100%',
    paddingVertical: 24,
    borderTopWidth: 1,
    alignItems: 'center',
    marginTop: 16,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerSub: {
    fontSize: 11,
  },
});
