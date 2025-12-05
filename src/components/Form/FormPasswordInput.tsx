import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import { PasswordInput, PasswordInputProps } from '../UI/PasswordInput/PasswordInput';

type FormPasswordInputProps<T extends FieldValues> =
  UseControllerProps<T> &
  Omit<PasswordInputProps, 'value' | 'onChangeText'>;

export function FormPasswordInput<T extends FieldValues>({
  control,
  name,
  rules,
  ...passwordInputProps
}: FormPasswordInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <PasswordInput
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
          errorMessage={fieldState.error?.message}
          {...passwordInputProps}
        />
      )}
    />
  );
}
