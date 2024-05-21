import React, {ReactElement} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {PeopleTableProps} from './PeopleTableProps';
import {grid, pcth} from '../../utils';

interface RowProps extends ViewProps {
  cells: (string | ReactElement | undefined)[];
}

const columnSize = grid([0.5, 2.5, 1.4, 1, 1.8, 1]);

const Row = ({cells, ...props}: RowProps) => {
  return (
    <View {...props} style={styles.row}>
      {cells.map((cell, index) => (
        <View
          key={index}
          style={{
            width: pcth(columnSize(index)),
          }}>
          {typeof cell === 'string' ? <Text>{cell}</Text> : cell}
        </View>
      ))}
    </View>
  );
};

const PeopleTable = (props: PeopleTableProps) => {
  const onRowPress = () => () => {
    props.onRowPress();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.verticalScrollContent}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.horizontalScrollContent}>
          <Row
            cells={[
              'H',
              'Name',
              'Birth Year',
              'Gender',
              'Home World',
              'Species',
            ]}
          />
          <View style={styles.divider} />
          {props.people.map((person, index) => (
            <TouchableOpacity onPress={onRowPress()} key={index}>
              <Row
                cells={[
                  'H',
                  person.name,
                  person.birthYear,
                  person.gender,
                  person.homeWorld,
                  'Species',
                ]}
              />
              {props.people.length - 1 !== index && (
                <View style={styles.divider} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 10,
  },
  verticalScrollContent: {
    flex: 1,
  },
  horizontalScrollContent: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});

export default PeopleTable;
