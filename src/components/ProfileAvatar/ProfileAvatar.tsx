import React from 'react';
import { Image, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import userNoImage from '../../assets/images/user.png';

export interface ProfileAvatarProps {
  userId?: number;
  imageUrl: string;
  /** @default 32 */
  size?: number;
  /** @default 14 */
  borderRadius?: number;
  navigateToProfile?: boolean;
}

export function ProfileAvatar({ userId, imageUrl, size = 32, borderRadius = 14, navigateToProfile }: ProfileAvatarProps): React.JSX.Element {
  const navigation = useNavigation();

  const goToUserProfile = (): void => {
    if (!navigateToProfile) {return;}
    if (userId) {
      navigation.navigate('UserScreen', {
        userId,
      });
    }
  };

  return (
    <Pressable onPress={goToUserProfile}>
      <Image
        source={imageUrl ? { uri: imageUrl } : userNoImage}
        style={{ width: size, height: size, borderRadius: borderRadius }}
      />
    </Pressable>
  );
}
