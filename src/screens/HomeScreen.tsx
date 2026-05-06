import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { pickAnyFile } from '../utils/permission';
import { FileType } from '../types';
import { compressFile } from '../services/compressorFactory';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const detectType = (uri: string): FileType => {
  const ext = uri.split('.').pop()?.toLowerCase() ?? '';
  if (['jpg', 'jpeg', 'png', 'heic', 'webp', 'svg', 'gif', 'bmp'].includes(ext)) {
    return 'image';
  }
  throw new Error('Only image files are supported. Please select an image file (jpg, jpeg, png, heic, webp, svg, gif, bmp).');
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [compressing, setCompressing] = useState(false);

  const handlePick = async () => {
    try {
      const picked = await pickAnyFile();
      if (!picked) return;
      const uri = picked.uri;
      const name = picked.name;
      const type = detectType(name || uri);

      setCompressing(true);
      const result = await compressFile(uri, type, { quality: 70 });
      navigation.navigate('Result', { result });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Could not compress file';
      Alert.alert('Error', errorMessage);
    } finally {
      setCompressing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Compressor</Text>
      <Button
        title="Choose a file"
        onPress={handlePick}
        disabled={compressing}
      />
      {compressing && <Text style={styles.info}>Compressing...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 30 },
  info: { marginTop: 20, textAlign: 'center', color: '#666' },
});

export default HomeScreen;