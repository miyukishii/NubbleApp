import { Text } from "../../../../components/UI/Text/Text";
import { BoxProps } from "../../../../components/UI/Box/Box";
import { PressableBox } from "../../../../components/UI/Box/TouchbleOpacityBox";
import { Icon } from "../../../../components/Icon/Icon";

export interface MenuItemProps {
  label: string;
  onPress: () => void;
}

export function MenuItem({
  label,
  onPress
}: MenuItemProps) {
  return (
    <PressableBox {...$StyledBox} onPress={onPress}>
      <Text semibold>
        {label}
      </Text>
      <Icon name='chevronRight' />
    </PressableBox>
  )
}

const $StyledBox: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 's16'
};
