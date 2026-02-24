import { FlatList, ListRenderItemInfo } from 'react-native';
import { OnBoardingScreenProps } from '../../../routes/navigationType';
import { PageTemplate } from './components/PageTemplate';
import { onBoardingPages, PageItem } from './components/onboardingData';
import { useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function OnboardingScreen({ route }: OnBoardingScreenProps<'OnboardingScreen'>) {
  const[pageIndex, setPageIndex] = useState(0);

  const flatListRef = useRef<FlatList<PageItem>>(null)

  const isLastPage = pageIndex === onBoardingPages.length - 1;

  const onFinishOnboading = (): void => {}

  const onPagePress = ():void => {
    if(isLastPage) {
      onFinishOnboading();
    } else {
      const nextIndex = pageIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setPageIndex(nextIndex)
    }
  }

  const onPageSkip = ():void => {
    if(isLastPage) {
      onFinishOnboading();
    } else {
      const nextIndex = pageIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setPageIndex(nextIndex)
    }
  }

  const renderItem = ({ item }:ListRenderItemInfo<PageItem>) => {
    return (
      <PageTemplate
        pageItem={item}
        onPressSkip={onPageSkip}
        onPressNext={onPagePress}
      />
    )
  }

  return (
    <FlatList
      horizontal
      ref={flatListRef}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      renderItem={renderItem}
      data={onBoardingPages}
    />
  );
}
