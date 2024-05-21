import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  // StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import {HomeView} from '../../views';
import {ButtonOutline} from '../../components';

const Root = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{backgroundColor: '#F4F2F0', flex: 1}}>
      <View style={{padding: 20, flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ButtonOutline
          style={{alignSelf: 'flex-end'}}
          type="reject"
          title="CLEAR FANS"
        />
        <HomeView />
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({});

export default Root;
