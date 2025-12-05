import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


import { FormPasswordInput } from '../../../components/Form/FormPasswordInput';
import { FormTextfield } from '../../../components/Form/FormTextfield';
import { Screen } from '../../../components/Screen/Screen';
import { ActivityIndicator } from '../../../components/UI/ActivityIndicator/ActivityIndicator';
import { Button } from '../../../components/UI/Button/Button';
import { Text } from '../../../components/UI/Text/Text';
import { useAuthSignUp } from '../../../domain/Auth/useCases/useAuthSignUp';
import { AuthScreenProps } from '../../../routes/navigationType';

import { useAsyncValidation } from './hooks/useAsyncValidation';
import { signUpSchema, SignUpSchema } from './signUpSchema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SignUpScreen({ navigation }: AuthScreenProps<'SignUpScreen'>) {
  const { signUp, isLoading } = useAuthSignUp();
  const { control, formState, handleSubmit, watch, getFieldState } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (formValues: SignUpSchema) => {
    signUp(formValues);
  };

  const { emailValidation, usernameValidation, isSubmitDisabled } = useAsyncValidation({
    watch,
    getFieldState,
  });

  return (
    <Screen>
      <Text preset="headingLarge" bold mb="s32">Criar uma conta</Text>
      <FormTextfield
        label="Seu username"
        placeholder="@"
        boxProps={{ mb: 's20' }}
        control={control}
        name="username"
        errorMessage={usernameValidation.errorMessage}
        RightComponent={usernameValidation.isFetching ? (<ActivityIndicator size="small" />) : undefined}
      />
      <FormTextfield
        label="Nome"
        autoCapitalize="words"
        placeholder="Digite seu nome"
        boxProps={{ mb: 's20' }}
        control={control}
        name="firstName"
      />
      <FormTextfield
        label="Sobrenome"
        autoCapitalize="words"
        placeholder="Digite seu sobrenome"
        boxProps={{ mb: 's20' }}
        control={control}
        name="lastName"
      />
      <FormTextfield
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 's20' }}
        control={control}
        name="email"
        errorMessage={emailValidation.errorMessage}
        RightComponent={emailValidation.isFetching ? (<ActivityIndicator size="small" />) : undefined}
      />
      <FormPasswordInput
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{ mb: 's10' }}
        control={control}
        name="password"
      />
      <Button disabled={!formState.isValid || isSubmitDisabled} onPress={handleSubmit(onSubmit)} preset="primary" title="Criar uma conta" loading={isLoading} marginTop="s32" />
    </Screen>

  );
}
