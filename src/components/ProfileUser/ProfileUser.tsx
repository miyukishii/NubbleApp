import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { GestureResponderEvent } from 'react-native';


import { User } from '../../domain/Users/userTypes';
import { ProfileAvatar, ProfileAvatarProps } from '../ProfileAvatar/ProfileAvatar';
import { Box } from '../UI/Box/Box';
import { PressableBox, PressableBoxProps } from '../UI/Box/TouchbleOpacityBox';
import { Text } from '../UI/Text/Text';

type ProfileUserProps = Pick<User, 'username'| 'profileUrl'| 'id'>;

export function ProfileUser({
  user,
  avatarProps,
  rightComponent,
  onPress,
  ...pressableBoxProps
}: {
  user: ProfileUserProps,
  avatarProps?: Omit<Partial<ProfileAvatarProps>, 'imageUrl'>,
  rightComponent?: React.ReactNode
} & PressableBoxProps): React.JSX.Element {
  const navigation = useNavigation();

  const goToUserProfile = (): void => {
    if (user.id) {
      navigation.navigate('UserScreen', {
        userId: user.id,
      });
    }
  };

  const handleOnPress = (event: GestureResponderEvent): void => {
    if (onPress) {
      onPress(event);
    }
    goToUserProfile();
  };

  return (
    <PressableBox
      onPress={handleOnPress}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb="s16"
      {...pressableBoxProps}
    >
      <Box flexDirection="row" alignItems="center">
        <ProfileAvatar {...avatarProps} imageUrl={user.profileUrl} userId={Number(user.id)} />
        <Text
          ml="s12"
          semibold
        >
          {user.username}
        </Text>
      </Box>
      {rightComponent}
    </PressableBox>
  );
}
