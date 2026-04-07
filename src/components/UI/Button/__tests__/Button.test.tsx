import { render, fireEvent, screen } from 'test-utils';

import { Button } from '../Button';

describe('<Button />', () => {
  it('calls the onPress function when is pressed', () => {
    const mockedOnPress = jest.fn();

    render(<Button title="button title" onPress={mockedOnPress} />);
    const titleElement = screen.getByText('button title', { exact: false });
    fireEvent.press(titleElement);
    expect(mockedOnPress).toHaveBeenCalled();
  });
  it('does render activity indicator when it is loading', () => {
    const mockedOnPress = jest.fn();

    render(<Button title="button title" onPress={mockedOnPress} loading />);

    expect(screen.queryByText('button title')).not.toBeOnTheScreen();
    const buttonByTestId = screen.getByTestId('button-component');
    fireEvent.press(buttonByTestId);
    expect(mockedOnPress).not.toHaveBeenCalled();
  });
});
