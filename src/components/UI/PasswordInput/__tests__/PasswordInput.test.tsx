import { fireEvent, render, screen } from 'test-utils';

import { IconProps } from '../../../Icon/Icon';
import { PasswordInput } from '../PasswordInput';

describe('<PasswordInput />', () => {
  it('starts with hidden password', () => {
    const mockedOnPress = jest.fn();
    render(
      <PasswordInput
        label="Password"
        placeholder="password"
        value="1234"
        onChangeText={mockedOnPress}
      />,
    );
    const inputElement = screen.getByPlaceholderText('password', { exact: true });
    expect(inputElement.props.secureTextEntry).toBeTruthy();
  });
  test('when pressing the eye icon, it should show password, and change to the eye off icon', () => {
    const mockedOnPress = jest.fn();
    render(
      <PasswordInput
        label="Password"
        placeholder="password"
        value="1234"
        onChangeText={mockedOnPress}
      />,
    );
    const eyeOffIcon: IconProps['name'] = 'eyeOff';
    const eyeOffIconElement = screen.getByTestId(eyeOffIcon);
    expect(eyeOffIconElement).toBeOnTheScreen();
    fireEvent.press(screen.getByTestId(eyeOffIcon));

    const eyeIcon: IconProps['name'] = 'eyeOn';
    const eyeOnIconElement = screen.getByTestId(eyeIcon);
    expect(eyeOnIconElement).toBeOnTheScreen();

    const inputElement = screen.getByPlaceholderText('password', { exact: true });
    expect(inputElement.props.secureTextEntry).toBeFalsy();
  });
});
