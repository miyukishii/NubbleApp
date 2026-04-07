import { FlatList, ListRenderItemInfo } from 'react-native';

import { Screen } from '../../../components/Screen/Screen';
import { Button } from '../../../components/UI/Button/Button';
import { Separator } from '../../../components/UI/Separator/Separator';
import { useAuthSignOut } from '../../../domain/Auth/useCases/useAuthSignOut';
import { AppScreenProps } from '../../../routes/navigationType';

import { MenuItem, MenuItemProps } from './components/MenuItem';


export function SettingsScreen({ navigation }: AppScreenProps<'SettingsScreen'>) {
  const { isLoading, signOut } = useAuthSignOut();

  const options: MenuItemProps[] = [
    { label: 'Termos de uso', onPress: () => {} },
    { label: 'Política de privacidade', onPress: () => {} },
    { label: 'Modo escuro', onPress: () => navigation.navigate('DarkModeScreen') },
  ]

  const renderItem = ({ item }: ListRenderItemInfo<MenuItemProps >): React.JSX.Element => {
    return <MenuItem {...item} />;
  }

  return (
    <Screen
      canGoBack
      showGoBack={false}
      title="Configurações"
      flex={1}
    >
      <FlatList
        data={options}
        keyExtractor={(item) => item.label}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={
          <Button
            title="Sair da conta"
            loading={isLoading}
            onPress={signOut}
            marginTop='s40'
          />
        }
      />

    </Screen>
  );
}
