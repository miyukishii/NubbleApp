import { Text } from '../../../../components/UI/Text/Text';
import { Box } from '../../../../components/UI/Box/Box';
import { Icon } from '../../../../components/Icon/Icon';
import { PressableBox } from '../../../../components/UI/Box/TouchbleOpacityBox';
import { PageTemplateProps } from './PageTemplate';

type BottomMenuProps = Pick<PageTemplateProps, 'onPressNext' | 'onPressSkip'>

export function BottomMenu({
  onPressSkip,
  onPressNext
}:BottomMenuProps) {
  return (
    <Box
      flexDirection='row'
      justifyContent='space-between'>
      <PressableBox
        hitSlop={10}
        onPress={onPressSkip}
      >
        <Text>Pular</Text>
      </PressableBox>
      <PressableBox
        hitSlop={10}
        flexDirection='row'
        alignItems='center'
        onPress={onPressNext}
      >
        <Text marginRight='s4' bold>Próximo</Text>
        <Icon name='arrowRight' />
      </PressableBox>
    </Box>
  );
}
