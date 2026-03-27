import { useRef } from 'react';
import { FlatList, FlatListProps, RefreshControl } from 'react-native';

import { useScrollToTop } from '@react-navigation/native';

import { IUsePaginationList, usePaginationList } from '../../hooks/usePaginationList';
import { EmptyList, EmptyListProps } from './components/EmptyList';

type ItemIConstraints = {
  id: number | string;
}

interface InfinityScrollListProps<ItemT extends ItemIConstraints> {
  renderItem: FlatListProps<ItemT>['renderItem']
  emptyListProps: Pick<EmptyListProps, 'onEmptyText' | 'onLoadErrorText'>
  queryProps: IUsePaginationList<ItemT>
  flatListProps?: Omit<Partial<FlatListProps<ItemT>>, 'renderItem'>;
}

export function InfinityScrollList<ItemT extends ItemIConstraints>({
  renderItem,
  emptyListProps,
  flatListProps,
  queryProps,
}: InfinityScrollListProps<ItemT>) {
  const {
    dataList,
    isLoading,
    isError,
    refresh,
    fetchNextPage,
  } = usePaginationList(queryProps);

  const flatListRef = useRef < FlatList<ItemT>>(null);
  useScrollToTop(flatListRef);

  return (
    <FlatList
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      data={dataList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
      refreshing={isLoading}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={
        <EmptyList
          loading={isLoading}
          reloadData={refresh}
          error={isError}
          onLoadErrorText={emptyListProps.onLoadErrorText}
          onEmptyText={emptyListProps.onEmptyText}
        />}
      {...flatListProps}
      contentContainerStyle={{ flex: dataList.length > 0 ? undefined : 1, ...flatListProps?.contentContainerStyle }}
    />
  );
}
