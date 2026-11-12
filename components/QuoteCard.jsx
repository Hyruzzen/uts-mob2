// components/QuoteCard.jsx
// Red Editorial Quote Card (sesuai referensi gambar)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuoteCard({
  author = 'Muhammad Ajam Jamaludin',
  quote = 'Good code is not just how it looks, but how it works, performs, and scales.',
}) {
  return (
    <View style={styles.quoteCard}>
      {/* Giant Quote Icon */}
      <Text style={styles.quoteIcon}>“</Text>

      {/* Quote Text */}
      <Text style={styles.quoteBody}>
        {quote}
      </Text>

      {/* Script Signature */}
      <Text style={styles.signatureText}>
        {author}
      </Text>

      <View style={styles.divider} />

      {/* Bottom Callout */}
      <Text style={styles.calloutText}>
        LET'S CREATE SOMETHING GREAT TOGETHER
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  quoteCard: {
    width: '100%',
    backgroundColor: '#7F1D1D', // Crimson Dark Red Luxury
    borderRadius: 14,
    padding: 24,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#991B1B',
    position: 'relative',
    overflow: 'hidden',
  },
  quoteIcon: {
    fontSize: 54,
    color: '#EF4444',
    lineHeight: 54,
    fontWeight: '900',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  quoteBody: {
    color: '#FEE2E2',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 16,
  },
  signatureText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: 'serif',
    letterSpacing: 0.5,
    marginBottom: 18,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(254, 226, 226, 0.2)',
    marginBottom: 14,
  },
  calloutText: {
    color: '#FCA5A5',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
});
