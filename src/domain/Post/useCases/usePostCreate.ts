import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '../../../services/toast/useToast';
import { QueryKeys } from '../../../types/infraTypes';
import { Post } from '../postTypes';
import { postService } from '../postService';
import { ImageForUpload } from '../../../services/multimedia/multimediaType';
import { multimediaService } from '../../../services/multimedia/multimediaService';
import { useNavigation } from '@react-navigation/native';

export function usePostCreate(
) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigation = useNavigation();

  const { mutate, isPending } = useMutation<Post, unknown, { text: string, imageCover: ImageForUpload }>({
    mutationFn: ({ text, imageCover }) => postService.create({
      text,
      imageCover,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostList],
      });
      showToast({
        message: 'Postagem criado com sucesso!',
        type: 'success',
        duration: 4000,
      });
      navigation.navigate('AppTabNavigator', { screen: 'HomeScreen' })
    },
    onError: (err) => {
      console.log('err:', err);
      showToast({
        message: 'Algo deu errado. Tente novamente',
        type: 'error',
        duration: 4000,
      });

    },
  });

  const handleSubmit = async ({ description, imageUri
  }: {
    description: string;
    imageUri: string
  }): Promise<void> => {
    const imageForUpload = await multimediaService.prepareImageForUpload(imageUri);

    mutate({ text: description, imageCover: imageForUpload });
  };

  return {
    handleSubmit,
    isLoading: isPending,
  };
}
