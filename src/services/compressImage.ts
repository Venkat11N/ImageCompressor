import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system/legacy';
import { getFileSize } from '../utils/fileHelper';
import { CompressionOptions, CompressionResult } from '../types';

export const compressImage = async (
  uri: string,
  options: CompressionOptions
): Promise<CompressionResult> => {
  const start = Date.now();
  const originalSize = await getFileSize(uri);

  const outDir = FileSystem.cacheDirectory + 'compressed/';
  await FileSystem.makeDirectoryAsync(outDir, { intermediates: true });

  const result = await ImageManipulator.manipulateAsync(
    uri,
    options.resolution
      ? [{ resize: { width: options.resolution.width, height: options.resolution.height } }]
      : [],
    {
      compress: options.quality / 100,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: false,
    }
  );

  const compressedSize = await getFileSize(result.uri);
  const end = Date.now();

  return {
    originalUri: uri,
    compressedUri: result.uri,
    originalSize,
    compressedSize,
    type: 'image',
    timeTaken: (end - start) / 1000,
  };
};