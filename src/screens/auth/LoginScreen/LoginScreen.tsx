
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormPasswordInput } from '../../../components/Form/FormPasswordInput';
import { FormTextfield } from '../../../components/Form/FormTextfield';
import { Screen } from '../../../components/Screen/Screen';
import { Button } from '../../../components/UI/Button/Button';
import { Text } from '../../../components/UI/Text/Text';
import { useAuthSignIn } from '../../../domain/Auth/useCases/useAuthSignIn';
import { AuthScreenProps } from '../../../routes/navigationType';

import { loginSchema, LoginSchema } from './loginSchema';


export function LoginScreen({ navigation }: AuthScreenProps<'LoginScreen'>) {
  const { isLoading, signIn } = useAuthSignIn();
  const { control, formState, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const navigationToSignUpScreen = () => {
    navigation.navigate('SignUpScreen');
  };

  const navigationToPasswordRecovery = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const onSubmit = (formValues: LoginSchema) => {
    signIn(formValues);
  };

  return (
    <Screen>
      <Text preset="headingLarge" bold marginBottom="s8">Olá</Text>
      <Text preset="paragraphLarge" marginBottom="s40">Digite seu e-mail e senha para entrar</Text>
      <FormTextfield
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 's20' }}
        control={control}
        name="email"
      />
      <FormPasswordInput
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{ mb: 's10' }}
        control={control}
        name="password"
      />
      <Text
        bold
        preset="paragraphSmall"
        color="primary"
        onPress={navigationToPasswordRecovery}
      >
        Esqueci minha senha
      </Text>
      <Button
        disabled={!formState.isValid}
        onPress={handleSubmit(onSubmit)}
        title="Entrar"
        loading={isLoading}
        marginTop="s48"
      />
      <Button
        onPress={navigationToSignUpScreen}
        preset="outline"
        title="Criar uma conta"
        loading={false}
        marginTop="s12"
      />
    </Screen>
  );
}
