import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


import { FormTextfield } from '../../../components/Form/FormTextfield';
import { Screen } from '../../../components/Screen/Screen';
import { Button } from '../../../components/UI/Button/Button';
import { Text } from '../../../components/UI/Text/Text';
import { useAuthForgotPassword } from '../../../domain/Auth/useCases/useAuthForgotPassword';
import { AuthScreenProps } from '../../../routes/navigationType';

import { ForgotPasswordSchema, forgotPasswordSchema } from './forgotPasswordSchema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ForgotPasswordScreen({ navigation }: AuthScreenProps<'ForgotPasswordScreen'>) {
  const { isLoading, resetPassword } = useAuthForgotPassword();
  const { control, formState, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (formValues:ForgotPasswordSchema) => {
    resetPassword(formValues);
  };
  return (
    <Screen canGoBack>
      <Text preset="headingLarge" bold marginBottom="s8">Esqueci minha senha</Text>
      <Text preset="paragraphLarge" marginBottom="s32">Digite seu e-mail e enviaremos as instruções para redefinição de senha</Text>
      <FormTextfield
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 's20' }}
        control={control}
        name="email"
      />
      <Button
        disabled={!formState.isValid || isLoading}
        onPress={handleSubmit(onSubmit)}
        preset="primary"
        title="Recuperar senha"
        loading={isLoading}
        marginTop="s12"
      />
    </Screen>
  );
}
