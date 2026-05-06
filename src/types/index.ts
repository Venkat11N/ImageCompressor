export type FileType = 'image';

export interface CompressionOptions {
  quality: number;          // 0–100 (100 = near‑lossless)
  resolution?: {
    width: number;
    height: number;
  };
}

export interface CompressionResult {
  originalUri: string;
  compressedUri: string;
  originalSize: number;
  compressedSize: number;
  type: FileType;
  timeTaken: number;
}