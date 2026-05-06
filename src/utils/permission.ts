import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

export const pickAnyFile = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: '*/*',
    copyToCacheDirectory: true,
  });
  return result.assets?.[0] ?? null;
};

export const pickFromGallery = async (mediaType: 'image' | 'video') => {
  if (mediaType === 'image') {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      alert('Permission required');
      return null;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    return result.assets?.[0] ?? null;
  } else {
    // for video, we can reuse DocumentPicker
    return pickAnyFile();
  }
};