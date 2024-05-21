import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FavIconProps} from './FavIconProps';

const FavIcon = ({iconProps, checked, ...props}: FavIconProps) => {
  return (
    <Pressable {...props}>
      <Icon
        size={20}
        {...iconProps}
        name={checked ? 'favorite' : 'favorite-outline'}
      />
    </Pressable>
  );
};

export default FavIcon;
