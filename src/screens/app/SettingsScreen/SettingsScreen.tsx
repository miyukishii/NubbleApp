import { Screen } from '../../../components/Screen/Screen';
import { Button } from '../../../components/UI/Button/Button';
import { useAuthSignOut } from '../../../domain/Auth/useCases/useAuthSignOut';
import { AppScreenProps } from '../../../routes/navigationType';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SettingsScreen({ navigation }: AppScreenProps<'SettingsScreen'>) {
  const { isLoading, signOut } = useAuthSignOut();
  return (
    <Screen canGoBack showGoBack={false} title="Configurações">
      <Button title="Sair da conta" loading={isLoading} onPress={signOut} />
    </Screen>
  );
}
