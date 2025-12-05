import { useAvailability } from '../../../hooks/useAvailability';
import { QueryKeys } from '../../../types/infraTypes';
import { authService } from '../authService';

interface Param {
  email: string;
  enabled: boolean;
}

export function useAuthIsEmailAvailable({
  email,
  enabled,
}:Param) {
  return useAvailability({
    value: email,
    enabled,
    debounceMs: 2000,
    queryKey: QueryKeys.IsEmailAvailable,
    callback: (value) => authService.isEmailAvailable({ email: value }),
  });

}
