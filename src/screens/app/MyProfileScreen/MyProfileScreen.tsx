import { Icon } from '../../../components/Icon/Icon';
import { ProfileAvatar } from '../../../components/ProfileAvatar/ProfileAvatar';
import { Screen } from '../../../components/Screen/Screen';
import { Box, BoxProps } from '../../../components/UI/Box/Box';
import { Text } from '../../../components/UI/Text/Text';
import { AppTabScreenProps } from '../../../routes/navigationType';
import { useAuthCredentials } from '../../../services/authCredentials/useAuthCredentials';


export function MyProfileScreen({ navigation }: AppTabScreenProps<'MyProfileScreen'>) {
  const { authCredentials } = useAuthCredentials();
  return (
    <Screen>
      <Box
        {...$StyledBox}
      >
        <Box />
        {
          authCredentials && (
            <Box alignItems="center">
              <ProfileAvatar imageUrl={authCredentials.user.profileUrl} size={64} borderRadius={24} />
              <Text bold>{authCredentials.user.fullName}</Text>
              <Text>@{authCredentials.user.username}</Text>
            </Box>
          )
        }
        <Icon name="settings" onPress={() => navigation.navigate('SettingsScreen')} />
      </Box>
    </Screen>
  );
}

const $StyledBox: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};
