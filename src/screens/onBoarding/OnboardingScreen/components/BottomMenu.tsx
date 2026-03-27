import { Icon } from '../../../../components/Icon/Icon';
import { Box } from '../../../../components/UI/Box/Box';
import { PressableBox } from '../../../../components/UI/Box/TouchbleOpacityBox';
import { Text } from '../../../../components/UI/Text/Text';

import { PageTemplateProps } from './PageTemplate';

type BottomMenuProps = Pick<PageTemplateProps, 'onPressNext' | 'onPressSkip'> & {
  isLastPage: boolean;
}

export function BottomMenu({
  isLastPage,
  onPressSkip,
  onPressNext
}:BottomMenuProps) {
  const nextText = isLastPage ? 'Começar' : 'Próximo'
  return (
    <Box
      flexDirection='row'
      justifyContent='space-between'>
      <PressableBox
        hitSlop={10}
        onPress={onPressSkip}
      >
        <Text color='gray2' semibold>Pular</Text>
      </PressableBox>
      <PressableBox
        hitSlop={10}
        flexDirection='row'
        alignItems='center'
        onPress={onPressNext}
      >
        <Text marginRight='s4' bold>{nextText}</Text>
        <Icon name='arrowRight' color='carrotSecondary' />
      </PressableBox>
    </Box>
  );
}
