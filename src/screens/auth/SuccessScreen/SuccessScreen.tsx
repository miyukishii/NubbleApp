import { Icon } from '../../../components/Icon/Icon';
import { Screen } from '../../../components/Screen/Screen';
import { Button } from '../../../components/UI/Button/Button';
import { Text } from '../../../components/UI/Text/Text';
import { AuthScreenProps } from '../../../routes/navigationType';


export function SuccessScreen({ route, navigation }: AuthScreenProps<'SuccessScreen'>) {
  const goBackToStart = () => {
    navigation.goBack();
  };
  return (
    <Screen>
      <Icon {...route.params.icon} />
      <Text mt="s24" preset="headingLarge">{route.params.title}</Text>
      <Text mt="s16" preset="paragraphLarge">{route.params.description}</Text>
      <Button onPress={goBackToStart} preset="primary" title={route.params.buttonText} loading={false} marginTop="s40" />
    </Screen>
  );
}
