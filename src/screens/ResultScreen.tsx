import React from 'react';
import { View, Text, Button, StyleSheet, Share, Alert } from 'react-native';
import { formatBytes } from '../utils/fileHelper';
import { CompressionResult } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

const ResultScreen: React.FC<Props> = ({ route }) => {
  const { result } = route.params;
  const reduction = (
    (1 - result.compressedSize / result.originalSize) * 100
  ).toFixed(1);

  const handleShare = async () => {
    try {
      await Share.share({
        url: result.compressedUri,
        title: 'Compressed file',
      });
    } catch (error) {
      Alert.alert('Could not share');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Compression Result</Text>

      <View style={styles.resultCard}>
        <Text style={styles.cardLabel}>Original Size</Text>
        <Text style={styles.cardValue}>{formatBytes(result.originalSize)}</Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.cardLabel}>Compressed Size</Text>
        <Text style={styles.cardValue}>{formatBytes(result.compressedSize)}</Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.cardLabel}>Size Reduction</Text>
        <Text style={[styles.cardValue, styles.reductionText]}>{reduction}%</Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.cardLabel}>Compression Time</Text>
        <Text style={styles.cardValue}>{result.timeTaken.toFixed(1)} sec</Text>
      </View>

      <View style={{ marginTop: 24, width: '80%' }}>
        <Button title="Share / Save" onPress={handleShare} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  resultCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
  },
  cardLabel: { fontSize: 14, color: '#666', marginBottom: 4 },
  cardValue: { fontSize: 18, fontWeight: '600' },
  reductionText: { color: '#4CAF50' },
});

export default ResultScreen;