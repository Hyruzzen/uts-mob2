// components/ProfileCard.jsx
// Komponen Kartu Profil Reusable (Memenuhi Level 1, 2, 3, dan 5: Separation of UI and Data)
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function ProfileCard({ profile, isDark = true, imageSource }) {
  const theme = isDark ? Colors.dark : Colors.light;

  // Nilai default jika props profile belum dioper
  const {
    name = 'Muhammad Ajam Jamaludin',
    nim = '242505032',
    roles = ['Web Developer', 'Mobile Developer'],
    university = "Universitas Ma'soem",
    heading = 'Tentang Saya',
    bio = 'Mahasiswa yang memiliki ketertarikan pada pengembangan aplikasi web dan mobile serta terus mengembangkan kemampuan dalam bidang teknologi informasi.',
  } = profile || {};

  const roleText = Array.isArray(roles) ? roles.join(' & ') : roles;
  const avatarSource = imageSource || require('../assets/images/profile.png');

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          shadowColor: theme.cardShadow,
        },
      ]}
    >
      {/* Decorative Top Accent Bar */}
      <View style={[styles.accentBar, { backgroundColor: theme.primary }]} />

      {/* Profile Header Image with Glowing Ring */}
      <View style={[styles.avatarWrapper, { borderColor: theme.primary }]}>
        <Image
          source={avatarSource}
          style={styles.avatarImage}
          resizeMode="cover"
        />
      </View>

      {/* Role Badge */}
      <View
        style={[
          styles.badgeContainer,
          {
            backgroundColor: theme.primaryLight,
            borderColor: theme.primary,
          },
        ]}
      >
        <Text style={[styles.badgeText, { color: theme.primary }]}>
          {roleText}
        </Text>
      </View>

      {/* Name and NIM */}
      <Text style={[styles.nameText, { color: theme.textPrimary }]}>
        {name}
      </Text>
      <View style={styles.nimRow}>
        <Text style={[styles.nimLabel, { color: theme.textMuted }]}>NIM:</Text>
        <Text style={[styles.nimValue, { color: theme.accent }]}>{nim}</Text>
      </View>

      {/* University */}
      <Text style={[styles.universityText, { color: theme.textSecondary }]}>
        {university}
      </Text>

      {/* Horizontal Divider */}
      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* Bio / Personal Introduction (Level 2) */}
      <View style={styles.bioContainer}>
        <Text style={[styles.bioHeading, { color: theme.textPrimary }]}>
          {heading}
        </Text>
        <Text style={[styles.bioText, { color: theme.textSecondary }]}>
          {bio}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    paddingTop: 0,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    marginVertical: 12,
  },
  accentBar: {
    width: '100%',
    height: 6,
    marginBottom: 20,
  },
  avatarWrapper: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  badgeContainer: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  nimRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  nimLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  nimValue: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  universityText: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 16,
  },
  bioContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  bioHeading: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'left',
  },
});
