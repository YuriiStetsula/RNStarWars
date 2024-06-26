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
import {getPeopleAction, toggleFavorite, clearFavorites} from '../../store';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FavoriteType} from '../../store/types';

export type HeomeViewNavigationProp = NavigationProp<AppStackParamsList>;

const FavoritePersonTypeByGender = {
  male: FavoriteType.male,
  female: FavoriteType.female,
  'n/a': FavoriteType.other,
  hermaphrodite: FavoriteType.other,
  none: FavoriteType.other,
};

const HomeView = () => {
  const navigation = useNavigation<HeomeViewNavigationProp>();
  const people = useAppSelector(state => state.people);
  const request = useAppSelector(state => state.request);
  const planets = useAppSelector(state => state.planets);
  const species = useAppSelector(state => state.species);
  const favorites = useAppSelector(state => state.favorites);

  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const onPrevPress = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  };

  const onNextPress = () => {
    const maxPage = Math.ceil(people.count / 10);

    if (page === maxPage) {
      return;
    }

    setPage(page + 1);
  };

  const navigateToDetails = (id: string) => {
    navigation.navigate('Details', {id, page});
  };

  const toggleFavoritePerson = (params: {name: string; gender: string}) => {
    dispatch(
      toggleFavorite({
        id: params.name,
        type: FavoritePersonTypeByGender[params.gender],
      }),
    );
  };

  const clearFans = () => {
    dispatch(clearFavorites());
  };

  useEffect(() => {
    if (request.people.isFetching) {
      return;
    }

    dispatch(getPeopleAction({page: page + ''}));
  }, [page]);

  const disabledStyle = request.people.isFetching ? styles.disabled : undefined;

  return (
    <View style={styles.container}>
      <ButtonOutline
        onPress={clearFans}
        style={[styles.button, disabledStyle]}
        disabled={request.people.isFetching}
        type="reject"
        title="CLEAR FANS"
      />
      <View style={styles.countContainer}>
        <ItemCount count={favorites[FavoriteType.female]} title="Female Fans" />
        <SpaceBetween space={0.2} />
        <ItemCount count={favorites[FavoriteType.male]} title="Male Fans" />
        <SpaceBetween space={0.2} />
        <ItemCount count={favorites[FavoriteType.other]} title="Others" />
      </View>
      {people && (
        <View
          pointerEvents={disabledStyle ? 'none' : 'auto'}
          style={[styles.tableContainer, disabledStyle]}>
          <PeopleTable
            onRowPress={navigateToDetails}
            onFavoritePress={toggleFavoritePerson}
            people={people.results?.[page]?.map(person => ({
              ...person,
              homeWorld: (person.planet && planets[person.planet]) ?? '',
              species:
                person.species &&
                person.species
                  .map(specie => specie && species[specie])
                  .join(' '),
              checked: favorites.ids.includes(person.name),
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
  disabled: {opacity: 0.5},
});

export default HomeView;
