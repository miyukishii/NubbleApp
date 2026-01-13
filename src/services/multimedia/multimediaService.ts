import { ImageForUpload } from "./multimediaType";

function prepareImageForUpload(imageUri: string): ImageForUpload {
  return {
    uri: imageUri,
    name: 'name',
    type: 'image/jpeg'
  }
}

export const multimediaService = {
  prepareImageForUpload
}
