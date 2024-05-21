import {PressableProps} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';

export interface FavIconProps extends PressableProps {
  iconProps?: Omit<IconProps, 'name'>;
  checked?: boolean;
}
