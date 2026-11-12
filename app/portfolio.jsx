// app/portfolio.jsx
// Halaman Portfolio - Galeri Proyek, Search & Filter (Level 7 & Level 9)
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import TopHeader from '../components/TopHeader';
import portfolioData from '../data/portfolio.json';
import { fetchPortfolioProjects } from '../services/mockApi';

export default function PortfolioScreen() {
  const { theme, isDarkMode } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [projectsList, setProjectsList] = useState(portfolioData);

  const categories = ['ALL', 'MOBILE', 'WEB'];

  // Simulasi Pull-to-Refresh asinkron (Level 10)
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const updated = await fetchPortfolioProjects();
      setProjectsList(updated);
    } catch (e) {
      console.warn('Refresh error:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter dinamis berdasarkan Kategori & Keyword Pencarian
  const filteredProjects = projectsList.filter((project) => {
    const matchesCategory =
      selectedCategory === 'ALL' ||
      project.category.toUpperCase() === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tech?.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <TopHeader title="PORTFOLIO GALLERY" />

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
        {/* Header Intro */}
        <View
          style={[
            styles.introCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.subTitle, { color: theme.primary }]}>
            FEATURED WORKS & EXPERIMENTS
          </Text>
          <Text style={[styles.mainTitle, { color: theme.textPrimary }]}>
            Galeri Proyek Pilihan
          </Text>
          <Text style={[styles.desc, { color: theme.textSecondary }]}>
            Koleksi aplikasi mobile dan web yang dibangun dengan standar performa tinggi, modularitas, dan UI/UX modern.
          </Text>

          {/* Search Input Bar (Level 7 & 10) */}
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: theme.surfaceSecondary,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: theme.textPrimary }]}
              placeholder="Cari proyek berdasarkan nama atau teknologi (contoh: React, Expo)..."
              placeholderTextColor={theme.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.clearBtn}
              >
                <Text style={[styles.clearBtnText, { color: theme.textMuted }]}>
                  ✕
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Category Chips */}
        <View style={styles.filterRow}>
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
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Projects List or Empty State */}
        {filteredProjects.length === 0 ? (
          /* EMPTY STATE (Level 10) */
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={styles.emptyIcon}>📁</Text>
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
              Tidak Ada Proyek Ditemukan
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
              Tidak ada hasil yang cocok dengan kata kunci "{searchQuery}". Coba kata kunci lain atau reset filter.
            </Text>
            <TouchableOpacity
              style={[styles.resetSearchBtn, { backgroundColor: theme.primary }]}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
            >
              <Text style={styles.resetBtnText}>Reset Pencarian</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* PROJECTS GRID */
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
                      <Text
                        style={[
                          styles.categoryText,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {project.category.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[styles.projectTitle, { color: theme.textPrimary }]}
                  >
                    {project.title}
                  </Text>
                  <Text
                    style={[styles.projectDesc, { color: theme.textSecondary }]}
                  >
                    {project.description}
                  </Text>

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
                          style={[
                            styles.techBadgeText,
                            { color: theme.textMuted },
                          ]}
                        >
                          {techItem}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View
                    style={[
                      styles.cardBottomRow,
                      { borderTopColor: theme.border },
                    ]}
                  >
                    <Text
                      style={[
                        styles.bottomLabel,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Tahun {project.date || '2024'} • Status Aktif
                    </Text>
                    <Text style={[styles.arrowIcon, { color: theme.primary }]}>
                      →
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
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
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  clearBtn: {
    padding: 6,
  },
  clearBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  filterText: {
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
  emptyCard: {
    padding: 32,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 320,
    marginBottom: 16,
  },
  resetSearchBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
