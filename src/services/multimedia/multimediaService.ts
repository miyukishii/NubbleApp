import ImageResizer from '@bam.tech/react-native-image-resizer';
import { Platform } from "react-native";

import { ImageForUpload } from "./multimediaType";

const DEFAULT_PHOTO_WIDTH = 1280;
const DEFAULT_PHOTO_HEIGHT = 960;
const DEFAULT_JPEG_QUALITY = 0.8;

async function prepareImageForUpload(imageUri: string):
Promise<ImageForUpload> {
  const resizedImage = await ImageResizer.createResizedImage(
    imageUri,
    DEFAULT_PHOTO_WIDTH,
    DEFAULT_PHOTO_HEIGHT,
    'JPEG',
    Math.round(DEFAULT_JPEG_QUALITY * 100),
    0
  );
  return {
    uri: resizedImage.uri,
    name: Date.now().toString(),
    type: 'image/jpeg'
  }
}

function prepareImageUri(imageUri: string): string {
  if (Platform.OS !== 'android') {
    return imageUri;
  }

  if (imageUri.startsWith('file://')) {
    return imageUri;
  }

  return `file://${imageUri}`
}

export const multimediaService = {
  prepareImageForUpload,
  prepareImageUri
}
