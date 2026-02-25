import { useAuthCredentials } from "../services/authCredentials/useAuthCredentials";
import { useOnboarding } from "../services/settings/useSettings";

export type Stacks = 'Loading' | 'Auth' | 'App' | 'Onboarding';

export function useRouter(): Stacks {
  const showOboarding = useOnboarding();
  const { authCredentials, isLoading } = useAuthCredentials();
  const authenticated = !!authCredentials;

  if (isLoading) {
    return 'Loading';
  }
  if (showOboarding) {
    return 'Onboarding';
  }
  if (authenticated) {
    return 'App';
  }
  return 'Auth'
}
