# FileCompressor

A React Native/Expo mobile application for compressing images.

## Features

- **Image Compression**: Compress JPG, JPEG, PNG, HEIC, WebP, SVG, GIF, BMP images
- **Fixed Quality**: Compresses images at 70% quality for optimal balance
- **Share Results**: Easily share or save compressed images
- **Progress Tracking**: Real-time compression progress

## Tech Stack

- **Framework**: React Native 0.81.5 with Expo SDK 54
- **Language**: TypeScript (strict mode enabled)
- **Navigation**: React Navigation v7
- **Compression Library**: `expo-image-manipulator` for image compression
- **File Handling**: Expo Document Picker, Image Picker, File System, Sharing

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
4. Scan the QR code with Expo Go

This app uses `expo-image-manipulator` which is included in Expo Go, so **no development build is required**. Image compression works directly in Expo Go.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ProgressModal.tsx
├── screens/          # App screens
│   ├── HomeScreen.tsx
│   ├── CompressionScreen.tsx
│   └── ResultScreen.tsx
├── services/         # Compression logic
│   ├── compressorFactory.ts
│   ├── compressImage.ts
│   ├── compressVideo.ts
│   ├── compressAudio.ts
│   └── compressDocument.ts
├── types/            # TypeScript type definitions
│   └── index.ts
└── utils/            # Utility functions
    ├── fileHelper.ts
    └── permission.ts
```

## Usage

1. **Select a File**: Tap "Choose a file" to select any file from your device
2. **Compress**: Tap "Start Compression" to begin the process at 70% quality
3. **View Results**: See original vs compressed size, reduction percentage, and time taken
4. **Share/Save**: Use the "Share / Save" button to share the compressed file

## Compression Options

- **Quality**: Fixed at 70% for optimal balance between file size and image quality
- **Format**: Automatic based on file type

## Development

### Code Style

- ESLint with Expo and Prettier configurations
- TypeScript strict mode enabled
- Single quotes, semicolons, 2-space indentation

### Building for Production

For production builds, you'll need to build the native app:

```bash
# Android
eas build --platform android

# iOS
eas build --platform ios
```

## Limitations

- Document compression reads entire file into memory (not suitable for very large files)
- No cancellation support for long-running operations
- Basic UI without advanced customization options

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
