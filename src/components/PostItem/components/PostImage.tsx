import React from 'react';
import { Dimensions, Image } from 'react-native';

import { Post } from '../../../domain/Post/postTypes';

export function PostImage({ imageURL }: Pick<Post, 'imageURL'>): React.JSX.Element {
  return (
    <Image source={{ uri: imageURL }} style={{ width: Dimensions.get('screen').width, height: 300, marginHorizontal: -20 }} />
  );
}
