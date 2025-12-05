import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from './AuthStack';

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends AuthStackParamList {}
  }
}

export type AuthScreenProps<RouteName extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, RouteName>;
