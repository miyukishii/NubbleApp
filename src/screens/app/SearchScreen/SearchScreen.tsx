import React, { useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { ProfileUser } from '../../../components/ProfileUser/ProfileUser';
import { Screen } from '../../../components/Screen/Screen';
import { useUserSearch } from '../../../domain/Users/useCases/useUserSearch';
import { User } from '../../../domain/Users/userTypes';
import { useDebounce } from '../../../hooks/useDebounce';
import { AppScreenProps } from '../../../routes/navigationType';
import { useSearchHistoryService } from '../../../services/searchHistory/useSearchHitory';

import { SearchField } from './components/SearchField';
import { SearchHistory } from './components/SearchHistory';

// eslint-disable-next-line no-empty-pattern
export function SearchScreen({}: AppScreenProps<'SearchScreen'>) {
  const [searchString, setSearchString] = useState('');

  const debouncedSearch = useDebounce(searchString);
  const searchHistoryService = useSearchHistoryService();
  const {
    dataList,
  } = useUserSearch(debouncedSearch);

  const renderItem = ({ item }: ListRenderItemInfo<User>): React.JSX.Element => {
    const user = {
      profileUrl: item.profileUrl,
      id: item.id,
      username: item.username,
    };

    return (
      <ProfileUser
        user={user}
        avatarProps={{
          size: 48,
        }}
        onPress={() => {
          searchHistoryService.addUser(item);
          setSearchString('');
        }}
      />
    );
  };

  return (
    <Screen
      canGoBack
      showGoBack={false}
      HeaderComponent={<SearchField searchString={searchString} setSearchString={setSearchString} />}
    >
      {
        searchString.length === 0 ? (
          <SearchHistory />
        ) : (
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={item => item.username}
          />
        )
      }
    </Screen>
  );
}
