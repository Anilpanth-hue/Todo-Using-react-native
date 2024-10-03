import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from '../src/screen/TodoScreen'; 
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { signOut } from '../Firebase/auth';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          title: 'Todo',
          headerRight: () => (
            <TouchableOpacity
              onPress={async () => {
                await signOut();
              }}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
