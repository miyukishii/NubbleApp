import { useEffect } from "react";
import { useAuthCredentials } from "../services/authCredentials/useAuthCredentials";
import { useOnboarding } from "../services/settings/useSettings";
import { settingsService } from "../services/settings/settingsService";

export type Stacks = 'Loading' | 'Auth' | 'App' | 'Onboarding';

export function useRouter(): Stacks {
  const onboarding = useOnboarding();
  const { authCredentials, isLoading } = useAuthCredentials();
  const authenticated = !!authCredentials;

  useEffect(() => {
    if (!isLoading) {
      settingsService.hideSplashScreen()
    }
  }, [isLoading])

  if (isLoading) {
    return 'Loading';
  }
  if (onboarding.showOnboarding) {
    return 'Onboarding';
  }
  if (authenticated) {
    return 'App';
  }
  return 'Auth'
}
