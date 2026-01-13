import { useCameraRoll } from '../../../services/cameraRoll/useCameraRoll';
import { Screen } from '../../../components/Screen/Screen';
import { AppTabScreenProps } from '../../../routes/navigationType';
import { FlatList, Image, ListRenderItemInfo, useWindowDimensions } from 'react-native';
import { Header } from './components/Header';
import { useRef, useState } from 'react';
import { PressableBox } from '../../../components/UI/Box/TouchbleOpacityBox';
import { usePermission } from '../../../services/permission/usePermission';
import { PermissionManager } from '../../../components/PermissionManager/PermissionManager';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NewPostScreen({ navigation }: AppTabScreenProps<'NewPostScreen'>) {
  const [selectedImage, setSelectedImage] = useState<string>();

  const flatListRef = useRef<FlatList>(null);

  const onSelectImage = (imageUri: string) => {
    setSelectedImage(imageUri);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  const permission = usePermission('photoLibrary')
  const { photoList, fetchNextPage } = useCameraRoll(permission.permissionStatus === 'granted', onSelectImage);
  const { width } = useWindowDimensions()

  const NUM_COLUMNS = 4;
  const ITEM_WIDTH = width / NUM_COLUMNS;

  const renderItem = ({ item }: ListRenderItemInfo<string>): React.JSX.Element => {
    return (
      <PressableBox onPress={() =>onSelectImage(item)}>
        <Image
          key={item}
          style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
          source={{ uri: item }}
        />
      </PressableBox>
    );
  }
  return (
    <PermissionManager
      permissionType='photoLibrary'
      description='Permita o Nubble acessar as imagens da sua galeria'
    >
      <Screen
        canGoBack
        showGoBack={false}
        title='Novo post'
        noHorizontalPadding
      >
        <FlatList
          ref={flatListRef}
          numColumns={NUM_COLUMNS}
          data={photoList}
          renderItem={renderItem}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={<Header selectedImageUri={selectedImage} imageWidth={width} />}
        />
      </Screen>
    </PermissionManager>
  );
}
