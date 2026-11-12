// components/HobbySection.jsx
// Menampilkan daftar hobi dan minat dinamis menggunakan .map() (Level 6 & Level 7)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function HobbySection({ hobbies = [], isDark = true }) {
  const theme = isDark ? Colors.dark : Colors.light;

  if (!hobbies || hobbies.length === 0) return null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          shadowColor: theme.cardShadow,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.icon}>🎯</Text>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Hobi & Minat
        </Text>
      </View>

      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Bidang ketertarikan dan aktivitas produktif di waktu luang
      </Text>

      {/* Render chips menggunakan array .map() */}
      <View style={styles.chipContainer}>
        {hobbies.map((hobby, index) => (
          <View
            key={`hobby-${index}`}
            style={[
              styles.chip,
              {
                backgroundColor: theme.surfaceSecondary,
                borderColor: theme.border,
              },
            ]}
          >
            <View
              style={[styles.chipDot, { backgroundColor: theme.primary }]}
            />
            <Text style={[styles.chipText, { color: theme.textPrimary }]}>
              {hobby}
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
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginVertical: 12,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
