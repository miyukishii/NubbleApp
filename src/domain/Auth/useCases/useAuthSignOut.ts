import { useMutation } from '@tanstack/react-query';

import { useAuthCredentials } from '../../../services/authCredentials/useAuthCredentials';
import { useSearchHistoryService } from '../../../services/searchHistory/useSearchHitory';
import { useToast } from '../../../services/toast/useToast';
import { authService } from '../authService';

export function useAuthSignOut() {
  const { showToast } = useToast();
  const { removeCredentials } = useAuthCredentials();
  const searchHistoryService = useSearchHistoryService();

  const { mutate, isPending } = useMutation<string, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,
    onSettled: () => {
      removeCredentials();
      searchHistoryService.clearUserList();
    },
    onError: (err) => {
      console.log('err:', err);
      showToast({
        message: 'Algo deu errado. Tente novamente.',
        type: 'error',
        duration: 4000,
      });
    },
  });

  const signOut = () => mutate();

  return {
    isLoading: isPending,
    signOut,
  };
}
