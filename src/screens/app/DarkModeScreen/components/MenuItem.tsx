import { Text } from "../../../../components/UI/Text/Text";
import { Box, BoxProps } from "../../../../components/UI/Box/Box";
import { RadioButton } from "../../../../components/UI/RadioButton/RadioButton";
import { ThemePreference } from "../../../../services/settings/settingsType";

export interface RadioButtonItemProps {
  label: string;
  subText?: string;
  themePreference: ThemePreference
}

export interface MenuItemProps {
 item: RadioButtonItemProps;
 isSelected: boolean;
 onSelect: (item: RadioButtonItemProps) => void;
}

export function MenuItem({
  item,
  isSelected,
  onSelect
}: MenuItemProps) {
  return (
    <Box {...$StyledBox}>
      <Box {...$StyledInputBox}>
        <Text semibold>
          {item.label}
        </Text>
        <RadioButton isSelected={isSelected} onPress={() => onSelect(item)} />
      </Box>
      {item.subText && (
        <Text preset="paragraphSmall" color="onBackgroundGray1" width="80%">{item.subText}</Text>
      )}
    </Box>
  )
}

const $StyledBox: BoxProps = {
  flexDirection: 'column',
  paddingVertical: 's16'
};

const $StyledInputBox: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
