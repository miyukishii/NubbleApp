import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/UI/Text/Text';
import { AppTabScreenProps } from '../../../routes/navigationType';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FavoritesScreen({ navigation }: AppTabScreenProps<'FavoritesScreen'>) {
  return (
    <Screen>
      <Text preset="headingLarge" bold marginBottom="s8">Favorites Screen</Text>
    </Screen>
  );
}
