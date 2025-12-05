import React from 'react';

import { TouchbleOpacityBox } from '../../../../components/UI/Box/TouchbleOpacityBox';
import { Text } from '../../../../components/UI/Text/Text';

export function CommentBottom({ loadMore, hasNextPage }: {loadMore: () => void; hasNextPage: boolean}): React.JSX.Element | null {
  if (hasNextPage) {
    return (
      <TouchbleOpacityBox onPress={loadMore}>
        <Text
          textAlign="center"
          bold
          color="primary"
        >
          Ver mais
        </Text>
      </TouchbleOpacityBox>
    );
  }
  return null;
}
