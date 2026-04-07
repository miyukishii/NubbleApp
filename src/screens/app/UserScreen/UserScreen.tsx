import { ProfileAvatar } from '../../../components/ProfileAvatar/ProfileAvatar';
import { Screen } from '../../../components/Screen/Screen';
import { ActivityIndicator } from '../../../components/UI/ActivityIndicator/ActivityIndicator';
import { Box } from '../../../components/UI/Box/Box';
import { Text } from '../../../components/UI/Text/Text';
import { useUserGetById } from '../../../domain/Users/useCases/useUserGetById';
import { AppScreenProps } from '../../../routes/navigationType';

export function UserScreen({ route }: AppScreenProps<'UserScreen'>) {
  const id = route.params.userId;
  const userId = Number(id);

  const { userData, isLoading, error } = useUserGetById(userId);

  return (
    <Screen canGoBack>
      {isLoading && <ActivityIndicator />}
      {error && <Text>Erro ao carregar perfil do usuário</Text>}
      {userData && (
        <Box alignItems="center">
          <ProfileAvatar imageUrl={userData.profileUrl} size={64} borderRadius={24} />
          <Text bold>{userData.fullName}</Text>
          <Text>@{userData.username}</Text>
        </Box>
      )}
    </Screen>
  );
}
