import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from '../src/screen/TodoScreen'; // Or other screens
import LoginScreen from '../src/screen/LoginScreen';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login Screen',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
