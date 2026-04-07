import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');
  return {
    ...originalModule,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('@react-native-camera-roll/camera-roll', () => ({
  CameraRoll: {
    getPhotos: jest.fn(async () => ({
      edges: [
        { node: { image: { uri: 'image-1' } } },
        { node: { image: { uri: 'image-2' } } },
        { node: { image: { uri: 'image-3' } } },
      ],
    })),
  },
}));

jest.mock('react-native-vision-camera', () => ({
  Camera: {
    getAvailableCameraDevices: jest.fn(async () => []),
    getCameraPermissionStatus: jest.fn(() => 'authorized'),
    requestCameraPermission: jest.fn(async () => 'authorized'),
  },
  useCameraDevice: jest.fn(() => ({
    position: 'back',
    id: 'back-camera',
  })),
  useCameraFormat: jest.fn(() => ({
    photoHeight: 4032,
    photoWidth: 3024,
  })),
  Templates: {
    PICTURE: 'picture',
    VIDEO: 'video',
  },
  useFrameProcessor: jest.fn(() => jest.fn()),
}));

jest.mock('react-native-permissions', () => ({
  check: jest.fn(async () => 'granted'),
  request: jest.fn(async () => 'granted'),
  requestMultiple: jest.fn(async () => ({
    'android.permission.CAMERA': 'granted',
    'android.permission.READ_EXTERNAL_STORAGE': 'granted',
  })),
  openSettings: jest.fn(),
  PERMISSIONS: {
    ANDROID: {
      CAMERA: 'android.permission.CAMERA',
      READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
      WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
      RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
    },
    IOS: {
      CAMERA: 'ios.permission.CAMERA',
      PHOTO_LIBRARY: 'ios.permission.PHOTO_LIBRARY',
      MICROPHONE: 'ios.permission.MICROPHONE',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
    UNAVAILABLE: 'unavailable',
  },
}));

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(async () => Promise.resolve()),
  isVisible: jest.fn(async () => Promise.resolve(false)),
  getVisibilityStatus: jest.fn(async () => 'hidden'),
  show: jest.fn(async () => Promise.resolve()),
}));

jest.mock('react-native-mmkv', () => ({
  createMMKV: () => ({
    set: jest.fn(),
    getString: jest.fn(() => null),
    getBoolean: jest.fn(() => null),
    getNumber: jest.fn(() => null),
    delete: jest.fn(),
    clearAll: jest.fn(),
    getAllKeys: jest.fn(() => []),
  }),
}));
