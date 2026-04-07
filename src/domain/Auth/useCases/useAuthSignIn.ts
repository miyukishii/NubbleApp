import { useMutation } from '@tanstack/react-query';

import { useAuthCredentials } from '../../../services/authCredentials/useAuthCredentials';
import { useToast } from '../../../services/toast/useToast';
import { authService } from '../authService';
import { AuthCredentials, SignInData } from '../authTypes';

export function useAuthSignIn() {
  const { showToast } = useToast();
  const { saveCredentials } = useAuthCredentials();

  const { mutate, isPending, isSuccess, isError } = useMutation<AuthCredentials, unknown, SignInData>({
    mutationFn: (signInData) => authService.signIn(signInData),
    onSuccess: (authCredendial) => {
      saveCredentials(authCredendial);
    },
    onError: (err) => {
      console.log('err:', err);
      showToast({
        message: 'Senha ou email incorretos.',
        type: 'error',
        duration: 4000,
      });
    },
  });

  const signIn = (data: SignInData) => mutate(data);

  return {
    isLoading: isPending,
    signIn,
    isSuccess,
    isError
  };
}
