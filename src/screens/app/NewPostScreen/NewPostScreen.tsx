import { useCameraRoll } from '../../../hooks/useCameraRoll';
import { Screen } from '../../../components/Screen/Screen';
import { AppTabScreenProps } from '../../../routes/navigationType';
import { Image } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NewPostScreen({ navigation }: AppTabScreenProps<'NewPostScreen'>) {
  const { list } = useCameraRoll()
  return (
    <Screen canGoBack showGoBack={false} title='Novo post'>
      {list.map((photo) => (
        <Image key={photo} style={{ width: 100, height: 100 }} source={{ uri: photo }} />
      ))}
    </Screen>
  );
}
