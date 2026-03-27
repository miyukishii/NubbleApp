import { useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Box } from '../../../components/UI/Box/Box';
import { OnBoardingScreenProps } from '../../../routes/navigationType';
import { useSettingsService } from '../../../services/settings/useSettings';

import { onBoardingPages, PageItem } from './components/onboardingData';
import { PageTemplate } from './components/PageTemplate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function OnboardingScreen({ route }: OnBoardingScreenProps<'OnboardingScreen'>) {
  const[pageIndex, setPageIndex] = useState(0);

  const flatListRef = useRef<FlatList<PageItem>>(null)
  const { finishOnboarding } = useSettingsService()

  const isLastPage = pageIndex === onBoardingPages.length - 1;

  const onPagePress = ():void => {
    if(isLastPage) {
      finishOnboarding();
    } else {
      const nextIndex = pageIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setPageIndex(nextIndex)
    }
  }

  const onPageSkip = ():void => {
    finishOnboarding()
  }

  const renderItem = ({ item }:ListRenderItemInfo<PageItem>) => {
    return (
      <PageTemplate
        pageItem={item}
        curretnIndex={pageIndex}
        isLastPage={isLastPage}
        onPressSkip={onPageSkip}
        onPressNext={onPagePress}
      />
    )
  }

  return (
    <Box flex={1} backgroundColor='background'>
      <FlatList
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={renderItem}
        data={onBoardingPages}
      />
    </Box>
  );
}
