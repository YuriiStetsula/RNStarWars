import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PaginationProps} from './PaginationProps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Pagination = ({...props}: PaginationProps) => {
  return (
    <View {...props} style={[styles.containet, props.style]}>
      <Text style={styles.text}>Page: {props.current}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={props.onPrevPress}>
          <Icon size={35} name={'arrow-left'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onNextPress}>
          <Icon size={35} name={'arrow-right'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
  },
});

export default Pagination;
