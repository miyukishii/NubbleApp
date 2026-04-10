import { act, renderHook, waitFor } from "test-utils";

import { useToast } from "../../../../services/toast/useToast";
import { postReactionService } from "../../postReactionService";
import { useReactToPost } from "../useReactToPost";

import { mockedWithLike, mockedWithoutLike } from "./mockedData/mockedPost";

jest.mock('../../../../services/toast/useToast', () => ({
  useToast: jest.fn()
}));

describe('useReactToPost', () => {
  let showToastMock: jest.Mock;

  beforeEach(() => {
    showToastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      showToast: showToastMock
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('when react to post, hasReacted and reactionCount should be updated', async () => {
    jest.spyOn(postReactionService, 'reactToPost').mockResolvedValueOnce(mockedWithoutLike.response);

    const { result } = renderHook(() => useReactToPost(mockedWithoutLike.post, 'like'));

    expect(result.current.reactionState.hasreated).toBeFalsy()
    expect(result.current.reactionState.reactionCount).toBe(mockedWithoutLike.post.reactionCount)

    act(() => {
      result.current.reactToPost();
    })

    await waitFor(() => {
      expect(result.current.reactionState.hasreated).toBeTruthy();
      expect(result.current.reactionState.reactionCount).toBe(mockedWithoutLike.post.reactionCount + 1)
    })
  })
  test('when react to post fails, hasReacted and reactionCount should be reverted to the original values', async () => {
    const errorMessage = 'API error'

    jest.spyOn(postReactionService, 'reactToPost').mockRejectedValueOnce(new Error(errorMessage));

    (useToast as jest.Mock).mockReturnValue({ showToast: showToastMock });

    const { result } = renderHook(() => useReactToPost(mockedWithLike.post, 'like'));

    expect(result.current.reactionState.hasreated).toBeTruthy()
    expect(result.current.reactionState.reactionCount).toBe(mockedWithLike.post.reactionCount)

    act(() => {
      result.current.reactToPost();
    })

    await waitFor(() => {
      expect(result.current.reactionState.hasreated).toBeTruthy();
      expect(result.current.reactionState.reactionCount).toBe(mockedWithLike.post.reactionCount);
      expect(showToastMock).toHaveBeenCalledWith({
        message: 'Algo deu errado. Tente novamente',
        type: 'error',
        duration: 4000,
      });
    })
  })
});
