import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {Provider} from 'react-redux';
import {AppNavigator} from '../../navigator';
import {store} from '../../store';

const Root = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppNavigator />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F4F2F0',
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
  },
});

export default Root;
