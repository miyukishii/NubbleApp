import { Dimensions, ListRenderItemInfo } from 'react-native';

import { InfinityScrollList } from '../../../components/InfinityScrollList/InfinityScrollList';
import { Screen } from '../../../components/Screen/Screen';
import { AppTabScreenProps } from '../../../routes/navigationType';
import { postReactionService } from '../../../domain/PostReaction/postReactionService';
import { PostReaction } from '../../../domain/PostReaction/postReactionTypes';
import { QueryKeys } from '../../../types/infraTypes';
import { FavoriteItem } from './components/FavoritetItem';

const NUM_COL = 2;
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_PADDING_TOTAL = 24 * 2;
const ITEM_GAP = 16;

const ITEM_WIDTH = (SCREEN_WIDTH - SCREEN_PADDING_TOTAL - ITEM_GAP) / NUM_COL;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FavoritesScreen({ navigation }: AppTabScreenProps<'FavoritesScreen'>) {
  function renderItem({ item }: ListRenderItemInfo<PostReaction>): React.JSX.Element {
    return <FavoriteItem item={item} imageSize={ITEM_WIDTH} />;
  }
  return (
    <Screen
      title='Favoritos'
      canGoBack
      showGoBack={false}
    >
      <InfinityScrollList
        renderItem={renderItem}
        emptyListProps={{
          onEmptyText: "Favorite uma publicação e ela aparecerá aqui.",
          onLoadErrorText: "Não foi possível carregar os seus favoritos."
        }}
        flatListProps={{ numColumns: NUM_COL, columnWrapperStyle: { columnGap: ITEM_GAP }, contentContainerStyle: { rowGap: ITEM_GAP } }}
        queryProps={{
          getList: (pageParams) => postReactionService.getUserReactions({
            reaction_type: 'favorite',
            ...pageParams
          }),
          queryKey: [QueryKeys.FavoriteList]
        }}
      />
    </Screen>
  );
}
