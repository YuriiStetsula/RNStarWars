import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ItemCountProps} from './ItemCountProps';

const ItemCount = ({count, title, ...props}: ItemCountProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      <Text style={styles.count}>{count ?? 0}</Text>
      <Text>{title ?? ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  count: {
    fontSize: 20,
    marginBottom: 4,
  },
});

export default ItemCount;
