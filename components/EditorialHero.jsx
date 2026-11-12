// components/EditorialHero.jsx
// Hero Section Full-Screen Background dengan Layer Responsif (Mobile & Web)
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import Colors from '../constants/Colors';
import DownloadCVButton from './DownloadCVButton';

export default function EditorialHero({ profile, scoreData, isDark = true }) {
  const theme = isDark ? Colors.dark : Colors.light;
  const { width } = useWindowDimensions();
  const isWide = width >= 768; // Responsif untuk layar lebar / tablet / web

  const {
    name = 'MUHAMMAD AJAM JAMALUDIN',
    nim = '242505032',
    roles = ['Web Developer', 'Mobile Developer'],
    university = "Universitas Ma'soem",
    bio = 'Mahasiswa yang memiliki ketertarikan pada pengembangan aplikasi web dan mobile serta terus mengembangkan kemampuan dalam bidang teknologi informasi.',
  } = profile || {};

  const roleText = Array.isArray(roles)
    ? roles.join(' & ').toUpperCase()
    : String(roles).toUpperCase();

  return (
    <View style={styles.outerContainer}>
      {/* 1. LAYER BACKGROUND FULL SCREEN / FULL WIDTH */}
      <ImageBackground
        source={require('../assets/images/hero-bg.jpg')}
        style={styles.fullBgImage}
        imageStyle={styles.bgImageStyle}
        resizeMode="cover"
      >
        {/* 2. LAYER TINT OVERLAY (Efek Gelap Transparan agar Kontras dan Elegan) */}
        <View
          style={[
            styles.darkOverlay,
            {
              backgroundColor: isDark
                ? 'rgba(9, 9, 11, 0.78)'
                : 'rgba(249, 250, 251, 0.85)',
            },
          ]}
        />

        {/* 3. LAYER KONTEN UTAMA (RESPONSIF) */}
        <View style={[styles.innerContent, isWide && styles.innerContentWide]}>
          {/* Top Ticker Bar */}
          <View
            style={[
              styles.topTicker,
              { borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
            ]}
          >
            <Text style={[styles.tickerLeft, { color: theme.textSecondary }]}>
              WEB & MOBILE DEVELOPER • {university.toUpperCase()}
            </Text>
            <View style={styles.tickerRight}>
              <Text style={[styles.tickerRightText, { color: theme.primary }]}>
                AVAILABLE FOR UTS
              </Text>
            </View>
          </View>

          {/* Watermark Tipografi "PORTFOLIO" */}
          <View style={styles.backdropWatermark} pointerEvents="none">
            <Text
              style={[
                styles.watermarkText,
                {
                  color: isDark
                    ? 'rgba(239, 68, 68, 0.08)'
                    : 'rgba(220, 38, 38, 0.06)',
                },
              ]}
            >
              PORTFOLIO
            </Text>
          </View>

          {/* Konten Hero: Teks & Lingkaran Profil */}
          <View style={[styles.heroBody, isWide && styles.heroBodyWide]}>
            {/* SISI TEKS */}
            <View style={[styles.textColumn, isWide && styles.textColumnWide]}>
              <Text style={[styles.scriptGreeting, { color: theme.primary }]}>
                Hello, I'm
              </Text>

              <Text style={[styles.boldName, { color: theme.textPrimary }]}>
                MUHAMMAD{'\n'}AJAM JAMALUDIN
              </Text>

              <Text style={[styles.roleHeading, { color: theme.primary }]}>
                {roleText}
              </Text>

              {/* NIM Badge dengan Dot Merah */}
              <View
                style={[
                  styles.nimBadge,
                  {
                    backgroundColor: isDark
                      ? 'rgba(24, 24, 27, 0.85)'
                      : 'rgba(255, 255, 255, 0.9)',
                    borderColor: theme.border,
                  },
                ]}
              >
                <View
                  style={[styles.redDot, { backgroundColor: theme.primary }]}
                />
                <Text style={[styles.nimText, { color: theme.textSecondary }]}>
                  NIM :{' '}
                  <Text style={{ color: theme.textPrimary, fontWeight: '800' }}>
                    {nim}
                  </Text>
                </Text>
              </View>

              {/* Paragraf Bio */}
              <Text style={[styles.bioParagraph, { color: theme.textSecondary }]}>
                {bio}
              </Text>

              {/* Tag Universitas & Download CV Button */}
              <View style={styles.tagRow}>
                <View
                  style={[
                    styles.pillBadge,
                    {
                      borderColor: theme.border,
                      backgroundColor: isDark
                        ? 'rgba(24, 24, 27, 0.85)'
                        : 'rgba(255, 255, 255, 0.9)',
                    },
                  ]}
                >
                  <Text
                    style={[styles.pillText, { color: theme.textSecondary }]}
                  >
                    🌐 {university.toUpperCase()}
                  </Text>
                </View>

                {/* Tombol Download CV PDF */}
                <DownloadCVButton isDark={isDark} />
              </View>
            </View>

            {/* SISI LINGKARAN PROFIL (LAYER ATAS) */}
            <View
              style={[
                styles.profileColumn,
                isWide && styles.profileColumnWide,
              ]}
            >
              {/* Frame Lingkaran dengan Glowing Crimson Ring */}
              <View
                style={[
                  styles.avatarGlowRing,
                  {
                    borderColor: theme.primary,
                    shadowColor: theme.primary,
                  },
                ]}
              >
                <View
                  style={[
                    styles.avatarInnerBorder,
                    { borderColor: isDark ? '#09090B' : '#FFFFFF' },
                  ]}
                >
                  <Image
                    source={require('../assets/images/profile.png')}
                    style={styles.circularAvatarImage}
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Floating Pill Status */}
              <View
                style={[
                  styles.avatarBadge,
                  {
                    backgroundColor: isDark
                      ? 'rgba(15, 15, 18, 0.92)'
                      : 'rgba(255, 255, 255, 0.95)',
                    borderColor: theme.primary,
                  },
                ]}
              >
                <View style={[styles.liveDot, { backgroundColor: '#10B981' }]} />
                <Text
                  style={[styles.avatarBadgeText, { color: theme.textPrimary }]}
                >
                  WEB & MOBILE DEVELOPER
                </Text>
              </View>

              {/* Motto Box */}
              <View
                style={[
                  styles.mottoBox,
                  {
                    backgroundColor: isDark
                      ? 'rgba(18, 18, 21, 0.85)'
                      : 'rgba(255, 255, 255, 0.9)',
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text
                  style={[styles.mottoText, { color: theme.textSecondary }]}
                >
                  Turning ideas into powerful mobile & web experiences.
                </Text>
              </View>
            </View>
          </View>

          {/* STATS BAR ROW (ACADEMIC UTS HIGHLIGHTS) */}
          <View
            style={[
              styles.statsColumn,
              {
                backgroundColor: isDark
                  ? 'rgba(18, 18, 21, 0.75)'
                  : 'rgba(255, 255, 255, 0.8)',
                borderColor: theme.border,
              },
            ]}
          >
            {/* Stat 1: Score & Grade */}
            <View style={styles.statItem}>
              <View style={styles.statNumberRow}>
                <Text style={[styles.statNumber, { color: theme.primary }]}>
                  {scoreData?.currentScore?.score || '89'}
                </Text>
                <View style={[styles.gradePill, { backgroundColor: '#10B981' }]}>
                  <Text style={styles.gradePillText}>
                    GRADE {scoreData?.currentScore?.grade || 'A'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                CURRENT SCORE UTS
              </Text>
            </View>

            <View
              style={[styles.statDivider, { backgroundColor: theme.border }]}
            />

            {/* Stat 2: Learning Points */}
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.textPrimary }]}>
                12K+
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                LEARNING POINTS ({scoreData?.learningPoints?.total?.toLocaleString() || '12,375'} LP)
              </Text>
            </View>

            <View
              style={[styles.statDivider, { backgroundColor: theme.border }]}
            />

            {/* Stat 3: Completion */}
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.primary }]}>
                100%
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                ATTENDANCE & CHALLENGE
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 20,
  },
  fullBgImage: {
    width: '100%',
    position: 'relative',
  },
  bgImageStyle: {
    borderRadius: 20,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  innerContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    width: '100%',
  },
  innerContentWide: {
    paddingHorizontal: 36,
    paddingVertical: 32,
    maxWidth: 1200,
    alignSelf: 'center',
  },
  topTicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 8,
  },
  tickerLeft: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  tickerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerRightText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  backdropWatermark: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  watermarkText: {
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: 6,
    textTransform: 'uppercase',
  },
  heroBody: {
    zIndex: 1,
    width: '100%',
    gap: 24,
    alignItems: 'center',
  },
  heroBodyWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
    paddingVertical: 10,
  },
  textColumn: {
    width: '100%',
  },
  textColumnWide: {
    flex: 1.2,
  },
  scriptGreeting: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'serif',
  },
  boldName: {
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 40,
    letterSpacing: 1,
    marginBottom: 10,
  },
  roleHeading: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  nimBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    marginBottom: 14,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  nimText: {
    fontSize: 13,
    fontWeight: '600',
  },
  bioParagraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
    maxWidth: 540,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillBadge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  profileColumn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileColumnWide: {
    flex: 0.9,
  },
  avatarGlowRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.65,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 14,
  },
  avatarInnerBorder: {
    width: 156,
    height: 156,
    borderRadius: 78,
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: '#18181B',
  },
  circularAvatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  avatarBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  mottoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    maxWidth: 320,
  },
  sparkle: {
    fontSize: 16,
  },
  mottoText: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 18,
    flex: 1,
  },
  statsColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: 90,
  },
  statNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  gradePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  gradePillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 36,
  },
});
