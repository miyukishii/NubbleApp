export type PermissionStatus = 'granted' | 'denied' | 'never_ask_again' | 'unavailable';

export type PermissionType = 'photoLibrary' | 'camera';

export type PermissionService = {
  request: (type: PermissionType) => Promise<PermissionStatus>;
  check: (type: PermissionType) => Promise<PermissionStatus>;
}
