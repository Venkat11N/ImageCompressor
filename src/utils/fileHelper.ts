import * as FileSystem from 'expo-file-system/legacy';

export const getFileSize = async (uri: string): Promise<number> => {
  const info = await FileSystem.getInfoAsync(uri);
  if (!info.exists) {
    throw new Error(`File does not exist: ${uri}`);
  }
  return info.size ?? 0;
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateOutputPath = (originalUri: string, extension: string): string => {
  const dir = FileSystem.cacheDirectory + 'compressed/';
  const baseName =
    originalUri.split('/').pop()?.split('.')[0] || 'file';
  return `${dir}${baseName}_compressed.${extension}`;
};