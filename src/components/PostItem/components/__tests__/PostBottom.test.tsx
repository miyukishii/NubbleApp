import { fireEvent, render, screen } from 'test-utils';

import { PostBottom } from '../PostBottom';

import { mockedPost } from './mockedData/mockedPost';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');
  return {
    ...originalModule,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('<PostBottom />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('it does not show the comment link if it has no comment', () => {
    render(<PostBottom {...mockedPost} commentCount={0} />);

    const commentLinkElement = screen.queryByText(/comentário/);
    expect(commentLinkElement).not.toBeOnTheScreen();
  });
  it('navigates to PostCommentScreen when pressing the comment link', () => {
    render(<PostBottom {...mockedPost} />);

    const commentLinkElement = screen.getByText(/comentário/);
    expect(commentLinkElement).toBeOnTheScreen();
    fireEvent.press(commentLinkElement);
    expect(mockedNavigate).toHaveBeenCalledWith('PostCommentScreen', {
      postId: mockedPost.id,
      showPost: false,
    });
  });
});
