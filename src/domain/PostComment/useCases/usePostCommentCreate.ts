
import { useState } from 'react';
import { Keyboard } from 'react-native';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '../../../services/toast/useToast';
import { QueryKeys } from '../../../types/infraTypes';
import { postCommentService } from '../postCommentService';
import { PostComment } from '../postCommentTypes';

export function usePostCommentCreate(
  postId: number,
) {
  const [message, setMessage] = useState('');

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate, isPending } = useMutation<PostComment, unknown, {message: string}>({
    mutationFn: ({ message: messageValue }) => postCommentService.create({
      message: messageValue,
      post_id: postId,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList, postId],
      });
      Keyboard.dismiss();
      setMessage('');
      showToast({
        message: 'Comentário criado com sucesso!',
        type: 'success',
        duration: 4000,
      });
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


  const handleSubmit = async (): Promise<void> => {
    mutate({ message });
  };

  return {
    handleSubmit,
    isLoading: isPending,
    setMessage,
    message,
  };
}
