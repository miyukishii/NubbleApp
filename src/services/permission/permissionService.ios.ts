import { request as rnpRequest, check as rnpCheck, PermissionStatus as RnpPermissionStatus, PERMISSIONS as RNP_PERMISSIONS, Permission as RnpPermission } from "react-native-permissions";

import { PermissionService, PermissionStatus, PermissionType } from "./permissionType";

const mapType: Record<PermissionType, RnpPermission> = {
  photoLibrary: RNP_PERMISSIONS.IOS.PHOTO_LIBRARY,
  camera: RNP_PERMISSIONS.IOS.CAMERA,
}

const mapStatus: Record<RnpPermissionStatus, PermissionStatus> = {
  blocked: 'never_ask_again',
  denied: 'denied',
  granted: 'granted',
  limited: 'granted',
  unavailable: 'unavailable',
}

async function check(type: PermissionType):Promise<PermissionStatus> {
  const status = await rnpCheck(mapType[type]);
  return mapStatus[status];
}

async function request(type: PermissionType) :Promise<PermissionStatus> {
  const status = await rnpRequest(mapType[type]);
  return mapStatus[status]
}

export const permissionService: PermissionService = {
  check,
  request
}
