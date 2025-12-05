
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '../../../services/toast/useToast';
import { QueryKeys } from '../../../types/infraTypes';
import { postCommentService } from '../postCommentService';

export function usePostCommentRemove(
  commentId: number,
  postId: number,
) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: () => postCommentService.remove(
      commentId
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList, postId],
      });
      showToast({
        message: 'Comentário excluído com sucesso!',
        type: 'success',
        duration: 4000,
        action: {
          title: 'Desfazer',
          onPress: () => console.log('desfazer'),
        },
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


  const handleRemove = async (): Promise<void> => {
    mutation.mutate();
  };

  return {
    handleRemove,
  };
}
