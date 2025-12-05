import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';
import { TextField, TextFieldProps } from '../UI/TextField/TextField';

type FormTextFieldProps<T extends FieldValues> =
  UseControllerProps<T> &
  Omit<TextFieldProps, 'value' | 'onChangeText'>;

export function FormTextfield<T extends FieldValues>({
  control,
  name,
  rules,
  ...textInputProps
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <TextField
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
          errorMessage={fieldState.error?.message}
          {...textInputProps}
        />
      )}
    />
  );
}
