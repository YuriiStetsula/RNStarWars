import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ButtonOutline,
  ItemCount,
  Pagination,
  PeopleTable,
  SpaceBetween,
} from '../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamsList} from '../../navigator/appStackParamsList';
import {getPeopleAction} from '../../store';
import {useAppDispatch, useAppSelector} from '../../hooks';

export type HeomeViewNavigationProp = NavigationProp<AppStackParamsList>;

const HomeView = () => {
  const navigation = useNavigation<HeomeViewNavigationProp>();
  const people = useAppSelector(state => state.people);
  const request = useAppSelector(state => state.request);
  const planets = useAppSelector(state => state.planets);
  const species = useAppSelector(state => state.species);

  const [page, setPage] = useState(1);

  const onPrevPress = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  };

  const onNextPress = () => {
    const maxPage = Math.floor(people.count / 10);

    if (page === maxPage) {
      return;
    }

    setPage(page + 1);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (request.people.isFetching) {
      return;
    }
    console.log('MAKE REQUEST');
    dispatch(getPeopleAction({page: page + ''}));
  }, [page]);

  return (
    <View style={styles.container}>
      <ButtonOutline style={styles.button} type="reject" title="CLEAR FANS" />
      <View style={styles.countContainer}>
        <ItemCount count={0} title="Female Fans" />
        <SpaceBetween space={0.2} />
        <ItemCount count={0} title="Male Fans" />
        <SpaceBetween space={0.2} />
        <ItemCount count={0} title="Others" />
      </View>
      {people && (
        <View style={styles.tableContainer}>
          <PeopleTable
            onRowPress={() => {
              navigation.navigate('Details');
            }}
            people={people.results?.[page]?.map(person => ({
              ...person,
              homeWorld: planets[person.planet] ?? '',
              species: person.species.map(specie => species[specie]).join(' '),
            }))}
          />
          <Pagination
            current={page + ''}
            onPrevPress={onPrevPress}
            onNextPress={onNextPress}
            style={styles.pagination}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {borderWidth: 0, flex: 1},
  button: {alignSelf: 'flex-end'},
  countContainer: {flexDirection: 'row', paddingVertical: 10},
  tableContainer: {flex: 1, backgroundColor: '#fff'},
  pagination: {alignSelf: 'flex-end'},
});

export default HomeView;
