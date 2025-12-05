import React, { useRef } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';


import { useScrollToTop } from '@react-navigation/native';

import { PostItem } from '../../../components/PostItem/PostItem';
import { Screen } from '../../../components/Screen/Screen';
import { Post } from '../../../domain/Post/postTypes';
import { usePostList } from '../../../domain/Post/useCases/usePostList';
import { AppTabScreenProps } from '../../../routes/navigationType';

import { HomeEmpty } from './components/HomeEmpty';
import { HomeHeader } from './components/HomeHeader';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomeScreen({ navigation }: AppTabScreenProps<'HomeScreen'>) {
  const {
    dataList: postList,
    isLoading,
    isError,
    refresh,
    fetchNextPage,
  } = usePostList();

  const flatListRef = useRef<FlatList<Post>>(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<Post>): React.JSX.Element {
    return <PostItem item={item} />;
  }

  return (
    <Screen style={{ paddingHorizontal: 0, paddingTop: 0, flex: 1 }}>
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={postList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={HomeHeader}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
        refreshing={isLoading}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<HomeEmpty loading={isLoading} reloadData={refresh} error={isError} />}
        contentContainerStyle={{ flex: postList.length > 0 ? undefined : 1 }}
      />
    </Screen>
  );
}
