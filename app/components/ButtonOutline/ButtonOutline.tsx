import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ButtonOutlineProps} from './ButtonOutlineProps';

const ButtonTypeColorStyle = {
  regular: 'navy',
  accept: 'green',
  reject: 'red',
};

const ButtonOutline = ({
  title,
  type = 'regular',
  ...props
}: ButtonOutlineProps) => {
  const color = ButtonTypeColorStyle[type];
  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, {borderColor: color}, props.style]}>
      <View style={styles.content}>
        <Text style={{color}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ButtonOutline;
