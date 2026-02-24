import { Box } from "../Box/Box";
import { PressableBox } from "../Box/TouchbleOpacityBox";

interface RadioButtonProps {
  isSelected: boolean;
  onPress: () => void
}

export function RadioButton(
  { isSelected, onPress }:RadioButtonProps
) {
  return (
    <PressableBox
      height={20}
      width={20}
      borderWidth={isSelected ? 2 : 1}
      borderColor={isSelected ? 'primary' : 'onBackgroundGray2'}
      borderRadius={'r12'}
      justifyContent="center"
      alignItems="center"
      onPress={onPress}
      hitSlop={10}
    >
      {isSelected && (
        <Box backgroundColor="primary" height={12} width={12} borderRadius={'r12'} />
      )}
    </PressableBox>
  )
}
