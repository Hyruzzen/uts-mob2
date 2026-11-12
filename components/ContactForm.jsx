// components/ContactForm.jsx
// "LET'S WORK TOGETHER" Contact Form Section (Editorial Dark Theme)
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import { validateContactForm } from '../utils/validation';

export default function ContactForm({ isDark = true, onSubmitSuccess }) {
  const theme = isDark ? Colors.dark : Colors.light;

  // 1. STATE: Input data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // 2. STATE: Pesan error validasi
  const [errors, setErrors] = useState({});

  // 3. STATE: Status interaksi & feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sentSummary, setSentSummary] = useState(null);

  // Validasi form menggunakan modul utils/validation (Level 10)
  const handleValidateAndSubmit = () => {
    const { isValid, errors: validationErrors } = validateContactForm({
      name,
      email,
      message,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('id-ID'),
      };

      setIsSubmitting(false);
      setIsSuccess(true);
      setSentSummary(payload);

      setName('');
      setEmail('');
      setMessage('');

      if (onSubmitSuccess) {
        onSubmitSuccess(payload);
      }
    }, 700);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSentSummary(null);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      {/* Header Let's Work Together */}
      <View style={styles.headerBlock}>
        <Text style={[styles.mainTitle, { color: theme.textPrimary }]}>
          LET'S WORK{'\n'}TOGETHER
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          I'm currently open for new projects, academic challenges, and collaborations. Let's create something amazing that drives results.
        </Text>
      </View>

      {/* Contact Quick Meta Info (from image reference) */}
      <View style={[styles.metaList, { borderBottomColor: theme.border }]}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>✉️</Text>
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            ajamjamaludin45@gmail.com
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>🌐</Text>
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            github.com/hyruzzen
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📞</Text>
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            +62 8387-8720-521
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📍</Text>
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            Bandung, Jawa Barat, Indonesia
          </Text>
        </View>
      </View>

      {/* FORM INTERAKTIF */}
      {isSuccess && sentSummary ? (
        <View
          style={[
            styles.successBox,
            {
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderColor: '#10B981',
            },
          ]}
        >
          <Text style={styles.successTitle}>Pesan Berhasil Terkirim!</Text>
          <Text style={[styles.successDesc, { color: theme.textSecondary }]}>
            Terima kasih <Text style={{ fontWeight: '700' }}>{sentSummary.name}</Text>, pesan Anda telah diterima pada pukul {sentSummary.timestamp}.
          </Text>

          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.primary }]}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.resetButtonText}>Kirim Pesan Lainnya</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formFields}>
          {/* Input Nama */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
              NAMA LENGKAP <Text style={{ color: theme.primary }}>*</Text>
            </Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Input Nama Lengkap"
              accessibilityHint="Ketik nama lengkap Anda"
              style={[
                styles.input,
                {
                  backgroundColor: theme.surfaceSecondary,
                  borderColor: errors.name ? theme.primary : theme.border,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="Masukkan nama Anda..."
              placeholderTextColor={theme.textMuted}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: null });
              }}
            />
            {errors.name && (
              <Text style={[styles.errorText, { color: theme.primary }]}>
                ⚠️ {errors.name}
              </Text>
            )}
          </View>

          {/* Input Email */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
              EMAIL ADDRESS <Text style={{ color: theme.primary }}>*</Text>
            </Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Input Alamat Email"
              accessibilityHint="Ketik email valid Anda"
              style={[
                styles.input,
                {
                  backgroundColor: theme.surfaceSecondary,
                  borderColor: errors.email ? theme.primary : theme.border,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="nama@domain.com"
              placeholderTextColor={theme.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
            />
            {errors.email && (
              <Text style={[styles.errorText, { color: theme.primary }]}>
                ⚠️ {errors.email}
              </Text>
            )}
          </View>

          {/* Input Pesan */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
              PESAN <Text style={{ color: theme.primary }}>*</Text>
            </Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Input Pesan"
              accessibilityHint="Tuliskan pesan atau tawaran kolaborasi"
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.surfaceSecondary,
                  borderColor: errors.message ? theme.primary : theme.border,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="Tuliskan pesan Anda di sini..."
              placeholderTextColor={theme.textMuted}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                if (errors.message) setErrors({ ...errors, message: null });
              }}
            />
            {errors.message && (
              <Text style={[styles.errorText, { color: theme.primary }]}>
                ⚠️ {errors.message}
              </Text>
            )}
          </View>

          {/* Tombol Submit dengan Aksen Crimson & Aksesibilitas */}
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Kirim Pesan Sekarang"
            accessibilityHint="Memproses pengiriman pesan formulir kontak"
            style={[
              styles.submitButton,
              { backgroundColor: theme.primary },
              isSubmitting && { opacity: 0.7 },
            ]}
            onPress={handleValidateAndSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>
                KIRIM PESAN SEKARANG →
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    marginVertical: 12,
  },
  headerBlock: {
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 28,
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
  },
  metaList: {
    gap: 8,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#27272A',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaIcon: {
    fontSize: 14,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
  formFields: {
    width: '100%',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 13,
  },
  textArea: {
    height: 96,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  submitButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  successBox: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginVertical: 8,
  },
  successIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#10B981',
    marginBottom: 4,
  },
  successDesc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
