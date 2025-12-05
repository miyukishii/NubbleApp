import { UseFormGetFieldState, UseFormWatch } from 'react-hook-form';

import { useAuthIsEmailAvailable } from '../../../../domain/Auth/useCases/useAuthIsEmailAvailable';
import { useAuthIsUsernameAvailable } from '../../../../domain/Auth/useCases/useAuthIsUsernameAvailable';
import { SignUpSchema } from '../signUpSchema';

type Props = {
  watch: UseFormWatch<SignUpSchema>;
  getFieldState: UseFormGetFieldState<SignUpSchema>,
}

type ReturnValues = {
  errorMessage?: string;
  isFetching: boolean;
}

type AsyncValidationReturn = {
  usernameValidation: ReturnValues;
  emailValidation: ReturnValues;
  isSubmitDisabled: boolean;
}

export function useAsyncValidation({
  watch,
  getFieldState,
}: Props): AsyncValidationReturn {
  const username = watch('username');
  const usernameState = getFieldState('username');
  const usernameIsValid = !usernameState.invalid && usernameState.isDirty;
  const usernameQuery = useAuthIsUsernameAvailable({
    username,
    enabled: usernameIsValid,
  });
  const usernameNotReady = usernameQuery.isLoading || !usernameQuery.isAvailable;

  const email = watch('email');
  const emailState = getFieldState('email');
  const emailIsValid = !emailState.invalid && emailState.isDirty;
  const emailQuery = useAuthIsEmailAvailable({
    email,
    enabled: emailIsValid,
  });
  const emailNotReady = emailQuery.isLoading || !emailQuery.isAvailable;


  return {
    usernameValidation: {
      errorMessage: usernameQuery.isFetched && !usernameQuery.isAvailable ? 'username indisponível' : undefined,
      isFetching: usernameQuery.isLoading,
    },
    emailValidation: {
      errorMessage: emailQuery.isFetched && !emailQuery.isAvailable ? 'e-mail indisponível' : undefined,
      isFetching: emailQuery.isLoading,
    },
    isSubmitDisabled: usernameNotReady || emailNotReady,
  };
}
