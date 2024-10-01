import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from '../src/screen/TodoScreen'; // Or other screens

const Stack = createStackNavigator();

const MainStackNavigator = ({ userData }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Todo"
        component={TodoScreen}
        initialParams={{ userData }} // Pass userData as initialParams
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
