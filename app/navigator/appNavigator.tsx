import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsView, HomeView} from '../views';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeView}
        />
        <Stack.Screen name="Details" component={DetailsView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
