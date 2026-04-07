import { ListRenderItemInfo } from 'react-native';

import { InfinityScrollList } from '../../../components/InfinityScrollList/InfinityScrollList';
import { PostItem } from '../../../components/PostItem/PostItem';
import { Screen } from '../../../components/Screen/Screen';
import { postService } from '../../../domain/Post/postService';
import { Post } from '../../../domain/Post/postTypes';
import { AppTabScreenProps } from '../../../routes/navigationType';
import { QueryKeys } from '../../../types/infraTypes';

import { HomeHeader } from './components/HomeHeader';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomeScreen({ navigation }: AppTabScreenProps<'HomeScreen'>) {
  function renderItem({ item }: ListRenderItemInfo<Post>): React.JSX.Element {
    return <PostItem item={item} />;
  }
  return (
    <Screen style={{ paddingHorizontal: 0, paddingTop: 0, flex: 1 }}>
      <InfinityScrollList
        renderItem={renderItem}
        flatListProps={{ ListHeaderComponent: HomeHeader }}
        emptyListProps={{
          onEmptyText: "Não há publicações no seu feed.",
          onLoadErrorText: "Não foi possível carregar o feed."
        }}
        queryProps={{
          getList: postService.getList,
          queryKey: [QueryKeys.PostList]
        }}
      />
    </Screen>
  );
}
