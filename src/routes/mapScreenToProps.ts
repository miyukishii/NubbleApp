import { IconProps } from '../components/Icon/Icon';

import { AppBottomTabParamList } from './AppTabNavigator';
export const mapScreenToProps: Record<keyof AppBottomTabParamList,
{
  label: string;
  icon: {
    focused: IconProps['name'],
    unFocused: IconProps['name'],
  };
}
> = {
  HomeScreen: {
    label: 'Início',
    icon: {
      focused: 'homeFill',
      unFocused: 'home',
    },
  },
  NewPostScreen: {
    label: 'Novo Post',
    icon: {
      focused: 'bookMarkFill',
      unFocused: 'bookMark',
    },
  },
  FavoritesScreen: {
    label: 'Favoritos',
    icon: {
      focused: 'heartFill',
      unFocused: 'heart',
    },
  },
  MyProfileScreen: {
    label: 'Meu Perfil',
    icon: {
      focused: 'profileFill',
      unFocused: 'profile',
    },
  },
};
