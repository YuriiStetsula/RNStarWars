import {TouchableOpacityProps} from 'react-native';

export interface ButtonOutlineProps extends TouchableOpacityProps {
  title: string;
  type?: 'regular' | 'accept' | 'reject';
}
