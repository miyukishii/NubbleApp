import { FlatList, ListRenderItemInfo } from 'react-native';

import { Screen } from '../../../components/Screen/Screen';
import { Separator } from '../../../components/UI/Separator/Separator';
import { AppScreenProps } from '../../../routes/navigationType';
import { useSettingsService, useThemePreference } from '../../../services/settings/useSettings';

import { MenuItem, RadioButtonItemProps, } from './components/MenuItem';

const options: RadioButtonItemProps [] = [
  { label: 'Ativado', themePreference: 'dark' },
  { label: 'Desativado', themePreference: 'light' },
  {
    label: 'Padrão do sistema',
    subText: 'A aparência será a mesma que você configurou no seu dispositivo',
    themePreference: 'system' },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DarkModeScrren({ navigation }: AppScreenProps<'DarkModeScreen'>) {
  const themePreference = useThemePreference()
  const { setThemePreference } = useSettingsService();

  const radioButtonSelector = (item: RadioButtonItemProps) : void=> {
    setThemePreference(item.themePreference)
  }

  const renderItem = ({ item }: ListRenderItemInfo<RadioButtonItemProps >): React.JSX.Element => {
    return (
      <MenuItem
        item={item}
        isSelected={item.themePreference === themePreference}
        onSelect={radioButtonSelector}
      />
    );
  }
  return (
    <Screen
      canGoBack
      showGoBack={false}
      title="Modo escuro"
      flex={1}
    >
      <FlatList
        data={options}
        extraData={themePreference}
        keyExtractor={(item) => item.themePreference}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
      />
    </Screen>
  );
}
