import { Dimensions } from 'react-native';
import { Box } from '../../../../components/UI/Box/Box';
import { BottomMenu } from './BottomMenu';
import { Content } from './Content';
import { ImageHeader } from './ImageHeader';
import { onBoardingPages, PageItem } from './onboardingData';
import { ProgressIndicator } from './ProgressIndicator';

const SCREEN_WIDTH = Dimensions.get('window').width;

export type PageTemplateProps = {
  pageItem: PageItem
  curretnIndex: number;
  isLastPage: boolean;
  onPressSkip: () => void;
  onPressNext: () => void;
}

export function PageTemplate({
  pageItem,
  curretnIndex,
  isLastPage,
  onPressSkip,
  onPressNext
}: PageTemplateProps) {
  return (
    <Box flex={1} width={SCREEN_WIDTH}>
      <Box flex={4}>
        <ImageHeader image={pageItem.imageHeader} />
      </Box>
      <Box flex={1} paddingHorizontal='s24'>
        <ProgressIndicator
          total={onBoardingPages.length}
          currentIndex={curretnIndex}
        />
      </Box>
      <Box flex={4} paddingHorizontal='s24'>
        <Content content={pageItem.content} />
      </Box>
      <Box flex={1} paddingHorizontal='s24'>
        <BottomMenu
          isLastPage={isLastPage}
          onPressSkip={onPressSkip}
          onPressNext={onPressNext}
        />
      </Box>
    </Box>
  );
}
