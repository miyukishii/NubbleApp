import React from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';

import { PostItem } from '../../../components/PostItem/PostItem';
import { Screen } from '../../../components/Screen/Screen';
import { usePostGetById } from '../../../domain/Post/useCases/usePostGetById';
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
  const showPost = route.params.showPost || false;

  const {
    dataList: commentList,
    fetchNextPage,
    isLoading,
    refresh,
    hasNextPage,
  } = usePostCommentList(postId);
  const {
    postData
  } = usePostGetById(postId, showPost)
  const { bottom } = useAppSafeArea();

  function renderItem({ item }: ListRenderItemInfo<PostComment>): React.JSX.Element {
    return <CommentItem item={item} postId={postId} />;
  }

  return (
    <Screen
      style={{ flex: 1 }}
      noHorizontalPadding
      canGoBack
      showGoBack={false}
      title={
        showPost ? "Post" : "Comentários"
      }
    >
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={commentList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
        refreshing={isLoading}
        ListHeaderComponent={postData && <PostItem hideCommentActions={showPost} item={postData} />}
        ListFooterComponent={<CommentBottom hasNextPage={hasNextPage} loadMore={fetchNextPage} />}
        contentContainerStyle={{ paddingBottom: bottom }}
      />
      <CommentCreate
        postId={postId}
      />
    </Screen>
  );
}
