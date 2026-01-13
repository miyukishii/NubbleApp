import { ThemeColors } from '../../../theme/theme';
import { TouchbleOpacityBoxProps } from '../Box/TouchbleOpacityBox';

import { ButtonVariants } from './Button';

interface ButtonUI {
  container: TouchbleOpacityBoxProps;
  content: ThemeColors;
}

export const buttonPresets: Record<ButtonVariants, {
  default: ButtonUI;
  disabled: ButtonUI;
}> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'buttonPrimary',
      },
      content: 'primaryConstrast',
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: 'gray2',
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: 'primary',
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray4',
      },
      content: 'gray2',
    },
  },
  ghost: {
    default: {
      container: {
        backgroundColor: 'white70',
      },
      content: 'grayBlack',
    },
    disabled: {
      container: {
        backgroundColor: 'white70',
      },
      content: 'gray1',
    },
  },
};
