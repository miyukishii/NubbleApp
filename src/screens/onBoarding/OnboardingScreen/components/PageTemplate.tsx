import { Dimensions } from 'react-native';
import { Box } from '../../../../components/UI/Box/Box';
import { BottomMenu } from './BottomMenu';
import { Content } from './Content';
import { ImageHeader } from './ImageHeader';
import { PageItem } from './onboardingData';

const SCREEN_WIDTH = Dimensions.get('window').width;

export type PageTemplateProps = {
  pageItem: PageItem
  onPressSkip: () => void;
  onPressNext: () => void;
}

export function PageTemplate({
  pageItem,
  onPressSkip,
  onPressNext
}: PageTemplateProps) {
  return (
    <Box flex={1} width={SCREEN_WIDTH}>
      <Box flex={4}>
        <ImageHeader image={pageItem.imageHeader} />
      </Box>
      <Box flex={5}>
        <Content content={pageItem.content} />
      </Box>
      <Box flex={1} backgroundColor='primary'>
        <BottomMenu
          onPressSkip={onPressSkip}
          onPressNext={onPressNext}
        />
      </Box>
    </Box>
  );
}
