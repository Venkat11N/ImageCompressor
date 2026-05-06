import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  progress?: number; // 0‑100
  message?: string;
}

const ProgressModal: React.FC<Props> = ({ visible, progress, message }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color="#0000ff" />
          {progress !== undefined && (
            <Text style={styles.percent}>{Math.round(progress)}%</Text>
          )}
          <Text style={styles.message}>{message ?? 'Compressing…'}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  percent: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
  },
  message: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
});

export default ProgressModal;