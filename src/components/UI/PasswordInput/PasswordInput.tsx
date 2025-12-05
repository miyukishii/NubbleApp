import { useState } from 'react';

import { Icon } from '../../Icon/Icon';
import { TextField, TextFieldProps } from '../TextField/TextField';

export type PasswordInputProps = Omit<TextFieldProps, 'icon'>

export function PasswordInput(props: PasswordInputProps) {
  const [hidePassword, setHidePassword] = useState(true);

  const togglePassword = (): void => setHidePassword(prev => !prev);

  return (
    <TextField
      secureTextEntry={hidePassword}
      {...props}
      RightComponent={(
        hidePassword ? <Icon onPress={togglePassword} name="eyeOff" color="gray2" /> : <Icon onPress={togglePassword} name="eyeOn" color="gray2" />
      )}
    />
  );
}
