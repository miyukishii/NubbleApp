import { StyleSheet } from 'react-native';

import { render, fireEvent, screen } from 'test-utils';

import { theme } from '../../../../theme/theme';
import { Button } from '../Button';

describe('<Button />', () => {
  it('calls the onPress function when is pressed', () => {
    const mockedOnPress = jest.fn();

    render(<Button title="button title" onPress={mockedOnPress} />);
    const titleElement = screen.getByText('button title', { exact: false });
    fireEvent.press(titleElement);
    expect(mockedOnPress).toHaveBeenCalled();
  });
  test('the title should not be pressable if it is loading', () => {
    const mockedOnPress = jest.fn();

    render(<Button title="button title" onPress={mockedOnPress} loading />);

    expect(screen.queryByText('button title')).not.toBeOnTheScreen();
    const buttonByTestId = screen.getByTestId('button-component');
    fireEvent.press(buttonByTestId);
    expect(mockedOnPress).not.toHaveBeenCalled();
  });
  it('does render activity indicator when it is loading', () => {
    render(<Button title="button title" loading />);

    const loadingElement = screen.queryByTestId('activity-indicator');
    expect(loadingElement).toBeTruthy();
  });
  test('the button to be gray if it is disabled', () => {
    render(<Button title="button title" disabled />);

    const titleElement = screen.getByText('button title', { exact: false });
    const titleStyle = StyleSheet.flatten(titleElement.props.style);
    expect(titleStyle.color).toEqual(theme.colors.gray2);
  });
});
