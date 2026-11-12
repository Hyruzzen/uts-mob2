// app/skills.jsx
// Halaman Skills - Dynamic Skills Mastery (Level 7 & Level 9)
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import TopHeader from '../components/TopHeader';
import skillsData from '../data/skills.json';

export default function SkillsScreen() {
  const { theme, isDarkMode } = useAppTheme();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', ...skillsData.map((c) => c.category)];

  const displayedSkills =
    selectedCategory === 'ALL'
      ? skillsData
      : skillsData.filter((c) => c.category === selectedCategory);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <TopHeader title="SKILLS & STACK" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Card */}
        <View
          style={[
            styles.introCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.subTitle, { color: theme.primary }]}>
            TECHNICAL PROFICIENCY
          </Text>
          <Text style={[styles.mainTitle, { color: theme.textPrimary }]}>
            Keahlian & Penguasaan Teknologi
          </Text>
          <Text style={[styles.desc, { color: theme.textSecondary }]}>
            Tingkat kemahiran dalam ekosistem pengembangan aplikasi modern, dari mobile, web, hingga backend tools.
          </Text>
        </View>

        {/* Filter Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterChip,
                {
                  borderColor:
                    selectedCategory === cat ? theme.primary : theme.border,
                  backgroundColor:
                    selectedCategory === cat
                      ? theme.primaryLight
                      : theme.surfaceSecondary,
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      selectedCategory === cat
                        ? theme.primary
                        : theme.textSecondary,
                    fontWeight: selectedCategory === cat ? '800' : '600',
                  },
                ]}
              >
                {cat.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories & Skills List */}
        <View style={styles.categoriesContainer}>
          {displayedSkills.map((categoryGroup, groupIdx) => (
            <View
              key={categoryGroup.category || groupIdx}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.categoryHeader}>
                <Text
                  style={[styles.categoryTitle, { color: theme.textPrimary }]}
                >
                  {categoryGroup.category.toUpperCase()}
                </Text>
                <View
                  style={[
                    styles.countBadge,
                    {
                      backgroundColor: theme.surfaceSecondary,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[styles.countText, { color: theme.textSecondary }]}
                  >
                    {categoryGroup.skills.length} SKILLS
                  </Text>
                </View>
              </View>

              <View style={styles.skillsGrid}>
                {categoryGroup.skills.map((skill, sIdx) => {
                  const isHigh = skill.level >= 88;
                  const barColor = isHigh ? theme.primary : '#38BDF8';

                  return (
                    <View key={skill.name || sIdx} style={styles.skillItem}>
                      <View style={styles.skillTopRow}>
                        <Text
                          style={[
                            styles.skillName,
                            { color: theme.textPrimary },
                          ]}
                        >
                          {skill.name}
                        </Text>
                        <View style={styles.metaBadgeRow}>
                          <View
                            style={[
                              styles.masteryPill,
                              {
                                backgroundColor: isHigh
                                  ? theme.primaryLight
                                  : 'rgba(56, 189, 248, 0.12)',
                                borderColor: barColor,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.masteryText,
                                { color: barColor },
                              ]}
                            >
                              {skill.mastery}
                            </Text>
                          </View>
                          <Text
                            style={[styles.percentage, { color: barColor }]}
                          >
                            {skill.level}%
                          </Text>
                        </View>
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
                              width: `${skill.level}%`,
                              backgroundColor: barColor,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
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
  introCard: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
  },
  subTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  desc: {
    fontSize: 13,
    lineHeight: 20,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  filterChip: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 11,
    letterSpacing: 0.8,
  },
  categoriesContainer: {
    gap: 16,
  },
  categoryCard: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingBottom: 10,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  countBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
  countText: {
    fontSize: 10,
    fontWeight: '800',
  },
  skillsGrid: {
    gap: 14,
  },
  skillItem: {
    width: '100%',
  },
  skillTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  skillName: {
    fontSize: 13,
    fontWeight: '700',
  },
  metaBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  masteryPill: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  masteryText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  percentage: {
    fontSize: 12,
    fontWeight: '800',
  },
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});
