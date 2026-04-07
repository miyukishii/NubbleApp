import { Alert, AlertButton } from 'react-native';

import { act, fireEvent, renderScreen, screen, waitForElementToBeRemoved } from 'test-utils';

import { authCredentialsStorage } from '../../../../../services/authCredentials/authCredentialsStorage';
import {
  mateusAuthCredentials,
  mateusPostCommentAPI,
} from '../../../../../test/server/PostComment/mocks';
import { resetInMemoryResponse } from '../../../../../test/server/PostComment/postCommentHandler';
import { server } from '../../../../../test/server/server';
import { PostCommentScreen } from '../../PostCommentScreen';

beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
});
afterEach(() => {
  server.resetHandlers();
  resetInMemoryResponse();
});
afterAll(() => {
  server.close();
  jest.resetAllMocks();
  jest.useRealTimers();
});

describe('integration: PostCommentScreen', () => {
  test('when ADDING a comment the list is automatically updated', async () => {
    renderScreen(
      <PostCommentScreen
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigation={{} as any}
        route={{
          name: 'PostCommentScreen',
          key: 'PostCommentScreen',
          params: {
            postId: '1',
            showPost: false,
          },
        }}
      />,
    );

    const comment = await screen.findByText(/comentário aleatório/i);
    expect(comment).toBeTruthy();

    const inputText = screen.getByPlaceholderText(/Adicione um comentário/i);

    fireEvent.changeText(inputText, 'Novo comentário');

    const sendButton = screen.getByText(/Enviar/i);
    fireEvent.press(sendButton);

    const newComment = await screen.findByText(/Novo comentário/i);
    expect(newComment).toBeTruthy();

    const comments = await screen.findAllByTestId('post-comment-id');
    expect(comments.length).toBe(3);
  });

  test('when DELETING a comment the list is automatically updated', async () => {
    jest.spyOn(authCredentialsStorage, 'get').mockResolvedValue(mateusAuthCredentials);

    let mockedConfirm: AlertButton['onPress'];
    const mockedAlert = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      if (buttons && buttons[0]) {
        mockedConfirm = buttons[0].onPress;
      }
    });

    renderScreen(
      <PostCommentScreen
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigation={{} as any}
        route={{
          name: 'PostCommentScreen',
          key: 'PostCommentScreen',
          params: {
            postId: '1',
            showPost: false,
          },
        }}
      />,
    );
    const currentComments = await screen.findAllByTestId('post-comment-id');
    expect(currentComments.length).toBe(2);

    const comment = await screen.findByText(mateusPostCommentAPI.message, {
      exact: false,
    });
    expect(comment).toBeTruthy();

    fireEvent(comment, 'longPress');
    expect(mockedAlert).toHaveBeenCalled();

    if (mockedConfirm) {
      mockedConfirm();
    }
    let deletedComment;
    await waitForElementToBeRemoved(
      () =>
        (deletedComment = screen.queryByText(mateusPostCommentAPI.message, {
          exact: false,
        })),
    );
    expect(deletedComment).toBeFalsy();
    const comments = await screen.findAllByTestId('post-comment-id');
    expect(comments.length).toBe(1);

    const toastMessage = await screen.findAllByTestId('toast-message');
    expect(toastMessage).toBeTruthy();

    act(() => jest.runAllTimers());

    expect(screen.queryByTestId('toast-message')).toBeNull();
  });
});
