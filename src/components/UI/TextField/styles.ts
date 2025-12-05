import { BoxProps } from '../Box/Box';

export const $TextFieldContainer = (props: { isError?: boolean }): BoxProps => ({
  borderWidth: props.isError ? 2 : 1,
  borderColor: props.isError ? 'error' : 'gray4',
  borderRadius: 'r12',
  height: 50,
  paddingHorizontal: 's12',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  gap: 's4',
});
