import { useAvailability } from '../../../hooks/useAvailability';
import { QueryKeys } from '../../../types/infraTypes';
import { authService } from '../authService';

interface Param {
  username: string;
  enabled: boolean;
}

export function useAuthIsUsernameAvailable({
  username,
  enabled,
}:Param) {
  return useAvailability({
    value: username,
    enabled,
    debounceMs: 1500,
    queryKey: QueryKeys.IsUserNameAvailable,
    callback: (value) => authService.isUserNameAvailable({ username: value }),
  });

}
