import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from '../src/screen/TodoScreen'; // Or other screens

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Todo"
        component={TodoScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
