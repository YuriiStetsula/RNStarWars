import React, {useMemo} from 'react';
import ReactNative, {View, StyleSheet, TextProps} from 'react-native';
import {useAppSelector} from '../../hooks';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppStackParamsList} from '../../navigator/appStackParamsList';

type DetailsRouteProp = RouteProp<AppStackParamsList>;

const Text = (props: TextProps & {bold?: boolean}) => {
  const boldTextStyle = props.bold ? styles.bold : undefined;
  return (
    <ReactNative.Text
      {...props}
      style={[styles.text, boldTextStyle, props.style]}
    />
  );
};

const DetailsView = () => {
  const route = useRoute<DetailsRouteProp>();
  const {id, page} = route.params;
  const people = useAppSelector(state => state.people);
  const entry = people.results?.[page];

  const person = useMemo(
    () => entry?.find(item => item.name === id),
    [id, entry],
  );

  const content = {
    ['Name']: person?.name,
    ['Gender']: person?.gender,
    ['Birth Year']: person?.birthYear,
    ['Eye Color']: person?.eyeColor,
    ['Hair Color']: person?.hairColor,
    ['Skin Color']: person?.skinColor,
    ['Mass']: person?.mass,
    ['Height']: person?.height,
  };
  return (
    <View style={styles.container}>
      {Object.keys(content).map((key, index) => {
        return (
          <Text key={index}>
            <Text bold>{key}:</Text> {content[key]}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default DetailsView;
