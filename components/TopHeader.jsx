// components/TopHeader.jsx
// Header Atas Seragam untuk seluruh Halaman Navigasi
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export default function TopHeader({ title = 'PORTFOLIO' }) {
  const { isDarkMode, theme, toggleTheme } = useAppTheme();

  return (
    <View
      style={[
        styles.topBar,
        {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { color: theme.textPrimary }]}>
          {title}
        </Text>
      </View>

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
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sparkleIcon: {
    fontSize: 16,
    fontWeight: '900',
  },
  titleText: {
    fontSize: 14,
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
});
