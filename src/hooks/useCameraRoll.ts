import { useEffect, useState } from 'react';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';

export function useCameraRoll() {
  const [list, setList] = useState<string[]>([]);

  async function getPhotos() {
    const photoPage = await CameraRoll.getPhotos({ first: 10 });
    setList(photoPage.edges.map(edge => edge.node.image.uri));
  }

  useEffect(() => {
    getPhotos();
  }, []);

  return {
    list,
  };
}
