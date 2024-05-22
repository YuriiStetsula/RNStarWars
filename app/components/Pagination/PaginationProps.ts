import {ViewProps} from 'react-native';

export interface PaginationProps extends ViewProps {
  current: string;
  onPrevPress: () => void;
  onNextPress: () => void;
}
