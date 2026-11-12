// components/DownloadCVButton.jsx
// Tombol Download CV PDF Interaktif (Kompatibel Expo Go & Web)
import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { downloadCvPdf } from '../utils/pdfGenerator';

export default function DownloadCVButton({ isDark = true, variant = 'primary' }) {
  const theme = isDark ? Colors.dark : Colors.light;
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await downloadCvPdf();
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert(
        'Gagal Mengunduh CV',
        'Terjadi kendala saat menghasilkan dokumen PDF: ' + (error.message || error)
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Download CV format PDF"
      accessibilityHint="Menghasilkan dan mengunduh berkas PDF Curriculum Vitae lengkap"
      style={[
        styles.button,
        isOutline
          ? {
              backgroundColor: 'transparent',
              borderColor: theme.primary,
              borderWidth: 1.5,
            }
          : {
              backgroundColor: theme.primary,
              shadowColor: theme.primary,
            },
        isGenerating && { opacity: 0.7 },
      ]}
      onPress={handleDownload}
      disabled={isGenerating}
      activeOpacity={0.8}
    >
      {isGenerating ? (
        <ActivityIndicator
          size="small"
          color={isOutline ? theme.primary : '#FFFFFF'}
        />
      ) : (
        <>
          <Ionicons
            name="document-text-outline"
            size={18}
            color={isOutline ? theme.primary : '#FFFFFF'}
          />
          <Text
            style={[
              styles.buttonText,
              { color: isOutline ? theme.primary : '#FFFFFF' },
            ]}
          >
            DOWNLOAD CV (PDF)
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    gap: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
