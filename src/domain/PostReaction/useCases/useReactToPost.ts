import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Post } from '../../../domain/Post/postTypes';
import { useToast } from '../../../services/toast/useToast';
import { QueryKeys } from '../../../types/infraTypes';
import { postReactionService } from '../postReactionService';
import { PostReactionBase, PostReactionType } from '../postReactionTypes';

export function useReactToPost(
  post: Post,
  reactionType: PostReactionType,
  queryKeys?: QueryKeys[]
) {
  const { showToast } = useToast();

  const initialhasReacted = postReactionService.hasReactedToPost(post.reactions, reactionType)

  const initialReactionCout = reactionType === 'like' ? post.reactionCount : post.favoriteCount

  const [reactionState, setReactionState] = useState({
    hasreated: initialhasReacted,
    reactionCount: initialReactionCout
  })

  const queryClient = useQueryClient();

  const { mutate } = useMutation<PostReactionBase>({
    mutationFn: () => postReactionService.reactToPost({
      reaction_type: reactionType,
      post_id: Number(post.id),
    }),
    onSuccess: () => {
      if (queryKeys) {
        queryKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        })
      }
    },
    onError: (err) => {
      console.log('err:', err);
      showToast({
        message: 'Algo deu errado. Tente novamente',
        type: 'error',
        duration: 4000,
      });
      toggleReactionState();
    },
  });

  function reactToPost() {
    toggleReactionState();
    mutate();
  }

  function toggleReactionState() {
    setReactionState(prev => ({
      hasreated: !prev.hasreated,
      reactionCount: prev.hasreated ? prev.reactionCount - 1 : prev.reactionCount + 1
    }));
  }

  return {
    reactionState,
    reactToPost
  };
}
