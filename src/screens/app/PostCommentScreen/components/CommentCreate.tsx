import { Box } from '../../../../components/UI/Box/Box';
import { TextMessage } from '../../../../components/UI/TextMessage.tsx/TextMessage';
import { usePostCommentCreate } from '../../../../domain/PostComment/useCases/usePostCommentCreate';

export function CommentCreate({
  postId,
}: {
  postId: number,
}) {
  const {
    handleSubmit,
    isLoading: submitLoading,
    message,
    setMessage,
  } = usePostCommentCreate(postId);

  return (
    <Box paddingHorizontal='s24'>
      <TextMessage
        value={message}
        onChangeText={setMessage}
        placeholder="Adicione um comentário"
        onPressSend={handleSubmit}
        loading={submitLoading}
      />
    </Box>
  );
}
