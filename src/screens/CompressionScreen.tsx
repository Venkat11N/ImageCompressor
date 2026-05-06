import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { compressFile } from '../services/compressorFactory';
import { CompressionResult } from '../types';
import ProgressModal from '../components/ProgressModel';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Compression'>;

const CompressionScreen: React.FC<Props> = ({ route, navigation }) => {
  const { fileUri, fileType } = route.params;
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const startCompression = async () => {
    setCompressing(true);
    setProgress(0);
    try {
      const result: CompressionResult = await compressFile(
        fileUri,
        fileType,
        {
          quality: 70, // Fixed 70% quality
        }
      );
      navigation.navigate('Result', { result });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Compression failed', errorMessage);
    } finally {
      setCompressing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>File type: {fileType}</Text>

      <Button
        title="Start Compression"
        onPress={startCompression}
        disabled={compressing}
      />

      <ProgressModal
        visible={compressing}
        progress={progress}
        message="Compressing file…"
      />
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
  label: { fontSize: 18, marginBottom: 6 },
  hint: { fontSize: 14, color: '#666', marginBottom: 24, textAlign: 'center' },
});

export default CompressionScreen;