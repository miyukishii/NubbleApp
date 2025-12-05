import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { LoginSchema, loginSchema } from './loginSchema';
import { FormPasswordInput } from '../../../components/Form/FormPasswordInput';
import { FormTextfield } from '../../../components/Form/FormTextfield';
import { Screen } from '../../../components/Screen/Screen';
import { Button } from '../../../components/UI/Button/Button';
import { Text } from '../../../components/UI/Text/Text';
import { AuthScreenProps } from '../../../routes/navigationType';

export function LoginScreen({ navigation }: AuthScreenProps<'LoginScreen'>) {
  const { control } = useForm<LoginSchema>({
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

  return (
    <Screen>
      <Text preset="headingLarge" bold marginBottom="s8">Olá</Text>
      <Text preset="paragraphLarge" marginBottom="s40">Digite seu e-mail e senha para entrar</Text>
      <FormTextfield
        control={control}
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 's20' }}
        name="email"
      />
      <FormPasswordInput
        control={control}
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{ mb: 's10' }}
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
        title="Entrar"
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
