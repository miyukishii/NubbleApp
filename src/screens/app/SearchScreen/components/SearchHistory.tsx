import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Icon } from '../../../../components/Icon/Icon';
import { ProfileUser } from '../../../../components/ProfileUser/ProfileUser';
import { Box } from '../../../../components/UI/Box/Box';
import { PressableBox } from '../../../../components/UI/Box/TouchbleOpacityBox';
import { Text } from '../../../../components/UI/Text/Text';
import { User } from '../../../../domain/Users/userTypes';
import { useSearchHistoryService, useSearchHistoryZustand } from '../../../../services/searchHistory/useSearchHitory';

export function SearchHistory(): React.JSX.Element {
  const userList = useSearchHistoryZustand();
  const searchHistoryService = useSearchHistoryService();

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
        rightComponent={(
          <Icon
            name="trash"
            color="gray1"
            onPress={() => searchHistoryService.removeUser(user.id)}
          />
        )}
      />
    );
  };
  return (
    <Box>
      <FlatList
        ListHeaderComponent={(
          <Box
            mb="s16"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              bold
              preset="headingMedium"
            >
              Buscas recentes
            </Text>
            {userList.length > 0 && (
              <PressableBox
                onPress={() => searchHistoryService.clearUserList()}
              >
                <Text bold preset="paragraphSmall">
                Limpar tudo
                </Text>
              </PressableBox>
            )}
          </Box>
        )}
        data={userList}
        renderItem={renderItem}
        keyExtractor={item => item.username}
      />
    </Box>
  );

}
