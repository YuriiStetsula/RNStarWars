import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ButtonOutline,
  ItemCount,
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

  const peopleStore = useAppSelector(state => ({
    people: state.people.results,
    page: state.people.next,
  }));

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPeopleAction({page: peopleStore.page}));
  }, []);

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
      {peopleStore.people && (
        <View style={styles.tableContainer}>
          <PeopleTable
            onRowPress={() => {
              navigation.navigate('Details');
            }}
            people={peopleStore.people}
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
});

export default HomeView;
