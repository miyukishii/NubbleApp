import { useTheme } from '@shopify/restyle';
import { Pressable } from 'react-native';


import { ArrowLeftIcon } from '../../assets/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../assets/icons/ArrowRighttIcon';
import { BellIcon } from '../../assets/icons/BellIcon';
import { BellOnIcon } from '../../assets/icons/BellOnIcon';
import { BookMarkFillICon } from '../../assets/icons/BookMarkFillIcon';
import { BookMarkICon } from '../../assets/icons/BookMarkIcon';
import { CameraClick } from '../../assets/icons/CameraClick';
import { CameraIcon } from '../../assets/icons/CameraIcon';
import { ChatIcon } from '../../assets/icons/ChatIcon';
import { ChatOnIcon } from '../../assets/icons/ChatOnIcon';
import { CheckRoundIcon } from '../../assets/icons/CheckRoundIcon';
import { ChevronRightIcon } from '../../assets/icons/ChevronRightIcon';
import { CommentIcon } from '../../assets/icons/CommentIcon';
import { ErrorRoundIcon } from '../../assets/icons/ErrorRoundIcon';
import { EyeOffIcon } from '../../assets/icons/EyeOffIcon';
import { EyeOnIcon } from '../../assets/icons/EyeOnIcon';
import { FlashOffIcon } from '../../assets/icons/FlashOffIcon';
import { FlashOnIcon } from '../../assets/icons/FlashOnIcon';
import { HeartFillIcon } from '../../assets/icons/HeartFillIcon';
import { HeartIcon } from '../../assets/icons/HeartIcon';
import { HomeFillIcon } from '../../assets/icons/HomeFillIcon';
import { HomeIcon } from '../../assets/icons/HomeIcon';
import { MessageRoundIcon } from '../../assets/icons/MessageRoundIcon';
import { ProfileFillIcon } from '../../assets/icons/ProfileFillIcon';
import { ProfileIcon } from '../../assets/icons/ProfileIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { SettingsIcon } from '../../assets/icons/SettingsIcon';
import { TrashIcon } from '../../assets/icons/TrashIcon';
import { Theme, ThemeColors } from '../../theme/theme';

export interface IconBaseProps {
  size?: number;
  color?: string;
  fillColor?: string;
}

export interface IconProps{
  name: IconsNames;
  size?: number;
  color?: ThemeColors;
  fillColor?: ThemeColors;
  onPress?: () => void;
}

export function Icon({ name, size = 20, color = 'backgroundConstrast', fillColor = 'background', onPress }: IconProps) {
  const { colors } = useTheme<Theme>();
  const SVGIcon = iconRegistry[name];

  const iconProps: React.ComponentProps<typeof SVGIcon> = {
    size, color: colors[color],
    fillColor: colors[fillColor]
  }

  if (onPress) {
    return (<Pressable hitSlop={10} onPress={onPress}>
      <SVGIcon {...iconProps} />
    </Pressable>);
  }
  return <SVGIcon {...iconProps} />;
}

const iconRegistry = {
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
  bell: BellIcon,
  bellOn: BellOnIcon,
  bookMark: BookMarkICon,
  bookMarkFill: BookMarkFillICon,
  camera: CameraIcon,
  cameraClick: CameraClick,
  chat: ChatIcon,
  chatOn: ChatOnIcon,
  checkRound: CheckRoundIcon,
  chevronRight: ChevronRightIcon,
  comment: CommentIcon,
  errorRound: ErrorRoundIcon,
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  flashOn: FlashOnIcon,
  flashOff: FlashOffIcon,
  heart: HeartIcon,
  heartFill: HeartFillIcon,
  home: HomeIcon,
  homeFill: HomeFillIcon,
  messageRound: MessageRoundIcon,
  profileFill: ProfileFillIcon,
  profile: ProfileIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  trash: TrashIcon,
};

type IconType = typeof iconRegistry;
type IconsNames = keyof IconType;
