import { useEffect, useState } from "react";
import { PermissionStatus, PermissionType } from "./permissionType";
import { permissionService } from "./permissionService";

export function usePermission(permissionType: PermissionType) {
  const [loading, setLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();

  async function checkPermission() {
    try {
      setLoading(true)
      const initialStatus = await permissionService.check(permissionType)

      if (initialStatus === 'denied') {
        const newStatus = await permissionService.request(permissionType)
        setPermissionStatus(newStatus)
      } else {
        setPermissionStatus(initialStatus)
      }
    }catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      setPermissionStatus('unavailable')
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    checkPermission()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    permissionStatus,
    loading,
  };
}
