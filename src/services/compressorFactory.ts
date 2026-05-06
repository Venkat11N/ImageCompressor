import { FileType, CompressionOptions, CompressionResult } from '../types';
import { compressImage } from './compressImage';

export const compressFile = async (
  uri: string,
  type: FileType,
  options: CompressionOptions
): Promise<CompressionResult> => {
  return compressImage(uri, options);
};