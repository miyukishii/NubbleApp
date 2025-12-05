import { useMutation } from '@tanstack/react-query';

import { useResetNavigationSuccess } from '../../../hooks/useResetNavigationSuccess';
import { useToast } from '../../../services/toast/useToast';
import { authService } from '../authService';
import { ForgotPasswordData } from '../authTypes';

export function useAuthForgotPassword() {
  const { showToast } = useToast();
  const { reset } = useResetNavigationSuccess();

  const { mutate, isPending } = useMutation<string, unknown, ForgotPasswordData>({
    mutationFn: (forgotPasswordData) => authService.forgotPassword(forgotPasswordData),
    retry: false,
    onSuccess: () => {
      reset({
        title: 'Enviamos as instruções para seu e-mail',
        description: 'Clique no link enviado no seu e-mail para recuperar sua senha',
        buttonText: 'Voltar ao início',
        icon: {
          name: 'messageRound',
          color: 'primary',
          size: 48,
        },
      });
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

  const resetPassword = (data: ForgotPasswordData) => mutate(data);

  return {
    isLoading: isPending,
    resetPassword,
  };
}
