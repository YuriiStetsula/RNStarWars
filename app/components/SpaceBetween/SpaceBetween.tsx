import React from 'react';
import {SpaceBetweenProps} from './SpaceBetweenProps';
import {View} from 'react-native';

const SpaceBetween = ({space, style, ...props}: SpaceBetweenProps) => {
  return <View {...props} style={[style, {flex: space}]} />;
};

export default SpaceBetween;
