import { useMutation } from '@tanstack/react-query';

import { useResetNavigationSuccess } from '../../../hooks/useResetNavigationSuccess';
import { useToast } from '../../../services/toast/useToast';
import { authService } from '../authService';
import { SignUpData } from '../authTypes';

export function useAuthSignUp() {
  const { showToast } = useToast();
  const { reset } = useResetNavigationSuccess();

  const { mutate, isPending } = useMutation<void, unknown, SignUpData>({
    mutationFn: (signUpData) => authService.register(signUpData),
    retry: false,
    onSuccess: () => {
      reset({
        title: 'Sua conta foi criada com sucesso!',
        description: 'Agora é só fazer login na nossa plataforma',
        buttonText: 'Voltar ao início',
        icon: {
          name: 'checkRound',
          color: 'success',
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

  const signUp = (data: SignUpData) => mutate(data);

  return {
    isLoading: isPending,
    signUp,
  };
}
