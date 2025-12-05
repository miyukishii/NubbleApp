import React from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';

import { Screen } from '../../../components/Screen/Screen';
import { PostComment } from '../../../domain/PostComment/postCommentTypes';
import { usePostCommentList } from '../../../domain/PostComment/useCases/usePostCommentList';
import { useAppSafeArea } from '../../../hooks/useAppSafeArea';
import { AppScreenProps } from '../../../routes/navigationType';

import { CommentBottom } from './components/CommentBottom';
import { CommentCreate } from './components/CommentCreate';
import { CommentItem } from './components/CommentItem';

export function PostCommentScreen({ route }: AppScreenProps<'PostCommentScreen'>) {
  const id = route.params.postId;
  const postId = Number(id);

  const {
    dataList: commentList,
    fetchNextPage,
    isLoading,
    refresh,
    hasNextPage,
  } = usePostCommentList(postId);
  const { bottom } = useAppSafeArea();

  function renderItem({ item }: ListRenderItemInfo<PostComment>): React.JSX.Element {
    return <CommentItem item={item} postId={postId} />;
  }

  return (
    <Screen
      style={{ flex: 1 }}
      canGoBack
      showGoBack={false}
      title="Comentários"
    >
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={commentList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
        refreshing={isLoading}
        ListFooterComponent={<CommentBottom hasNextPage={hasNextPage} loadMore={fetchNextPage} />}
        contentContainerStyle={{ paddingBottom: bottom }}
      />
      <CommentCreate
        postId={postId}
      />
    </Screen>
  );
}
