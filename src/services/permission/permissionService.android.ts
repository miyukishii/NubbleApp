import { Permission, PermissionsAndroid, Platform } from "react-native";
import { PermissionService, PermissionStatus, PermissionType } from "./permissionType";


async function check(type: PermissionType):Promise<PermissionStatus> {
  const permission = mapTypeToPermission(type);
  if (!permission) return 'unavailable';

  const hasPermission = await PermissionsAndroid.check(permission)

  if (hasPermission) return 'granted';
  return 'denied';
}

async function request(type: PermissionType) :Promise<PermissionStatus> {
  const permission = mapTypeToPermission(type);
  if (!permission) return 'unavailable';
  const result = await PermissionsAndroid.request(permission)
  return result
}

function mapTypeToPermission(type: PermissionType): Permission | null {
  if (type === 'photoLibrary') {
    if (Number(Platform.Version) >= 33) {
      return 'android.permission.READ_MEDIA_IMAGES'
    }else {
      return 'android.permission.READ_EXTERNAL_STORAGE'
    }
  } else if (type === 'camera') {
    return 'android.permission.CAMERA'
  }
  return null
}

export const permissionService: PermissionService = {
  check,
  request
}
