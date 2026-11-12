// components/SelectedProjects.jsx
// Selected Projects Section bergaya Editorial (sesuai referensi gambar)
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../constants/Colors';

export default function SelectedProjects({ projects = [], isDark = true }) {
  const theme = isDark ? Colors.dark : Colors.light;
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const categories = ['ALL', 'MOBILE', 'WEB'];

  const filteredProjects = projects.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    return item.category.toUpperCase() === selectedFilter;
  });

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={[styles.headerRow, { borderBottomColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          SELECTED PROJECTS
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={[styles.viewAllText, { color: theme.textSecondary }]}>
            VIEW ALL PROJECTS <Text style={{ color: theme.primary }}>→</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              {
                borderColor: selectedFilter === cat ? theme.primary : theme.border,
                backgroundColor:
                  selectedFilter === cat
                    ? theme.primaryLight
                    : theme.surfaceSecondary,
              },
            ]}
            onPress={() => setSelectedFilter(cat)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterButtonText,
                {
                  color:
                    selectedFilter === cat ? theme.primary : theme.textSecondary,
                  fontWeight: selectedFilter === cat ? '800' : '600',
                },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Project Cards List */}
      <View style={styles.projectsList}>
        {filteredProjects.map((project, index) => {
          const formattedIndex = String(index + 1).padStart(2, '0');
          return (
            <View
              key={project.id || index}
              style={[
                styles.projectCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
            >
              {/* Project Top Meta */}
              <View style={styles.cardTopRow}>
                <Text style={[styles.indexNumber, { color: theme.primary }]}>
                  {formattedIndex}
                </Text>
                <View
                  style={[
                    styles.categoryTag,
                    {
                      backgroundColor: theme.surfaceSecondary,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text style={[styles.categoryText, { color: theme.textSecondary }]}>
                    {project.category.toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* Title & Description */}
              <Text style={[styles.projectTitle, { color: theme.textPrimary }]}>
                {project.title}
              </Text>
              <Text
                style={[styles.projectDesc, { color: theme.textSecondary }]}
                numberOfLines={3}
              >
                {project.description}
              </Text>

              {/* Tech Badges */}
              <View style={styles.techRow}>
                {project.tech?.map((techItem, tIndex) => (
                  <View
                    key={tIndex}
                    style={[
                      styles.techBadge,
                      {
                        backgroundColor: theme.surfaceSecondary,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.techBadgeText, { color: theme.textMuted }]}
                    >
                      {techItem}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Bottom Action Row */}
              <View
                style={[
                  styles.cardBottomRow,
                  { borderTopColor: theme.border },
                ]}
              >
                <Text
                  style={[styles.bottomLabel, { color: theme.textSecondary }]}
                >
                  Lihat Detail Proyek
                </Text>
                <Text style={[styles.arrowIcon, { color: theme.primary }]}>
                  →
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
    marginVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 11,
    letterSpacing: 1,
  },
  projectsList: {
    gap: 16,
  },
  projectCard: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  indexNumber: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  categoryTag: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  projectTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  projectDesc: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  techRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  techBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  techBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  bottomLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  arrowIcon: {
    fontSize: 16,
    fontWeight: '900',
  },
});
