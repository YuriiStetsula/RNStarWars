import React, {ReactElement} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {PeopleTableProps} from './PeopleTableProps';
import {grid, pcth} from '../../utils';
import {FavIcon} from '../../components';

const columnSize = grid([1, 2.7, 2, 1.5, 2.2, 2]);

interface RowProps extends ViewProps {
  cells: (string | ReactElement | undefined)[];
}

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
      <ScrollView nestedScrollEnabled>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.horizontalScrollContent}>
          <Row
            cells={[
              <FavIcon checked />,
              'Name',
              'Birth Year',
              'Gender',
              'Home World',
              'Species',
            ]}
          />
          <View style={styles.divider} />
          {props.people?.map((person, index) => (
            <TouchableOpacity onPress={onRowPress()} key={index}>
              <Row
                cells={[
                  <FavIcon
                    checked={person.checked}
                    onPress={() =>
                      props.onFavoritePress({
                        name: person.name,
                        gender: person.gender,
                      })
                    }
                    iconProps={{
                      color: 'red',
                    }}
                  />,
                  person.name,
                  person.birthYear,
                  person.gender,
                  person.homeWorld + '',
                  person.species,
                ]}
              />
              {props.people && props.people.length - 1 !== index && (
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
